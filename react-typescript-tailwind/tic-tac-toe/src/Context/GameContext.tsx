import { createContext } from "react";
import Player from "../Models/Player";

export const GameContext = createContext({
	player1: new Player("Player 1", "Not Host", 9932, "Inactive"),
	setPlayer1: (value: Player) => {},
	player2: new Player("Player 2", "Not Host", 9711, "Inactive"),
	setPlayer2: (value: Player) => {},
	gameMode: "PvAI",
	setGameMode: (value: string) => {},
	gameDifficulty: "Easy",
	setGameDifficulty: (value: string) => {},
	roomNo: "",
	setRoomNo: (value: string) => {},
	isHost: false,
	setIsHost: (value: boolean) => {},
	isJoined: false,
	setIsJoined: (value: boolean) => {},
	gameBegan: false,
	setGameBegan: (value: boolean) => {},
	modalOpen: false,
	setModalOpen: (value: boolean) => {},
});