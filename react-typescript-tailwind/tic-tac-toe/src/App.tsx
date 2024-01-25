import React, {useState} from 'react';
import './App.css';
import {RouterProvider} from "react-router";
import Player from "./Models/Player";
import {GameContext} from "./Context/GameContext";
import Slot from "./Models/Slot";
import {createBrowserRouter} from "react-router-dom";
import RoutingPage from "./Component/RoutingPage";
import Homepage from "./Component/Homepage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RoutingPage />,
		children: [
			{ path: "/", element: <Homepage /> },
			{ path: "/:roomId", element: <Homepage />},
			{ path: "*", element: <Homepage />},
		],
	},
]);

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
			{/*<div>*/}
			{/*	<Navbar/>*/}
			{/*	<Home/>*/}
			{/*</div>*/}
			<RouterProvider router={router}></RouterProvider>
		</GameContext.Provider>
	);
}

export default App;
