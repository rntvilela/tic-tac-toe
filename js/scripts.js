const Gameboard = {
	board : [
		["", "", "", "", "", "", "", "", ""],
	],
	x : 0,
	o : 0,
	turn : false,
	mode : false
}

const clearboard = () => {
	const cells = document.querySelectorAll('.cell');
	
	for (let i = 0; i < cells.length; i++) {
		Gameboard.board[i] = "";
		cells[i].textContent = Gameboard.board[i];
	}
}

const updatescore = (op, value) => {
	const xscore = document.getElementById('x-score');
	const oscore = document.getElementById('o-score');
	
	if (op === 1) {
		Gameboard.x = value;
		xscore.textContent = `X - ${Gameboard.x}`;
	}
	else if (op === 2) {
		Gameboard.o = value;
		oscore.textContent = `O - ${Gameboard.o}`;
	}
	else {
		Gameboard.x = value;
		xscore.textContent = `X - ${Gameboard.x}`;
		Gameboard.o = value;
		oscore.textContent = `O - ${Gameboard.o}`;
	}
}

const restart = () => {
	Gameboard.turn = false;
	Gameboard.mode = false;
	Gameboard.board = ["", "", "", "", "", "", "", "", ""];
	updatescore(0, 0);
	clearboard();
}

const checkwin = () => {
	for (let i = 0; i < 9; i+=3) {
		if (Gameboard.board[i] && ((Gameboard.board[i] === Gameboard.board[i + 1]) && (Gameboard.board[i] === Gameboard.board[i + 2]))) return true;
	}	
	
	for (let i = 0; i < 3; i++) {
		if (Gameboard.board[i] && ((Gameboard.board[i] === Gameboard.board[i + 3]) && (Gameboard.board[i] === Gameboard.board[i + 6]))) return true;
	}
	
	if (Gameboard.board[0] && ((Gameboard.board[0] === Gameboard.board[4]) && (Gameboard.board[0] === Gameboard.board[8]))) return true;

	if (Gameboard.board[2] && ((Gameboard.board[2] === Gameboard.board[4]) && (Gameboard.board[2] === Gameboard.board[6]))) return true;

	return false
}

document.addEventListener('DOMContentLoaded', () => {
	const cells = document.querySelectorAll('.cell');
	const rst_btn = document.getElementById('restart');
	const pvp_btn = document.getElementById('pvp');
	const pva_btn = document.getElementById('pva');

	restart();

	pvp_btn.addEventListener('click', () => {
		Gameboard.mode = false;
	});
	
	pva_btn.addEventListener('click', () => {
		Gameboard.mode = true;
	});

	rst_btn.addEventListener('click', () => {
		restart();
	});
	

	let mark;
	for (let i = 0; i < cells.length; i++) {
		cells[i].addEventListener('click', () => {
			if (!Gameboard.turn) mark = "X";
			else mark = "O";

			if (!Gameboard.board[i]) {
				Gameboard.board[i] = mark;
				cells[i].textContent = Gameboard.board[i];
				Gameboard.turn = !Gameboard.turn;
				if (checkwin()) {
					if (Gameboard.turn) updatescore(1, Gameboard.x + 1);
					else updatescore(2, Gameboard.o + 1); 
					Gameboard.turn = false;
					clearboard();
				}
			}
		});
	}
});
