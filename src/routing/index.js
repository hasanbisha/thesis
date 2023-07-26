import { createBrowserRouter, RouterProvider } from "react-router-dom";
import config from "./config";

const router = createBrowserRouter(config);

function Routing() {
	return <RouterProvider router={router} />;
}

export default Routing;
