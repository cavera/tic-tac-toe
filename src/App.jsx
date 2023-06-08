import { useState } from "react";
import { Square } from "./components/Square";

const TURNS = {
	X: "❌",
	O: "⭕",
};

function App() {
	const [board, setBoard] = useState(Array(9).fill(null));

	const [turn, setTurn] = useState(TURNS.X);
	const [winner, setWinner] = useState(null); // true:winner, false: tie, null: start

	const WINNER_COMBOS = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	const checkWinner = boardToRev => {
		for (const combo of WINNER_COMBOS) {
			const [a, b, c] = combo;

			if (boardToRev[a] && boardToRev[a] === boardToRev[b] && boardToRev[a] === boardToRev[c]) {
				console.log("Winner: ", boardToRev[a]);
				return boardToRev[a];
			}
		}
		return null;
	};

	const updateBoard = index => {
		if (board[index] || winner) return;

		// const newBoard = [...board];
		const newBoard = structuredClone(board);
		newBoard[index] = turn;
		setBoard(newBoard);
		// console.log(newBoard);

		const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
		setTurn(newTurn);
		const newWinner = checkWinner(newBoard);
		const areSquaresAvailable = newBoard.filter(square => square === null).length > 0;
		if (newWinner)
			setWinner(prevWinner => {
				console.log(`prev Winner: ${prevWinner} - new Winner: ${newWinner}`);
				return newWinner;
			});
	};

	const handleRestart = () => {
		setWinner(null);
		setTurn(TURNS.X);
		setBoard(Array(9).fill(null));
	};

	return (
		<main className='board'>
			<h1>Tic tac toe</h1>
			<button onClick={handleRestart}>Reset Game</button>
			<section className='game'>
				{board.map((_, index) => {
					return (
						<Square
							key={index}
							index={index}
							updateBoard={updateBoard}>
							{board[index]}
						</Square>
					);
				})}
			</section>
			<section className='turn'>
				<Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
				<Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
			</section>

			{winner !== null && (
				<section className='winner'>
					<div className='text'>
						<h2>{winner === false ? "Tie" : `${winner} wins!`}</h2>
						<header className='win'>{winner && <Square>{winner}</Square>}</header>

						<footer>
							<button onClick={handleRestart}>Restart</button>
						</footer>
					</div>
				</section>
			)}
		</main>
	);
}

export default App;
