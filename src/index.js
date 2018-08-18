import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// class Square extends React.Component {
// constructor(){
//     super();
//     this.state ={
//         value:null
//     };
// }
// render() {
//     return (
//         <button className="square" onClick={() =>this.props.onClick()}>
//             {this.props.value}
//         </button>
//     );
// }

// function Square(props){
//     return(
//         <button className="square" onClick={props.onClick}>
//             {props.value}
//         </button>
//     );
// }

// }

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {

    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
                <div>
                    <div className="board-row">
                        {this.renderSquare(0)}
                        {this.renderSquare(1)}
                        {this.renderSquare(2)}
                    </div>
                    <div className="board-row">
                        {this.renderSquare(3)}
                        {this.renderSquare(4)}
                        {this.renderSquare(5)}
                    </div>
                    <div className="board-row">
                        {this.renderSquare(6)}
                        {this.renderSquare(7)}
                        {this.renderSquare(8)}
                    </div>
                </div>
                <div>
                    <button onClick={this.props.resetClick}
                            className="reset-btn">重新开始
                    </button>
                </div>
            </div>
        );
    }
}

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

class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            history:[{
                squares:Array(9).fill(null),
            }],
            stepNumber:0,
            xIsNext:true,
            isWinner:false,
        };
    }

    handleClick(i){
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const squares = current.squares.slice();
        console.log('current state:',squares)
        if(calculateWinner(squares) || squares[i]){
            console.log('游戏已结束！！！')
            return;
        }
        console.log('hostory:',history)
        squares[i] = this.state.xIsNext ? 'X':'O';
        // this.setState({squares:squares});
        this.setState({
            history:history.concat([{squares:squares}]),
            stepNumber:history.length,
            xIsNext:!this.state.xIsNext,
        });

        var isEnd = true;
        for (var index = 0;index<squares.length;index++){
            // console.log('item:',squares[index]);
            if(!squares[index]){
                isEnd = false;
            }
        }
        if(isEnd && !this.state.isWinner){
            console.log('游戏结束 平局！！');
        }
    }

    reset(){
        console.log('reset click',this.state.history);
        // let history = [{
        //     squares:Array(9).fill(null),
        // }];
        let historyDefault = [{
            squares:Array(9).fill(null),
        }];

        this.setState({
            history:historyDefault,
            stepNumber:0,
            xIsNext:true,
            isWinner:false
        });
        console.log('reset data:', this.state);
    }

    jumpTo(step){
        this.setState({
            stepNumber:step,
            xIsNext:(step % 2) ? false:true,
        });
    }

    render() {
        console.log('render start');
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        console.log('render state:',this.state);
        const winner = calculateWinner(current.squares);
        // console.log('winner:',winner);
        const moves = history.map((step, move) => {
            const desc = move ?
                'Move #' + move :
                'Game start';
            return (
                <li key={move}>
                    <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
                </li>
            );
        });
        let status;
        let result = '';
        if(winner){
            status = 'winner:' + winner;
            this.state.isWinner = true;
            result = winner+'胜利 游戏结束！！';
            // alert(winner + "赢了！");
        }else{
            status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O');
        }

        let historyDefault = [{
            squares:Array(9).fill(null),
        }];

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares = {current.squares}
                        onClick = {(i) => this.handleClick(i)}
                        resetClick = {this.reset.bind(this)}
                    />
                </div>
                <div className="game-info">
                    <div>{ status }</div>
                    <ol>{ moves }</ol>
                </div>
                <div className="result">
                    <div>{result}</div>
                </div>
            </div>
        );

    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
