import { useAuthentication } from "../../features/Authentication";

export const useUser = () => {
	const { user } = useAuthentication();
	return user;
}
