class Slot {
	player: string;
	played: boolean;
	time: Date | null;

	constructor(player: string = "", played: boolean = false, time: Date | null = null) {
		this.player = player;
		this.played = played;
		this.time = time;
	}
}

export default Slot;