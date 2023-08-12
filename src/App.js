import { Suspense, useMemo } from "react";
import { ToastContainer } from "react-toastify";
import { SWRConfig } from "swr";
import AppLoader from "./components/Loaders/AppLoader";
import Routing from "./routing";
import { useApi } from "./utils/api";
import "react-toastify/dist/ReactToastify.css";
import { AuthenticationProvider } from "./features/Authentication";

function SWRConfigProvider({ children }) {
    const { authGet } = useApi();
    const swrConfig = useMemo(() => ({
        fetcher: async ({ url, ...config }) => {
            return authGet(url, config);
        },
        revalidateOnFocus: false,
        shouldRetryOnError: false,
    }), [authGet]);

    return (
        <SWRConfig value={swrConfig}>
            {children}
        </SWRConfig>
    );
}

function App() {

    return (
        <Suspense fallback={AppLoader}>
            <AuthenticationProvider>
                <SWRConfigProvider>
                    <Routing />
                </SWRConfigProvider>
            </AuthenticationProvider>

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </Suspense>
    );
}

export default App;
