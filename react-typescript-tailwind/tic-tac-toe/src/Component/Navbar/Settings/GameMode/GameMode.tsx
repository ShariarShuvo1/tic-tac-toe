import React, {useContext, useEffect, useState} from "react";
import {Tooltip} from "@mui/material";
import {BsPerson, BsPersonFill} from "react-icons/bs";
import {RiComputerLine} from "react-icons/ri";
import {HiGlobeAsiaAustralia} from "react-icons/hi2";
import PlayerInfo from "../PlayerInfo/PlayerInfo";
import {GameContext} from "../../../../Context/GameContext";
import {doc, getDocs, collection, setDoc, query, onSnapshot} from "firebase/firestore";
import {db} from "../../../../firebase";
import {isEmpty} from "lodash";

const buttonStyles =
	"flex rounded-lg px-2 py-1 font-bold border-2 border-black hover:bg-gradient-to-tr hover:from-orange-50 hover:to-red-50 hover:shadow-lg transition-all duration-300 ease-in-out";

function GameMode() {
	
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
		setPlayer2,
		isHost,
		setIsHost,
		isJoined,
		setIsJoined
	} = useContext(GameContext);
	
	useEffect(() => {
		const tempPlayer1 = { ...player1, type: isHost ? "Host" : "Not Host" };
		const tempPlayer2 = { ...player2, type: isHost ? "Not Host" : "Host" };
		setPlayer1(tempPlayer1);
		setPlayer2(tempPlayer2);
	}, [isHost]);
	
	const generateRandomRoomNo = () => {
		let result = "";
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		const charactersLength = characters.length;
		for (let i = 0; i < 6; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	};
	
	const generateroomNo = async () => {
		const newRoomNo = generateRandomRoomNo();
		
		const roomExists = await checkRoomExists(newRoomNo);
		
		if (roomExists) {
			await generateroomNo();
		} else {
			
			let docRef1 = doc(collection(db, "rooms", newRoomNo, "Player"), 'player1');
			await setDoc(docRef1, {
				name: player1.name,
				sign: player1.sign,
				type: "Host",
				status: "Active"
			});
			
			let docRef2 = doc(collection(db, "rooms", newRoomNo, "Player"), 'player2');
			await setDoc(docRef2, {
				name: player2.name,
				sign: player2.sign,
				type: "Not Host",
				status: "Inactive"
			});
			
			setRoomNo(newRoomNo);
			setIsHost(true);
			setIsJoined(true);
			let tempPlayer1 = player1;
			tempPlayer1.status = "Active";
			setPlayer1(tempPlayer1);
		}
	};
	
	const checkRoomExists = async (roomNo: string) => {
		let roomRef = collection(db, 'rooms', roomNo, 'Player');
		let roomSnapshot = await getDocs(roomRef);
		return !isEmpty(roomSnapshot.docs);
	};
	
	const leaveRoom = async () => {
		if(isJoined){
			if(isHost) {
				let docRef = doc(collection(db, "rooms", roomNo, "Player"), 'player1');
				await setDoc(docRef, {
					name: player1.name,
					sign: player1.sign,
					type: "Not Host",
					status: "Inactive"
				});
				setPlayer1({...player1, status: "Inactive", type: "Not Host"});
			}
			else {
				let docRef = doc(collection(db, "rooms", roomNo, "Player"), 'player2');
				await setDoc(docRef, {
					name: player2.name,
					sign: player2.sign,
					type: "Not Host",
					status: "Inactive"
				});
				setPlayer2({...player2, status: "Inactive", type: "Not Host"});
			}
			setIsJoined(false);
			setRoomNo("");
			setIsHost(false);
		}
	}
	
	const joinRoom = async () => {
		const roomExists = await checkRoomExists(roomNo);
		if(roomExists){
			let roomRef = collection(db, 'rooms', roomNo, 'Player');
			let roomSnapshot = await getDocs(roomRef);
			let player1Doc = roomSnapshot.docs[0].data();
			let player2Doc = roomSnapshot.docs[1].data();
			if(player2Doc.status !== "Active") {
				let tempPlayer1 = player1;
				tempPlayer1.name = player1Doc.name;
				tempPlayer1.sign = player1Doc.sign;
				tempPlayer1.status = player1Doc.status;
				tempPlayer1.type = player1Doc.type;
				setPlayer1(tempPlayer1);
				
				let tempPlayer2 = player2;
				let docRef2 = doc(collection(db, "rooms", roomNo, "Player"), 'player2');
				await setDoc(docRef2, {
					name: tempPlayer2.name,
					sign: tempPlayer2.sign,
					type: "Not Host",
					status: "Active"
				});
				tempPlayer2.status = "Active";
				tempPlayer2.type = "Not Host";
				setIsJoined(true);
				setPlayer2(tempPlayer2);
			}
			
		}
	};
	
	
	return (
		<div className="mt-4">
			<div className="font-bold text-sm">Select a Game Mode:</div>
			<div className="justify-evenly flex gap-2 mt-2">
				<Tooltip title="Human Vs Computer">
					<button
						className={`${buttonStyles} ${gameMode === "PvAI" ? "bg-gradient-to-tr from-orange-100 via-red-100 to-pink-100 border-orange-500 shadow-lg" : ""
						}`}
						onClick={() => setGameMode("PvAI")}
						disabled={isJoined}
					>
						<BsPerson size={32} />
						<RiComputerLine size={32} />
					</button>
				</Tooltip>
				<Tooltip title="Human Vs Human">
					<button
						className={`${buttonStyles} ${gameMode === "PvP" ? "bg-gradient-to-tr from-orange-100 via-red-100 to-pink-100 border-orange-500 shadow-lg" : ""
						}`}
						onClick={() => setGameMode("PvP")}
						disabled={isJoined}
					>
						<BsPerson size={32} />
						<BsPersonFill size={32} />
					</button>
				</Tooltip>
				<Tooltip title="Play Online Against Player">
					<button
						className={`${buttonStyles} ${gameMode === "PvO" ? "bg-gradient-to-tr from-orange-100 via-red-100 to-pink-100 border-orange-500 shadow-lg" : ""
						}`}
						onClick={() => setGameMode("PvO")}
					>
						<BsPerson size={32} />
						<HiGlobeAsiaAustralia size={32} />
					</button>
				</Tooltip>
			</div>
			{gameMode === "PvAI" && (
				<div>
					<div className="mt-2 font-bold text-sm">Select a Difficulty:</div>
					<div className="justify-center flex gap-2 mt-2">
						{["Easy", "Normal", "Impossible"].map((difficulty) => (
							<button
								key={difficulty}
								className={`${buttonStyles} ${gameDifficulty === difficulty ? "bg-gradient-to-tr from-orange-100 via-red-100 to-pink-100 border-orange-500 shadow-lg" : ""
								}`}
								onClick={() => setGameDifficulty(difficulty)}
							>
								{difficulty}
							</button>
						))}
					</div>
				</div>
			)}
			{gameMode === "PvO" && (
				<div className="justify-center mt-4">
					{(isHost || !roomNo) && (
						<div className="justify-center">
							{!isHost && (
								<div className="flex">
									<button
										className={`${buttonStyles}`}
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
										className={`${buttonStyles} w-48`}
										inputMode="none"
										value={roomNo}
										disabled={true}
									/>
									<button
										className={`${buttonStyles} bg-red-500`}
										onClick={leaveRoom}
									>
										{isJoined ? "Leave" : "Join"}
									</button>
								</div>
							)}
						</div>
					)}
					
					{!isHost && (
						<div>
							{!roomNo && <div className="mt-2 font-bold">Or</div>}
							
							<div className="flex gap-2">
								<input
									className={`${buttonStyles} w-48`}
									placeholder="Enter Room ID"
									disabled={isJoined}
									value={roomNo}
									onChange={(e) => setRoomNo(e.target.value)}
								/>
								<button
									className={`${buttonStyles} ${isJoined ? "bg-red-500" : ""}`}
									onClick={() => {
										if (isJoined) {
											leaveRoom();
										} else {
											roomNo && joinRoom();
										}
									}}
								>
									{isJoined ? "Leave" : "Join"}
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