import { create } from 'zustand'
import { Root } from '../types-api'
import generateRandomQuestions from '../helpers/generateRandomQuestions'
import { QTY_QUESTIONS, URL_COUNTRIES } from '../constants'

// fetch countries from API
const fetchCountries = async (set: SetState): Promise<void> => {
  try {
    const response = await fetch(`${URL_COUNTRIES}all?fields=name,capital,subregion,flags`)
    const json = await response.json() as Root
    set({ countries: json })
  } catch (e) {
    console.error('Error in fetch', e)
  }
}

const useStore = create<Store>((set, get) => ({
  countries: null,
  questions: null,
  answers: Array(QTY_QUESTIONS).fill(null),
  setAnswer: (index, value) => set(state => {
    const newAnswers = [...state.answers]
    newAnswers[index] = value
    return { answers: newAnswers }
  }),
  cleanAnswers: () => set({ answers: Array(QTY_QUESTIONS).fill(null) }),
  fetchCountries: async () => await fetchCountries(set),
  initQuestions: async () => {
    get().cleanAnswers()
    await fetchCountries(set)
    if (get().countries != null) {
      const questions = generateRandomQuestions(get().countries, QTY_QUESTIONS)
      set({ questions })
    }
  }
}))

export default useStore
