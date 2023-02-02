import React from "react";
import { Board, GameHistory } from "./game-parts";
import gameService from "../services/game";
import { Header } from "./layout/header";
import Setting from "./setting";

class Game extends React.Component {
    #gameOver = false;
    #noOfGamePlayed = 0;
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
            playWithComp: 'no',
            usedSquares: [],
            compTurn: false,
            step: 0,
            noOfGamesPlayed: 0,
            gameStarted: false,
            noOfGamesDraw: 0,
            gameOver: false,
            player1: 'X',
            settingsCompleted: false,
            allowUndo: 'no'
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
            noOfGamesDraw: this.#noOfGamesDraw,
            settingsCompleted: true,
            player1: this.state.player1,
            playWithComp: this.state.playWithComp
        });
    }

    pauseGame = () => {
        this.setState({gameStarted: false});
    }
  
    handleClick = (i,e) => {
        if(!this.state.gameStarted) return;
        let history = this.state.history.slice(0, this.state.step + 1);
        let squares = history[history.length - 1].squares.slice();
        if(gameService.calculateWinner(squares).game_over || squares[i]) {
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
  
    autoPlayComp() {
        if(this.state.playWithComp === 'yes' && this.state.compTurn) {
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
            xIsNext: (this.state.player1.toUpperCase() === 'X') ? ((move % 2) === 0) : (move % 2 !== 0),
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

    onSaveSetting = (player1, pwc, allowUndo) => {
        this.setState({
            player1: player1,
            playWithComp: pwc,
            settingsCompleted: true,
            xIsNext: player1 === 'X' ? true : false,
            allowUndo: allowUndo
        });
    }

    onOpenSetting = () => {
        this.setState({
            ...this.#getInitialState,
            settingsCompleted: false,
            player1: this.state.player1,
            playWithComp: this.state.playWithComp,
            allowUndo: this.state.allowUndo
        })
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
            <Header onPlay={this.startGame} settingCompleted={this.state.settingsCompleted} gameStarted={this.state.gameStarted} onRestart={this.restartGame} onPause={this.pauseGame} onOpenSetting={this.onOpenSetting}/>
            {
                this.state.settingsCompleted ? (
                    <>
                        <div className="game-board">
                            {
                                this.state.gameStarted &&
                                <div className="status">
                                    {status}
                                    {button}
                                </div>
                            }
                            <div className="square-board">
                            <Board squares={currentSquare} onClick={this.handleClick} uiProp={stats}/>
                            </div>
                        </div>
                        <GameHistory onClick={this.undoMove} gameStats={this.state} noOfGamesPlayed={this.state.noOfGamesPlayed}/>
                    </>
                ) : (<Setting saveSetting={this.onSaveSetting} stateConfig={this.state} />)
            }
          </div>
        );
    }
}

export default Game