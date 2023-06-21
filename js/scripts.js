const Gameboard = {
	board : [
		["", "", "", "", "", "", "", "", ""],
	],
	x : 0,
	o : 0,
	turn : false,
}

const restart = () => {
	const cells = document.querySelectorAll('.cell');
	const xscore = document.getElementById('x-score');
	const oscore = document.getElementById('o-score');

	Gameboard.x = 0;
	Gameboard.o = 0;

	xscore.textContent = `X - ${Gameboard.x}`;
	oscore.textContent = `O - ${Gameboard.o}`;
	
	for (let i = 0; i < cells.length; i++) {
		Gameboard.board[i] = "";
		cells[i].textContent = Gameboard.board[i];
	}
}



document.addEventListener('DOMContentLoaded', () => {
	const cells = document.querySelectorAll('.cell');
	const rst_btn = document.getElementById('restart');

	rst_btn.addEventListener('click', () => {
		restart();
	});
	

	let mark;
	for (let i = 0; i < cells.length; i++) {
		cells[i].addEventListener('click', () => {
			if (!Gameboard.turn) mark = "X";
			else mark = "O";

			Gameboard.board[i] = mark;
			cells[i].textContent = Gameboard.board[i];
			Gameboard.turn = !Gameboard.turn;

			checkwin();
		});
	}




});
