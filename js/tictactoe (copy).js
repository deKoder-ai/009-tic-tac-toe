'use strict'
// initialise game
const iGame = (function() {
    let sq = [];
    for (let i = 0; i < 9; i++) {
        sq[i] = null;
    }
    let player1 = null;
    let player2 = null;
    if (Math.floor(Math.random() * 2) < 1) {
        player1 = '0';
        player2 = 'X';
    } else {
        player1 = 'X';
        player2 = '0';
    }
    document.getElementById('status').innerText = `Current Player: ${player1}`
    return { player1, player2, sq };
})();

function playGame() {
    const resetGame = (function () {
        function resetGame() {
            for (let i = 0; i < 9; i++) {
                iGame.sq[i] = null;
                displayChoice(i, null);
            }
        }
        const resetBtn = document.getElementById('reset-game-btn');
        resetBtn.addEventListener('click', function() {
            resetGame();
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
                winMessage(winner);
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
    let player = iGame.player1;
    const body = document.querySelector('body');
    body.addEventListener('click', function(e) {
        if (!checkWin(player)) {
            switch (e.target.id) {
                case 'board-01':
                    if (!iGame.sq[0]) {
                        iGame.sq[0] = player;
                        displayChoice(0, player);
                        player = switchPlayer(player);
                        checkWin(player);
                    }
                    break;
                case 'board-02':
                    if (!iGame.sq[1]) {
                        iGame.sq[1] = player;
                        displayChoice(1, player);
                        player = switchPlayer(player);
                        checkWin(player);
                    }
                    break;
                case 'board-03':
                    if (!iGame.sq[2]) {
                        iGame.sq[2] = player;
                        displayChoice(2, player);
                        player = switchPlayer(player);
                        checkWin(player);
                    }
                    break;
                case 'board-04':
                    if (!iGame.sq[3]) {
                        iGame.sq[3] = player;
                        displayChoice(3, player);
                        player = switchPlayer(player);
                        checkWin(player);
                    }
                    break;
                case 'board-05':
                    if (!iGame.sq[4]) {
                        iGame.sq[4] = player;
                        displayChoice(4, player);
                        player = switchPlayer(player);
                        checkWin(player);
                    }
                    break;
                case 'board-06':
                    if (!iGame.sq[5]) {
                        iGame.sq[5] = player;
                        displayChoice(5, player);
                        player = switchPlayer(player);
                        checkWin(player);
                    }
                    break;
                case 'board-07':
                    if (!iGame.sq[6]) {
                        iGame.sq[6] = player;
                        displayChoice(6, player);
                        player = switchPlayer(player);
                        checkWin(player);
                    }
                    break;
                case 'board-08':
                    if (!iGame.sq[7]) {
                        iGame.sq[7] = player;
                        displayChoice(7, player);
                        player = switchPlayer(player);
                        checkWin(player);
                    }
                    break;
                case 'board-09':
                    if (!iGame.sq[8]) {
                        iGame.sq[8] = player;
                        displayChoice(8, player);
                        player = switchPlayer(player);
                        checkWin(player);
                    }
                    break;
            }
        }
    })
};

playGame();








// fill board with random choices
// for (let i = 0; i < 9; i++) {
//     if (Math.floor(Math.random() * 2) < 1) {
//         boardElements[i].innerText = '0';
//         boardElements[i].style.color = 'white';
//     } else {
//         boardElements[i].innerText = 'X';
//     }
// }