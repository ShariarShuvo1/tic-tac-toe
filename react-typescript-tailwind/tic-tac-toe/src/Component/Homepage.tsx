import Navbar from "./Navbar/Navbar";
import React from "react";
import Home from "./Homepage/Home";
import {useParams} from "react-router-dom";

function Homepage() {
	const { roomId } = useParams();
	return (
		<>
			<Navbar initialRoomNo={roomId?roomId:null}/>
			<Home/>
		</>
	);
}

export default Homepage;