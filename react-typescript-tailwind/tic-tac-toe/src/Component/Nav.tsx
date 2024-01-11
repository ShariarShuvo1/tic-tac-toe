import React, {useEffect, useState} from 'react';

function Nav() {
	const [theme, setTheme] = useState("");

	useEffect(() => {
		if(window.matchMedia('(prefers-color-scheme: dark)').matches){
			setTheme('dark');
		}
		else {
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

	return (
		<nav className="bg-gradient-to-br from-emerald-100 via-emerald-100 to-lime-100 border-b-2 border-gray-200 dark:border-gray-950 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-900 dark:to-gray-950">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Tic Tac Toe</span>
				<label className=" relative inline-flex items-center cursor-pointer">
					<input onChange={handleThemeSwitch} type="checkbox" value="" className="sr-only peer" checked={theme === "dark"}/>
					<div className="border-gray-300 dark:border-gray-800 border-2 w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gray-950">
					</div>
					<span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Turn on {theme==="dark"?"Light":"Dark"} mode</span>
				</label>
			</div>
		</nav>

	);
}

export default Nav;
