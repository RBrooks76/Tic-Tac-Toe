import React, { useEffect, useState } from "react";
import "./App.css";

const Square = (props) => (
  <button className="square" onClick={props.onClick}>
    {props.value}
  </button>
);

let number = 0;
const Board = (props) => {
  const renderSquare = (i) => (
    <Square value={props.squares[i]} onClick={() => props.onClick(i)} />
  );
  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const Game = () => {
  const [state, setState] = useState({
    history: [
      {
        squares: Array(9).fill(null),
      },
    ],
    stepNumber: 0,
    xIsNext : true,
    oIsNext : true,
    cnt : 0,
    score1 : 0,
    score2 : 0
  });


  const history = state.history;
  const current = history[state.stepNumber];

  const handleClick = (i) => {
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

      setState({
        history: history.concat([
          {
            squares: squares,
          },
        ]),
        stepNumber: history.length,
        xIsNext: !state.xIsNext,
        score1 : state.score1,
        score2 : state.score2,
      });

    squares[i] = state.xIsNext ? "X" : "O";

    const result = calculateWinner(squares);
    if(result != null){
      if(result === 'X') setState({
          history: [
            {
              squares: Array(state.stepNumber).fill(null),
            },
          ],
          stepNumber : 0,
          xIsNext: true,
          score1 : state.score1 + 1,
          score2 : state.score2
        });
      if(result === 'O') setState({
        history: [
          {
            squares: Array(state.stepNumber).fill(null),
          },
        ],
        stepNumber : 0,
        xIsNext: true,
        score1 : state.score1,
        score2 : state.score2 + 1});
    } else {
      // setState({
      //   history: [
      //     {
      //       squares: Array(state.stepNumber).fill(null),
      //     },
      //   ],
      //   stepNumber : 0,
      //   xIsNext: true,
      //   score1 : state.score1,
      //   score2 : state.score2
      // });
    }
  };

  const resetScore = () => {
    setState({
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      score1 : 0,
      score2: 0
    });
  }

  const newGame = () => {
    setState({
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      score1 : state.score1,
      score2 : state.score2,
    });

  }


  // const history = state.history;
  // const current = history[state.stepNumber];
  // const winner = calculateWinner(current.squares);
  // let status;

  //   if (winner) {
  //     status = "Winner: " + winner;
  //   } else {
  //     status = "Next player: " + (state.xIsNext ? "X" : "O");
  //   }

  return (
    <div className="game">
      <div className="title">
          <span>Tic Tac Toe</span>
      </div>
      <div className="game-body">
        <div className="player-board">
          <div className="player-board-content">
            <div className="player">
              <span>player 1</span>
            </div>
            <div className="score">
              <span>Score : { state.score1 }</span>
            </div>
          </div>
        </div>
        <div className="game-board">
          <Board squares={current.squares} onClick={(i) => handleClick(i)} />
        </div>
        <div className="player-board">
          <div className="player-board-content">
            <div className="player">
              <span>player 2</span>
            </div>
            <div className="score">
              <span>Score : { state.score2 }</span>
            </div>
          </div>
        </div>
      </div>
      <div className="game-info">
        {/* <div>{status}</div> */}
      </div>
      <div className="game-buttons">
        <button className="btn" onClick={() => newGame()}>New Game</button>
        <button className="btn" onClick={() => resetScore()}>Reset Scores</button>
      </div>
    </div>
  );
};

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
