import React from 'react'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Results() {
    const gameData = JSON.parse(window.sessionStorage.getItem('gameData'))
    const scorePercentage = (gameData.currentScore / gameData.questionTotal)* 100
    const nav = useNavigate()
    
  return (
    <div className="results">
        <h1>Results!</h1>
        {/* score */}
        <p className='results__score'>You got {gameData.currentScore} correct answers ({scorePercentage}%)</p>
        <Message score={scorePercentage} />
        <button variant="contained" className='results__restart btn' onClick={() => {
            window.sessionStorage.removeItem('questions')
            window.sessionStorage.removeItem('gameData')
            nav('/')
        }}>Play Again</button>

    </div>
    
            
  )
}

function Message(props) {
    const rank = useRef()

    if (props.score > 80) {
        rank.current = "Great"
    } else if (props.score >= 60) {
        rank.current = "Decent"
    } else if (props.score >= 40) {
        rank.current = "Average"
    } else if (props.score >= 20) {
        rank.current = "Poor"
    } else if (props.score < 20) {
        rank.current = "Terrible"
    }

    return (
        <div className="results__message">
            <p>You did {rank.current}</p>
        </div>
    )
}