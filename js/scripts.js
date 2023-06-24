const Tictactoe = {
	board : [
		["", "", "", "", "", "", "", "", ""],
	],
	x : 0,
	o : 0,
	turn : false,
	mode : false,
	move : 0,

	clearboard : () => {
		const cells = document.querySelectorAll('.cell');

		for (let i = 0; i < cells.length; i++) {
			Tictactoe.board[i] = "";
			cells[i].textContent = Tictactoe.board[i];
		}
	},

	updatescore : (op, value) => {
		const xscore = document.getElementById('x-score');
		const oscore = document.getElementById('o-score');

		if (op === 1) {
			Tictactoe.x = value;
			xscore.textContent = `X - ${Tictactoe.x}`;
		}
		else if (op === 2) {
			Tictactoe.o = value;
			oscore.textContent = `O - ${Tictactoe.o}`;
		}
		else {
			Tictactoe.x = value;
			xscore.textContent = `X - ${Tictactoe.x}`;
			Tictactoe.o = value;
			oscore.textContent = `O - ${Tictactoe.o}`;
		}
	},

	display : (msg) => {
		const board = document.querySelector('.board');
		const result = document.querySelector('.result');

		board.style.display = "none";
		result.style.display = "flex";

		result.textContent = msg;

		setTimeout( () => {
			board.style.display = "grid";
			result.style.display = "none";
		}, 1500);
	},

	restart : (score) => {
		Tictactoe.turn = false;
		Tictactoe.mode = false;
		Tictactoe.move = 0;
		Tictactoe.board = ["", "", "", "", "", "", "", "", ""];
		if (score) Tictactoe.updatescore(0, 0);
		Tictactoe.clearboard();
	},

	checkwin : () => {
		for (let i = 0; i < 9; i+=3) {
			if (Tictactoe.board[i] && ((Tictactoe.board[i] === Tictactoe.board[i + 1]) && (Tictactoe.board[i] === Tictactoe.board[i + 2]))) return true;
		}	

		for (let i = 0; i < 3; i++) {
			if (Tictactoe.board[i] && ((Tictactoe.board[i] === Tictactoe.board[i + 3]) && (Tictactoe.board[i] === Tictactoe.board[i + 6]))) return true;
		}

		if (Tictactoe.board[0] && ((Tictactoe.board[0] === Tictactoe.board[4]) && (Tictactoe.board[0] === Tictactoe.board[8]))) return true;

		if (Tictactoe.board[2] && ((Tictactoe.board[2] === Tictactoe.board[4]) && (Tictactoe.board[2] === Tictactoe.board[6]))) return true;

		return false
	},

	ia : () => {
		i = parseInt(Math.random() * 9);

		while

	}
}


document.addEventListener('DOMContentLoaded', () => {
	const cells = document.querySelectorAll('.cell');
	const rst_btn = document.getElementById('restart');
	const pvp_btn = document.getElementById('pvp');
	const pva_btn = document.getElementById('pva');

	Tictactoe.restart();

	pvp_btn.addEventListener('click', () => {
		Tictactoe.mode = false;
	});

	pva_btn.addEventListener('click', () => {
		Tictactoe.mode = true;
	});

	rst_btn.addEventListener('click', () => {
		Tictactoe.restart(1);
	});


	let mark;
	for (let i = 0; i < cells.length; i++) {
		cells[i].addEventListener('click', () => {
			if (!Tictactoe.turn) mark = "X";
			else mark = "O";

			if (!Tictactoe.board[i]) {
				Tictactoe.board[i] = mark;
				cells[i].textContent = Tictactoe.board[i];
				Tictactoe.turn = !Tictactoe.turn;
				Tictactoe.move++;
				if (Tictactoe.move >= 5) {
					if (Tictactoe.checkwin()) {
						if (Tictactoe.turn) {
							Tictactoe.updatescore(1, Tictactoe.x + 1);
							Tictactoe.display("X wins!");
							Tictactoe.restart();
						}
						else {
							Tictactoe.updatescore(2, Tictactoe.o + 1);
							Tictactoe.display("O wins!");
							Tictactoe.restart();
						}
					} else if (Tictactoe.move == 9) {
						Tictactoe.display("It's a tie!");
						Tictactoe.restart();
					}
				}

				if (Tictactoe.mode) {
					Tictactoe.ia();
				}
			}
		});
	}
});
