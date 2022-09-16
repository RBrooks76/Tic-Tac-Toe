import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const rowStyle = {
    display: 'flex'
}

const squareStyle = {
    'width': '60px',
    'height': '60px',
    'backgroundColor': '#ddd',
    'margin': '4px',
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    'fontSize': '20px',
    'color': 'white'
}

const boardStyle = {
    'backgroundColor': '#eee',
    'width': '208px',
    'alignItems': 'center',
    'justifyContent': 'center',
    'display': 'flex',
    'flexDirection': 'column',
    'border': '3px #eee solid'
}

const containerStyle = {
    'display': 'flex',
    'alignItems': 'center',
    'flexDirection': 'column'
}

const instructionsStyle = {
    'marginTop': '5px',
    'marginBottom': '5px',
    'fontWeight': 'bold',
    'fontSize': '16px',
}

const buttonStyle = {
    'marginTop': '15px',
    'marginBottom': '16px',
    'width': '80px',
    'height': '40px',
    'backgroundColor': '#8acaca',
    'color': 'white',
    'fontSize': '16px',
}

class Square extends React.Component {
    render(props) {
        return (
            <div
                className="square"
                style={squareStyle}
                onClick={() => this.props.clickSquare(this.props.squareRowIndex, this.props.squareColumnIndex)}
            >
                {this.props.selected == 0 ? "" : (this.props.selected == 1 ? "O" : "X")}
            </div>
        );
    }
}

class Board extends React.Component {
    constructor() {
        super();
        this.state = {
            currentPlayer: 0,
            gameBoard: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
            winPlayer: -1,
            gameEnd: false
        };
    }

    clickSquare = (row, column) => {
        if (this.state.gameBoard[row][column] != 0 || this.state.gameEnd == true) {
            return;
        }

        console.log(this.state);
        const tempBoard = this.state.gameBoard;
        tempBoard[row][column] = this.state.currentPlayer + 1;
        this.setState({
            gameBoard: tempBoard
        });
        this.checkGameEnd();
        this.setState({
            currentPlayer: (this.state.currentPlayer + 1) % 2
        });

    }

    checkGameEnd = () => {
        for (var i = 0; i < 3; i++) {
            if ((this.state.gameBoard[i][0] == this.state.gameBoard[i][1] && this.state.gameBoard[i][0] == this.state.gameBoard[i][2] && this.state.gameBoard[i][0] != 0) || (this.state.gameBoard[0][i] == this.state.gameBoard[1][i] && this.state.gameBoard[0][i] == this.state.gameBoard[2][i] && this.state.gameBoard[0][i] != 0)) {

                this.setState({
                    winPlayer: this.state.currentPlayer,
                    gameEnd: true
                });
                return;
            }
        }
        if ((this.state.gameBoard[0][0] == this.state.gameBoard[1][1] && this.state.gameBoard[0][0] == this.state.gameBoard[2][2] && this.state.gameBoard[0][0] != 0) || (this.state.gameBoard[0][2] == this.state.gameBoard[1][1] && this.state.gameBoard[0][2] == this.state.gameBoard[2][0] && this.state.gameBoard[0][2] != 0)) {

            this.setState({
                winPlayer: this.state.currentPlayer,
                gameEnd: true
            });
            return;
        }
        var cnt = 0;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (this.state.gameBoard[i][j] == 0) {
                    cnt++;
                }
            }
        }
        if (cnt == 0) {
            this.setState({
                gameEnd: true
            });
            return;
        }
    }

    resetGame = () => {
        this.setState({
            currentPlayer: 0,
            gameBoard: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
            winPlayer: -1,
            gameEnd: false
        });
    }

    render() {
        return (
            <div style={containerStyle} className="gameBoard">
                <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>Player{this.state.currentPlayer + 1}</span></div>
                {
                    this.state.winPlayer == -1 ?
                        <></> :
                        <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>Player{this.state.winPlayer + 1}</span></div>
                }
                <button style={buttonStyle} onClick={this.resetGame}>Reset</button>
                <div style={boardStyle}>
                    <div className="board-row" style={rowStyle}>
                        <Square clickSquare={this.clickSquare} squareRowIndex="0" squareColumnIndex="0" selected={this.state.gameBoard[0][0]} />
                        <Square clickSquare={this.clickSquare} squareRowIndex="0" squareColumnIndex="1" selected={this.state.gameBoard[0][1]} />
                        <Square clickSquare={this.clickSquare} squareRowIndex="0" squareColumnIndex="2" selected={this.state.gameBoard[0][2]} />
                    </div>
                    <div className="board-row" style={rowStyle}>
                        <Square clickSquare={this.clickSquare} squareRowIndex="1" squareColumnIndex="0" selected={this.state.gameBoard[1][0]} />
                        <Square clickSquare={this.clickSquare} squareRowIndex="1" squareColumnIndex="1" selected={this.state.gameBoard[1][1]} />
                        <Square clickSquare={this.clickSquare} squareRowIndex="1" squareColumnIndex="2" selected={this.state.gameBoard[1][2]} />
                    </div>
                    <div className="board-row" style={rowStyle}>
                        <Square clickSquare={this.clickSquare} squareRowIndex="2" squareColumnIndex="0" selected={this.state.gameBoard[2][0]} />
                        <Square clickSquare={this.clickSquare} squareRowIndex="2" squareColumnIndex="1" selected={this.state.gameBoard[2][1]} />
                        <Square clickSquare={this.clickSquare} squareRowIndex="2" squareColumnIndex="2" selected={this.state.gameBoard[2][2]} />
                    </div>
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
            </div>
        );
    }
}

export default Game;