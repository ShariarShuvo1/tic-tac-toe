import {CiPlay1} from "react-icons/ci";
import React from "react";
import Game from "../../../Models/Game";
import {Tooltip} from "@mui/material";

interface Props {
	allGames: Game[];
	setAllGames: React.Dispatch<React.SetStateAction<Game[]>>;
	setPreviewVisible: React.Dispatch<React.SetStateAction<boolean>>;
	setSelectedGame: React.Dispatch<React.SetStateAction<Game | null>>;
}

function HistoryPage({allGames, setAllGames, setPreviewVisible, setSelectedGame}: Props) {
	
	return (
		<div className="mb-10">
			<div className={` flex flex-grow justify-center items-center `}>
				<div className="rounded-lg border-2 border-black">
					<div
						className="mb-1 bg-gradient-to-r from-fuchsia-300 to-cyan-500 w-80 p-4 text-center rounded-t-lg text-3xl font-bold">
						History
					</div>
					<div
						className="h-96 bg-gradient-to-tr from-blue-300 via-fuchsia-400 to-cyan-400 max-h-96 min-h-6 w-80 rounded-b-lg overflow-y-scroll scrollbar-css"
					>
						{allGames.map((game, index) => (
							<div key={index}
							     className="flex justify-between m-2 border-2 border-teal-700 p-1 rounded-lg text-lg font-bold items-center"
							>
								<div>
									<div>
										{game.player1.name}
										{game.verdict === "Win" && game.player1 === game.winner &&
											(
												<span
													className=" font-normal ms-1 ps-1 pe-1 border-2 border-blue-400 to-sky-300 rounded-2xl"
												>
													Winner
												</span>
											)
										}
									</div>
									
									<div>
										{game.player2.name}
										{game.verdict === "Win" && game.player2 === game.winner &&
											(
												<span
													className=" font-normal ms-1 ps-1 pe-1 border-2 border-blue-400 to-sky-300 rounded-2xl"
												>
													Winner
												</span>
											)
										}
									</div>
								
								</div>
								<Tooltip title="Replay" placement="top">
									<div className="justify-center items-center cursor-pointer">
											<CiPlay1
												onClick={() => {
													setPreviewVisible(true);
													setSelectedGame(game);
												}}
												size={50}
												className="hover:text-fuchsia-600 hover:text-xl hover:scale-105"
											/>
									</div>
								</Tooltip>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default HistoryPage;
