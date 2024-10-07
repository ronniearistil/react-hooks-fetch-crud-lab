import React from "react";

function QuestionList({ questions, deleteQuestion }) {
    return (
        <section>
            <h1>Question List</h1>
            {questions.map((question) => (
                <div key={question.id}>
                    <p>{question.prompt}</p>
                    <button onClick={() => deleteQuestion(question.id)}>Delete Question</button>
                </div>
            ))}
        </section>
    );
}

export default QuestionList;


