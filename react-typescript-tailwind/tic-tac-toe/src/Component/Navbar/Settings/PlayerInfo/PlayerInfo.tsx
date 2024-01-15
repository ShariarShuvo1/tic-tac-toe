import React, {useContext, useEffect, useState} from "react";
import {BsPerson, BsPersonFill} from "react-icons/bs";
import "./../../../Homepage/Homepage.css"
import {RiComputerLine} from "react-icons/ri";
import {GameContext} from "../../../../Context/GameContext";
import UnicodeModal from "../UnicodeModal/UnicodeModal";

function PlayerInfo(props: {
	isHost: boolean,
	isJoined: boolean
}) {
	const {
		player1,
		setPlayer1,
		player2,
		setPlayer2,
		gameMode,
		setGameMode
	} = useContext(GameContext);
	
	const {isHost, isJoined} = props;
	const [playerName1, setPlayerName1] = useState(player1.name);
	const [playerName2, setPlayerName2] = useState(player2.name);
	const [playerSign1, setPlayerSign1] = useState(player1.sign);
	const [playerSign2, setPlayerSign2] = useState(player2.sign);
	const [signSelectorOpen, setSignSelectorOpen] = useState(false);
	const [settingFor, setSettingFor] = useState('Player 1');
	
	useEffect(() => {
		let tempPlayer1 = player1;
		if (playerName1.length === 0) {
			tempPlayer1.name = "Player 1";
		} else {
			tempPlayer1.name = playerName1;
		}
		tempPlayer1.sign = playerSign1;
		if(tempPlayer1.name.toLowerCase() === "lili" && tempPlayer1.name.toLowerCase() !== playerName2.toLowerCase()){
			tempPlayer1.sign = 10084;
		}
		setPlayer1(tempPlayer1);
		let tempPlayer2 = player2;
		if (playerName2 !== "Computer") {
			if (playerName2.length === 0) {
				tempPlayer2.name = "Player 2";
			} else {
				tempPlayer2.name = playerName2;
			}
		}
		tempPlayer2.sign = playerSign2;
		if(tempPlayer2.name.toLowerCase() === "lili" && tempPlayer1.name.toLowerCase() !== tempPlayer2.name.toLowerCase()){
			tempPlayer2.sign = 10084;
		}
		setPlayer2(tempPlayer2);
	}, [playerName1, playerName2, playerSign1, playerSign2]);
	
	useEffect(() => {
		setGameMode(gameMode);
		if (gameMode === "PvAI") {
			setPlayerName2("Computer");
		} else {
			setPlayerName2(player2.name);
		}
	}, [gameMode]);
	
	return (
		<div className="mt-2">
			<UnicodeModal signSelectorOpen={signSelectorOpen} setSignSelectorOpen={setSignSelectorOpen}
			              settingFor={settingFor} playerSign1={playerSign1} setPlayerSign1={setPlayerSign1}
			              playerSign2={playerSign2} setPlayerSign2={setPlayerSign2}/>
			<div className="font-bold text-sm">
				Insert the player info:
			</div>
			{!(isJoined && !isHost) && (
				<div className="flex mt-2">
					<BsPerson size={32}/>
					<input
						className="border-2 border-black rounded-lg px-2 py-1 ml-2 w-40 font-bold"
						type="text"
						placeholder="Player 1"
						value={playerName1}
						onChange={(e) => setPlayerName1(e.target.value)}
						maxLength={8}
					/>
					<button
						className="border-2 border-black rounded-lg px-2 py-1 ml-2 w-10 font-bold hover:bg-gradient-to-tr hover:from-orange-50 hover:to-red-50 hover:shadow-lg transition-all duration-300 ease-in-out"
						onClick={() => {
							setSignSelectorOpen(true);
							setSettingFor('Player 1');
						}}
					>
						{String.fromCodePoint(playerSign1)}
					</button>
				</div>
			)}
			{(!isHost) && (
				<div className="flex mt-2">
					{gameMode === 'PvAI' ? (
							<RiComputerLine size={32}/>
						)
						: (
							<BsPersonFill size={32}/>
						)
					}
					<input
						className="border-2 border-black rounded-lg px-2 py-1 ml-2 w-40 font-bold"
						type="text"
						placeholder="Player 2"
						value={playerName2}
						onChange={(e) => setPlayerName2(e.target.value)}
						maxLength={8}
						disabled={gameMode === 'PvAI'}
					/>
					<button
						className="border-2 border-black rounded-lg px-2 py-1 ml-2 w-10 font-bold hover:bg-gradient-to-tr hover:from-orange-50 hover:to-red-50 hover:shadow-lg transition-all duration-300 ease-in-out"
						onClick={() => {
							setSignSelectorOpen(true);
							setSettingFor('Player 2');
						}}
					>
						{String.fromCodePoint(playerSign2)}
					</button>
				</div>
			)}
		</div>
	);
}

export default PlayerInfo;