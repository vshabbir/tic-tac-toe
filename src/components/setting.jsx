import { useState } from "react";
import { ChooseXOrO } from "./layout/choose-x-o";
import { PlayWithComp } from "./layout/play-with-comp";
import { Undo } from "./layout/undo";

function Setting(props) {

    const [pwc, setPwc] = useState(props.stateConfig.playWithComp);

    function isFormValid(target) {
        return (target.player_choice.value && target.play_with_comp.value && target.allow_undo.value) ? true : false;
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const target = event.target;
        if(isFormValid(target)) {
            props.saveSetting(target.player_choice.value, target.play_with_comp.value, target.allow_undo.value);
        }
    }
  
    return (
      <div className="setting">
        <div className="setting-content">
            <form onSubmit={onSubmit}>
                <ChooseXOrO selectedValue={props.stateConfig.player1}/>
                <PlayWithComp selectedValue={props.stateConfig.playWithComp} onChange={(val) => setPwc(val)}/>
                <Undo selectedValue={props.stateConfig.allowUndo} pwcValue={pwc}/>
                <div className="setting-button-holder">
                    <button>Done</button>
                </div>
            </form>
        </div>
        <div className="setting-note">
          <p>
            Note - The settings you choose will be active until you change them or refresh the page.
          </p>
        </div>
      </div>
    );
}

export default Setting;