import React, {useEffect, useState} from 'react';
import {IoMdSettings} from "react-icons/io";
import {Modal} from "@mui/material";
import Settings from "./Settings/Settings";

function Navbar() {
	const [modalOpen, setModalOpen] = useState(false);
	const [theme, setTheme] = useState("");
	
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
	
	return (
		<nav
			
			className="bg-gray-300 dark:bg-gray-950 border-b-2 border-gray-200 dark:border-gray-950 "
		>
			<Settings
				modalOpen={modalOpen}
				modalToggle={modalToggle}
				currentTheme={theme}
				handleThemeSwitch={handleThemeSwitch}
			/>
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<span
					className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
					Tic Tac Toe
				</span>
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
