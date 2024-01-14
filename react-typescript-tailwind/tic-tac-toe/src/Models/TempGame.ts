import Slot from "./Slot";
import Player from "./Player";

class TempGame {
	player1: Player;
	player2: Player;
	slots: Slot[];
	time: Date;
	gameType: string;
	verdict: string;
	winner?: string;
	
	
	constructor(player1: Player, player2: Player, slots: Slot[], time: Date, gameType: string, verdict: string, winner: string) {
		this.player1 = player1;
		this.player2 = player2;
		this.slots = slots;
		this.time = time;
		this.gameType = gameType;
		this.verdict = verdict;
		this.winner = winner;
	}
}

export default TempGame;