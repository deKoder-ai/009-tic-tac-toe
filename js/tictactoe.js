'use strict'



// initialise game
const iGame = (function() {
    // initialise game array with null fill
    let sq = [];
    for (let i = 0; i < 9; i++) {
        sq[i] = null;
    }
    // set player1 randomly to x or o
    let player1 = null;
    if (Math.floor(Math.random() * 2) < 1) {
        player1 = '0';
    } else {
        player1 = 'X';
    }
    // display starting player
    document.getElementById('status').innerText = `Current Player: ${player1}`
    return { player1, sq };
})();
// game logic
const playGame = (function() {
    const Game = {
        xScore: 0,
        oScore: 0,
        player: iGame.player1,
        winner: null,
        gameOver: false,
        sq: iGame.sq,
        resetGame: function() {
            for (let i = 0; i < 9; i++) {
                this.sq[i] = null;
                this.displayChoice(i, null);
                let x = document.getElementById(`board-0${i + 1}`);
                x.style.backgroundColor = '';
                this.gameOver = false;
                if (Math.floor(Math.random() * 2) < 1) {
                    this.player = '0';
                } else {
                    this.player = 'X';
                }
            }
            document.getElementById('status').innerText = `Current Player: ${this.player}`
        },
        resetScore: function() {
            this.xScore = 0;
            this.oScore = 0;
            document.getElementById('o-SCORE').innerText = `${Game.oScore}`;
            document.getElementById('x-SCORE').innerText = `${Game.xScore}`;
        },
        switchPlayer: function() {
            if (this.player === '0') {
                this.player = 'X';
            } else {
                this.player = '0';
            }
            this.updateStatus();
        },
        updateStatus: function() {
            document.getElementById('status').innerText = `Current Player: ${this.player}`;
        },
        displayChoice: function(i, value) {
            const element = document.getElementById(`board-0${i + 1}`)
            element.innerText = value;
            if (value === '0') { 
                element.style.color = 'white';
            } else {
                element.style.color = 'var(--red)';
            }
        },
        winMessage: function() {
            document.getElementById('status').innerText = `${this.winner} Wins!`;
        },
        drawMessage: function() {
            document.getElementById('status').innerText = `It's a draw`;
        },
        checkDraw: function() {
            if (!this.winner && !this.sq.includes(null)) {
                console.log('draw');
                this.drawMessage();
                this.gameOver = true;
                return true;
            }
        },
        updateScore: function(winner) {
            if (winner === '0') {
                Game.oScore ++;
                document.getElementById('o-SCORE').innerText = `${Game.oScore}`;
            } else if (winner === 'X') {
                Game.xScore ++;
                document.getElementById('x-SCORE').innerText = `${Game.xScore}`;
            }
        },
        sqClick: function(i) {
            if (!this.sq[i]) {
                this.sq[i] = this.player;
                this.displayChoice(i, this.player);
                this.checkWinner();

                if (!this.checkDraw() && !this.gameOver) {
                    this.switchPlayer();
                }
            }
        },
        processWin: function(a, b, c) {
            this.gameOver = true;
            this.winner = this.sq[a];
            this.updateScore(this.winner);
            this.fillWinSquares(a, b, c);
        },
        fillWinSquares: function(a, b, c) {
            let sq1 = document.getElementById(`board-0${a + 1}`)
            let sq2 = document.getElementById(`board-0${b + 1}`)
            let sq3 = document.getElementById(`board-0${c + 1}`)
            sq1.style.backgroundColor = 'var(--sq-hover-col)';
            sq2.style.backgroundColor = 'var(--sq-hover-col)';
            sq3.style.backgroundColor = 'var(--sq-hover-col)';
        },
        checkWinner: function() {
            function winCheck(a, b, c) {
                if (Game.sq[a]) {
                    if (Game.sq[a] === Game.sq[b] && Game.sq[b] === Game.sq[c]) {
                        Game.processWin(a, b, c);
                    }
                }
            }
            // rows
            winCheck(0, 1, 2);
            winCheck(3, 4, 5);
            winCheck(6, 7, 8);
            // columns
            winCheck(0, 3, 6);
            winCheck(1, 4, 7);
            winCheck(2, 5, 8);
            // diagonals
            winCheck(0, 4, 8);
            winCheck(2, 4, 6);

            if (this.winner) {
                this.winMessage();
            } 

        }
    }

    // reset event listeners
    const resets = (function () {
        const resetBtn = document.getElementById('reset-game-btn');
        resetBtn.addEventListener('click', function() {
            Game.resetGame();
        })
        const resetScoreBtn = document.getElementById('reset-score-btn');
        resetScoreBtn.addEventListener('click', function() {
            Game.resetScore();
        })
    })();

    // game square event listen and respond
    const body = document.querySelector('body');
    body.addEventListener('click', function(e) {
        if (!Game.gameOver) {
            switch (e.target.id) {
                case 'board-01':
                    Game.sqClick(0);
                    break;
                case 'board-02':
                    Game.sqClick(1);
                    break;
                case 'board-03':
                    Game.sqClick(2);
                    break;
                case 'board-04':
                    Game.sqClick(3);
                    break;
                case 'board-05':
                    Game.sqClick(4);
                    break;
                case 'board-06':
                    Game.sqClick(5);
                    break;
                case 'board-07':
                    Game.sqClick(6);
                    break;
                case 'board-08':
                    Game.sqClick(7);
                    break;
                case 'board-09':
                    Game.sqClick(8);
                    break;
            }
        }
    })
})();

// Rewrite code to solve bugs

//  - Recreated the game using a traditional object to solve the bugs
//    that meant some lines weren't recognised as wins
//  - Rewrite draw logic