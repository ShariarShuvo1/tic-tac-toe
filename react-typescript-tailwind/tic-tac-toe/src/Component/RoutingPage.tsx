import { Outlet } from "react-router-dom";
import React from "react";
import Navbar from "./Navbar/Navbar";

function RoutingPage() {
	return (
		<>
			<Outlet />
		</>
	);
}

export default RoutingPage;