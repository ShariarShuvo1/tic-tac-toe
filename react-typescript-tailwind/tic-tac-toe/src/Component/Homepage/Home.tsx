import React, {useContext, useState} from "react";
import Slot from "../../Models/Slot";
import Game from "../../Models/Game";
import HistoryPage from "./HistoryPage/HistoryPage";
import GameBoard from "./GameBoard/GameBoard";
import {Modal} from "@mui/material";
import Replay from "./Replay/Replay";
import {GameContext} from "../../Context/GameContext";
import Player from "../../Models/Player";
import {VscDebugRestart} from "react-icons/vsc";

function Home() {
	const [gameBoard, setGameBoard] = useState<Slot[]>([
		new Slot(), new Slot(), new Slot(),
		new Slot(), new Slot(), new Slot(),
		new Slot(), new Slot(), new Slot(),
	]);
	
	const {player1, player2, gameMode} = useContext(GameContext);
	
	const [currentPlayer, setCurrentPlayer] = useState('player_1');
	const [winningCombination, setWinningCombination] = useState<number[] | null>(null);
	const [isDraw, setIsDraw] = useState<boolean>(false);
	const [gameBegan, setGameBegan] = useState<boolean>(false);
	const [allGames, setAllGames] = useState<Game[]>([]);
	const [previewVisible, setPreviewVisible] = useState<boolean>(false);
	const [selectedGame, setSelectedGame] = useState<Game | null>(null);
	const [restartClicked, setRestartClicked] = useState<boolean>(false);
	const [gameFinished, setGameFinished] = useState<boolean>(false);
	
	function playerToggle() {
		setCurrentPlayer((prevPlayer) => (prevPlayer === 'player_1' ? 'player_2' : 'player_1'));
	}
	
	function saveCurrentGame(verdict: string, winner?: Player) {
		let tempGameBoard: Slot[] = [...gameBoard];
		let tempGame: Game = new Game(player1, player2, tempGameBoard, new Date(), gameMode, verdict, winner && winner);
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
				saveCurrentGame("Win", currentPlayer === 'player_1' ? player1 : player2);
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
			tempGameBoard[position].player = currentPlayer === 'player_1' ? player1 : player2;
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
			new Slot(), new Slot(), new Slot(),
			new Slot(), new Slot(), new Slot(),
			new Slot(), new Slot(), new Slot(),
		]);
		setCurrentPlayer('player_1');
		setWinningCombination(null);
		setIsDraw(false);
		setGameBegan(false);
	}
	
	return (
		<div className=" bg-cyan-50 dark:bg-gray-900">
			<div>
				<Modal
					open={restartClicked}
					onClose={() => setRestartClicked(false)}
					className="flex justify-center items-center"
				>
					
					<div className="bg-gradient-to-tr from-fuchsia-300 to-rose-200 max-w-72 rounded-lg p-4">
						<div className="text-3xl mb-4 font-bold">
							Restart Game
						</div>
						<div>
							Are you sure you want to restart the game? Your current game will be lost.
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
				{selectedGame &&
                    <Modal
                        open={previewVisible}
                        onClose={disablePreviewVisible}
                    >
                        <Replay game={selectedGame} disablePreview={disablePreviewVisible}/>
                    </Modal>
				}
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
							if(gameBegan && !winningCombination && !isDraw) {
								setRestartClicked(true);
							}
							else {
								restartGame();
								setRestartClicked(false);
							}
						}}
					>
						<VscDebugRestart size={40}/>
						<span className="text-3xl ms-2">
							Restart
						</span>
					</div>
				</div>
				<HistoryPage allGames={allGames} setAllGames={setAllGames} setPreviewVisible={setPreviewVisible}
				             setSelectedGame={setSelectedGame}/>
			</div>
		</div>
	);
}

export default Home;
