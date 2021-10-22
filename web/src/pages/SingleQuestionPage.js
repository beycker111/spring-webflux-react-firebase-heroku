import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchQuestion } from '../actions/questionActions'

import { Question } from '../components/Question'
import { Answer } from '../components/Answer'
import { Link } from 'react-router-dom'

import swal from 'sweetalert'
import { deleteAnswer } from '../actions/answerActions'

const SingleQuestionPage = ({
  match,
  dispatch,
  question,
  hasErrors,
  loading,
  userId,
  redirect
}) => {
  const { id } = match.params
  useEffect(() => {
    dispatch(fetchQuestion(id))
  }, [dispatch, id])

  useEffect(() => {
    if(redirect){
      dispatch(fetchQuestion(id))
    }
  }, [dispatch, id, redirect])

  const onDelete = (id) => {
    swal({
        title:"Estás seguro de eliminar este elemento?",
        text:"El elemento se eliminará al dar click en confirmar",
        icon:"warning",
        buttons:["Cancelar", "Confirmar"]
        }).then(answerToDelete=>{
            if(answerToDelete){
                dispatch(deleteAnswer(id))
                swal({
                    text:"El elemento ha sido eliminado satisfactoriamente",
                    icon:"success"
                });
            }
        });
  }

  const renderQuestion = () => {
    if (loading.question) return <p>Loading question...</p>
    if (hasErrors.question) return <p>Unable to display question.</p>

    return <Question question={question} />
  }

  const renderAnswers = () => {
    return (question.answers && question.answers.length) ? question.answers.map(answer => (
      //<Answer key={answer.id} answer={answer} />
      <Answer key={answer.id} answer={answer} userId = {userId} onDelete = {onDelete}/>
    )) : <p>Empty answer!</p>;
  }

  return (
    <section>
      {renderQuestion()}
      {userId && <Link to={"/answer/" + id} className="button right">
        Reply
      </Link>}

      <h2>Answers</h2>
      {renderAnswers()}
    </section>
  )
}

const mapStateToProps = state => ({
  question: state.question.question,
  loading: state.question.loading,
  hasErrors: state.question.hasErrors,
  userId: state.auth.uid,
  redirect: state.question.redirect
})

export default connect(mapStateToProps)(SingleQuestionPage)
