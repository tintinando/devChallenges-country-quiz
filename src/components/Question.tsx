import { FC, useEffect } from 'react'
import useStore from '../store/useStore'
import { useNavigate, useParams } from 'react-router-dom'
import { CheckRound } from '../assets/CheckRound'
import { CloseRound } from '../assets/CloseRound'
import { QTY_QUESTIONS, TIME_NAVIGATE } from '../constants'

const Question: FC = () => {
  // store
  const { questions, initQuestions, answers, setAnswer } = useStore(state => ({
    questions: state.questions,
    initQuestions: state.initQuestions,
    answers: state.answers,
    setAnswer: state.setAnswer
  }))

  // router
  const { questionIndex } = useParams()
  const navigate = useNavigate()
  let timeout = 0

  // create questions at first render
  useEffect(() => {
    // return to 1 at start game
    if (questionIndex != null && +questionIndex > 1) navigate('/question/1')
    initQuestions().catch(console.error)
  }, [])

  // checks if the game is ended
  useEffect(() => {
    if (answers.every(a => a != null)) {
      setTimeout(() => {
        navigate('/congrats')
      }, TIME_NAVIGATE)
    }
  }, [answers])

  // prevents future errors at component render
  if (questions == null || questionIndex == null) return null

  // when user select option
  const handleClick = (v: string): void => {
    setAnswer(+questionIndex - 1, v)

    // auto navigate
    timeout = setTimeout(() => {
      if (+questionIndex < QTY_QUESTIONS) {
        navigate(`/question/${+questionIndex + 1}`)
      } else {
        clearTimeout(timeout)
      }
    }, TIME_NAVIGATE)
  }

  // select current question object and destructure it, and current answer value
  const question = questions[+questionIndex - 1]
  const { prompt1, variablePrompt, prompt2, flag, options } = question
  const answer = answers[+questionIndex - 1]

  const buttonClassname = 'flex items-center justify-center text-txt-primary text-wrap bg-usr-secondary w-[240px] h-16 rounded-xl enabled:hover:bg-gradient-to-r from-[#e65895] to-[#bc6be8]'

  return (
    <div className='flex flex-col justify-center items-center gap-6 p-4'>
      <h2 className='text-txt-primary text-center font-semibold text-xl px-8'>
        {prompt1 + variablePrompt + prompt2}
      </h2>

      <div className='h-16'>
        {flag != null && <img className='h-full' src={flag} />}
      </div>

      <div className='max-w-[640px] flex justify-center flex-wrap gap-6'>
        {options.map((v, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(v.text)}
            className={`${buttonClassname} ${answer === v.text ? 'usr-gradient' : ''}`}
            disabled={answer != null}
          >{v.text}
            {answer === v.text &&
              <span className='inline-block ps-2'>
                {v.isCorrect ? <CheckRound /> : <CloseRound />}
              </span>}
          </button>
        )
        )}
      </div>
    </div>
  )
}

export default Question
