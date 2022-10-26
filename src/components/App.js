import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Options from './Options'
import Question from './Question'


export default function App() {
    return (
        <React.StrictMode>
            <div className="game-box">
                <Router>
                    <Routes>
                        <Route path='/' element={<Options />}/>
                        <Route path='/question' element={<Question />}/>
                        <Route path='/results' element={<p>THE END</p>}/>
                        <Route path='*' element={<p>404 page not found</p>}/>
                    </Routes>
                </Router>
            </div>
        </React.StrictMode>
    )
}
