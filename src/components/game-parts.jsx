export function Square(props) {
    function getApplicableClass() {
      if(props.classManager.apply_class) {
        return props.classManager.apply_to.includes(props.index)  ? props.classManager.class : '';
      }
    }

    return (
      <div className="square" onClick={(e) => {props.onClick(e)}}>
        {props.classManager.apply_class && <div className={getApplicableClass()}></div>}
        <span className="square-span">
          {props.value}
        </span>
      </div>
    );
};

export function Board(props) {

    const renderSquare = (i) => {
      return <Square value={props.squares[i]} index={i} onClick={(e) => props.onClick(i, e)} classManager={props.uiProp}/>;
    }
  
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
}

export function GameHistory(props) {
    function getLastMove() {
      return (props.gameStats.history.length - 2);
    }

    return (
        <div className="game-info">
            {
              (props.gameStats.history.length > 1 && props.gameStats.allowUndo === 'yes') && 
              <ol>
                {
                  <li><button onClick={() => props.onClick(getLastMove())}>Undo</button></li>
                }
              </ol>
            }
            {/* { (!props.compPlay && props.history.length > 1) &&
                <ol>
                    {
                        props.history.map((square, move) => <li key={move}><button onClick={() => props.onClick(move)}>Go To {move ? move : 'Start'}</button></li>)
                    }
                </ol>

            } */}
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