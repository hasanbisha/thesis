import { noop } from "lodash";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useNonAuthApi } from "../../utils/api";

const initialState = {
	token: localStorage.getItem("token"),
	user: null,
	hasAuthenticated: false,
};

const context = createContext({
	...initialState,
	login: noop,
	logout: noop,
});

export const AuthenticationProvider = ({ children }) => {
	const [state, setState] = useState(initialState);

	const login = useCallback((user, token) => {
		localStorage.setItem("token", token);
		setState((prev) => ({
			...prev,
			token,
			user,
			hasAuthenticated: true,
		}));
	}, [setState]);

	const logout = useCallback(() => {
		localStorage.removeItem("token");
		setState({
			token: null,
			user: null,
			hasAuthenticated: true,
		});
	}, [setState]);

	const { nonAuthGet } = useNonAuthApi();
    const checkToken = useCallback(async () => {
        if (!state.token) {
            return;
        }
        try {
            const user = await nonAuthGet("/auth/profile", {
				headers: {
					Authorization: `Bearer ${state.token}`,
				},
			});
            setState((prev) => ({
				...prev,
				user,
				hasAuthenticated: true,
			}));
        } catch (err) {
            setState((prev) => ({
				...prev,
				token: null,
				user: null,
				hasAuthenticated: true,
			}));
        }
    }, [state.token, nonAuthGet, setState]);

	const hasUser = !!state.user;
    useEffect(() => {
		if (!hasUser) {
			checkToken();
		}
    }, [hasUser, checkToken]);

	return (
		<context.Provider value={{ ...state, login, logout }}>
			{children}
		</context.Provider>
	);
}

export const useAuthentication = () => {
	const value = useContext(context);
	if (value === undefined) {
		throw new Error("useAuthentication not used inside of a provider");
	}
	return value;
}
