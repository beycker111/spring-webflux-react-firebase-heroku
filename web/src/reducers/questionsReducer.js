import * as actions from '../actions/questionActions'
import ReactHtmlParser from 'react-html-parser'

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
      //console.log(state.questions)
      return { ...state, ...action.payload, loading: false, hasErrors: false }
    case actions.LOADED_FAILURE:
      return { ...state, loading: false, hasErrors: true }
    case actions.SEARCH:
      //console.log(state.questions);
      const newListQuestion = state.questions.filter((item) => {
        //const htmlParse = ReactHtmlParser(item.question)
        return item.question.toLowerCase().includes(action.payload.text.toLowerCase())
      });
      return { ...state, questions: newListQuestion}
      
      //console.log(action.payload.text)
      //return state
    case actions.FILTER_CATEGORY:
      if(action.payload.category === 'NONE'){
        return state;
      }
      const newListQuestionForCategory = state.questions.filter((item) => {
        //const htmlParse = ReactHtmlParser(item.question)
        return item.category === action.payload.category
      });
      return { ...state, questions: newListQuestionForCategory}
    case actions.SEARCH_FIRST:
      const newFirstQuestion = state.questions.find((item) => {
        //const htmlParse = ReactHtmlParser(item.question)
        return item.question.toLowerCase().includes(action.payload.text.toLowerCase())
      });
      console.log(newFirstQuestion);
      const newState = { ...state, questions: [newFirstQuestion], loading: false, hasErrors: false, redirect: `/question/${newFirstQuestion.id}`}
      console.log(newState);
      return newState;
      //return state
    default:
      return state
  }
}
