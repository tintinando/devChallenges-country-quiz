import { FC } from 'react'
import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import QuestionContainer from './components/QuestionContainer'
import Congratulations from './components/Congratulations'

const App: FC = () => {
  return (
    <main className='usr-main h-screen flex justify-center items-center'>
      <Routes>
        <Route path='/' element={<Navigate to='/question/1' />} />
        <Route path='/question/:questionIndex' Component={QuestionContainer} />
        <Route path='/congrats' Component={Congratulations} />
      </Routes>
    </main>
  )
}

export default App
