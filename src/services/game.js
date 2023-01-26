const gameService = {
  getUsableSquares: (usedSquares) => {
    let allSquares = Array.from(Array(9).keys())
    let usableSquares = allSquares.filter((i) => {return !usedSquares.includes(i)});
    return usableSquares[Math.floor(Math.random() * usableSquares.length)];
  },

  isDraw: (usedSquares) => {
    return (usedSquares.length) === 9 ? true : false;
  },

  identifyGameStat(squares, usedSquares) {
    let win_obj = this.calculateWinner(squares);

    if(!win_obj.game_over) {
      if(this.isDraw(usedSquares)) {
        win_obj.stat = 'Draw';
        win_obj.game_over = true;
        win_obj.flag = 'draw';
        win_obj.apply_class = false;
      }
    }

    return win_obj;
  },

  calculateWinner(squares) {
    let win_positions = {
      'v': [[0,3,6],[1,4,7],[2,5,8]],
      'h': [[0,1,2],[3,4,5],[6,7,8]],
      'br': [[0,4,8]], 'bl': [[2,4,6]]
    }

    let win_obj = {
      class: '',
      apply_to: [],
      winner: '',
      flag: 'win',
      game_over: false,
      stat: 'Winner : ',
      apply_class: false
    }

    Object.keys(win_positions).forEach(element => {
      for (let index = 0; index < win_positions[element].length; index++) {
        const [a,b,c] = win_positions[element][index];
        let css_class = 'line ';
        if((squares[a] === squares[b] && squares[a] === squares[c]) && (squares[a] && squares[b] && squares[c])) {
          switch (element) {
              case 'v':
                css_class += 'vertical-line';
                break;
              case 'h':
                css_class += 'horizontal-line';
                break
              case 'br':
                css_class += 'right-bottom-line';
                break;
              case 'bl':
                css_class += 'left-bottom-line';
                break;
              default:
                break;
            }
          win_obj.apply_to = [a,b,c];
          win_obj.winner = squares[a];
          win_obj.apply_class = true;
          win_obj.class = css_class;
          win_obj.game_over = true;
          break;
        }
        }
    });

    return win_obj;
  }
}

export default gameService