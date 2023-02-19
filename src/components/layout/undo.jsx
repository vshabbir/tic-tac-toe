import { useEffect } from "react";
import { useState } from "react";

export function Undo(props) {
    const [allowUndo, setAllowUndo] = useState(props.selectedValue);

    useEffect(() => {
        if(props.pwcValue === 'yes') {
            setAllowUndo('no');
        }
    }, [props.pwcValue]);

    function onSelectionChange(e) {
        setAllowUndo(e.target.value);
    }

    return (
        <div>
            <div className="setting-box">
            <div className="setting-head-label">
                <label>
                    Allow Undo?
                </label>
            </div>
            <div className="setting-choice-radio">
                <label htmlFor="allow-undo-yes" className="setting-choice-label">
                    <input type="radio" name="allow_undo" id="allow-undo-yes" value="yes" disabled={props.pwcValue === 'yes' ? true : false} onChange={onSelectionChange} checked={allowUndo === 'yes'}/>
                    Yes
                </label>
                <label htmlFor="allow-undo-no" className="setting-choice-label">
                    <input type="radio" name="allow_undo" id="allow-undo-no" value="no" onChange={onSelectionChange} checked={allowUndo === 'no'}/>
                    No
                </label>
            </div>
            <div className="setting-desc">
                <p>
                    Allow player to go back to previous move.
                </p>
                <p>
                    Note - Undo will not work when playing with comp.
                </p>
            </div>
            </div>
        </div>
    )
}