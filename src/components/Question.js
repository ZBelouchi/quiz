import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useDeepCompareEffect from '../hooks/useDeepCompareEffect'

import Modal from './Modal'

export default function Answers() {
    const [status, setStatus] = useState([0, 0, 0, 0])
    const [isOpen, setIsOpen] = useState(false)
    const nav = useNavigate()
    const [gameData, setGameData] = useState(JSON.parse(window.sessionStorage.getItem('gameData')))
    useDeepCompareEffect(() => {
        window.sessionStorage.setItem('gameData', JSON.stringify(gameData))
    }, [gameData])
    
    const question = JSON.parse(window.sessionStorage.getItem('questions'))[gameData.currentQuestion]
    const [answers, setAnswers] = useState([question.correctAnswer, ...question.incorrectAnswers].sort(function(a, b){return 0.5 - Math.random()}))
    const correct = answers.indexOf(question.correctAnswer)
    const statusClasses = {
        0: "",
        1: "question__choice--down question__choice--correct",
        2: "question__choice--down question__choice--incorrect"
    }

    return (
        <section className='question'>
            <div className="container container--top">
                <div className="question__status flex">
                    {/* question number */}
                    <p className='question__number'>Question {gameData.currentQuestion + 1} of {gameData.questionTotal}</p>
                    {/* score */}
                    <p className='question__score'>Score: {gameData.currentScore}</p>
                </div>
            </div>
            <progress className='question__progress' value={gameData.currentQuestion} max={gameData.questionTotal}>{(gameData.currentScore / gameData.questionTotal)* 100}%</progress>
            <div className="container container--bottom">
                {/* question */}
                <h2 className="question__prompt">{question.question}</h2>

                {/* 4 answers */}
                <div className="question__choices flex">
                    {answers.map((text, index) => (
                        <p 
                            className={`question__choice ${statusClasses[status[index]]}`}
                            onClick={() => setStatus(() => {
                                // prevent multiple submissions

                                if (gameData.hasAnswered) {return status}

                                // set default status
                                let newStatus = [0, 0, 0, 0]
                                // color selected answer red
                                newStatus[index] = 2
                                // color correct answer green
                                newStatus[correct] = 1
                                
                                if (index === correct) {
                                    // correct answer code
                                    setGameData({...gameData, currentScore: gameData.currentScore += 1})
                                }
                                setGameData({...gameData, hasAnswered: true})
                                return newStatus
                            })}
                        >{text}</p>
                    ))}
                </div>

                <div className="question__buttons flex">
                    {/* reset button */}
                    <button className='question__reset btn' onClick={() => setIsOpen(true)}>Reset</button>
                    <Modal open={isOpen} onClose={() => setIsOpen(false)} modalClass="reset">
                        <h2>Reset and lose all progress?</h2>
                        <div className="reset__buttons flex">
                            <button className='reset__reset btn' onClick={() => {
                                window.sessionStorage.removeItem('questions')
                                window.sessionStorage.removeItem('gameData')
                                nav('/')
                            }}>Reset</button>

                            <button className='reset__cancel btn' onClick={() => {setIsOpen(false)}}>Cancel</button>
                        </div>
                    </Modal>
                    
                    {/* next question button */}
                    <button className='question__next btn' onClick={() => {
                        // check if current question = total questions
                        if (!gameData.hasAnswered) {
                            return
                        } else if (gameData.currentQuestion + 1 === gameData.questionTotal) {
                            // go to results page
                            nav('/results')
                        } else {
                            // increase current by one
                            setGameData({...gameData, currentQuestion: gameData.currentQuestion += 1})
                            // set hasAnswered back to false
                            setGameData({...gameData, hasAnswered: false})
                            // reload
                            window.location.reload(false)
                        }
                        
                    }}>Next Question</button>
                </div>
            </div>

        </section>
    )
}