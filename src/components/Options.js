import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import useForceUpdate from '../hooks/useForceUpdate'

export default function Options() {
    const [response, setResponse] = useState(false)
    const [count, setCount] = useState(10)
    const nav = useNavigate()
    const categories = [
        "arts_and_literature",
        "film_and_tv",
        "food_and_drink",
        "general_knowledge",
        "geography",
        "history",
        "music",
        "science",
        "society_and_culture",
        "sport_and_leisure"
    ]
    const difficulties = [
        "easy",
        "medium",
        "hard",
    ]
    
    const handleSubmit = e => {
        e.preventDefault()
        setResponse({
            category: e.target.category.value,
            difficulty: e.target.difficulty.value,
            count: e.target.count.value
        })  
    }
    // Begin Function
    useEffect(() => {
    if (response) {
        // Call API
        fetch(`https://the-trivia-api.com/api/questions?categories=${response.category}&limit=${response.count}&difficulty=${response.difficulty}`)
        .then(response => response.json())
        // take in response as json
        .then(json => {
            // store json in session storage
            console.log(json)
            window.sessionStorage.setItem('questions', JSON.stringify(json))
            window.sessionStorage.setItem('gameData', JSON.stringify({
                currentQuestion: 0,
                questionTotal: Number(response.count),
                currentScore: 0,
                hasAnswered: false
            }))
            nav('/question')
        })
    }
    }, [response])
     
    return (
        <section className="options">
            <form className="options__form" onSubmit={handleSubmit}>
                {/* category */}
                <RadioButtons values={categories} name="category"/>
                <hr />
                {/* difficulty */}
                <RadioButtons values={difficulties} name="difficulty"/>
                {/* {difficulties.map((difficulty, index) => (<RadioButton index={index} list={difficulty} name={"difficulty"}/>))} */}
                <hr />
                {/* question count */}
                <input type="number" min="0" max="100" name="count" id='opt-count' value={count} onChange={e => setCount(e.target.value)}/>
                <hr />
                {/* submit */}
                <input type="submit" value="Submit" />
            </form>
        </section>
    )
}

function RadioButtons({values, name}) {
    const radioData = useRef([])
    const render = useForceUpdate()

    return values.map((item, index) => {
        return (
            <div className="radio-btn" key={index} onClick={() => {
                radioData.current = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                radioData.current[index] = 1
                render()
                console.log(radioData.current[index])
            }}
            >
                <input 
                    type="radio" 
                    name={name}
                    className={`radio-btn__radio`}
                    id={`opt-${name}-${index}`}
                />
                <label htmlFor={`opt-${name}-${index}`}>
                    <div className={`radio-btn__label ${radioData.current[index] === 1 ? 'radio-btn__label--checked' : ''}`}>
                        <div 
                            className="radio-btn__icon"
                            data-img={item}
                        ></div>
                        </div>
                </label>
            </div>
        )
    })
}