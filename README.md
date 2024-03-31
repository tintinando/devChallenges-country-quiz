# Country Quiz

This repository contains a practice for [devChallenges](https://devchallenges.io/challenge/country-quizz)

### Technology

- Vite + React JS with libraries:
  - **zustand** for global state
  - **react-router-dom** for routes management

Wrtitten in Typescript and traspiled with Babel

### Mechanism

Simply answer questions about capitals, flags or regions of each country. As you answer, a check icon will tell you if it is correct or not. You can navigate between questions, but not alter the answer. Upon completion, a congratulations screen will inform you of the final result

### Constants

- QTY_QUESTIONS you can set the quantity of questions. Is setted in 10

- TIME_NAVIGATE you can set the milliseconds after the ask and before automatic go-to next

## Install

- clone this repository
- install dependencies:

```
pnpm install
```

or another package manager, like npm, yarn, bun

- run build:

```
  pnpm run dev
```
