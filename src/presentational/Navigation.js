import React from 'react';

const Navigation = (props) => {
    return (
        <div className="nav">
            <button onClick={() => props.newGameHandler()}>New Game</button>
            <button onClick={() => props.restartNewGame()}>Restart</button>
            <button onClick={() => props.solveSudoku()}>Solve</button>
            <button onClick={() => props.checkSudoku()}>Check</button>
            {
                props.error ? <div><p className="error-msg">{props.error}</p></div> : null
            }
            {
                props.newGameClicked ? 
                <div>
                    <h1>Select level:</h1>
                    <button onClick={(e) => props.startNewGame(e.target.textContent)}>easy</button>
                    <button onClick={(e) => props.startNewGame(e.target.textContent)}>medium</button>
                    <button onClick={(e) => props.startNewGame(e.target.textContent)}>hard</button>
                    <button onClick={(e) => props.startNewGame(e.target.textContent)}>very-hard</button>
                    <button onClick={(e) => props.startNewGame(e.target.textContent)}>insane</button>
                    <button onClick={(e) => props.startNewGame(e.target.textContent)}>inhuman</button>
                </div> : null
            }
        </div>
    )
}

export default Navigation;