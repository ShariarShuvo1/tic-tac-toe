function ThemeSelector(props: { currentTheme: string, handleThemeSwitch: () => void }) {
	return (
		<label className=" relative inline-flex items-center cursor-pointer mt-6">
			<input onChange={props.handleThemeSwitch} type="checkbox" value="" className="sr-only peer"
			       checked={props.currentTheme === "dark"}
			/>
			<div
				className="border-gray-300 dark:border-gray-800 border-2 w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gray-950">
			</div>
			<span
				className="ms-3 text-sm font-bold text-black"
			>
				Turn on {props.currentTheme === "dark" ? "Light" : "Dark"} mode
			</span>
		</label>
	);
}

export default ThemeSelector;
