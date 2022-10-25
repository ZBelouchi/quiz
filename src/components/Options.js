import React from 'react'

export default function Options() {
    // create dummy request options
    const category = "science"
    const difficulty = "easy"
    const questionCount = 3
    // Call API with dummy request data
    fetch(`https://the-trivia-api.com/api/questions?categories=${category}&limit=${questionCount}&difficulty=${difficulty}`)
    .then(response => response.json())
    // take in response as json
    .then(json => {
        // store json in session storage
        console.log(json)
        window.sessionStorage.setItem('questions', JSON.stringify(json))
    })
    
    
    return (
        <div>
        d
        </div>
    )
}
