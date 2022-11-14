import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import useForceUpdate from '../hooks/useForceUpdate'

export default function Options() {
    const [count, setCount] = useState(10)
    const [response, setResponse] = useState(false)
    const nav = useNavigate()
    
    const categories = [
        "general_knowledge",
        "arts_and_literature",
        "film_and_tv",
        "food_and_drink",
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
            category: e.target.category.value || 'general_knowledge',
            difficulty: e.target.difficulty.value || 'easy',
            count: e.target.count.value
        })  
    }

    // Game Start Function
    useEffect(() => {
    if (response) {
        // Call API
        fetch(`https://the-trivia-api.com/api/questions?categories=${response.category}&limit=${response.count}&difficulty=${response.difficulty}`)
        .then(response => response.json())
        // take in response as json
        .then(json => {
            // store json in session storage
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
        <section className="container options">
            <h1 className='options__title'>Trivia Quiz</h1>
            <form className="options__form" onSubmit={handleSubmit}>
                {/* category */}
                <div className="options__field">
                    <h2>Category:</h2>
                    <RadioButtons values={categories} name="category"/>
                </div>
                {/* difficulty */}
                <div className="options__field">
                    <h2>Difficulty:</h2>
                    <RadioButtons values={difficulties} name="difficulty"/>
                </div>
                {/* question count */}
                <div className="options__field">
                    <h2>Questions:</h2>
                    <div className="options__count flex">
                        {/* + button */}
                        <button 
                            className='options__step' data-status={count === 1 ? "disabled" : null} 
                            onClick={(e) => {
                                e.preventDefault()
                                if (count === 1) {return}
                                setCount(count - 1)}
                            }
                        >-</button>
                        {/* count input */}
                        <input className='options__counter' type="number" min="0" max="100" name="count" id='opt-count' value={count} onChange={e => setCount(e.target.value)}/>
                        {/* - button */}
                        <button 
                            className='options__step' data-status={count === 100 ? "disabled" : null} 
                            onClick={(e) => {
                                e.preventDefault()
                                if (count === 100) {return}
                                setCount(count + 1)}
                            }
                        >+</button>
                    </div>
                </div>
                {/* submit */}
                <input type="submit" value="Start" className='options__submit btn'/>
            </form>
        </section>
    )
}

function RadioButtons({values, name}) {
    const radioData = useRef([1])
    const render = useForceUpdate()

    return (
        <div className={`options__radios options__radios--${name} flex`}>
            {values.map((item, index) => {
                return (
                    <div 
                        className="radio-btn options__radio" key={index} 
                        onClick={() => {
                            radioData.current = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            radioData.current[index] = 1
                            render()
                            console.log(radioData.current[index])
                        }}
                    >
                        <div className="radio-btn__button">
                            {/* button */}
                            <input type="radio" name={name} className={`radio-btn__radio`} value={values[index]} id={`opt-${name}-${index}`}/>
                            {/* label */}
                            <label htmlFor={`opt-${name}-${index}`}>
                                <div className={`radio-btn__label ${radioData.current[index] === 1 ? 'radio-btn__label--checked' : ''}`}>
                                    <div className="radio-btn__icon" data-img={item}></div>
                                </div>
                            </label>
                        </div>
                        {/* text */}
                        <p className="radio-btn__subtitle subtitle">{values[index].replaceAll("_", " ").replaceAll("and", "&")}</p>
                    </div>
                )
            })}
        </div>
    )
    
}