import React, {useState} from 'react';
import './App.css';
import Navbar from "./Component/Navbar/Navbar";
import Player from "./Models/Player";
import {GameContext} from "./Context/GameContext";
import Home from "./Component/Homepage/Home";
import Slot from "./Models/Slot";

function App() {
	const [player1, setPlayer1] = useState<Player>(new Player("Player 1", "Not Host", 9932, "Inactive"))
	const [player2, setPlayer2] = useState<Player>(new Player("Player 2", "Not Host", 9711, "Inactive"))
	const [gameMode, setGameMode] = useState<string>("PvAI");
	const [gameDifficulty, setGameDifficulty] = useState<string>("Easy");
	const [roomNo, setRoomNo] = useState<string>("");
	const [isHost, setIsHost] = useState<boolean>(false);
	const [isJoined, setIsJoined] = useState<boolean>(false);
	const [gameBegan, setGameBegan] = useState<boolean>(false);
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [playerJoined, setPlayerJoined] = useState<boolean>(false);
	const [gameBoard, setGameBoard] = useState<Slot[]>([
		new Slot(),
		new Slot(),
		new Slot(),
		new Slot(),
		new Slot(),
		new Slot(),
		new Slot(),
		new Slot(),
		new Slot(),
	]);
	const [currentPlayer, setCurrentPlayer] = useState<string>("player_1");
	
	return (
		<GameContext.Provider
			value={{
				player1,
				setPlayer1,
				player2,
				setPlayer2,
				gameMode,
				setGameMode,
				gameDifficulty,
				setGameDifficulty,
				roomNo,
				setRoomNo,
				isHost,
				setIsHost,
				isJoined,
				setIsJoined,
				gameBegan,
				setGameBegan,
				modalOpen,
				setModalOpen,
				playerJoined,
				setPlayerJoined,
				gameBoard,
				setGameBoard,
				currentPlayer,
				setCurrentPlayer,
			}}
		>
			<div>
				<Navbar/>
				<Home/>
			</div>
		</GameContext.Provider>
	);
}

export default App;
