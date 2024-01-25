import React, {useContext, useEffect, useState} from 'react';
import {IoMdSettings} from "react-icons/io";
import Settings from "./Settings/Settings";
import {GameContext} from "../../Context/GameContext";
import {FaGithub} from "react-icons/fa";
import {collection, doc, getDocs, setDoc, writeBatch} from "firebase/firestore";
import {db} from "../../firebase";
import {isEmpty} from "lodash";
import Slot from "../../Models/Slot";
import {Backdrop, CircularProgress, Modal, Snackbar} from "@mui/material";

interface NavbarProps {
	initialRoomNo: string | null;
}

function Navbar({ initialRoomNo }: NavbarProps) {
	const [theme, setTheme] = useState("");
	const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
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
		setGameBoard,
		setCurrentPlayer
	} = useContext(GameContext);
	
	useEffect(() => {
		if(initialRoomNo && !isJoined) {
			setRoomNo(initialRoomNo);
			joinRoom(initialRoomNo)
		}
	}, [initialRoomNo]);
	
	const generateRandomRoomNo = () => {
		let result = "";
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		const charactersLength = characters.length;
		for (let i = 0; i < 6; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	};
	
	const checkRoomExists = async (roomNo: string) => {
		let roomRef = collection(db, 'rooms', roomNo, 'Player');
		let roomSnapshot = await getDocs(roomRef);
		return !isEmpty(roomSnapshot.docs);
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
		setGameMode("PvO");
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
	
	const joinRoom = async (inititalRoomNo:string|null = null) => {
		
		let tempRoomNo = inititalRoomNo ? inititalRoomNo : roomNo;
		
		setLoading(true);
		const roomExists = await checkRoomExists(tempRoomNo);
		if(roomExists){
			let roomRef = collection(db, 'rooms', tempRoomNo, 'Player');
			let roomSnapshot = await getDocs(roomRef);
			let player1Doc = roomSnapshot.docs[0].data();
			let player2Doc = roomSnapshot.docs[1].data();
			if(player2Doc.status !== "Active" && player1Doc.status === "Active") {
				let tempPlayer1 = player1;
				tempPlayer1.name = player1Doc.name;
				tempPlayer1.sign = player1Doc.sign;
				tempPlayer1.status = player1Doc.status;
				tempPlayer1.type = player1Doc.type;
				setPlayer1(tempPlayer1);
				
				let tempPlayer2 = player2;
				let docRef2 = doc(collection(db, "rooms", tempRoomNo, "Player"), 'player2');
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
				setSnackbarMessage(`Joined Successfully at ${tempRoomNo}`);
				setGameMode("PvO");
			}
			else {
				setSnackbarOpen(true);
				setSnackbarMessage(`Both Player are already joined at ${tempRoomNo}`);
			}
		}
		else {
			setSnackbarOpen(true);
			setSnackbarMessage(`Could not find room Id: ${tempRoomNo}`);
		}
		setLoading(false);
	};
	
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
	
	useEffect(() => {
		if(!gameBegan && gameMode === "PvO" && isJoined && isHost){
			createNewSlots();
		}
	}, [gameBegan, gameMode, isJoined, isHost]);
	
	useEffect(() => {
		const handleResize = () => {
			const newWindowWidth = window.innerWidth;
			setWindowWidth(newWindowWidth);
		};
		setWindowWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
	
	const {
		modalOpen,
		setModalOpen
	} = useContext(GameContext);
	
	useEffect(() => {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			setTheme('dark');
		} else {
			setTheme('light');
		}
	}, [])
	
	useEffect(() => {
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [theme]);
	
	const handleThemeSwitch = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};
	
	function modalToggle() {
		setModalOpen(!modalOpen);
	}
	
	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			if (!isJoined && roomNo) {
				joinRoom();
			}
		}
	};
	
	return (
		<nav
			className="bg-cyan-100 dark:bg-gray-950 border-b-2 border-gray-200 dark:border-gray-950 "
		>
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
			<Settings
				modalOpen={modalOpen}
				modalToggle={modalToggle}
				currentTheme={theme}
				handleThemeSwitch={handleThemeSwitch}
			/>
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<div className="flex justify-center items-center gap-2">
					<div
						className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
						Tic Tac Toe
					</div>
					<a className="dark:text-white" href="https://github.com/ShariarShuvo1/tic-tac-toe" target="_blank">
						<FaGithub
							className="hover:cursor-pointer"
							size={30}
						/>
					</a>
				</div>
				{windowWidth > 768 && (
					<div className=" flex gap-3 items-center justify-center">
						{!isJoined && (
							<div>
								<button
									className="border-2 border-black rounded-lg font-bold dark:border-white px-4 py-2 text-black dark:text-white hover:bg-amber-200 dark:hover:bg-gray-700"
									onClick={()=>{
										generateroomNo();
									}}
								>
									Host
								</button>
							</div>
						)}
						
						{!isJoined && (
							<span
								className="text-2xl font-bold dark:text-white"
							>
							Or
						</span>
						)}
						
						<div className="flex gap-1">
							<input
								className="p-2 rounded-lg font-bold bg-amber-100 text-center"
								placeholder="Enter A Room ID"
								disabled={isJoined}
								value={roomNo}
								onChange={(e) => setRoomNo(e.target.value)}
								onKeyPress={handleKeyPress}
							/>
							<button
								className={`border-2 border-black rounded-lg font-bold dark:border-white px-4 py-2 text-black dark:text-white ${isJoined ? "bg-red-700 hover:bg-red-800" : " hover:bg-green-800"} `}
								onClick={()=>{
									if(isJoined){
										leaveRoom();
									}
									else {
										joinRoom();
									}
								}}
							>
								{isJoined ? "Leave" : "Join"}
							</button>
						</div>
					
					</div>
				)}
				<IoMdSettings
					onClick={() => setModalOpen(!modalOpen)}
					size={32}
					className={`text-black dark:text-white transition-transform transform hover:rotate-45 hover:dark:text-fuchsia-700 cursor-pointer`}
				/>
			</div>
		</nav>
	
	);
}

export default Navbar;
