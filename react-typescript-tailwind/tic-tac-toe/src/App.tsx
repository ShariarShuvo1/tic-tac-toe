import React, {useState} from 'react';
import './App.css';
import Homepage from "./Component/Homepage/Homepage"
import Navbar from "./Component/Navbar/Navbar";
import Player from "./Models/Player";
import {GameContext} from "./Context/GameContext";
import Home from "./Component/Homepage/Home";

function App() {
	const [player1, setPlayer1] = useState<Player>(new Player("Player 1", "", 9932, "Active"))
	const [player2, setPlayer2] = useState<Player>(new Player("Player 2", "", 9711, "Active"))
	const [gameMode, setGameMode] = useState<string>("PvAI");
	const [gameDifficulty, setGameDifficulty] = useState<string>("Easy");
	const [roomNo, setRoomNo] = useState<string>("");
	
	
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
				setRoomNo
			}}
		>
			<div>
				<Navbar/>
				{/*<Homepage/>*/}
				<Home/>
			</div>
		</GameContext.Provider>
	);
}

export default App;
