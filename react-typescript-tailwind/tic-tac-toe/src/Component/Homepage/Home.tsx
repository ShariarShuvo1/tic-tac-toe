import React, { useContext, useEffect, useState } from "react";
import Slot from "../../Models/Slot";
import Game from "../../Models/Game";
import HistoryPage from "./HistoryPage/HistoryPage";
import GameBoard from "./GameBoard/GameBoard";
import { Modal } from "@mui/material";
import Replay from "./Replay/Replay";
import { GameContext } from "../../Context/GameContext";
import Player from "../../Models/Player";
import { VscDebugRestart } from "react-icons/vsc";
import {collection, onSnapshot} from "firebase/firestore";
import {db} from "../../firebase";

function Home() {
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
	
	const { player1, setPlayer1, player2, setPlayer2, gameMode, gameDifficulty, roomNo, isHost } =
		useContext(GameContext);
	
	const [currentPlayer, setCurrentPlayer] = useState("player_1");
	const [winningCombination, setWinningCombination] = useState<number[] | null>(
		null
	);
	const [isDraw, setIsDraw] = useState<boolean>(false);
	const [gameBegan, setGameBegan] = useState<boolean>(false);
	const [allGames, setAllGames] = useState<Game[]>([]);
	const [previewVisible, setPreviewVisible] = useState<boolean>(false);
	const [selectedGame, setSelectedGame] = useState<Game | null>(null);
	const [restartClicked, setRestartClicked] = useState<boolean>(false);
	const [gameFinished, setGameFinished] = useState<boolean>(false);
	
	function easyAI() {
		let tempGameBoard: Slot[] = [...gameBoard];
		let emptySlots: Slot[] = tempGameBoard.filter((slot) => !slot.played);
		let randomSlot: Slot =
			emptySlots[Math.floor(Math.random() * emptySlots.length)];
		let randomSlotIndex: number = tempGameBoard.indexOf(randomSlot);
		tempGameBoard[randomSlotIndex].player = player2;
		tempGameBoard[randomSlotIndex].played = true;
		tempGameBoard[randomSlotIndex].time = new Date();
		setGameBoard(tempGameBoard);
		if(!winCheck()){
			playerToggle();
		}
	}
	
	function checkForWin(board: Slot[], player: Player | null): boolean {
		const winningCombinations = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		
		for (const combination of winningCombinations) {
			const [a, b, c] = combination;
			if (
				board[a].played &&
				board[a].player === player &&
				board[b].played &&
				board[b].player === player &&
				board[c].played &&
				board[c].player === player
			) {
				return true;
			}
		}
		
		return false;
	}
	
	useEffect(() => {
		if(gameMode === "PvAI" && gameDifficulty === "Normal" && currentPlayer === "player_2"){
            winCheck();
		}
	}, [gameBoard]);
	
	function normalAI() {
		let tempGameBoard = [...gameBoard];
		
		for (let i = 0; i < tempGameBoard.length; i++) {
			if (!tempGameBoard[i].played) {
				tempGameBoard[i].player = player2;
				tempGameBoard[i].played = true;
				tempGameBoard[i].time = new Date();
				if (checkForWin(tempGameBoard, player2)) {
					setGameBoard(tempGameBoard);
					return;
				}
				tempGameBoard[i] = new Slot();
			}
		}
		
		for (let i = 0; i < tempGameBoard.length; i++) {
			if (!tempGameBoard[i].played) {
				tempGameBoard[i].player = player1;
				tempGameBoard[i].played = true;
				tempGameBoard[i].time = new Date();
				if (checkForWin(tempGameBoard, player1)) {
					tempGameBoard[i].player = player2;
					setGameBoard(tempGameBoard);
					playerToggle();
					return;
				}
				tempGameBoard[i] = new Slot();
			}
		}
		
		const emptySlots = tempGameBoard.filter((slot) => !slot.played);
		const randomSlot =
			emptySlots[Math.floor(Math.random() * emptySlots.length)];
		
		if (randomSlot) {
			randomSlot.player = player2;
			randomSlot.played = true;
			randomSlot.time = new Date();
		}
		
		setGameBoard(tempGameBoard);
		playerToggle();
	}
	
	useEffect(() => {
		if(gameMode === "PvAI" && gameDifficulty === "Impossible" && currentPlayer === "player_2"){
			winCheck();
		}
	}, [gameBoard]);
	
	function miniMax(board: Slot[], depth: number, isMaximizing: boolean): number {
		let winner = null;
		if (checkForWin(board, player1)) {
			winner = player1;
		} else if (checkForWin(board, player2)) {
			winner = player2;
		}
		
		if (winner === player2) {
			return 1;
		} else if (winner === player1) {
			return -1;
		} else if (board.every((slot) => slot.played)) {
			return 0;
		}
		
		if (isMaximizing) {
			let bestScore = -Infinity;
			for (let i = 0; i < board.length; i++) {
				if (!board[i].played) {
					board[i].player = player2;
					board[i].played = true;
					let score = miniMax(board, depth + 1, false);
					board[i] = new Slot();
					bestScore = Math.max(score, bestScore);
				}
			}
			return bestScore;
		} else {
			let bestScore = Infinity;
			for (let i = 0; i < board.length; i++) {
				if (!board[i].played) {
					board[i].player = player1;
					board[i].played = true;
					let score = miniMax(board, depth + 1, true);
					board[i] = new Slot();
					bestScore = Math.min(score, bestScore);
				}
			}
			return bestScore;
		}
	}
	
	function PlayImpossible(){
		let tempGameBoard = [...gameBoard];
		let bestScore = -Infinity;
		let move;
		
		for (let i = 0; i < tempGameBoard.length; i++) {
			if (!tempGameBoard[i].played) {
				tempGameBoard[i].player = player2;
				tempGameBoard[i].played = true;
				let score = miniMax(tempGameBoard, 0, false);
				tempGameBoard[i] = new Slot();
				
				if (score > bestScore) {
					bestScore = score;
					move = i;
				}
			}
		}
		if (move !== undefined) {
			tempGameBoard[move].player = player2;
			tempGameBoard[move].played = true;
			tempGameBoard[move].time = new Date();
			setGameBoard(tempGameBoard);
			if(!checkForWin(tempGameBoard, player2)){
				playerToggle();
			}
		}
	}
	
	useEffect(() => {
		if (gameMode === "PvAI") {
			if (currentPlayer === "player_2") {
				if (gameDifficulty === "Easy") {
					setTimeout(easyAI, 300);
				} else if (gameDifficulty === "Normal") {
					setTimeout(normalAI, 300);
				} else if (gameDifficulty === "Impossible") {
					setTimeout(PlayImpossible, 300);
				}
			}
		}
	}, [currentPlayer]);
	
	function playerToggle() {
		setCurrentPlayer((prevPlayer) =>
			prevPlayer === "player_1" ? "player_2" : "player_1"
		);
	}
	
	function saveCurrentGame(verdict: string, winner?: Player) {
		let tempGameBoard: Slot[] = [...gameBoard];
		let tempGame: Game = new Game(
			player1,
			player2,
			tempGameBoard,
			new Date(),
			gameMode,
			verdict,
			winner && winner
		);
		let tempAllGames: Game[] = [...allGames];
		tempAllGames.push(tempGame);
		setAllGames(tempAllGames);
	}
	
	function winCheck(): boolean {
		const winningCombinations = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		
		for (const combination of winningCombinations) {
			const [a, b, c] = combination;
			if (
				gameBoard[a].played &&
				gameBoard[a].player === gameBoard[b].player &&
				gameBoard[a].player === gameBoard[c].player
			) {
				setWinningCombination(combination);
				saveCurrentGame(
					"Win",
					currentPlayer === "player_1" ? player1 : player2
				);
				setGameFinished(true);
				return true;
			}
		}
		
		if (gameBoard.every((cell) => cell.played)) {
			setIsDraw(true);
			saveCurrentGame("Draw");
			setGameFinished(true);
			return true;
		}
		return false;
	}
	
	function gameClicked(position: number) {
		if (!gameBegan) {
			setGameBegan(true);
		}
		if (!gameBoard[position].played && !winningCombination) {
			let tempGameBoard: Slot[] = [...gameBoard];
			tempGameBoard[position].player =
				currentPlayer === "player_1" ? player1 : player2;
			tempGameBoard[position].played = true;
			tempGameBoard[position].time = new Date();
			setGameBoard(tempGameBoard);
			let gameEnd: boolean = winCheck();
			if (!gameEnd) {
				playerToggle();
			}
		}
	}
	
	function disablePreviewVisible() {
		setPreviewVisible(false);
		setSelectedGame(null);
	}
	
	function restartGame() {
		setGameBoard([
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
		setCurrentPlayer("player_1");
		setWinningCombination(null);
		setIsDraw(false);
		setGameBegan(false);
	}
	
	useEffect(() => {
		if (gameMode==="PvO" && roomNo) {
			const roomRef = collection(db, 'rooms', roomNo, 'Player');
			
			const unsubscribe = onSnapshot(roomRef, (querySnapshot) => {
				
				if(isHost){
					let tempPlayer2: Player = player2;
					tempPlayer2.name = querySnapshot.docs[1].data().name;
					tempPlayer2.status = querySnapshot.docs[1].data().status;
					tempPlayer2.sign = querySnapshot.docs[1].data().sign;
					tempPlayer2.type = querySnapshot.docs[1].data().type;
					setPlayer2(tempPlayer2);
				}
				else {
					let tempPlayer1: Player = player1;
					tempPlayer1.name = querySnapshot.docs[0].data().name;
					tempPlayer1.status = querySnapshot.docs[0].data().status;
					tempPlayer1.sign = querySnapshot.docs[0].data().sign;
					tempPlayer1.type = querySnapshot.docs[0].data().type;
					setPlayer1(tempPlayer1);
				}
				
			});
			
			return () => unsubscribe();
		}
	}, [gameMode, roomNo]);
	
	return (
		<div className=" bg-cyan-50 dark:bg-gray-900">
			<div>
				<Modal
					open={restartClicked}
					onClose={() => setRestartClicked(false)}
					className="flex justify-center items-center"
				>
					<div className="bg-gradient-to-tr from-fuchsia-300 to-rose-200 max-w-72 rounded-lg p-4">
						<div className="text-3xl mb-4 font-bold">Restart Game</div>
						<div>
							Are you sure you want to restart the game? Your current game will
							be lost.
						</div>
						<div className="flex justify-center items-center gap-10 mt-4">
							<button
								className="rounded-lg font-bold px-8 py-1 border-2 border-black hover:bg-red-500 hover:shadow-lg"
								onClick={() => {
									restartGame();
									setRestartClicked(false);
								}}
							>
								Yes
							</button>
							<button
								className="rounded-lg font-bold px-8 py-1 border-2 border-black hover:bg-green-500 hover:shadow-lg"
								onClick={() => setRestartClicked(false)}
							>
								No
							</button>
						</div>
					</div>
				</Modal>
			</div>
			<div>
				{selectedGame && (
					<Modal open={previewVisible} onClose={disablePreviewVisible}>
						<Replay
							game={selectedGame}
							disablePreview={disablePreviewVisible}
						/>
					</Modal>
				)}
			</div>
			<div className="min-h-[calc(100vh-66px)] flex flex-wrap justify-center items-center gap-10">
				<div>
					<GameBoard
						gameBoard={gameBoard}
						currentPlayer={currentPlayer}
						winningCombination={winningCombination}
						isDraw={isDraw}
						gameClicked={gameClicked}
						gameFinished={gameFinished}
						setGameFinished={setGameFinished}
						setRestartClicked={setRestartClicked}
						restartGame={restartGame}
						setPreviewVisible={setPreviewVisible}
						setSelectedGame={setSelectedGame}
						allGames={allGames}
					/>
					<div
						className=" mt-10 rounded-lg hover:cursor-pointer flex justify-center border-2 border-black dark:border-white p-2 font-bold dark:text-white hover:bg-yellow-50 dark:hover:text-black hover:border-orange-500 dark:hover:border-orange-500"
						onClick={() => {
							if (gameBegan && !winningCombination && !isDraw) {
								setRestartClicked(true);
							} else {
								restartGame();
								setRestartClicked(false);
							}
						}}
					>
						<VscDebugRestart size={40} />
						<span className="text-3xl ms-2">Restart</span>
					</div>
				</div>
				<HistoryPage
					allGames={allGames}
					setAllGames={setAllGames}
					setPreviewVisible={setPreviewVisible}
					setSelectedGame={setSelectedGame}
				/>
			</div>
		</div>
	);
}

export default Home;