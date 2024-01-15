import Player from "./Player";

class Slot {
	played: boolean;
	time: Date | null;
	player?: Player;
	
	constructor( played: boolean = false, time: Date | null = null, player?: Player) {
		this.player = player;
		this.played = played;
		this.time = time;
	}
}

export default Slot;