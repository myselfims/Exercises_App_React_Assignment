import React from 'react'
import Listing from './components/Listing'
import ViewItem from './components/ViewItem'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

const App = () => {
  return (
    <Router>
        <div className='container p-4'>
        <Routes>
            <Route key={'listing'} exact path='/' element={<Listing/>}/>
            <Route key={'viewitem'} exact path='/viewexcersice/:id' element={<ViewItem/>}/>
        </Routes>
        </div>
      
    </Router>
  )
}

export default App
