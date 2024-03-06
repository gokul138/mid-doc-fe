import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './Home';

const Route00 = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Route00