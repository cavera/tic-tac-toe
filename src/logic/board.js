import { WINNER_COMBOS } from '../constants';

export const checkWinnerFrom = boardToRev => {
	for (const combo of WINNER_COMBOS) {
		const [a, b, c] = combo;

		if (boardToRev[a] && boardToRev[a] === boardToRev[b] && boardToRev[a] === boardToRev[c]) {
			// console.log("Winner: ", boardToRev[a]);
			return boardToRev[a];
		}
	}
	return null;
};

export const checkEndGame = boardToRev => {
	// const areSquaresAvailable = boardToRev.filter(square => square !== null).length > 0;
	return boardToRev.every(square => square !== null);
};
