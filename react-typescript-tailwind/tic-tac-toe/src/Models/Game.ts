import Slot from "./Slot";

class Game {
	player1: string;
	player2: string;
	slots: Slot[];
	time: Date;
	verdict: string;
	winner?: string;
	
	
	constructor(player1: string, player2: string, slots: Slot[], time: Date, verdict: string, winner?: string) {
		this.player1 = player1;
		this.player2 = player2;
		this.slots = slots;
		this.time = time;
		this.verdict = verdict;
		this.winner = winner;
	}
}

export default Game;