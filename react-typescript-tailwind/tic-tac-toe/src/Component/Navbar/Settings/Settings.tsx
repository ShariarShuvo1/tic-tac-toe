import {Modal} from "@mui/material";
import React from "react";
import ThemeSelector from "./ThemeSelector/ThemeSelector";
import GameMode from "./GameMode/GameMode";

function Settings(props: {
	modalOpen: boolean,
	modalToggle: () => void,
	currentTheme: string,
	handleThemeSwitch: () => void
}) {
	const {modalOpen, modalToggle} = props;
	
	return (
		<Modal
			open={modalOpen}
			onClose={modalToggle}
			className="flex justify-center items-center"
		>
			<div className="bg-gradient-to-tr from-teal-200 via-green-200 to-violet-400 p-4 rounded-lg">
				<div className="flex justify-between">
					<div className="font-bold text-2xl">
						Settings
					</div>
					<button
						className="rounded-lg px-2 py-1 font-bold border-2 border-black hover:bg-gradient-to-tr hover:from-orange-50 hover:to-red-50 hover:shadow-lg"
						onClick={modalToggle}
					>
						Close
					</button>
				</div>
				<ThemeSelector currentTheme={props.currentTheme} handleThemeSwitch={props.handleThemeSwitch}/>
				<GameMode/>
			</div>
		</Modal>
	);
}

export default Settings;