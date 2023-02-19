export function Header(props) {
    return (
        <>
        {
            props.settingCompleted === true &&
            <div className="header-container">
                <ul>
                    {
                        props.gameStarted ? 
                        (<><li className="restart-icon" onClick={() => props.onPause()}>Pause</li><li onClick={() => props.onRestart()}>Restart</li></>) :
                        <li className="play-icon" onClick={() => props.onPlay()}>Play</li>
                    }
                    {/* <li onClick={() => props.onRestart()}>Restart</li> */}
                    <li onClick={() => props.onOpenSetting()}>Setting</li>
                </ul>
            </div>
        }
        </>
    );
}