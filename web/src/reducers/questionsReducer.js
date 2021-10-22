import * as actions from '../actions/questionActions'

export const initialState = {
  loading: true,
  hasErrors: false,
  questions: [],
  question: {},
  redirect: null
}

export default function questionsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.LOADING:
      return { ...state, loading: true }
    case actions.LOADED_SUCCESS:
      return { ...state, ...action.payload, loading: false, hasErrors: false }
    case actions.LOADED_FAILURE:
      return { ...state, loading: false, hasErrors: true }
    case actions.SEARCH:
      const newListQuestion = state.questions.filter((item) => {
        return item.question.toLowerCase().includes(action.payload.text.toLowerCase())
      });
      return { ...state, questions: newListQuestion}
    case actions.FILTER_CATEGORY:
      if(action.payload.category === 'NONE'){
        return state;
      }
      const newListQuestionForCategory = state.questions.filter((item) => {
        return item.category === action.payload.category
      });
      return { ...state, questions: newListQuestionForCategory}
    case actions.SEARCH_FIRST:
      const newFirstQuestion = state.questions.find((item) => {
        return item.question.toLowerCase().includes(action.payload.text.toLowerCase())
      });
      const newState = { ...state, questions: [newFirstQuestion], loading: false, hasErrors: false, redirect: `/question/${newFirstQuestion.id}`}
      return newState;
    default:
      return state
  }
}
