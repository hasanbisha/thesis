import { Navigate } from "react-router-dom";
import Authentication from "../Authentication";

import LogIn from "../../features/LogIn";
import LogOut from "../../features/LogOut";
import Home from "../../features/Home";
import Users from "../../features/Users";
import AddUser from "../../features/Users/Add";
import ClockIn from "../../features/ClockIn";
import TimeSheet from "../../features/TimeSheet";
import TimeSheetHome from "../../features/TimeSheet/Home";
import TimeSheetTeam from "../../features/TimeSheet/Team";
import Settings from "../../features/Settings";
import Jobs from "../../features/Settings/Jobs";
import Locations from "../../features/Settings/Locations";

const routes = [
	{
		path: "/login",
		element: <LogIn />,
	},
	{
		path: "/logout",
		element: <LogOut />,
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
			{
				path: "settings",
				element: <Settings />,
				children: [
					{ path: "jobs", element: <Jobs /> },
					{ path: "locations", element: <Locations /> },
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
