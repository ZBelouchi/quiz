import React from 'react'

export default function Results() {
    const gameData = JSON.parse(window.sessionStorage.getItem('gameData'))
    const scorePercentage = (gameData.currentScore / gameData.questionTotal)* 100
    
  return (
    <div className="results">
        <p>THE END</p>
        {/* score */}
        <p>Score: {gameData.currentScore} ; {scorePercentage}%</p>
        <Message score={scorePercentage} />
    </div>
            
  )
}

function Message(props) {
    const messages = {
        terrible: "terrible",
        poor: "poor",
        average: "average",
        decent: "decent",
        great: "great"
    }

    if (props.score > 80) {
        return <p>great</p>
    } else if (props.score >= 60) {
        return <p>decent</p>
    } else if (props.score >= 40) {
        return <p>average</p>
    } else if (props.score >= 20) {
        return <p>poor</p>
    } else if (props.score < 20) {
        return <p>terrible</p>
    }
}