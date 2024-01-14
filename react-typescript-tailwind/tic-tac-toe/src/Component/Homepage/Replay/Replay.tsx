import Game from "../../../Models/Game";
import React, {useEffect, useState} from "react";
import {MdNavigateNext, MdNavigateBefore} from "react-icons/md";
import {CiPlay1, CiPause1} from "react-icons/ci";
import Slot from "../../../Models/Slot";

interface PreviewProps {
	game: Game;
	disablePreview: () => void;
}

function Replay(props: PreviewProps) {
	const {game, disablePreview} = props;
	const [gameBoard, setGameBoard] = useState<Slot[]>([
		new Slot(), new Slot(), new Slot(),
		new Slot(), new Slot(), new Slot(),
		new Slot(), new Slot(), new Slot(),
	]);
	const [slots, setSlots] = useState<(Slot | null)[]>([...game.slots]);
	const [indexStack, setIndexStack] = useState<number[]>([]);
	const [winningCombination, setWinningCombination] = useState<number[] | null>(null);
	const [isDraw, setIsDraw] = useState<boolean>(false);
	const [currentStatus, setCurrentStatus] = useState<string>("Click Next to proceed");
	const [currentlyPlaying, setCurrentlyPlaying] = useState<boolean>(false);
	const [playInterval, setPlayInterval] = useState<NodeJS.Timeout | null>(null);
	const [gameEnd, setGameEnd] = useState<boolean>(false);
	
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
		setWinningCombination(null);
		for (const combination of winningCombinations) {
			const [a, b, c] = combination;
			if (
				gameBoard[a].played &&
				gameBoard[a].player === gameBoard[b].player &&
				gameBoard[a].player === gameBoard[c].player
			) {
				setWinningCombination(combination);
				setCurrentStatus("Winner is: " + gameBoard[a].player);
				setGameEnd(true);
				return true;
			}
		}
		setIsDraw(false);
		if (gameBoard.every((cell) => cell.played)) {
			setIsDraw(true);
			setCurrentStatus("It's a Draw!");
			setGameEnd(true);
			return true;
		}
		setGameEnd(false);
		return false;
	}
	
	function getMinimumSlot(): number {
		let minimumCurrentTime = new Date().getTime();
		let minimumIdx = -1;
		for (let i = 0; i < slots.length; i++) {
			let time = slots[i]?.time?.getTime();
			if (time) {
				if (time < minimumCurrentTime) {
					minimumCurrentTime = time;
					minimumIdx = i;
				}
			}
		}
		return minimumIdx;
	}
	
	useEffect(() => {
		winCheck();
		
		if (currentlyPlaying && indexStack.length < 9) {
			const intervalId = setInterval(() => {
				nextClicked();
				if (gameEnd) {
					setCurrentlyPlaying(false);
					clearInterval(intervalId);
				}
			}, 300);
			
			setPlayInterval(intervalId);
		} else {
			setCurrentlyPlaying(false);
		}
		
		return () => {
			if (playInterval) {
				clearInterval(playInterval);
			}
		};
	}, [gameBoard, currentlyPlaying, indexStack]);
	
	function nextClicked() {
		let indexToRemove = getMinimumSlot();
		if (indexToRemove > -1) {
			let tempIndexStack = [...indexStack];
			tempIndexStack.push(indexToRemove);
			setIndexStack(tempIndexStack);
			let currentSlot = slots[indexToRemove];
			if (currentSlot) {
				let tempSlots = [...slots];
				tempSlots[indexToRemove] = null;
				setSlots(tempSlots);
				let tempGameBoard = [...gameBoard];
				tempGameBoard[indexToRemove] = currentSlot;
				setGameBoard(tempGameBoard);
				setCurrentStatus("Current Player: " + currentSlot.player);
			}
		}
	}
	
	function prevClicked() {
		if (indexStack.length > 0) {
			let tempIndexStack = [...indexStack];
			let indexToInsert = tempIndexStack.pop();
			if (indexToInsert != undefined) {
				let tempSlots = [...slots];
				tempSlots[indexToInsert] = gameBoard[indexToInsert];
				setCurrentStatus("Click Next to proceed");
				if (tempIndexStack.length > 0) {
					setCurrentStatus("Current Player: " + gameBoard[tempIndexStack[tempIndexStack.length - 1]].player);
				}
				setSlots(tempSlots);
				let tempGameBoard = [...gameBoard];
				tempGameBoard[indexToInsert] = new Slot();
				setGameBoard(tempGameBoard);
			}
			setIndexStack(tempIndexStack);
		}
	}
	
	function closeClicked() {
		let tempGameBoard: Slot[] = [
			new Slot(), new Slot(), new Slot(),
			new Slot(), new Slot(), new Slot(),
			new Slot(), new Slot(), new Slot(),
		]
		setGameBoard(tempGameBoard);
		setSlots([...game.slots]);
		setWinningCombination(null);
		setIsDraw(false);
		setCurrentStatus("Click Next to proceed");
		setGameEnd(false);
		disablePreview();
	}
	
	function play() {
		setCurrentlyPlaying(true);
	}
	
	function pause() {
		setCurrentlyPlaying(false);
		if (playInterval) {
			clearInterval(playInterval);
		}
	}
	
	
	return (
		<div
			className="min-w-72 fixed rounded-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-teal-400 to-yellow-200">
			<div className="flex justify-between">
				<div className="p-2 text-xl font-bold ms-2">
					Preview
				</div>
				<button onClick={closeClicked}
				        className="p-1 ps-4 pe-4 m-2 font-bold border-2 border-black rounded-lg hover:rounded-lg hover:bg-gradient-to-r hover:from-teal-500 hover:to-yellow-200">
					Close
				</button>
			</div>
			
			<div className="p-1 font-bold">
				{currentStatus}
			</div>
			
			<div id='a' className=" flex justify-center items-center mt-2 mb-2">
				<div id="b" className="grid grid-cols-3 gap-2">
					<div
						className={`w-20 h-20 rounded-lg text-center text-7xl font-bold ${winningCombination && winningCombination.includes(0) ? "bg-gradient-to-tr from-amber-300 via-lime-500 to-green-600" : isDraw ? "bg-gradient-to-tr from-amber-500 via-lime-600 to-green-700" : "bg-gradient-to-br from-fuchsia-300 via-blue-200 to-sky-300"}`}>
						{gameBoard[0].played ? (gameBoard[0].player === game.player1 ? '\u2717' : '\u25CB') : ""}
					</div>
					<div
						className={`w-20 h-20 rounded-lg text-center text-7xl font-bold ${winningCombination && winningCombination.includes(1) ? "bg-gradient-to-tr from-amber-300 via-lime-500 to-green-600" : isDraw ? "bg-gradient-to-tr from-amber-500 via-lime-600 to-green-700" : "bg-gradient-to-br from-fuchsia-300 via-blue-200 to-sky-300"}`}>
						{gameBoard[1].played ? (gameBoard[1].player === game.player1 ? '\u2717' : '\u25CB') : ""}
					</div>
					<div
						className={`w-20 h-20 rounded-lg text-center text-7xl font-bold ${winningCombination && winningCombination.includes(2) ? "bg-gradient-to-tr from-amber-300 via-lime-500 to-green-600" : isDraw ? "bg-gradient-to-tr from-amber-500 via-lime-600 to-green-700" : "bg-gradient-to-br from-fuchsia-300 via-blue-200 to-sky-300"}`}>
						{gameBoard[2].played ? (gameBoard[2].player === game.player1 ? '\u2717' : '\u25CB') : ""}
					</div>
					
					
					<div
						className={`w-20 h-20 rounded-lg text-center text-7xl font-bold ${winningCombination && winningCombination.includes(3) ? "bg-gradient-to-tr from-amber-300 via-lime-500 to-green-600" : isDraw ? "bg-gradient-to-tr from-amber-500 via-lime-600 to-green-700" : "bg-gradient-to-br from-fuchsia-300 via-blue-200 to-sky-300"}`}>
						{gameBoard[3].played ? (gameBoard[3].player === game.player1 ? '\u2717' : '\u25CB') : ""}
					</div>
					<div
						className={`w-20 h-20 rounded-lg text-center text-7xl font-bold ${winningCombination && winningCombination.includes(4) ? "bg-gradient-to-tr from-amber-300 via-lime-500 to-green-600" : isDraw ? "bg-gradient-to-tr from-amber-500 via-lime-600 to-green-700" : "bg-gradient-to-br from-fuchsia-300 via-blue-200 to-sky-300"}`}>
						{gameBoard[4].played ? (gameBoard[4].player === game.player1 ? '\u2717' : '\u25CB') : ""}
					</div>
					<div
						className={`w-20 h-20 rounded-lg text-center text-7xl font-bold ${winningCombination && winningCombination.includes(5) ? "bg-gradient-to-tr from-amber-300 via-lime-500 to-green-600" : isDraw ? "bg-gradient-to-tr from-amber-500 via-lime-600 to-green-700" : "bg-gradient-to-br from-fuchsia-300 via-blue-200 to-sky-300"}`}>
						{gameBoard[5].played ? (gameBoard[5].player === game.player1 ? '\u2717' : '\u25CB') : ""}
					</div>
					
					
					<div
						className={`w-20 h-20 rounded-lg text-center text-7xl font-bold ${winningCombination && winningCombination.includes(6) ? "bg-gradient-to-tr from-amber-300 via-lime-500 to-green-600" : isDraw ? "bg-gradient-to-tr from-amber-500 via-lime-600 to-green-700" : "bg-gradient-to-br from-fuchsia-300 via-blue-200 to-sky-300"}`}>
						{gameBoard[6].played ? (gameBoard[6].player === game.player1 ? '\u2717' : '\u25CB') : ""}
					</div>
					<div
						className={`w-20 h-20 rounded-lg text-center text-7xl font-bold ${winningCombination && winningCombination.includes(7) ? "bg-gradient-to-tr from-amber-300 via-lime-500 to-green-600" : isDraw ? "bg-gradient-to-tr from-amber-500 via-lime-600 to-green-700" : "bg-gradient-to-br from-fuchsia-300 via-blue-200 to-sky-300"}`}>
						{gameBoard[7].played ? (gameBoard[7].player === game.player1 ? '\u2717' : '\u25CB') : ""}
					</div>
					<div
						className={`w-20 h-20 rounded-lg text-center text-7xl font-bold ${winningCombination && winningCombination.includes(8) ? "bg-gradient-to-tr from-amber-300 via-lime-500 to-green-600" : isDraw ? "bg-gradient-to-tr from-amber-500 via-lime-600 to-green-700" : "bg-gradient-to-br from-fuchsia-300 via-blue-200 to-sky-300"}`}>
						{gameBoard[8].played ? (gameBoard[8].player === game.player1 ? '\u2717' : '\u25CB') : ""}
					</div>
				</div>
			</div>
			
			<div className="flex justify-center mb-2">
				<button disabled={currentlyPlaying} onClick={prevClicked}
				        className="m-0.5 border-2 border-black rounded-lg hover:rounded-lg hover:bg-gradient-to-r hover:from-teal-500 hover:to-yellow-200">
					<MdNavigateBefore size={40}/>
				</button>
				<button
					className="m-0.5 border-2 border-black rounded-lg hover:rounded-lg hover:bg-gradient-to-r hover:from-teal-500 hover:to-yellow-200">
					{currentlyPlaying ?
						<CiPause1 onClick={pause} size={40}/>
						:
						<CiPlay1 onClick={play} size={40}/>
					}
				</button>
				<button disabled={currentlyPlaying} onClick={nextClicked}
				        className="m-0.5 border-2 border-black rounded-lg hover:rounded-lg hover:bg-gradient-to-r hover:from-teal-500 hover:to-yellow-200">
					<MdNavigateNext size={40}/>
				</button>
			</div>
		</div>
	);
}

export default Replay;
