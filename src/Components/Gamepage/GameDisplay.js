export function GameDisplay({host, players}) {
    console.log("host>>>",host)
    console.log("players>>>>", players)

    return <section id="game-display">

    <div id="host-display">
        <p id="display--name">{host.user_name}</p>
        <p id="display--points">{host.points}</p>
    </div>

    <div id="players-display">
        {players.map(player => {
            const currentPoints = player.points
            return(
            <>
            <p id="display--name" key={player.user_id}>{player.user_name}</p>
            <p id="display--points">{player.points - currentPoints}</p>
            </>
            )
        })}
    </div>

    </section>

}