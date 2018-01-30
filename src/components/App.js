import React, {Component} from 'react';
import Board from '../presentational/Board';
import Title from '../presentational/Title';
import Navigation from '../presentational/Navigation';
import sudoku from 'sudoku-umd';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialBoard: '',
            board: '',
            error: '',
            newGameClicked: false,
            movesArray: []
        }
    }

    startNewGame(level){
        const newGame = sudoku.generate(level);
        this.setState({
            board : newGame,
            initialBoard: newGame,
            error : '',
            newGameClicked: false
        });
    }

    newGameHandler() {
        this.setState({newGameClicked: true})
    }

    restartNewGame(){
        this.setState({
            board : this.state.initialBoard,
            error : ''
        });
    }

    solveSudoku(){
        if (sudoku.solve(this.state.board)) {
            this.setState({
                board : sudoku.solve(this.state.board),
                error : ''
            });
        } else {
            this.setState({error: "Sorry, but not all entered numbers are correct."});
        }
    }

    checkSudoku(){
        if (this.state.board !== this.state.initialBoard) {
            if (this.state.board === sudoku.solve(this.state.board)) {
                this.setState({error: "Great job! You win!"});
            } else if (sudoku.solve(this.state.board)) {
                this.setState({error: "So far so good!"});
            } else {
                this.setState({error: "Sorry, but not all entered numbers are correct."});
            }
        }   
    }

    onChangeHandler(value, id) {
        var array = this.state.board.split('').map((tile, index) => 
            (index === parseInt(id, 0)) ? ((value !== "") && (value < 10) && (value > 0) ? value : ".") : tile)
        .join('');
        this.setState({
            board : array,
            error : ""
        });
        this.setMovesArray(id, value);
    }

    setMovesArray(id, value) {
        var allMoves = this.state.movesArray.concat([{id, value}]);
        this.setState({movesArray : allMoves});
    }

    undoHandler() {
        var movesArrayLength = this.state.movesArray.length;
        if (movesArrayLength) {
            var removedTileId = this.state.movesArray[movesArrayLength-1].id;
            var newMovesArray = this.state.movesArray.slice(0, movesArrayLength-1);
            var prevTileValueArray = newMovesArray.filter(move => move.id === removedTileId);

            var prevTileValue = (prevTileValueArray.length > 0 && prevTileValueArray[prevTileValueArray.length-1].value !== "") ? 
            prevTileValueArray[prevTileValueArray.length-1].value : ".";

            var newBoard = this.state.board.split('').map((tile, index) => (index === parseInt(removedTileId,0)) ? prevTileValue : tile).join('');
            this.setState({
                board : newBoard,
                movesArray: newMovesArray
            });
        }
    }

    render() {
        return (
            <div>
                <Title/>
                <Navigation
                    newGameHandler={() => this.newGameHandler()}
                    startNewGame={(level) => this.startNewGame(level)}
                    restartNewGame={() => this.restartNewGame()}
                    checkSudoku={() => this.checkSudoku()}
                    solveSudoku={() => this.solveSudoku()}
                    error={this.state.error}
                    newGameClicked={this.state.newGameClicked}
                />
                <Board 
                    board={this.state.board.split('')} 
                    initialBoard={this.state.initialBoard.split('')} 
                    onChange={(value, id) => this.onChangeHandler(value, id)}
                />
                {
                    this.state.board ? <button onClick={() => this.undoHandler()} className="undo-button">UNDO</button> : null
                }
            </div>
        );
    }
}

export default App;