import React from 'react';

function QuestionItem({ question, onDelete, onUpdate }) {
  return (
    <div>
      <h3>{question.prompt}</h3>
      {/* Add other question properties as needed */}
      <button onClick={() => onDelete(question.id)}>Delete</button>
      <select
        value={question.correctIndex}
        onChange={(e) => onUpdate(question.id, e.target.value)}
      >
        {question.answers.map((answer, index) => (
          <option key={index} value={index}>{answer}</option>
        ))}
      </select>
    </div>
  );
}

export default QuestionItem;
