import React, {useContext, useEffect} from "react";
import {Tooltip, Backdrop, CircularProgress, Snackbar, Modal} from "@mui/material";
import {BsPerson, BsPersonFill} from "react-icons/bs";
import {RiComputerLine} from "react-icons/ri";
import {HiGlobeAsiaAustralia} from "react-icons/hi2";
import PlayerInfo from "../PlayerInfo/PlayerInfo";
import {GameContext} from "../../../../Context/GameContext";
import {doc, getDocs, collection, setDoc, writeBatch} from "firebase/firestore";
import {db} from "../../../../firebase";
import {isEmpty} from "lodash";
import Slot from "../../../../Models/Slot";

const buttonStyles =
	"flex rounded-lg px-2 py-1 font-bold border-2 border-black hover:bg-gradient-to-tr hover:from-orange-50 hover:to-red-50 hover:shadow-lg transition-all duration-300 ease-in-out";

function GameMode() {
	const [loading, setLoading] = React.useState(false);
	const [snackbarOpen, setSnackbarOpen] = React.useState(false);
	const [snackbarMessage, setSnackbarMessage] = React.useState("");
	const [restartClicked, setRestartClicked] = React.useState(false);
	const [changeModeTo, setChangeModeTo] = React.useState("");
	
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
		setIsJoined,
		gameBegan,
		setGameBegan,
		setPlayerJoined,
		setGameBoard,
		setCurrentPlayer
	} = useContext(GameContext);
	
	function restartGame() {
		
		if(gameMode === "PvO"){
			if(isHost && gameBegan){
				createNewSlots();
			}
		}
		else{
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
		}
		
		setCurrentPlayer("player_1");
		setGameBegan(false);
	}
	
	const createNewSlots = async () => {
		const batch = writeBatch(db);
		
		for (let i = 0; i < 9; i++) {
			let docRef1 = doc(collection(db, "rooms", roomNo, "Slots"), `${i}`);
			batch.set(docRef1, {
				played: false,
				time: null,
				player: "0"
			});
		}
		
		await batch.commit();
	}
	
	
	useEffect(() => {
		if(!gameBegan && gameMode === "PvO" && isJoined && isHost){
			createNewSlots();
		}
	}, [gameBegan, gameMode, isJoined, isHost]);
	
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
		setLoading(true);
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
			setSnackbarOpen(true);
			setSnackbarMessage(`Created New Room: ${newRoomNo}`);
		}
		setLoading(false);
		setPlayerJoined(false);
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
			setIsHost(false);
			setGameBegan(false);
			setSnackbarOpen(true);
			setSnackbarMessage(`Successfully left the room: ${roomNo}`);
			setRoomNo("");
		}
		else {
			setSnackbarOpen(true);
			setSnackbarMessage(`You are not joined in any room`);
		}
	}
	
	const joinRoom = async () => {
		setLoading(true);
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
				setSnackbarOpen(true);
				setSnackbarMessage(`Joined Successfully at ${roomNo}`);
			}
			else {
				setSnackbarOpen(true);
				setSnackbarMessage(`Both Player are already joined at ${roomNo}`);
			}
		}
		else {
			setSnackbarOpen(true);
			setSnackbarMessage(`Could not find room Id: ${roomNo}`);
		}
		setLoading(false);
	};
	
	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			if (!isJoined && roomNo) {
				joinRoom();
			}
		}
	};
	
	return (
		<div className="mt-4">
			<Modal
				open={restartClicked}
				onClose={() => setRestartClicked(false)}
				className="flex justify-center items-center"
			>
				<div className="bg-gradient-to-tr from-fuchsia-300 to-rose-200 max-w-72 rounded-lg p-4">
					<div className="text-3xl mb-4 font-bold">Switch Game</div>
					<div>
						Are you sure you want to switch game mode? Your current game will
						be lost.
					</div>
					<div className="flex justify-center items-center gap-10 mt-4">
						<button
							className="rounded-lg font-bold px-8 py-1 border-2 border-black hover:bg-red-500 hover:shadow-lg"
							onClick={() => {
								if(changeModeTo.length>0) {
									setGameMode(changeModeTo);
								}
								setChangeModeTo("");
								restartGame();
								setRestartClicked(false);
							}}
						>
							Yes
						</button>
						<button
							className="rounded-lg font-bold px-8 py-1 border-2 border-black hover:bg-green-500 hover:shadow-lg"
							onClick={() => {
								setChangeModeTo("");
								setRestartClicked(false);
							}}
						>
							No
						</button>
					</div>
				</div>
			</Modal>
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={loading}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={2000}
				onClose={()=>{setSnackbarOpen(false)}}
				message={snackbarMessage}
			/>
			
			<div className="font-bold text-sm">Select a Game Mode:</div>
			<div className="justify-evenly flex gap-2 mt-2">
					<button
						className={`${buttonStyles} ${gameMode === "PvAI" ? "bg-gradient-to-tr from-orange-100 via-red-100 to-pink-100 border-orange-500 shadow-lg" : ""
						}`}
						onClick={() => {
							if(gameBegan) {
								setChangeModeTo("PvAI")
								setRestartClicked(true);
							}
							else{
								setGameMode("PvAI");
							}
						}}
						disabled={isJoined}
					>
						<BsPerson size={32} />
						<RiComputerLine size={32} />
					</button>
					<button
						className={`${buttonStyles} ${gameMode === "PvP" ? "bg-gradient-to-tr from-orange-100 via-red-100 to-pink-100 border-orange-500 shadow-lg" : ""
						}`}
						onClick={() => {
							if(gameBegan) {
								setChangeModeTo("PvP")
								setRestartClicked(true);
							}
							else{
								setGameMode("PvP");
							}
						}}
						disabled={isJoined}
					>
						<BsPerson size={32} />
						<BsPersonFill size={32} />
					</button>
					<button
						className={`${buttonStyles} ${gameMode === "PvO" ? "bg-gradient-to-tr from-orange-100 via-red-100 to-pink-100 border-orange-500 shadow-lg" : ""
						}`}
						onClick={() => {
							if(gameBegan) {
								setChangeModeTo("PvO")
								setRestartClicked(true);
							}
							else {
								setGameMode("PvO");
							}
						}}
					>
						<BsPerson size={32} />
						<HiGlobeAsiaAustralia size={32} />
					</button>
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
										className={`${buttonStyles} flex-grow`}
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
									<Tooltip title="Click to Copy room Id">
										<div
											className={`${buttonStyles} w-48`}
											onClick={() => {
												navigator.clipboard.writeText(roomNo);
												setSnackbarOpen(true);
												setSnackbarMessage(`Copied Room Id: ${roomNo}`);
											}}
											role="button"
											tabIndex={0}
										>
											{roomNo}
										</div>
									</Tooltip>
									<button
										className={`${buttonStyles} bg-red-500 flex-grow`}
										onClick={() => {
											leaveRoom().then(() => {
												restartGame();
											});
										
										}}
									>
									{isJoined ? "Leave" : "Join"}
									</button>
								</div>
							)}
						</div>
					)}
					
					{!isHost && (
						<div>
							{!roomNo && <div className=" font-bold">Or</div>}
							
							<div className="flex gap-2">
								<input
									className={`${buttonStyles} w-48`}
									placeholder="Enter Room ID"
									disabled={isJoined}
									value={roomNo}
									onChange={(e) => setRoomNo(e.target.value)}
									onKeyPress={handleKeyPress}
								/>
								<button
									className={`${buttonStyles} ${isJoined ? "bg-red-500" : ""}`}
									onClick={() => {
										if (isJoined) {
											leaveRoom().then(() => {
												restartGame();
											});
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