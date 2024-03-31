import { Root, Root2 } from '../types-api'

// receives the correct option and returns 4 (3 incorrectes)
const generateOptions = (correctAnswer: string, allAnswers: string[]): QuestionOptions => {
  const correctOption = { text: correctAnswer, isCorrect: true }

  // set prevents duplicate option
  const incorrectOptions: QuestionOption[] = []

  // uses "while" instead of "for" because several loops will be discarted
  while (incorrectOptions.length < 3) {
    const rnd = Math.floor(Math.random() * allAnswers.length)
    const randomAnswer = allAnswers[rnd]
    if (randomAnswer !== correctAnswer && incorrectOptions.every(o => o.text !== randomAnswer)) {
      incorrectOptions.push({ text: randomAnswer, isCorrect: false })
    }
  }

  // integrate the correct option with the incorrect ones and mix
  const options = [correctOption, ...Array.from(incorrectOptions)]
  return options.sort(() => Math.random() - 0.5)
}

// array of functions. One type of question for each
type QuestionGenerator = (country: Root2, allCountries: Root) => Question
const questionGenerators: QuestionGenerator[] = [
  // capital
  (country, allCountries) => ({
    prompt1: 'Which is the capital of ',
    prompt2: '?',
    variablePrompt: country.name.common,
    options: generateOptions(country.capital[0], allCountries.map(c => c.capital[0]))
  }),
  // flag
  (country, allCountries) => ({
    prompt1: 'What country is this flag from?',
    prompt2: '',
    variablePrompt: '',
    options: generateOptions(country.name.common, allCountries.map(c => c.name.common)),
    flag: country.flags.svg
  }),
  // subregion
  (country, allCountries) => ({
    prompt1: 'What subregion is ',
    prompt2: ' in?',
    variablePrompt: country.name.common,
    options: generateOptions(country.subregion, allCountries.map(c => c.subregion))
  })
]

// randomize questions
const generateRandomQuestions = (allCountries: Root, numQuestions = 10): Questions => {
  const questions = []
  // copy array because will slice it
  const countries = [...allCountries].filter(f => f.capital.length > 0 && f.subregion !== '')

  for (let i = 0; i < numQuestions; i++) {
    const countryIndex = Math.floor(Math.random() * countries.length)
    const country = countries[countryIndex]

    // prevents duplicate
    countries.splice(countryIndex, 1)

    // select random question
    const questionGenerator = questionGenerators[Math.floor(Math.random() * questionGenerators.length)]

    // generate question and add to array
    questions.push(questionGenerator(country, countries))
  }

  return questions
}

export default generateRandomQuestions
