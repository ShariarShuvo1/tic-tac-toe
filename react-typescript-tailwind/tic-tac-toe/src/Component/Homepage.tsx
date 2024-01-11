import React, { useState } from 'react';
import "./Homepage.css"
import { CiPlay1 } from "react-icons/ci";
import Slot from "./Slot";
import Game from "./Game";
import Preview from "./Preview";
import {Modal, TextField} from "@mui/material";

function Homepage() {
    const buttonStyle: string = 'font-bold text-black text-8xl rounded-md w-24 h-24 transition duration-100 ease-in-out bg-gradient-to-br from-fuchsia-300 via-blue-200 to-sky-300 hover:bg-gradient-to-br hover:from-fuchsia-500 hover:via-blue-400 hover:to-sky-500';
    const [gameBoard, setGameBoard] = useState<Slot[]>([
        new Slot(), new Slot(), new Slot(),
        new Slot(), new Slot(), new Slot(),
        new Slot(), new Slot(), new Slot(),
    ]);
    const [currentPlayer, setCurrentPlayer] = useState('player_1');
    const [winningCombination, setWinningCombination] = useState<number[] | null>(null);
    const [isDraw, setIsDraw] = useState<boolean>(false);
    const [player1, setPlayer1] = useState<string>("");
    const [player2, setPlayer2] = useState<string>("");
    const [gameBegan, setGameBegan] = useState<boolean>(false);
    const [allGames, setAllGames] = useState<Game[]>([]);
    const [previewVisible, setPreviewVisible] = useState<boolean>(false);
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    
    function playerToggle() {
        setCurrentPlayer((prevPlayer) => (prevPlayer === 'player_1' ? 'player_2' : 'player_1'));
    }
    
    function saveCurrentGame(verdict: string, winner?:string){
        let tempGameBoard = [...gameBoard];
        let tempGame: Game = new Game(
            player1 ? player1 : "Player 1",
            player2 ? player2 : "Player 2",
            tempGameBoard,
            new Date(),
            verdict,
            winner && winner
        )
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
                saveCurrentGame("Win", currentPlayer === 'player_1' ? `${player1? player1: "Player 1"}` : `${player2? player2 : "Player 2"}`);
                return true;
            }
        }
        
        if (gameBoard.every((cell) => cell.played)) {
            setIsDraw(true);
            saveCurrentGame("Draw");
            return true;
        }
        return false;
    }
    
    function gameClicked(position: number) {
        if(!gameBegan){
            if(player1===player2){
                setPlayer2("");
            }
            setGameBegan(true);
        }
        if (!gameBoard[position].played && !winningCombination) {
            let tempGameBoard: Slot[] = [...gameBoard];
            tempGameBoard[position].player = currentPlayer === 'player_1' ? `${player1? player1: "Player 1"}` : `${player2? player2 : "Player 2"}`;
            tempGameBoard[position].played = true;
            tempGameBoard[position].time = new Date();
            setGameBoard(tempGameBoard);
            let gameEnd:boolean = winCheck();
            if(!gameEnd){
                playerToggle();
            }
        }
    }
    
    function disablePreviewVisible(){
        setPreviewVisible(false);
        setSelectedGame(null);
    }
    
    return (
        <div>
            <div>
                {selectedGame &&
                    <Modal open={previewVisible}>
                        <Preview game={selectedGame} disablePreview={disablePreviewVisible}/>
                    </Modal>
                }
            </div>
            <div className=" bg-gradient-to-br from-amber-50 via-emerald-100 to-lime-100 dark:bg-gradient-to-br dark:from-gray-800 dark:via-slate-900 dark:to-gray-950">
                <div className={`min-h-[calc(100vh-66px)] flex flex-wrap justify-between items-center `}>
                    <div className={` flex flex-grow justify-center items-center mt-10`}>
                        <div className="rounded-lg border-2 border-black">
                            <div className="mb-1 bg-gradient-to-r from-fuchsia-300 to-cyan-400 w-80 p-4 text-center rounded-t-lg text-3xl font-bold">
                                History
                            </div>
                            <div className="bg-gradient-to-tr from-blue-300 via-fuchsia-300 to-cyan-400 max-h-96 min-h-6 w-80 rounded-b-lg overflow-y-scroll scrollbar-css">
                                {allGames.map((game, index) => (
                                    <div key={index} className="flex justify-between m-2 border-2 border-teal-200 p-1 rounded-lg text-lg font-bold items-center">
                                        <div>
                                            <div>
                                                {game.player1} {game.verdict === "Win" && game.player1 === game.winner &&
                                                (<span className=" font-normal ps-1 pe-1 bg-gradient-to-tr from-lime-100 to-sky-300 rounded-lg">
                                            Winner
                                        </span>)}
                                            </div>
                                            <div>
                                                vs
                                            </div>
                                            <div>
                                                {game.player2} {game.verdict === "Win" && game.player2 === game.winner &&
                                                (<span className=" font-normal ps-1 pe-1 bg-gradient-to-tr from-lime-100 to-sky-300 rounded-lg">
                                            Winner
                                        </span>)}
                                            </div>
                                        </div>
                                        <div className="justify-center items-center">
                                            <CiPlay1 onClick={() => {
                                                setPreviewVisible(true);
                                                setSelectedGame(game);
                                            }} size={50} className="hover:text-fuchsia-600 hover:text-xl hover:scale-105"/>
                                        </div>
                                    </div>
                                ))}
                            
                            </div>
                        </div>
                    </div>
	                <div className="flex flex-grow justify-center items-center">
	                    <div className={` justify-center items-center mt-10`}>
	                        <div className="flex justify-evenly mt-2 font-bold text-black">
	                            <div className="justify-center">
	                                <div className={`text-2xl bg-gradient-to-tr from-violet-400 to-fuchsia-500 ${currentPlayer === 'player_1' ? 'rounded-t-lg' : 'rounded-2xl mt-1'} p-2 `}>
	                                    {currentPlayer === 'player_1' ? `${player1? player1: "Player 1"} (\u2717)` : '\u2717'}
	                                </div>
	                                <div className={`${currentPlayer === 'player_1' ? 'bg-gradient-to-tr from-violet-400 to-fuchsia-500 min-h-2 ' : ''}`}></div>
	                            </div>
	                            <div className="justify-center">
	                                <div className={` text-2xl bg-gradient-to-tr from-violet-400 to-fuchsia-500 ${currentPlayer === 'player_2' ? 'rounded-t-lg' : 'rounded-2xl mt-1'} p-2 `}>
	                                    {currentPlayer === 'player_2' ? `${player2? player2 : "Player 2"} (\u25CB)` : '\u25CB'}
	                                </div>
	                                <div className={`${currentPlayer === 'player_2' ? 'bg-gradient-to-tr from-violet-400 to-fuchsia-500 min-h-2 ' : ''}`}></div>
	                            </div>
	                        </div>
	                        
	                        <div className={`grid grid-cols-3 gap-2 rounded-lg p-2 bg-gradient-to-tr from-blue-400 via-violet-400 to-fuchsia-500`}>
	                            {gameBoard.map((cell, index) => (
	                                <button
	                                    key={index}
	                                    onClick={() => gameClicked(index)}
	                                    className={`${buttonStyle} ${(gameBoard[index].played || winningCombination) && 'pointer-events-none'} ${
	                                        winningCombination && winningCombination.includes(index) ? 'bg-gradient-to-tr from-amber-200 via-lime-300 to-green-400' : ''
	                                    } text-center ${isDraw && "bg-gradient-to-tr from-amber-300 via-lime-400 to-green-500"}`}
	                                >
	                                    {gameBoard[index].played ? (gameBoard[index].player === `${player1? player1: "Player 1"}` ? '\u2717' : '\u25CB') : ''}
	                                </button>
	                            ))}
	                        </div>
	                        <div className={` flex flex-grow justify-center items-center mt-10`}>
	                            {winningCombination && (
	                                <div className="bg-gradient-to-tr from-blue-200 via-violet-300 to-fuchsia-400 rounded-lg p-4 font-bold text-2xl">
	                                    Winner: <span className=" text-black">{currentPlayer === 'player_1' ? `${player1? player1: "Player 1"}` : `${player2? player2 : "Player 2"}`}</span>
	                                </div>
	                            )}
	                            {isDraw && (
	                                <div className="bg-gradient-to-tr from-blue-200 via-violet-300 to-fuchsia-400 rounded-lg p-4 font-bold text-2xl">
	                                    <span className=" text-black">It's a draw!</span>
	                                </div>
	                            )}
	                        </div>
	                    </div>
	                </div>
                    <div className={` flex flex-grow justify-center items-center mt-10`}>
                        <div>
	                        <button
		                        onClick={() => {
			                        setCurrentPlayer('player_1');
			                        setWinningCombination(null);
			                        setIsDraw(false);
			                        setGameBegan(false);
			                        let tempGameBoard: Slot[] = [
				                        new Slot(), new Slot(), new Slot(),
				                        new Slot(), new Slot(), new Slot(),
				                        new Slot(), new Slot(), new Slot(),
			                        ]
			                        setGameBoard(tempGameBoard);
		                        }}
		                        className="p-4 mb-4 bg-gradient-to-tr from-blue-200 via-violet-300 to-fuchsia-400 rounded-lg text-2xl font-bold hover:bg-gradient-to-tr hover:from-blue-400 hover:via-violet-400 hover:to-fuchsia-500">
		                        Play a New Game
	                        </button>
                            <div className="mb-4">
                                <label htmlFor="player_1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Player 1</label>
                                <input
                                    value={player1}
                                    disabled={gameBegan}
                                    onChange={(event) => {setPlayer1(event.target.value)}}
                                    type="text"
                                    id="player_1"
                                    className="font-bold bg-gradient-to-tr from-sky-300 to-fuchsia-400 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-500 "
                                    placeholder="Insert name for Player 1"
                                    maxLength={8}
                                />
                            </div>
                            <div className="mb-20">
                                <label htmlFor="player_2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Player 2</label>
                                <input
                                    value={player2}
                                    disabled={gameBegan}
                                    onChange={(event) => {setPlayer2(event.target.value)}}
                                    type="text"
                                    id="player_2"
                                    className="font-bold bg-gradient-to-tr from-sky-300 to-fuchsia-400 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-500 "
                                    placeholder="Insert name for Player 2"
                                    maxLength={8}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Homepage;
