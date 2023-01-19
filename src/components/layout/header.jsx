export function Header(props) {
    return (
        <div className="header-container">
            <ul>
                {
                    props.gameStarted ? 
                    <li className="restart-icon" onClick={() => props.onRestart()}>Restart</li> :
                    <li className="play-icon" onClick={() => props.onPlay()}>Play</li>
                }
                {/* <li>Settings</li>
                <li>Game History</li> */}
            </ul>
        </div>
    );
}