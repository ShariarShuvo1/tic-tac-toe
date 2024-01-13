import React, {useState} from "react";
import {Tooltip} from "@mui/material";
import {BsPerson, BsPersonFill} from "react-icons/bs";
import {RiComputerLine} from "react-icons/ri";
import {HiGlobeAsiaAustralia} from "react-icons/hi2";
import PlayerInfo from "../PlayerInfo/PlayerInfo";

function GameMode() {
	const [gameMode, setGameMode] = useState('PvAI');
	const [difficulty, setDifficulty] = useState('Easy');
	const [roomID, setRoomID] = useState('');
	const [isJoined, setIsJoined] = useState(false);
	const [isHost, setIsHost] = useState(false);
	
	function generateRoomID() {
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		for (let i = 0; i < 6; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		setRoomID(result);
		setIsHost(true);
		setIsJoined(true);
	}
	
	function joinRoom() {
		setIsJoined(true);
	}
	
	function leaveRoom() {
		setIsJoined(false);
		setRoomID('');
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
							className={`flex rounded-lg px-2 py-1 font-bold border-2 border-black hover:bg-gradient-to-tr hover:from-orange-50 hover:to-red-50 hover:shadow-lg transition-all duration-300 ease-in-out ${difficulty === 'Easy' ? 'bg-gradient-to-tr from-orange-100 via-red-100 to-pink-100 border-orange-500 shadow-lg' : ''}`}
							onClick={() => setDifficulty('Easy')}
						>
							Easy
						</button>
						<button
							className={`flex rounded-lg px-2 py-1 font-bold border-2 border-black hover:bg-gradient-to-tr hover:from-orange-50 hover:to-red-50 hover:shadow-lg transition-all duration-300 ease-in-out ${difficulty === 'Normal' ? 'bg-gradient-to-tr from-orange-100 via-red-100 to-pink-100 border-orange-500 shadow-lg' : ''}`}
							onClick={() => setDifficulty('Normal')}
						>
							Normal
						</button>
						<button
							className={`flex rounded-lg px-2 py-1 font-bold border-2 border-black hover:bg-gradient-to-tr hover:from-orange-50 hover:to-red-50 hover:shadow-lg transition-all duration-300 ease-in-out ${difficulty === 'Impossible' ? 'bg-gradient-to-tr from-orange-100 via-red-100 to-pink-100 border-orange-500 shadow-lg' : ''}`}
							onClick={() => setDifficulty('Impossible')}
						>
							Impossible
						</button>
					</div>
				</div>
			)}
			{gameMode === 'PvO' && (
				<div className="justify-center mt-4">
					{(isHost || !roomID) && (
						<div className="justify-center">
							{!isHost && (
								<button
									className="rounded-lg px-2 py-1 font-bold border-2 border-black hover:bg-gradient-to-tr hover:from-orange-50 hover:to-red-50 hover:shadow-lg transition-all duration-300 ease-in-out"
									onClick={generateRoomID}
								>
									Host a new game
								</button>
							)}
							{isHost && (
								<div className="mt-2 font-bold text-orange-700">
									Share this room ID with your friend:
								</div>
							)}
							{roomID && isHost && (
								<div className="flex gap-2">
									<input
										className=" w-48 block mt-2 rounded-lg px-2 py-1 font-bold border-2 border-black bg-gradient-to-tr from-orange-50 to-red-50 shadow-lg transition-all duration-300 ease-in-out"
										inputMode="none"
										value={roomID}
										disabled={true}
									/>
									<button
										className={`mt-2 rounded-lg px-2 py-1 font-bold border-2 border-black hover:bg-red-700 hover:shadow-lg transition-all duration-300 ease-in-out bg-red-500 shadow-lg}`}
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
							{!roomID && (
								<div className="mt-2 font-bold">
									Or
								</div>
							)}
							
							<div className="flex gap-2">
								<input
									className={` w-48 mt-2 rounded-lg px-2 py-1 font-bold border-2 border-black bg-gradient-to-tr from-orange-50 to-red-50 shadow-lg transition-all duration-300 ease-in-out`}
									placeholder="Enter Room ID"
									disabled={isJoined}
									value={roomID}
									onChange={(e) => setRoomID(e.target.value)}
								/>
								<button
									className={`mt-2 rounded-lg px-2 py-1 font-bold border-2 border-black ${!isJoined ? "hover:bg-gradient-to-tr hover:from-orange-50 hover:to-red-50 hover:shadow-lg" : "hover:bg-red-700 hover:shadow-lg"} transition-all duration-300 ease-in-out ${isJoined ? 'bg-red-500 shadow-lg' : ''}`}
									onClick={() => {
										if (isJoined) {
											leaveRoom();
										} else {
											roomID && joinRoom();
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
			<PlayerInfo isHost={isHost} gameMode={gameMode} setCurrentGameMode={setGameMode} isJoined={isJoined} />
		</div>
	);
}

export default GameMode;
