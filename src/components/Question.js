import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Modal from './Modal'

export default function Answers() {
    const gameData = useRef(JSON.parse(window.sessionStorage.getItem('gameData')))
    const question = JSON.parse(window.sessionStorage.getItem('questions'))[gameData.current.currentQuestion]
    const answers = useRef([question.correctAnswer, ...question.incorrectAnswers].sort(function(a, b){return 0.5 - Math.random()}))
    const correct = answers.current.indexOf(question.correctAnswer)
    const [progressValue, setProgressValue] = useState(gameData.current.currentQuestion)
    
    const [status, setStatus] = useState([0, 0, 0, 0])
    const [isOpen, setIsOpen] = useState(false)
    const nav = useNavigate()

    const statusClasses = {
        0: "",
        1: "question__choice--down question__choice--correct",
        2: "question__choice--down question__choice--incorrect"
    }

    return (
        <section className='question'>
            <div className="container container--top">
                <div className="question__status row">
                    {/* question number */}
                    <p className='question__number'>Question {gameData.current.currentQuestion + 1} of {gameData.current.questionTotal}</p>
                    {/* score */}
                    <p className='question__score'>Score: {gameData.current.currentScore}</p>
                </div>
            </div>
            {/* progress bar */}
            <progress 
                className='question__progress' 
                value={progressValue} 
                max={gameData.current.questionTotal}
            >
                {(gameData.current.currentScore / gameData.current.questionTotal)* 100}%
            </progress>

            <div className="container container--bottom">
                {/* question */}
                <h2 className="question__prompt">{question.question}</h2>

                {/* 4 answers */}
                <div className="question__choices flex">
                    {answers.current.map((text, index) => (
                        <button
                            className={`question__choice ${statusClasses[status[index]]}`} key={index} data-status={gameData.current.hasAnswered ? "disabled" : null} 
                            onClick={() => setStatus(() => {
                                // prevent multiple submissions
                                if (gameData.current.hasAnswered) {return status}

                                // set to default status
                                let newStatus = [0, 0, 0, 0]
                                // set specific tile's style
                                newStatus[index] = 2
                                newStatus[correct] = 1
                                
                                if (index === correct) {
                                    // correct answer
                                    gameData.current.currentScore += 1
                                }
                                // mark as having answered the question
                                gameData.current.hasAnswered = true
                                window.sessionStorage.setItem('gameData', JSON.stringify(gameData.current))

                                // move progress bar
                                setProgressValue(gameData.current.currentQuestion + 1)

                                return newStatus
                            })}
                        >{text}</button>
                    ))}
                </div>

                <div className="question__buttons row row--btn">
                    {/* reset button */}
                    <button className='question__reset btn' onClick={() => setIsOpen(true)}>Reset</button>
                    {/* reset dialog */}
                    <Modal open={isOpen} onClose={() => setIsOpen(false)} modalClass="reset">
                        <h2>Reset and lose all progress?</h2>
                        <div className="reset__buttons row row--btn">
                            {/* reset button */}
                            <button 
                                className='reset__reset btn' 
                                onClick={() => {
                                    window.sessionStorage.removeItem('questions')
                                    window.sessionStorage.removeItem('gameData')
                                    nav('/')
                                }}
                            >Reset</button>
                            {/* cancel button */}
                            <button className='reset__cancel btn' onClick={() => {setIsOpen(false)}}>Cancel</button>
                        </div>
                    </Modal>

                    {/* next question button */}
                    <button 
                        className='question__next btn' 
                        onClick={() => {
                            // exit if question not answered yet
                            if (!gameData.current.hasAnswered) {return}
                            // end if final question
                            if (gameData.current.currentQuestion + 1 === gameData.current.questionTotal) {
                                // go to results page
                                nav('/results')
                                return
                            }
                            // increase current by one
                            gameData.current.currentQuestion += 1
                            // set hasAnswered back to false
                            gameData.current.hasAnswered = false
                            // save data to storage
                            window.sessionStorage.setItem('gameData', JSON.stringify(gameData.current))
                            // reload
                            window.location.reload(false)
                        }}
                    >{gameData.current.currentQuestion + 1 === gameData.current.questionTotal ? "Results" : "Next Question"}</button>
                </div>
            </div>
        </section>
    )
}