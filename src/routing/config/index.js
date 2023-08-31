import { Navigate } from "react-router-dom";
import Authentication from "../Authentication";

import LogIn from "../../features/LogIn";
import LogOut from "../../features/LogOut";
import Home from "../../features/Home";
import Users from "../../features/Users";
import ClockIn from "../../features/ClockIn";
import TimeSheet from "../../features/TimeSheet";
import TimeSheetHome from "../../features/TimeSheet/Home";
import TimeSheetTeam from "../../features/TimeSheet/Team";
import Settings from "../../features/Settings";
import Jobs from "../../features/Settings/Jobs";
import Locations from "../../features/Settings/Locations";
import Projects from "../../features/Settings/Project";
import PaymentGroup from "../../features/Settings/PaymentGroup";
import Profile from "../../features/Profile";

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
			{ path: "users", element: <Users /> },
			{ path: "clock-in", element: <ClockIn /> },
			{
				path: "time-sheet",
				element: <TimeSheet />,
				// children: [
				// 	{ path: "my", element: <TimeSheetHome /> },
				// 	{ path: "team", element: <TimeSheetTeam /> },
				// ],
			},
			{
				path: "settings",
				element: <Settings />,
				children: [
					{ path: "jobs", element: <Jobs /> },
					{ path: "locations", element: <Locations /> },
					{ path: "projects", element: <Projects /> },
					{ path: "payment-groups", element: <PaymentGroup /> },
				],
			},
			{
				path: "profile",
				element: <Profile />
			}
		],
	},
	{
		path: "*",
		element: <Navigate to="/" />,
	},
];

export default routes;
