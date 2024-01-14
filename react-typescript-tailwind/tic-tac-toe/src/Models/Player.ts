class Player{
	name: string;
	type: string;
	sign: number;
	status: string;
	
	constructor(name: string, type: string, sign: number, status: string = 'active'){
		this.name = name;
		this.type = type;
		this.sign = sign;
		this.status = status;
	}
	
	
}

export default Player;