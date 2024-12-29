'use strict'
// initialise game
const iGame = (function() {
    let sq = [];
    for (let i = 0; i < 9; i++) {
        sq[i] = null;
    }
    let player1 = null;
    if (Math.floor(Math.random() * 2) < 1) {
        player1 = '0';
    } else {
        player1 = 'X';
    }
    document.getElementById('status').innerText = `Current Player: ${player1}`
    return { player1, sq };
})();
// game logic
const playGame = (function() {
    let xScore = 0;
    let oScore = 0;
    let player = iGame.player1;
    let winnerMain = false;
    const resetGame = (function () {
        function resetGame() {
            for (let i = 0; i < 9; i++) {
                iGame.sq[i] = null;
                displayChoice(i, null);
                winnerMain = false;
                if (Math.floor(Math.random() * 2) < 1) {
                    player = '0';
                } else {
                    player = 'X';
                }
            }
        }
        const resetBtn = document.getElementById('reset-game-btn');
        resetBtn.addEventListener('click', function() {
            resetGame();
        })
    })();
    const resetScore = (function() {
        const resetScoreBtn = document.getElementById('reset-score-btn');
        resetScoreBtn.addEventListener('click', function() {
            xScore = 0;
            oScore = 0;
            document.getElementById('o-SCORE').innerText = `${oScore}`;
            document.getElementById('x-SCORE').innerText = `${xScore}`;
        })
    })();
    function switchPlayer(currentPlayer) {
        if (currentPlayer === '0') {
            return 'X';
        } else {
            return '0';
        }
    }
    function checkWin(current) {
        function updateStatus(player) {
            document.getElementById('status').innerText = `Current Player: ${player}`
        }
        function winMessage(winner) {
            document.getElementById('status').innerText = `${winner} Wins!`
        }
        let winner = null;
        if (!iGame.sq.includes(null)) {
            document.getElementById('status').innerText = `It's a draw`
        } else {
            if (iGame.sq[0] === iGame.sq[1] && iGame.sq[1] === iGame.sq[2]) {
                winner = iGame.sq[0];
            } else if (iGame.sq[3] === iGame.sq[4] && iGame.sq[4] === iGame.sq[5]) {
                winner = iGame.sq[3];
            } else if (iGame.sq[6] === iGame.sq[7] && iGame.sq[7] === iGame.sq[8]) {
                winner = iGame.sq[6];
            } else if (iGame.sq[0] === iGame.sq[3] && iGame.sq[3] === iGame.sq[6]) {
                winner = iGame.sq[0];
            } else if (iGame.sq[1] === iGame.sq[4] && iGame.sq[4] === iGame.sq[7]) {
                winner = iGame.sq[1];
            } else if (iGame.sq[2] === iGame.sq[5] && iGame.sq[5] === iGame.sq[8]) {
                winner = iGame.sq[2];
            } else if (iGame.sq[0] === iGame.sq[4] && iGame.sq[4] === iGame.sq[8]) {
                winner = iGame.sq[0];
            } else if (iGame.sq[2] === iGame.sq[4] && iGame.sq[4] === iGame.sq[6]) {
                winner = iGame.sq[2];
            };
            if (winner) {
                winnerMain = true;
                winMessage(winner);
                if (winner === '0') {
                    oScore ++;
                    document.getElementById('o-SCORE').innerText = `${oScore}`;
                } else {
                    xScore ++;
                    document.getElementById('x-SCORE').innerText = `${xScore}`;
                }
                console.log(oScore);
                console.log(xScore);
            } else {
                updateStatus(current);
            }
        }
        return winner;
    }
    function displayChoice(i, value) {
        const element = document.getElementById(`board-0${i + 1}`)
        element.innerText = value;
        if (value === '0') { 
            element.style.color = 'white';
        } else {
            element.style.color = 'var(--red)';
        }
    }
    function sqClick(i) {
        if (!iGame.sq[i]) {
            iGame.sq[i] = player;
            displayChoice(i, player);
            player = switchPlayer(player);
            checkWin(player);
        }
    }
    const body = document.querySelector('body');
    body.addEventListener('click', function(e) {
        if (!winnerMain) {
            switch (e.target.id) {
                case 'board-01':
                    sqClick(0);
                    break;
                case 'board-02':
                    sqClick(1);
                    break;
                case 'board-03':
                    sqClick(2);
                    break;
                case 'board-04':
                    sqClick(3);
                    break;
                case 'board-05':
                    sqClick(4);
                    break;
                case 'board-06':
                    sqClick(5);
                    break;
                case 'board-07':
                    sqClick(6);
                    break;
                case 'board-08':
                    sqClick(7);
                    break;
                case 'board-09':
                    sqClick(8);
                    break;
            }
        }
    })
})();
