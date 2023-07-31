import { Outlet } from "react-router-dom";
import Layout from "../components/Layout";

function Authentication() {
    return (
        <Layout>
            <Outlet />
        </Layout>
    );
}

export default Authentication;
