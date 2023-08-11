import { useCallback } from "react";
import axios, { isCancel } from "axios";

const apiErrorHandler = (err) => {
	if (!axios.isAxiosError(err)) {
		return err.message;
	}

	const errorStatusCode = err.response?.status;
	switch (errorStatusCode) {
		case 500: {
			return "Something went wrong";
		}
		default: {
			return err.response?.data.message;
		}
	}
};

export const api = axios.create({
	baseURL: "http://localhost:3001",
});

async function call(config) {
	try {
		const res = await api.request(config);
		return res.data;
	} catch (e) {
		if (isCancel(e)) {
			throw e;
		} else if (e.response.status === 401 && localStorage.getItem("TOKEN")) {
			localStorage.removeItem("TOKEN");
			window.location.reload();
		} else {
			throw apiErrorHandler(e);
		}
	}
}

const useNonAuthApi = () => {
	const nonAuthGet = useCallback(
		(url, config) => call({ method: "GET", url, ...config }),
		[],
	);

	const nonAuthPost = useCallback(
		(url, config) => call({ method: "POST", url, ...config }),
		[],
	);

	const nonAuthPut = useCallback(
		(url, config) => call({ method: "PUT", url, ...config }),
		[],
	);

	const nonAuthDelete = useCallback(
		(url, config) => call({ method: "delete", url, ...config }),
		[],
	);

	return {
		call,
		nonAuthGet,
		nonAuthPost,
		nonAuthPut,
		nonAuthDelete,
	};
};

const useApi = () => {
	const { call } = useNonAuthApi();
	const token = "";

	const authCall = useCallback(
		async function (config) {
			try {
				const authConfig = {
					...config,
					headers: {
						Authorization: `Bearer ${token}`,
						...config.headers,
					},
				};
				return call(authConfig);
			} catch (e) {
				throw e;
			}
		},
		[call, token],
	);

	const authGet = useCallback(
		(url, config) => authCall({ method: "GET", url, ...config }),
		[authCall],
	);

	const authPost = useCallback(
		(url, config) => authCall({ method: "POST", url, ...config }),
		[authCall],
	);

	const authPut = useCallback(
		(url, config) => authCall({ method: "PUT", url, ...config }),
		[authCall],
	);

	const authPatch = useCallback(
		(url, config) => authCall({ method: "PATCH", url, ...config }),
		[authCall],
	);

	const authDelete = useCallback(
		(url, config) => authCall({ method: "delete", url, ...config }),
		[authCall],
	);

	return {
		call: authCall,
		authGet,
		authPost,
		authPut,
		authPatch,
		authDelete,
	};
};

export { useNonAuthApi, useApi };
export default useApi;
