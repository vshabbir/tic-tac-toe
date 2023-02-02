import { useState } from "react"

export function PlayWithComp(props) {
    const [pwc, setPwc] = useState(props.selectedValue);

    function onSelectionChange(e) {
        setPwc(e.target.value);
        props.onChange(e.target.value);
    }

    return (
        <div>
            <div className="setting-box">
            <div className="setting-head-label">
                <label>
                    Do you want to play with computer?
                </label>
            </div>
            <div className="setting-choice-radio">
                <label htmlFor="play-with-comp-yes" className="setting-choice-label">
                    <input type="radio" name="play_with_comp" id="play-with-comp-yes" value="yes" onChange={onSelectionChange} checked={pwc === 'yes'}/>
                    Yes
                </label>
                <label htmlFor="play-with-comp-no" className="setting-choice-label">
                    <input type="radio" name="play_with_comp" id="play-with-comp-no" value="no" onChange={onSelectionChange} checked={pwc === 'no'}/>
                    No
                </label>
            </div>
            </div>
        </div>
    )
}