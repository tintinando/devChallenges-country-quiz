import { FC, useEffect } from 'react'
import imgCongrats from '../assets/congrats.svg'
import { useNavigate } from 'react-router-dom'
import useStore from '../store/useStore'
import { QTY_QUESTIONS } from '../constants'

const Congratulations: FC = () => {
  const { initQuestions, answers, questions } = useStore(state => ({
    initQuestions: state.initQuestions,
    answers: state.answers,
    questions: state.questions
  }))

  const navigate = useNavigate()

  // prevent user puts "/congrats" in the search bar
  useEffect(() => {
    if (questions == null) navigate('/')
  }, [questions])

  if (questions == null) return

  const handleNewGame = (): void => {
    initQuestions().catch(console.error)
    navigate('/')
  }

  const correctAnswers = questions.reduce((acc, cur, idx) => {
    const correctOption = cur.options.find(o => o.isCorrect)
    if (answers[idx] === correctOption?.text) return acc + 1
    return acc
  }, 0)

  return (
    <div className='w-[400px] bg-usr-primary flex flex-col items-center p-10 rounded-xl text-txt-primary pb-20'>
      <img className='w-full mb-10' src={imgCongrats} alt='Congratulations with confetti' />
      <h2 className='text-2xl text-center mb-6'>Congrats! You completed the quiz</h2>
      <h3 className='text-md mb-10'>You answer {`${correctAnswers}/${QTY_QUESTIONS}`} correctly</h3>
      <button
        onClick={handleNewGame}
        className='usr-gradient w-[240px] h-[64px] rounded-2xl text-md'
      >Play again
      </button>
      <div className='flex flex-row' />
    </div>

  )
}

export default Congratulations
