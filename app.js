"use strict";


const Player = (sign) => {
    this.sign = sign;

    const getSign = () => {
        console.log('get sign')
        return sign;
    }

    return { getSign };
};

const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const setField = (index, sign) => {
        console.log('set field')
        if (index > board.length) return
        board[index] = sign;
    }

    const getField = (index) => {
        console.log('get field')
        if (index > board.length) return
        return board[index];
    }

    const clearBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    };

    return { getField, setField, clearBoard }
})();

const displayController = (() => {
    console.log('displayController')
    const fieldElements = document.querySelectorAll('.field');
    const messageElement = document.getElementById('message');


    fieldElements.forEach((field) => {
        field.addEventListener('click', (e) => {
            console.log('hello')
            if (gameController.getGameOver() || e.target.textContent !== '') return;
            gameController.playRound(parseInt(e.target.dataset.index));
            updateGameBoard();
        })
    });

    const updateGameBoard = () => {
        console.log('update')
        for (let i = 0; i < fieldElements.length; i++) {
            fieldElements[i].textContent = gameBoard.getField(i);
        }
    };

    const setResultMessage = (winner) => {
        console.log('result message ')
        if (winner === 'Draw') {
            setResultMessage("It's a draw!")
        } else {
            setMessageElement(`Player ${winner} has won!`);
        }
    };

    const setMessageElement = (message) => {
        messageElement.textContent = message;
    }

    return { setMessageElement, setResultMessage }
})();

const gameController = (() => {
    console.log('game controller')
    const playerOne = Player('x');
    const playerTwo = Player('O');
    let gameRound = 1;
    let gameOver = false;


    const playRound = (fieldIndex) => {
        console.log('playing round')
        gameBoard.setField(fieldIndex, getCurrentPlayerSign());//place sign of current player

        if (checkWinner(fieldIndex)) { //check for win
            //update a display message showing game is over and who the winner is
            displayController.setResultMessage(getCurrentPlayerSign());
            gameOver = true;
            return;
        }
        //round++
        if (gameRound === 9) {
            //update display that game is over and it is a draw game
            displayController.setResultMessage('Draw');
            gameOver = true;
            return;
        }
        gameRound++;
        displayController.setMessageElement(            //update display to show other players turn
            `Player ${getCurrentPlayerSign()}'s turn`
        );
    };

    const getCurrentPlayerSign = () => {
        return gameRound % 2 === 1 ? playerOne.getSign() : playerTwo.getSign();
    }

    const checkWinner = (fieldIndex) => {
        const winConditions = [
            [0, 1, 2],    //rows
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],    //columns
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],    //diagonal
            [2, 4, 6]
        ];

        return winConditions.filter((combination) => combination.includes(fieldIndex))
            .some((possibleCombination) =>
                possibleCombination.every(
                    (index) => gameBoard.getField(index) === getCurrentPlayerSign()
                )
            );
    }

    const getGameOver = () => {
        console.log('gameover')
        return gameOver;
    }

    const reset = () => {
        round = 1;
        gameOver = false;
    }

    return { playRound, getGameOver, reset }
})();








