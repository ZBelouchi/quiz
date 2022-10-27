import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Modal from './Modal'

export default function Answers() {
    const [status, setStatus] = useState([0, 0, 0, 0])
    const [hasAnswered, setHasAnswered] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const nav = useNavigate()
    
    // API responds with
        // id
        // correct answer
        // 3 incorrect answers
        // question
    const gameData = JSON.parse(window.sessionStorage.getItem('gameData'))
    const question = JSON.parse(window.sessionStorage.getItem('questions'))[gameData.currentQuestion]
    
    const [answers, setAnswers] = useState([question.correctAnswer, ...question.incorrectAnswers].sort(function(a, b){return 0.5 - Math.random()}))
    const correct = answers.indexOf(question.correctAnswer)

    const statusStyles = {
        // default
        0: {},
        // correct
        1: {
            background: "green",
            color: "white"
        },
        // incorrect
        2: {
            background: "red",
            color: "white"
        }
    }

    return (
        <section className='question'>
            {/* score */}
            <p>Score: {gameData.currentScore} ; {(gameData.currentScore / gameData.questionTotal)* 100}%</p>
            {/* question number */}
            <p>Question {gameData.currentQuestion + 1} of {gameData.questionTotal}</p>
            {/* question */}
            <h2 className="question__prompt">{question.question}</h2>

            {/* 4 answers */}
            <div className="question__choices">
                {answers.map((text, index) => (
                    <p 
                        className="question__choice"
                        onClick={() => setStatus(() => {
                            // prevent multiple submissions
                            if (hasAnswered) {return status}

                            // set default status
                            let newStatus = [0, 0, 0, 0]
                            // color selected answer red
                            newStatus[index] = 2
                            // color correct answer green
                            newStatus[correct] = 1
                            
                            if (index === correct) {
                                // correct answer code
                                window.sessionStorage.setItem('gameData', JSON.stringify({...gameData, currentScore: gameData.currentScore + 1}))
                            }
                            setHasAnswered(true)
                            return newStatus
                        })}
                        style={statusStyles[status[index]]}
                    >{text}</p>
                ))}
            </div>

            <div className="row">
                {/* reset button */}
                <button onClick={() => setIsOpen(true)}>Reset</button>
                <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                    <p>Reset and lose all progress?</p>
                    <button onClick={() => {
                        window.sessionStorage.removeItem('questions')
                        window.sessionStorage.removeItem('gameData')
                        nav('/')
                    }}>Reset</button>
                </Modal>
                
                {/* next question button */}
                <button onClick={() => {
                    // check if current question = total questions
                    if (gameData.currentQuestion + 1 === gameData.questionTotal) {
                        // go to results page
                        nav('/results')
                    } else {
                        // increase current by one
                        window.sessionStorage.setItem('gameData', JSON.stringify({...gameData, currentQuestion: gameData.currentQuestion + 1}))
                        // reload
                        window.location.reload(false)
                    }
                    
                }}>Next Question</button>
            </div>
        </section>
    )
}