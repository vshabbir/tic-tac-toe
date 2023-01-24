export const Setting = (props) => {
    const onCompPlay = (e) => {
        const {checked} = e.target;
        props.compPlay(checked);
      }
    
    return (
        <div>
        <div className="checkbox-div">
            <input type={"checkbox"} onChange={onCompPlay} checked={props.isChecked}/>
            <label>Play with computer</label>
        </div>
        </div>
    )
};

export function Square(props) {
    return (
      <button className={`square`} onClick={(e) => {props.onClick(e)}}>
          {props.value}
        </button>
    );
};

export function Board(props) {

    const renderSquare = (i) => {
      return <Square value={props.squares[i]} onClick={(e) => props.onClick(i, e)} />;
    }
  
    return (
      <div>
        {/* <div><p>{this.whoIsPlaying}</p></div> */}
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
        {/* <button onClick={() => this.restartGame()}>{button_text}</button> */}
      </div>
    );
}

export function GameHistory(props) {
    return (
        <div className="game-info">
            { (!props.compPlay && props.history.length > 1) &&
                <ol>
                    {
                        props.history.map((square, move) => <li key={move}><button onClick={() => props.onClick(move)}>Go To {move ? move : 'Start'}</button></li>)
                    }
                </ol>

            }
            <div className="winner-info">
                <div>
                    <ul>
                        <li>No of games played : <b>{props.gameStats.noOfGamesPlayed}</b></li>
                        <li>No of draws : <b>{props.gameStats.noOfGamesDraw}</b></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}