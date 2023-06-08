const Header = ({ handleRestart }) => {
	return (
		<>
			<h1>Tic tac toe</h1>
			<button onClick={handleRestart}>Reset Game</button>
		</>
	);
};

export default Header;
