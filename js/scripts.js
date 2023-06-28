const tictactoe = {
	board : ['', '', '', '', '', '', '', '', ''],
	x_score : 0,
	o_score : 0,
	turn : false,
	mode : false,
	move : 0,

	clear_board : function() {
		const cells = document.querySelectorAll('.cell');

		for (let i = 0; i < cells.length; i++) {
			this.board[i] = '';
			cells[i].textContent = this.board[i];
		}
	},

	player_action : function(i) {
		const cells = document.querySelectorAll('.cell');

		if (!this.turn) mark = 'X';
		else mark = 'O';

		this.board[i] = mark;
		cells[i].textContent = this.board[i];
		this.move++;
		this.turn = !this.turn;
	},

	update_score : function(player) {
		const x_score = document.getElementById('x-score');
		const o_score = document.getElementById('o-score');

		if (player === 'x') x_score.textContent = `X - ${++this.x_score}`;

		else if (player === 'o') o_score.textContent = `O - ${++this.o_score}`;
		
		else {
			this.x_score = 0;
			this.o_score = 0;
			x_score.textContent = `X - ${this.x_score}`;
			o_score.textContent = `O - ${this.o_score}`;
		}
	},

	display_result : function(msg) {
		const board = document.querySelector('.board');
		const result = document.querySelector('.result');
	
		setTimeout( () => {
			board.style.display = 'none';
			result.style.display = 'flex';
		}, 500);

		result.textContent = msg;

		setTimeout( () => {
			board.style.display = 'grid';
			result.style.display = 'none';
			tictactoe.restart();
		}, 1500);
	},

	restart : function(full) {
		this.turn = false;
		this.move = 0;
		this.board = ['', '', '', '', '', '', '', '', ''];
		if (full) {
			this.update_score();
			this.mode = false;
		}
		this.clear_board();
	},

	get_result : function() {
		if (this.move >= 5) {
			if (this.is_winning()) {
				if (this.turn) return 'X wins!';
				else return 'O wins!'
			} 
			else if (this.move === 9) return "It's a tie!"
		}
		return false;
	},

	is_winning : function() {
		for (let i = 0; i < 9; i+=3) if (this.board[i] && ((this.board[i] === this.board[i + 1]) && (this.board[i] === this.board[i + 2]))) return true;

		for (let i = 0; i < 3; i++) if (this.board[i] && ((this.board[i] === this.board[i + 3]) && (this.board[i] === this.board[i + 6]))) return true;

		if (this.board[0] && ((this.board[0] === this.board[4]) && (this.board[0] === this.board[8]))) return true;

		if (this.board[2] && ((this.board[2] === this.board[4]) && (this.board[2] === this.board[6]))) return true;

		return false
	},

	get_ia_move : function() {
		let i = parseInt(Math.random() * 9);

		while (this.board[i]) i = parseInt(Math.random() * 9);

		return i;
	}
}


document.addEventListener('DOMContentLoaded', () => {
	const cells = document.querySelectorAll('.cell');
	const rst_btn = document.getElementById('restart');
	const pvp_btn = document.getElementById('pvp');
	const pva_btn = document.getElementById('pva');

	pvp_btn.addEventListener('click', () => {
		tictactoe.mode = false;
	});

	pva_btn.addEventListener('click', () => {
		tictactoe.mode = true;
	});

	rst_btn.addEventListener('click', () => {
		tictactoe.restart(true);
	});


	let mark;
	let ia_move;
	for (let i = 0; i < cells.length; i++) {
		cells[i].addEventListener('click', () => {

			if (!tictactoe.board[i]) {
				tictactoe.player_action(i);
				
				let result = tictactoe.get_result();
				if (result) { 
					if (result === 'X wins!') tictactoe.update_score('x');
					else if (result === 'O wins!') tictactoe.update_score('o');
					tictactoe.display_result(result);
					return;	
				}

				if (tictactoe.mode) {
					ia_move = tictactoe.get_ia_move();
					tictactoe.player_action(ia_move);
					
					let result = tictactoe.get_result();
					if (result) { 
						if (result === 'X wins!') tictactoe.update_score('x');
						else if (result === 'O wins!') tictactoe.update_score('o');
						tictactoe.display_result(result);
						return;	
					}
				}
			}
		});
	}
});
