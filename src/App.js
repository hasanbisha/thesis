import { Suspense, useMemo } from "react";
import { SWRConfig } from "swr";
import AppLoader from "./components/Loaders/AppLoader";
import Routing from "./routing";

function App() {
    const swrConfig = useMemo(() => ({
        fetcher: async (config) => {
            const response = await fetch({
                method: "GET",
                ...config,
            });
            return response.json();
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
