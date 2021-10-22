import React from 'react'


export const Answer = ({ answer, userId, onDelete }) => (
  

    <div className="row answer">
      <div className="col-md-11">
        <p>{answer.answer}</p>  
        
      </div>
      <div className="col-md-1">
        <div className="float-right">
          {answer.userId === userId &&(
          <button onClick = {() => onDelete(answer.id)}>Delete</button>
          )}
        </div>
        
      </div>
    </div>
    
    
)