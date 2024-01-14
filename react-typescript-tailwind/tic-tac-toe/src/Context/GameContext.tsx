import { createContext } from "react";
import Player from "../Models/Player";

export const GameContext = createContext({
	player1: new Player("Player 1", "", 9932, "Active"),
	setPlayer1: (value: Player) => {},
	player2: new Player("Player 2", "", 9711, "Active"),
	setPlayer2: (value: Player) => {},
	gameMode: "PvAI",
	setGameMode: (value: string) => {},
	gameDifficulty: "Easy",
	setGameDifficulty: (value: string) => {},
	roomNo: "",
	setRoomNo: (value: string) => {}
});