interface QuestionOption {
  text: string
  isCorrect: boolean
}

type QuestionOptions = QuestionOption[]

interface Question {
  prompt1: string
  prompt2: string
  variablePrompt: string
  options: QuestionOptions
  flag?: string
}

type Questions = Question[]

interface Store {
  countries: Root | null
  questions: Questions | null
  answers: string[]
  setAnswer: (index: number, value: string) => void
  cleanAnswers: () => void
  initQuestions: () => Promise<void>
}

type SetState = (state: Partial<Store>) => void
