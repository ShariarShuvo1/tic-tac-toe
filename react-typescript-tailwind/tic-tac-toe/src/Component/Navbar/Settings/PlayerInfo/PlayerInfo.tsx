import React, {useEffect, useState} from "react";
import {BsPerson, BsPersonFill} from "react-icons/bs";
import {Modal, Pagination, Tooltip} from "@mui/material";
import UnicodeData from "../../../../Assets/UnicodeData";
import "./../../../Homepage/Homepage.css"
import {RiComputerLine} from "react-icons/ri";

function PlayerInfo(props: { isHost: boolean, gameMode: string, setCurrentGameMode: React.Dispatch<React.SetStateAction<string>> , isJoined:boolean}) {
	const {isHost, gameMode, isJoined} = props;
	const [currentGameMode, setCurrentGameMode] = useState(props.gameMode);
	const [playerName1, setPlayerName1] = useState('Player 1');
	const [playerName2, setPlayerName2] = useState('Player 2');
	const [playerSign1, setPlayerSign1] = useState(10007);
	const [playerSign2, setPlayerSign2] = useState(9675);
	const [signSelectorOpen, setSignSelectorOpen] = useState(false);
	const [unicodeList, setUnicodeList] = useState<{ key: number, value: string }[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [lowRange, setLowRange] = useState(0);
	const itemsPerPage = 100;
	const [highRange, setHighRange] = useState(itemsPerPage);
	const [settingFor, setSettingFor] = useState('Player 1');
	const [searchOn, setSearchOn] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	
	useEffect(() => {
		setCurrentGameMode(props.gameMode);
		if(props.gameMode === "PvAI"){
			setPlayerName2("Computer");
		}
		else {
			setPlayerName2("Player 2");
		}
	}, [props.gameMode]);
	
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
							className={` ${settingFor === "Player 1" ? 10007 === playerSign1 && "bg-gradient-to-tr from-orange-100 via-red-100 to-pink-100 border-orange-500 shadow-lg" : 10007 === playerSign2 && "bg-gradient-to-tr from-orange-100 via-red-100 to-pink-100 border-orange-500 shadow-lg"} px-4 border-2 border-black p-2 text-center font-bold rounded-lg text-xl hover:bg-gradient-to-tr hover:from-orange-50 hover:to-red-50 hover:shadow-lg transition-all duration-300 ease-in-out hover:cursor-pointer`}
							onClick={() => {
								if (settingFor === 'Player 1') {
									setPlayerSign1(10007);
								} else {
									setPlayerSign2(10007);
								}
								setSignSelectorOpen(false);
							}}
						>
							{String.fromCodePoint(10007)}
						</button>
						<button
							className={` ${settingFor === "Player 1" ? 9675 === playerSign1 && "bg-gradient-to-tr from-orange-100 via-red-100 to-pink-100 border-orange-500 shadow-lg" : 9675 === playerSign2 && "bg-gradient-to-tr from-orange-100 via-red-100 to-pink-100 border-orange-500 shadow-lg"} px-4 border-2 border-black p-2 text-center font-bold rounded-lg text-xl hover:bg-gradient-to-tr hover:from-orange-50 hover:to-red-50 hover:shadow-lg transition-all duration-300 ease-in-out hover:cursor-pointer`}
							onClick={() => {
								if (settingFor === 'Player 1') {
									setPlayerSign1(9675);
								} else {
									setPlayerSign2(9675);
								}
								setSignSelectorOpen(false);
							}}
						>
							{String.fromCodePoint(9675)}
						</button>
					
					</div>
					<div className="flex mt-2 content-center">
						<input
							className=" w-48 block rounded-lg px-2 py-1 font-bold border-2 border-black bg-gradient-to-tr from-orange-50 to-red-50 shadow-lg transition-all duration-300 ease-in-out"
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
						className="grid-cols-4 grid gap-2 mt-2 max-h-96 overflow-y-scroll scrollbar-css"
					>
						{unicodeList.slice(lowRange, highRange).map((item, index) => (
							<Tooltip
								key={index}
								title={item.value}
								placement="top"
								onClick={() => {
									if (settingFor === 'Player 1') {
										setPlayerSign1(item.key);
									} else {
										setPlayerSign2(item.key);
									}
									setSignSelectorOpen(false);
								}}
							>
								<div
									className={` ${settingFor === "Player 1" ? item.key === playerSign1 && "bg-gradient-to-tr from-orange-100 via-red-100 to-pink-100 border-orange-500 shadow-lg" : item.key === playerSign2 && "bg-gradient-to-tr from-orange-100 via-red-100 to-pink-100 border-orange-500 shadow-lg"} border-2 border-black p-2 text-center font-bold rounded-lg text-xl hover:bg-gradient-to-tr hover:from-orange-50 hover:to-red-50 hover:shadow-lg transition-all duration-300 ease-in-out hover:cursor-pointer`}
								>
									{String.fromCodePoint(item.key)}
								</div>
							</Tooltip>
						))}
					</div>
					<Pagination
						count={Math.ceil(unicodeList.length / itemsPerPage)}
						variant="outlined"
						shape="rounded"
						siblingCount={0}
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
			{(!isHost ) && (
				<div className="flex mt-2">
					{currentGameMode === 'PvAI' ? (
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
						onChange={(e) => setPlayerName1(e.target.value)}
						maxLength={8}
						disabled={currentGameMode === 'PvAI'}
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