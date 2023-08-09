import { Suspense, useMemo } from "react";
import { SWRConfig } from "swr";
import AppLoader from "./components/Loaders/AppLoader";
import Routing from "./routing";
import { useApi } from "./utils/api";

function App() {
    const { authGet } = useApi();
    const swrConfig = useMemo(() => ({
        fetcher: async ({ url, ...config }) => {
            return authGet(url, config);
        },
        revalidateOnFocus: false,
        shouldRetryOnError: false,
    }), []);

    return (
        <Suspense fallback={AppLoader}>
            <SWRConfig value={swrConfig}>
                <Routing />
            </SWRConfig>
        </Suspense>
    );
}

export default App;
