import { STORAGE_TOKENS } from '../../constants';

export const saveGameToStorage = ({ board, turn }) => {
	window.localStorage.setItem(STORAGE_TOKENS.BOARD, JSON.stringify(board));
	window.localStorage.setItem(STORAGE_TOKENS.TURN, JSON.stringify(turn));
};

export const resetGameStorage = () => {
	window.localStorage.removeItem(STORAGE_TOKENS.BOARD);
	window.localStorage.removeItem(STORAGE_TOKENS.TURN);
};

export const getStorageData = token => {
	return window.localStorage.getItem(token);
};
