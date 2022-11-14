import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Options from './Options'
import Question from './Question'
import Results from './Results'


export default function App() {
    return (
        <React.StrictMode>
            <div className="game-box">
                <Router>
                    <Routes>
                        <Route path='/' element={<Options />}/>
                        <Route path='/question' element={<Question />}/>
                        <Route path='/results' element={<Results />}/>
                        <Route path='*' element={<p>404 page not found</p>}/>
                    </Routes>
                </Router>
            </div>
        </React.StrictMode>
    )
}
