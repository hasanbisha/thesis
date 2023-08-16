import { Link, Outlet } from "react-router-dom";
import Header from "../../components/Layout/Header";

const settings = [
	{ name: "Jobs", url: "jobs" },
	{ name: "Locations", url: "locations" },
	{ name: "Projects", url: "projects" },
];

function Settings() {
	return (
		<div>
			<Header title="Settings">
				<ul className="inline-flex">
					{settings.map(({ name, url }) => (
						<li key={url}>
							<Link className="hover:bg-gray-200 rounded-md px-3 py-2 text-sm font-medium" to={url}>
								{name}
							</Link>
						</li>
					))}
				</ul>
			</Header>

			<div className="layout-content">
				<Outlet />
			</div>
		</div>
	);
}

export default Settings;
