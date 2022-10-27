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
        console.log("test");
        return <p>great</p>
    } else if (props.score >= 60) {
        console.log("test");
        return <p>decent</p>
    } else if (props.score >= 40) {
        console.log("test");
        return <p>average</p>
    } else if (props.score >= 20) {
        console.log("test");
        return <p>poor</p>
    } else if (props.score < 20) {
        console.log("test");
        return <p>terrible</p>
    }
}