import React, {useContext, useEffect, useState} from "react";
import Slot from "../../../Models/Slot";
import Player from "../../../Models/Player";
import {Modal, Tooltip} from "@mui/material";
import {VscDebugRestart} from "react-icons/vsc";
import {CiPlay1} from "react-icons/ci";
import Game from "../../../Models/Game";
import {GameContext} from "../../../Context/GameContext";

interface Props {
	gameBoard: Slot[];
	currentPlayer: string;
	winningCombination: number[] | null;
	isDraw: boolean;
	gameClicked: (index: number) => void;
	gameFinished: boolean;
	setGameFinished: React.Dispatch<React.SetStateAction<boolean>>;
	setRestartClicked: React.Dispatch<React.SetStateAction<boolean>>;
	restartGame: () => void;
	setPreviewVisible: React.Dispatch<React.SetStateAction<boolean>>;
	setSelectedGame: React.Dispatch<React.SetStateAction<Game | null>>;
	allGames: Game[];
}

function GameBoard({gameBoard, currentPlayer, winningCombination, isDraw, gameClicked, gameFinished, setGameFinished, setRestartClicked, restartGame, setPreviewVisible, setSelectedGame, allGames }: Props) {
	const buttonStyle: string = 'font-bold text-black text-7xl rounded-md w-24 h-24 transition duration-100 ease-in-out border-2 border-black hover:border-yellow-900 hover:bg-amber-300 hover:shadow-3xl';
	const {player1, player2} = useContext(GameContext);
	
	return (
		<div>
			<div>
				<Modal
					open={gameFinished}
					onClose={() => {
						setGameFinished(false);
					}}
					className="flex justify-center items-center"
				>
					<div
						className="bg-gradient-to-tr from-green-300 to-purple-600 min-w-72 rounded-lg p-4 min-w-72"
					>
						{winningCombination && (
							<div className="text-3xl mb-4 font-bold justify-center text-center">
								<div>
									<div>
										Winner!!
									</div>
								</div>
								<div className="flex justify-center items-center">
									<div className="mt-2 w-28 h-28 border-2 border-yellow-500 text-yellow-500 rounded-lg font-bold text-8xl">
										{currentPlayer === 'player_1' ? String.fromCodePoint(player1.sign) : String.fromCodePoint(player2.sign)}
									</div>
								</div>
								<div className="text-5xl mt-2">
									<div>
										{currentPlayer === 'player_1' ? player1.name : player2.name}
									</div>
								</div>
							</div>
						)}
						{isDraw && (
							<div className="text-4xl text-center mb-4 font-bold">
								<span className=" text-black">It's a draw!</span>
							</div>
						)}
						<div className="flex justify-between">
							<div
								className=" mt-4 flex-grow rounded-lg hover:cursor-pointer flex justify-center border-2 border-black p-1 font-bold hover:bg-yellow-50 hover:border-orange-500 "
								onClick={() => {
									restartGame();
									setRestartClicked(false);
									setGameFinished(false);
								}}
							>
								<VscDebugRestart size={30}/>
								<span className="text-lg ms-2">
								New Game
							</span>
							</div>
							<Tooltip title="Replay" placement="top">
								<div className="mt-4 cursor-pointer ms-2 px-1 justify-center items-center border-2 border-black rounded-lg hover:bg-amber-50">
									<CiPlay1
										onClick={() => {
											setPreviewVisible(true);
											setSelectedGame(allGames[allGames.length - 1]);
										}}
										size={38}
										className="hover:text-fuchsia-900 hover:text-xl hover:scale-105"
									/>
								</div>
							</Tooltip>
						</div>
					</div>
				</Modal>
			</div>
			<div className="flex justify-between dark:text-white gap-1 mt-10">
				<div className={`flex border-2 ${currentPlayer === 'player_1' ? " bg-yellow-100 border-purple-500 text-fuchsia-700 dark:text-fuchsia-700" : "border-black dark:border-white"} p-1 rounded-lg justify-center items-center`}>
					<div className={`text-2xl font-bold`}>
						{String.fromCodePoint(player1.sign)}
					</div>
					{currentPlayer === 'player_1' && (
						<div className="text-3xl ms-1 font-bold">
							{player1.name}
						</div>
					)}
				</div>
				<div className={`flex border-2 ${currentPlayer === 'player_2' ? "bg-yellow-100 border-purple-500 text-fuchsia-700 dark:text-fuchsia-700" : "border-black dark:border-white"} p-1 rounded-lg justify-center items-center`}>
					<div className={`text-2xl font-bold`}>
						{String.fromCodePoint(player2.sign)}
					</div>
					{currentPlayer === 'player_2' && (
						<div className="text-3xl ms-1 font-bold">
							{player2.name}
						</div>
					)}
				</div>
			</div>
			<div className="flex flex-grow justify-center items-center min-w-80">
				<div className={` justify-center items-center mt-4`}>
					<div
						className={`grid grid-cols-3 gap-2 rounded-lg p-4 bg-gradient-to-tr from-blue-400 via-violet-400 to-fuchsia-500`}>
						{gameBoard.map((cell, index) => (
							<button
								key={index}
								onClick={() => gameClicked(index)}
								className={`${buttonStyle} ${(gameBoard[index].played || winningCombination) && 'pointer-events-none'} ${
									winningCombination && winningCombination.includes(index) ? 'bg-amber-100 border-orange-500' : ''
								} ${isDraw && "bg-orange-400"}`}
								disabled={gameBoard[index].played || winningCombination !== null || isDraw}
							>
								{gameBoard[index].played ? (gameBoard[index].player === player1 ? String.fromCodePoint(player1.sign) : String.fromCodePoint(player2.sign)) : ''}
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default GameBoard;
