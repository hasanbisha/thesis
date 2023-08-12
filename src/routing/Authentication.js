import { Navigate, Outlet } from "react-router-dom";
import Layout from "../components/Layout";
import AppLoader from "../components/Loaders/AppLoader";
import { useAuthentication } from "../features/Authentication";

function Authentication() {
    const { token, user, hasAuthenticated } = useAuthentication();

    if (!token || (hasAuthenticated && !user)) {
        return <Navigate to="/login" />;
    }

    if (!hasAuthenticated) {
        return (
            <AppLoader />
        );
    }

    return (
        <Layout>
            <Outlet />
        </Layout>
    );
}

export default Authentication;
