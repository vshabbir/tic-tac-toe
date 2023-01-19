const gameService = {
  calculateWinner: (squares) => {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ]
  
    for (let i = 0; i < lines.length; i++) {
      const [a,b,c] = lines[i];
      if(squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
  
    return null;
  },

  getUsableSquares: (usedSquares) => {
    let allSquares = Array.from(Array(9).keys())
    let usableSquares = allSquares.filter((i) => {return !usedSquares.includes(i)});
    return usableSquares[Math.floor(Math.random() * usableSquares.length)];
  },

  isDraw: (usedSquares) => {
    return (usedSquares.length) === 9 ? true : false;
  },

  identifyGameStat(squares, usedSquares) {
    const game_stat = {stat: '', winner: '', game_over: false, flag: 'win'};
    let winner = this.calculateWinner(squares);
    if(winner) {
      game_stat.stat = 'Winner : ';
      game_stat.winner = winner;
      game_stat.game_over = true;
    }else if(this.isDraw(usedSquares)) {
      game_stat.stat = 'Draw';
      game_stat.game_over = true;
      game_stat.flag = 'draw';
    }

    return game_stat;
  }
}

export default gameService