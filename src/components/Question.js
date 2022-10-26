import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Answers() {
    const [status, setStatus] = useState([0, 0, 0, 0])
    const [hasAnswered, setHasAnswered] = useState(false)
    const nav = useNavigate()
    
    // API responds with
        // id
        // correct answer
        // 3 incorrect answers
        // question
    //example pull, static index from session storage 
    const questionCount = Number(window.sessionStorage.getItem('questionCount'))
    const currentQuestion = Number(window.sessionStorage.getItem('currentQuestion'))
    const question = JSON.parse(window.sessionStorage.getItem('questions'))[currentQuestion]
    
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
            {/* question number */}
            <p>Question {currentQuestion + 1} of {questionCount}</p>
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
                                console.log("correct")
                                //...
                            } else {
                                // incorrect answer code
                                console.log("incorrect")
                                //...
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
                <button>Reset</button>
                {/* next question button */}
                <button onClick={() => {
                    // check if current question = total questions
                    if (currentQuestion + 1 === questionCount) {
                        // go to results page
                        nav('/results')
                    } else {
                        // increase current by one
                        window.sessionStorage.setItem('currentQuestion', (Number(currentQuestion) + 1))
                        // reload
                        window.location.reload(false)
                    }
                    
                }}>Next Question</button>
            </div>
        </section>
    )
}
