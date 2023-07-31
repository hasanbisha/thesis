import { Navigate } from "react-router-dom";
import NonAuthLayout from "../../components/NonAuthLayout";
import Authentication from "../Authentication";

import LogIn from "../../features/LogIn";
import Home from "../../features/Home";
import Users from "../../features/Users";
import AddUser from "../../features/Users/Add";
import ClockIn from "../../features/ClockIn";
import TimeSheet from "../../features/TimeSheet";
import TimeSheetHome from "../../features/TimeSheet/Home";
import TimeSheetTeam from "../../features/TimeSheet/Team";

const routes = [
	{
		path: "/",
		element: <NonAuthLayout />,
		children: [
			{
				path: "login",
				element: <LogIn />,
			},
		],
	},
	{
		path: "/",
		element: <Authentication />,
		children: [
			{ index: true, element: <Home /> },
			{
				path: "users",
				children: [
					{ index: true, element: <Users /> },
					{ path: "add", element: <AddUser /> },
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
