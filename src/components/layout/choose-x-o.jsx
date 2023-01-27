import { useState } from "react";

export function ChooseXOrO(props) {
    const [player, setPlayer] = useState(props.selectedValue);

    function onSelectionChange(e) {
        setPlayer(e.target.value);
    }

    return (
        <div className="setting-box">
            <div className="setting-head-label">
                <label>
                    Choose One for Player 1
                </label>
            </div>
            <div className="setting-choice-radio">
            <label htmlFor="player-choice-x" className="setting-choice-label">
                <input type="radio" name="player_choice" id="player-choice-x" value="X" onChange={onSelectionChange} checked={player === 'X'}/>
                X
            </label>
            <label htmlFor="player-choice-o" className="setting-choice-label">
                <input type="radio" name="player_choice" id="player-choice-o" value="O" onChange={onSelectionChange} checked={player === 'O'}/>
                O
            </label>
            </div>
        </div>
    );
}