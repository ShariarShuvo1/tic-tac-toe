import React, {useState} from "react";
import {BsPerson} from "react-icons/bs";
import {Modal} from "@mui/material";

function PlayerInfo(props:{isHost:boolean, gameMode:string}) {
	const {isHost, gameMode} = props;
	const [playerName1, setPlayerName1] = useState('Player 1');
	const [playerName2, setPlayerName2] = useState('Player 2');
	const [playerSign1, setPlayerSign1] = useState('\u2717');
	const [playerSign2, setPlayerSign2] = useState('\u25CB');
	const [signSelectorOpen, setSignSelectorOpen] = useState(false);
	const buttonArray = Array.from({ length: 2500 }, (_, index) => index + 8448);
	
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
					<div
						className="grid-cols-4 grid gap-2 mt-2 max-h-96 overflow-y-scroll"
					>
						{buttonArray.map((btn) => (
							<div className="border-2 border-black p-2 rounded-lg font-bold text-2xl text-center">
								{String.fromCharCode(parseInt(btn.toString(16), 16))}
							</div>
						))}
					</div>
				</div>
			</Modal>
			<div className="font-bold text-sm">
			Insert the player info:
			</div>
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
					onClick={() => setSignSelectorOpen(true)}
				>
					{playerSign1}
				</button>
			</div>
		</div>
	);
}

export default PlayerInfo;