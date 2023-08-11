import { Suspense, useMemo } from "react";
import { ToastContainer } from "react-toastify";
import { SWRConfig } from "swr";
import AppLoader from "./components/Loaders/AppLoader";
import Routing from "./routing";
import { useApi } from "./utils/api";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const { authGet } = useApi();
    const swrConfig = useMemo(() => ({
        fetcher: async ({ url, ...config }) => {
            return authGet(url, config);
        },
        revalidateOnFocus: false,
        shouldRetryOnError: false,
    }), [authGet]);

    return (
        <Suspense fallback={AppLoader}>
            <SWRConfig value={swrConfig}>
                <Routing />
            </SWRConfig>

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
