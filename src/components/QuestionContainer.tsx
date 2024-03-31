import { FC, useEffect } from 'react'
import Question from './Question'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { QTY_QUESTIONS } from '../constants'
import useStore from '../store/useStore'

const QuestionContainer: FC = () => {
  const { questionIndex } = useParams()
  const answers = useStore((state) => state.answers)
  const navigate = useNavigate()

  useEffect(() => {
    // Prevents sabotage by the user by writing an inappropriate route
    if (questionIndex != null &&
      (+questionIndex > QTY_QUESTIONS ||
        isNaN(+questionIndex) || +questionIndex < 1)
    ) navigate('/question/1')
  }, [questionIndex])

  const buttonClass = 'text-txt-primary rounded-full w-10 h-10 bg-usr-secondary flex justify-center items-center hover:brightness-125 '

  const handleClick = (idx: number): void => {
    navigate(`/question/${idx}`)
  }

  return (
    <div className='w-[576px] lg:w-[820px] bg-usr-primary flex flex-col items-center p-8 rounded-xl'>
      <Link to='/question/1'>
        <h1 className='text-[12px] font-semibold mb-6 text-txt-secondary'>Country Quiz</h1>
      </Link>
      {/* Buttons of number of question */}
      <header className='flex flex-row gap-4 flex-wrap px-16 justify-center'>
        {Array(QTY_QUESTIONS).fill('').map((_, idx) => {
          return (
            <button
              key={idx}
              onClick={() => handleClick(idx + 1)}
              className={
                `${buttonClass} ${questionIndex != null &&
                  (+questionIndex === idx + 1 || answers[idx] != null)
                  ? 'usr-gradient'
                  : ''
                }`
              }
              disabled={questionIndex != null && +questionIndex === idx + 1}
            >{idx + 1}
            </button>
          )
        })}
      </header>
      <Question />
    </div>
  )
}

export default QuestionContainer
