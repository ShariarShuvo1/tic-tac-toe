import React, {useContext, useEffect, useState} from "react";
import {Tooltip} from "@mui/material";
import {BsPerson, BsPersonFill} from "react-icons/bs";
import {RiComputerLine} from "react-icons/ri";
import {HiGlobeAsiaAustralia} from "react-icons/hi2";
import PlayerInfo from "../PlayerInfo/PlayerInfo";
import {GameContext} from "../../../../Context/GameContext";
import Player from "../../../../Models/Player";

function GameMode() {
	const [isJoined, setIsJoined] = useState(false);
	const [isHost, setIsHost] = useState(false);
	
	const {
		gameMode,
		setGameMode,
		roomNo,
		setRoomNo,
		gameDifficulty,
		setGameDifficulty,
		player1,
		setPlayer1,
		player2,
		setPlayer2
	} = useContext(GameContext);
	
	useEffect(() => {
		if(isHost){
			let tempPlayer1: Player = player1;
			tempPlayer1.type = "Host";
			setPlayer1(tempPlayer1);
			let tempPlayer2: Player = player2;
			tempPlayer2.type = "Not Host";
			setPlayer2(tempPlayer2);
		}
		else{
			let tempPlayer1: Player = player1;
			tempPlayer1.type = "Not Host";
			setPlayer1(tempPlayer1);
			let tempPlayer2: Player = player2;
			tempPlayer2.type = "Host";
			setPlayer2(tempPlayer2);
		}
	}, [isHost]);
	
	function generateroomNo() {
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		for (let i = 0; i < 6; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		setRoomNo(result);
		setIsHost(true);
		setIsJoined(true);
	}
	
	function joinRoom() {
		setIsJoined(true);
	}
	
	function leaveRoom() {
		setIsJoined(false);
		setRoomNo('');
		setIsHost(false);
	}
	
	return (
		<div className="mt-4">
			<div className="font-bold text-sm">
				Select a Game Mode:
			</div>
			<div className="justify-evenly flex gap-2 mt-2">
				<Tooltip title="Human Vs Computer">
					<button
						className={`flex rounded-lg px-2 py-1 font-bold border-2 border-black hover:bg-gradient-to-tr hover:from-orange-50 hover:to-red-50 hover:shadow-lg transition-all duration-300 ease-in-out ${gameMode === 'PvAI' ? 'bg-gradient-to-tr from-orange-100 via-red-100 to-pink-100 border-orange-500 shadow-lg' : ''}`}
						onClick={() => setGameMode('PvAI')}
						disabled={isJoined}
					>
						<BsPerson size={32}/>
						<RiComputerLine size={32}/>
					</button>
				</Tooltip>
				<Tooltip title="Human Vs Human">
					<button
						className={`flex rounded-lg px-2 py-1 font-bold border-2 border-black hover:bg-gradient-to-tr hover:from-orange-50 hover:to-red-50 hover:shadow-lg transition-all duration-300 ease-in-out ${gameMode === 'PvP' ? 'bg-gradient-to-tr from-orange-100 via-red-100 to-pink-100 border-orange-500 shadow-lg' : ''}`}
						onClick={() => setGameMode('PvP')}
						disabled={isJoined}
					>
						<BsPerson size={32}/>
						<BsPersonFill size={32}/>
					</button>
				</Tooltip>
				<Tooltip title="Play Online Against Player">
					<button
						className={`flex rounded-lg px-2 py-1 font-bold border-2 border-black hover:bg-gradient-to-tr hover:from-orange-50 hover:to-red-50 hover:shadow-lg transition-all duration-300 ease-in-out ${gameMode === 'PvO' ? 'bg-gradient-to-tr from-orange-100 via-red-100 to-pink-100 border-orange-500 shadow-lg' : ''}`}
						onClick={() => setGameMode('PvO')}
					>
						<BsPerson size={32}/>
						<HiGlobeAsiaAustralia size={32}/>
					</button>
				</Tooltip>
			</div>
			{gameMode === 'PvAI' && (
				<div>
					<div className="mt-2 font-bold text-sm">
						Select a Difficulty:
					</div>
					<div className="justify-center flex gap-2 mt-2">
						<button
							className={`flex rounded-lg px-2 py-1 font-bold border-2 border-black hover:bg-gradient-to-tr hover:from-orange-50 hover:to-red-50 hover:shadow-lg transition-all duration-300 ease-in-out ${gameDifficulty === 'Easy' ? 'bg-gradient-to-tr from-orange-100 via-red-100 to-pink-100 border-orange-500 shadow-lg' : ''}`}
							onClick={() => setGameDifficulty('Easy')}
						>
							Easy
						</button>
						<button
							className={`flex rounded-lg px-2 py-1 font-bold border-2 border-black hover:bg-gradient-to-tr hover:from-orange-50 hover:to-red-50 hover:shadow-lg transition-all duration-300 ease-in-out ${gameDifficulty === 'Normal' ? 'bg-gradient-to-tr from-orange-100 via-red-100 to-pink-100 border-orange-500 shadow-lg' : ''}`}
							onClick={() => setGameDifficulty('Normal')}
						>
							Normal
						</button>
						<button
							className={`flex rounded-lg px-2 py-1 font-bold border-2 border-black hover:bg-gradient-to-tr hover:from-orange-50 hover:to-red-50 hover:shadow-lg transition-all duration-300 ease-in-out ${gameDifficulty === 'Impossible' ? 'bg-gradient-to-tr from-orange-100 via-red-100 to-pink-100 border-orange-500 shadow-lg' : ''}`}
							onClick={() => setGameDifficulty('Impossible')}
						>
							Impossible
						</button>
					</div>
				</div>
			)}
			{gameMode === 'PvO' && (
				<div className="justify-center mt-4">
					{(isHost || !roomNo) && (
						<div className="justify-center">
							{!isHost && (
								<div className="flex">
									<button
										className="flex-grow rounded-lg px-2 py-1 font-bold border-2 border-black hover:bg-gradient-to-tr hover:from-orange-50 hover:to-red-50 hover:shadow-lg transition-all duration-300 ease-in-out"
										onClick={generateroomNo}
									>
										Host a new game
									</button>
								</div>
							)}
							{isHost && (
								<div className="mt-2 font-bold text-orange-700">
									Share this room ID with your friend:
								</div>
							)}
							{roomNo && isHost && (
								<div className="flex gap-2">
									<input
										className=" w-48 block mt-2 rounded-lg px-2 py-1 font-bold border-2 border-black bg-gradient-to-tr from-orange-50 to-red-50 shadow-lg transition-all duration-300 ease-in-out"
										inputMode="none"
										value={roomNo}
										disabled={true}
									/>
									<button
										className={` mt-2 rounded-lg px-2 py-1 font-bold border-2 border-black hover:bg-red-700 hover:shadow-lg transition-all duration-300 ease-in-out bg-red-500 shadow-lg}`}
										onClick={leaveRoom}
									>
										{isJoined ? 'Leave' : 'Join'}
									</button>
								</div>
							)}
						</div>
					)}
					
					{!isHost && (
						<div>
							{!roomNo && (
								<div className="mt-2 font-bold">
									Or
								</div>
							)}
							
							<div className="flex gap-2">
								<input
									className={` w-48 mt-2 rounded-lg px-2 py-1 font-bold border-2 border-black bg-gradient-to-tr from-orange-50 to-red-50 shadow-lg transition-all duration-300 ease-in-out`}
									placeholder="Enter Room ID"
									disabled={isJoined}
									value={roomNo}
									onChange={(e) => setRoomNo(e.target.value)}
								/>
								<button
									className={`mt-2 rounded-lg px-2 py-1 font-bold border-2 border-black ${!isJoined ? "hover:bg-gradient-to-tr hover:from-orange-50 hover:to-red-50 hover:shadow-lg" : "hover:bg-red-700 hover:shadow-lg"} transition-all duration-300 ease-in-out ${isJoined ? 'bg-red-500 shadow-lg' : ''}`}
									onClick={() => {
										if (isJoined) {
											leaveRoom();
										} else {
											roomNo && joinRoom();
										}
									}}
								>
									{isJoined ? 'Leave' : 'Join'}
								</button>
							</div>
						</div>
					)}
				</div>
			)}
			<PlayerInfo isHost={isHost} isJoined={isJoined} />
		</div>
	);
}

export default GameMode;
