import Slot from "./Slot";
import Player from "./Player";

class Game {
	player1: Player;
	player2: Player;
	slots: Slot[];
	time: Date;
	gameType: string;
	verdict: string;
	winner?: Player;
	
	
	constructor(player1: Player, player2: Player, slots: Slot[], time: Date, gameType: string, verdict: string, winner?: Player) {
		this.player1 = player1;
		this.player2 = player2;
		this.slots = slots;
		this.time = time;
		this.gameType = gameType;
		this.verdict = verdict;
		this.winner = winner;
	}
}

export default Game;