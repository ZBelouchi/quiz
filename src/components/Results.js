import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Results() {
    const gameData = JSON.parse(window.sessionStorage.getItem('gameData'))
    const scorePercentage = ((gameData.currentScore / gameData.questionTotal)* 100).toFixed(2)
    const text = useRef()
    const medal = useRef()
    const nav = useNavigate()

    if (scorePercentage == 100) {
        text.current = "you got a perfect score! you sure know your trivia!"
        medal.current = "platinum"
    } else if (scorePercentage >= 80) {
        text.current = "you did great! but you could go even higher!"
        medal.current = "gold"
    } else if (scorePercentage >= 60) {
        text.current = "pretty decent, but there's always room for improvement!"
        medal.current = "silver"
    } else if (scorePercentage >= 40) {
        text.current = "Not bad, but not good either. Your score was average."
        medal.current = "bronze"
    } else if (scorePercentage >= 20) {
        text.current = "That was pretty poor. Maybe one more try?"
        medal.current = "stone"
    } else if (scorePercentage < 20) {
        text.current = "That was terrible! Maybe give it another go?"
        medal.current = "cardboard"
    }
    
  return (
        <div className="results">
            <h1>Results!</h1>
            {/* score */}
            <p className='results__score'>You got {gameData.currentScore} correct answer{gameData.currentScore > 1 ? "s" : null} ({scorePercentage}%)</p>
            {/* results summary */}
            <div className="results__medal-card">
                {/* medal */}
                <img src={require(`../assets/icons/results/${medal.current}.png`)} alt={`${medal.current} medal`} className="results__medal" />
                <p className='results__subtitle'>{medal.current} Medal</p>
            </div>
            {/* message */}
            <p className="results__message">{text.current}</p>
            {/* replay button */}
            <button 
                variant="contained" className='results__restart btn' 
                onClick={() => {
                    window.sessionStorage.removeItem('questions')
                    window.sessionStorage.removeItem('gameData')
                    nav('/')
                }}
            >Play Again</button>
        </div>
    )
}