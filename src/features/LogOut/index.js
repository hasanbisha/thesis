import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthentication } from "../Authentication";

export default function LogOut() {
	const { logout } = useAuthentication();

	useEffect(() => {
		logout();
	}, [logout]);

	return (
		<Navigate to="/login" />
	);
}
