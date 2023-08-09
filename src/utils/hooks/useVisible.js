import { useState, useCallback } from "react";

export const useVisible = (defaultVisible = false) => {
	const [visible, setVisible] = useState(defaultVisible);
	const [selected, setSelected] = useState(null);

	const open = useCallback((item) => {
		setVisible(true);
		setSelected(item);
	}, [setVisible, setSelected]);

	const close = useCallback(() => {
		setVisible(false);
		setSelected(null);
	}, [setVisible, setSelected]);

	const toggle = useCallback(() => {
		setVisible((prev) => !prev);
	}, [setVisible]);

	return { visible, selected, open, close, toggle };
};
