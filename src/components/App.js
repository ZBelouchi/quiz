import React from 'react'
import Options from './Options'
import Question from './Question'


export default function App() {
    return (
        <React.StrictMode>
            <div className="game-box">
                <Options />
                {/* <Question /> */}
            </div>
        </React.StrictMode>
    )
}
