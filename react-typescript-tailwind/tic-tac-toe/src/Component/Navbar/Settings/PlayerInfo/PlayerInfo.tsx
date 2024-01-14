import React, {useContext, useEffect, useState} from "react";
import {BsPerson, BsPersonFill} from "react-icons/bs";
import {Modal, Pagination, Tooltip} from "@mui/material";
import UnicodeData from "../../../../Assets/UnicodeData";
import "./../../../Homepage/Homepage.css"
import {RiComputerLine} from "react-icons/ri";
import {GameContext} from "../../../../Context/GameContext";

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
	const [unicodeList, setUnicodeList] = useState<{ key: number, value: string }[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [lowRange, setLowRange] = useState(0);
	const itemsPerPage = 100;
	const [highRange, setHighRange] = useState(itemsPerPage);
	const [settingFor, setSettingFor] = useState('Player 1');
	const [searchOn, setSearchOn] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [sibillingCount, setSibillingCount] = useState(0);
	const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
	
	useEffect(() => {
		let tempPlayer1 = player1;
		tempPlayer1.name = playerName1;
		tempPlayer1.sign = playerSign1;
		setPlayer1(tempPlayer1);
		let tempPlayer2 = player2;
		if (playerName2 !== "Computer"){
			tempPlayer2.name = playerName2;
		}
		tempPlayer2.sign = playerSign2;
		setPlayer2(tempPlayer2);
	}, [playerName1, playerName2, playerSign1, playerSign2]);
	
	function screenChange(mode:string) {
		if(mode === "mobile"){
			setSibillingCount(0);
		}
		else {
			setSibillingCount(4)
		}
	}
	
	useEffect(() => {
		const handleResize = () => {
			const newWindowWidth = window.innerWidth;
			setWindowWidth(newWindowWidth);
			if(newWindowWidth >= 1024){
				screenChange("laptop")
			}
			else {
				screenChange("mobile")
			}
		};
		setWindowWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
	
	useEffect(() => {
		setGameMode(gameMode);
		if (gameMode === "PvAI") {
			setPlayerName2("Computer");
		} else {
			setPlayerName2(player2.name);
		}
	}, [gameMode]);
	
	useEffect(() => {
		if (!searchOn) {
			let tempUnicodeList: { key: number, value: string }[] = [];
			Object.keys(UnicodeData).map((key) => {
				tempUnicodeList.push({key: parseInt(key, 16), value: UnicodeData[key]});
			})
			setUnicodeList(tempUnicodeList);
		}
	}, [searchOn]);
	
	function handlePageChange(event: React.ChangeEvent<unknown>, value: number) {
		setCurrentPage(value);
		setLowRange((value - 1) * itemsPerPage);
		setHighRange(value * itemsPerPage);
	}
	
	function search() {
		setCurrentPage(1);
		setLowRange(0);
		setHighRange(itemsPerPage);
		setSearchOn(true);
		let tempUnicodeList: { key: number, value: string }[] = [];
		Object.keys(UnicodeData).map((key) => {
			let decimalValue = parseInt(key, 16).toString();
			let description = UnicodeData[key];
			if (description.includes(searchQuery.toUpperCase())) {
				tempUnicodeList.push({key: parseInt(key, 16), value: UnicodeData[key]});
			}
			if (decimalValue.includes(searchQuery)) {
				tempUnicodeList.splice(0, 0, {key: parseInt(key, 16), value: UnicodeData[key]});
			}
			if (searchQuery.includes(String.fromCodePoint(Number(decimalValue)))) {
				tempUnicodeList.splice(0, 0, {key: parseInt(key, 16), value: UnicodeData[key]});
			}
			if (searchQuery.toUpperCase() === Number(decimalValue).toString(16) || searchQuery === Number(decimalValue).toString(8)) {
				tempUnicodeList.splice(0, 0, {key: parseInt(key, 16), value: UnicodeData[key]});
			}
			if (searchQuery === description.toUpperCase()) {
				tempUnicodeList.splice(0, 0, {key: parseInt(key, 16), value: UnicodeData[key]});
			}
		})
		setUnicodeList(tempUnicodeList);
	}
	
	useEffect(() => {
		if (searchQuery.length === 0) {
			setSearchOn(false);
			setCurrentPage(1);
			setLowRange(0);
			setHighRange(itemsPerPage);
		}
	}, [searchQuery]);
	
	return (
		<div className="mt-2">
			<Modal
				open={signSelectorOpen}
				onClose={() => setSignSelectorOpen(false)}
				className="flex justify-center items-center "
			>
				<div className="min-w-72 bg-gradient-to-tr from-teal-300 via-green-300 to-violet-500 p-4 rounded-lg">
					<div className="flex justify-between">
						<div className="font-bold text-2xl">
							Select Sign
						</div>
						<button
							className="rounded-lg px-2 py-1 font-bold border-2 border-black hover:bg-gradient-to-tr hover:from-orange-50 hover:to-red-50 hover:shadow-lg"
							onClick={() => setSignSelectorOpen(false)}
						>
							Close
						</button>
					</div>
					<div className="mt-2 flex justify-center gap-2">
						<button
							className={` ${settingFor === "Player 1" ? 9932 === playerSign1 && "bg-gradient-to-tr from-orange-100 via-red-100 to-pink-100 border-orange-500 shadow-lg" : 9932 === playerSign2 && "bg-gradient-to-tr from-orange-100 via-red-100 to-pink-100 border-orange-500 shadow-lg"} px-4 border-2 border-black p-2 text-center font-bold rounded-lg text-xl hover:bg-gradient-to-tr hover:from-orange-50 hover:to-red-50 hover:shadow-lg transition-all duration-300 ease-in-out hover:cursor-pointer`}
							onClick={() => {
								if (settingFor === 'Player 1') {
									if (playerSign2 !== 9932) {
										setPlayerSign1(9932);
									}
								} else {
									if(playerSign1 !== 9932) {
										setPlayerSign2(9932);
									}
								}
								setSignSelectorOpen(false);
							}}
							disabled={settingFor === "Player 1" ? playerSign2 === 9932 : playerSign1 === 9932}
						>
							{String.fromCodePoint(9932)}
						</button>
						<button
							className={` ${settingFor === "Player 1" ? 9711 === playerSign1 && "bg-gradient-to-tr from-orange-100 via-red-100 to-pink-100 border-orange-500 shadow-lg" : 9711 === playerSign2 && "bg-gradient-to-tr from-orange-100 via-red-100 to-pink-100 border-orange-500 shadow-lg"} px-4 border-2 border-black p-2 text-center font-bold rounded-lg text-xl hover:bg-gradient-to-tr hover:from-orange-50 hover:to-red-50 hover:shadow-lg transition-all duration-300 ease-in-out hover:cursor-pointer`}
							onClick={() => {
								if (settingFor === 'Player 1') {
									if(playerSign2 !== 9711) {
										setPlayerSign1(9711);
									}
								} else {
									if(playerSign1 !== 9711) {
										setPlayerSign2(9711);
									}
								}
								setSignSelectorOpen(false);
							}}
							disabled={settingFor === "Player 1" ? playerSign2 === 9711 : playerSign1 === 9711}
						>
							{String.fromCodePoint(9711)}
						</button>
					
					</div>
					<div className="flex mt-2 content-center">
						<input
							className=" w-48 laptop:min-w-96 flex-grow block rounded-lg px-2 py-1 font-bold border-2 border-black bg-gradient-to-tr from-orange-50 to-red-50 shadow-lg transition-all duration-300 ease-in-out"
							inputMode="text"
							placeholder="Search"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						<button
							className={`${searchOn ? "bg-gradient-to-tr from-orange-100 via-red-100 to-pink-100 border-orange-500 shadow-lg" : ""} ms-2 px-2 border-2 border-black text-center font-bold rounded-lg hover:bg-gradient-to-tr hover:from-orange-50 hover:to-red-50 hover:shadow-lg transition-all duration-300 ease-in-out hover:cursor-pointer`}
							onClick={search}
						>
							Search
						</button>
					</div>
					<div
						className="grid-cols-5 laptop:grid-cols-10 grid gap-2 mt-2 max-h-80 overflow-y-scroll scrollbar-css"
					>
						{unicodeList.slice(lowRange, highRange).map((item, index) => (
							<Tooltip
								key={index}
								title={item.value}
								placement="top"
							>
								<button
									className={` ${settingFor === "Player 1" ? item.key === playerSign1 && "bg-gradient-to-tr from-orange-100 via-red-100 to-pink-100 border-orange-500 shadow-lg" : item.key === playerSign2 && "bg-gradient-to-tr from-orange-100 via-red-100 to-pink-100 border-orange-500 shadow-lg"} w-12 border-2 border-black p-2 text-center font-bold rounded-lg text-xl hover:bg-gradient-to-tr hover:from-orange-50 hover:to-red-50 hover:shadow-lg transition-all duration-300 ease-in-out hover:cursor-pointer`}
									onClick={() => {
										if (settingFor === 'Player 1') {
											if (playerSign2 !== item.key) {
												setPlayerSign1(item.key);
											}
										} else {
											if (playerSign1 !== item.key) {
												setPlayerSign2(item.key);
											}
										}
										setSignSelectorOpen(false);
									}}
									disabled={settingFor === "Player 1" ? playerSign2 === item.key : playerSign1 === item.key}
								>
									{String.fromCodePoint(item.key)}
								</button>
							</Tooltip>
						))}
					</div>
					<Pagination
						count={Math.ceil(unicodeList.length / itemsPerPage)}
						variant="outlined"
						shape="rounded"
						siblingCount={sibillingCount}
						page={currentPage}
						className="mt-2"
						onChange={handlePageChange}
					/>
				</div>
			</Modal>
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