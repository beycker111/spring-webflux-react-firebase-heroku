import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";

import { fetchQuestions, searchQuestions, filterCategory, searchFirstQuestions } from '../actions/questionActions'
import { Question } from '../components/Question'

const QuestionsPage = ({ dispatch, loading, questions, redirect, hasErrors }) => {

    const [busqueda, setBusqueda] = useState('');
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchQuestions())
    }, [dispatch])

    useEffect(() => {
        if (redirect) {
            history.push(redirect);
        }
    }, [redirect, history])
    
    const renderQuestions = () => {
        if (loading) return <p>Loading questions...</p>
        if (hasErrors) return <p>Unable to display questions.</p>

        return questions.map(question => <Question key={question.id} question={ question } excerpt />)
    }

    const search = (value) => {
        //console.log(value);
        dispatch(searchQuestions(value));
    }

    const filter = (value) => {
        //console.log(value);
        dispatch(filterCategory(value));
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            //console.log(busqueda);
            dispatch(searchFirstQuestions(busqueda));
          }
    }

    return (
        <section>
            <h1>Questions</h1>
            <p><input type="text" onKeyDown={handleKeyDown} placeholder="SEARCH" onChange={(event) => {
                search(event.target.value);
                setBusqueda(event.target.value);
          }} /></p>
            <p>
                <select onChange={(event) => {
                    filter(event.target.value);
                }}>
                    <option value="NONE">SELECT A CATEGORY</option>
                    <option value="TECHNOLOGY AND COMPUTER">TECHNOLOGY AND COMPUTER</option>
                    <option value="SCIENCES">SCIENCES</option>
                    <option value="SOFTWARE DEVELOPMENT">SOFTWARE DEVELOPMENT</option>
                    <option value="SOCIAL SCIENCES">SOCIAL SCIENCES</option>
                    <option value="LANGUAGE">LANGUAGE</option>

                </select>
            </p>
            {renderQuestions()}
            <br /><br /><br /><br /><br /><br />
        </section>
    )
}

const mapStateToProps = state => ({
    loading: state.question.loading,
    questions: state.question.questions,
    redirect: state.question.redirect,
    hasErrors: state.question.hasErrors,
})

export default connect(mapStateToProps)(QuestionsPage)
