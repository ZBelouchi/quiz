import React, { useState } from 'react'

export default function Answers(props) {
    const [status, setStatus] = useState([0, 0, 0, 0])
    const [hasAnswered, setHasAnswered] = useState(false)
    
    // API responds with
        // id
        // correct answer
        // 3 incorrect answers
        // question
    //example pull, static index from session storage 
    const question = JSON.parse(window.sessionStorage.getItem('questions'))[1]
    
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
                <button>Next Question</button>
            </div>
        </section>
    )
}
