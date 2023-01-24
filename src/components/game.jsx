import React from "react";
import { Setting, Board, GameHistory } from "./game-parts";
import gameService from "../services/game";
import { Header } from "./layout/header";

class Game extends React.Component {
    #gameOver = false;
    #noOfGamePlayed = 0;
    #noOfGamesWon = 0;
    #noOfGamesDraw = 0;

    constructor(props) {
        super(props);

        this.state = this.#getInitialState;
    }

    get #getInitialState() {
        return {
            history: [
                {
                squares: Array(9).fill(null)
                }
            ],
            xIsNext: true,
            playWithComp: false,
            usedSquares: [],
            compTurn: false,
            step: 0,
            noOfGamesPlayed: 0,
            gameStarted: false,
            noOfGamesDraw: 0,
            gameOver: false
        }
    }

    startGame = () => {
        if(!this.state.gameStarted) this.setState({gameStarted: true});
    }
    
    restartGame = () => {
        this.#gameOver = false;
        if(this.state.gameStarted) this.setState({
            ...this.#getInitialState,
            gameStarted: false,
            noOfGamesPlayed: this.#noOfGamePlayed,
            noOfGamesDraw: this.#noOfGamesDraw
        });
    }

    pauseGame = () => {
        this.setState({gameStarted: false});
    }
  
    handleClick = (i,e) => {
        if(!this.state.gameStarted) return;
        let history = this.state.history.slice(0, this.state.step + 1);
        let squares = history[history.length - 1].squares.slice();
        if(gameService.calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{squares: squares}]),
            xIsNext: !this.state.xIsNext,
            usedSquares: [...this.state.usedSquares, i],
            compTurn: !this.state.compTurn,
            step: history.length
        })
    }
  
    playWithComp(isChecked) {
        this.setState({playWithComp: isChecked});
    }
  
    autoPlayComp() {
        if(this.state.playWithComp && this.state.compTurn) {
            let compNum = gameService.getUsableSquares(this.state.usedSquares)
            this.whoIsPlaying = 'Computer is playing';
            setTimeout(() => {
            this.handleClick(compNum);
            }, 500);
        }else {
            this.whoIsPlaying = 'Player 2 is playing';
        }
    }

    undoMove = (move) => {
        const usedSquare = this.state.usedSquares.slice(0, move);
        this.setState({
            step: move,
            xIsNext: (move % 2) === 0,
            usedSquares: usedSquare
        })
    }
  
    componentDidUpdate() {
        this.autoPlayComp();
        if(this.#gameOver) {
            this.#gameOver = false;
            this.#noOfGamePlayed = this.state.noOfGamesPlayed + 1
        }
    }

    render() {
        let currentSquare = this.state.history[this.state.step].squares;
        let status;
        let stats = gameService.identifyGameStat(currentSquare, this.state.usedSquares);
        let button = '';
        if(stats.game_over) {
            status = stats.stat + ' ' + stats.winner
            this.#gameOver = true;
            if(stats.flag === 'draw') this.#noOfGamesDraw = this.state.noOfGamesDraw + 1;
            button = <button onClick={this.restartGame}>New Game</button>
        }else {
            status = 'Next player: '+(this.state.xIsNext ? 'X' : 'O');
        }
        return (
          <div className="game">
            <Header onPlay={this.startGame} gameStarted={this.state.gameStarted} onRestart={this.restartGame} onPause={this.pauseGame}/>
            <Setting compPlay={(e) => {this.playWithComp(e)}} isChecked={this.state.playWithComp}/>
            <div className="game-board">
                <div className="status">
                    {status}
                    {button}
                </div>
                <div className="square-board">
                <Board squares={currentSquare} onClick={this.handleClick}/>
                </div>
            </div>
            <GameHistory history={this.state.history} onClick={this.undoMove} gameStats={this.state} noOfGamesPlayed={this.state.noOfGamesPlayed}/>
          </div>
        );
    }
}

export default Game