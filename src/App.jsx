import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { TURNS, STORAGE_TOKENS } from './constants';
import { checkWinnerFrom, checkEndGame } from './logic/board';
import Header from './components/Header';
import Game from './components/Game';
import Turns from './components/Turns';
import WinnerModal from './components/WinnerModal';
import { saveGameToStorage, resetGameStorage, getStorageData } from './logic/storage';

function App() {
	const [board, setBoard] = useState(() => {
		const boardFromStorage = getStorageData(STORAGE_TOKENS.BOARD);
		return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
	});

	const [turn, setTurn] = useState(() => {
		const turnFromStorage = getStorageData(STORAGE_TOKENS.TURN);
		return turnFromStorage ? JSON.parse(turnFromStorage) : TURNS.X;
	});
	const [winner, setWinner] = useState(null); // true:winner, false: tie, null: start

	const updateBoard = index => {
		if (board[index] || winner) return;

		// const newBoard = [...board];
		const newBoard = structuredClone(board);
		newBoard[index] = turn;
		setBoard(newBoard);

		const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
		setTurn(newTurn);

		// saveGameToStorage({ board: newBoard, turn: newTurn });

		const newWinner = checkWinnerFrom(newBoard);
		if (newWinner) {
			confetti();
			setWinner(prevWinner => {
				console.log(`prev Winner: ${prevWinner} - new Winner: ${newWinner}`);
				return newWinner;
			});
		} else {
			if (checkEndGame(newBoard)) {
				setWinner(false);
			}
		}
	};

	const handleRestart = () => {
		setWinner(null);
		setTurn(TURNS.X);
		setBoard(Array(9).fill(null));

		resetGameStorage();
	};

	useEffect(() => {
		saveGameToStorage({ board: board, turn: turn });
	}, [board, turn]);

	return (
		<main className='board'>
			<Header handleRestart={handleRestart} />

			<Game
				board={board}
				updateBoard={updateBoard}
			/>

			<Turns turn={turn} />

			<WinnerModal
				winner={winner}
				handleRestart={handleRestart}
			/>
		</main>
	);
}

export default App;
