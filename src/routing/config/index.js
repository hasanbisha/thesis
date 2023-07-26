import { Navigate } from "react-router-dom";
import Layout from "../../components/Layout/NonAuthLayout";
import Authentication from "../Authentication";

import SignUp from "../../features/SignUp";
import LogIn from "../../features/LogIn";
import Home from "../../features/Home";
import People from "../../features/People";
import AddEmployee from "../../features/People/Add";
import ClockIn from "../../features/ClockIn";
import TimeSheet from "../../features/TimeSheet";
import TimeSheetHome from "../../features/TimeSheet/Home";
import TimeSheetTeam from "../../features/TimeSheet/Team";


const routes = [
	{
		path: "/",
        element: <Layout />,
		children: [
			{
				path: "login",
				element: <LogIn />,
			},
			{
				path: "signup",
				element: <SignUp />,
			},
		],
	},
	{
		path: "/",
		element: <Authentication />,
		children: [
            { index: true, element: <Home /> },
            {
                path: "people",
                children: [
                    { index: true, element: <People /> },
                    { path: "add-employee", element: <AddEmployee /> },
                ],
            },
            { path: "clock-in", element: <ClockIn /> },
            {
                path: "time-sheet",
                element: <TimeSheet />,
                children: [
                    { path: "my", element: <TimeSheetHome /> },
                    { path: "team", element: <TimeSheetTeam /> },
                ],
            },
		],
	},
	{
		path: "*",
		element: <Navigate to="/" />,
	},
];

export default routes;
