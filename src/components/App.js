import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
    const [page, setPage] = useState("List");
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await fetch("http://localhost:4000/questions");
            const data = await response.json();
            setQuestions(data);
        };

        fetchQuestions();
    }, []);

    const addQuestion = async (newQuestion) => {
        const response = await fetch("http://localhost:4000/questions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                prompt: newQuestion.prompt,
                answers: [newQuestion.answer1, newQuestion.answer2, newQuestion.answer3, newQuestion.answer4],
                correctIndex: parseInt(newQuestion.correctIndex),
            }),
        });

        if (response.ok) {
            const addedQuestion = await response.json();
            setQuestions((prevQuestions) => [...prevQuestions, addedQuestion]);
        }
    };

    const deleteQuestion = async (id) => {
        const response = await fetch(`http://localhost:4000/questions/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            setQuestions((prevQuestions) =>
                prevQuestions.filter((question) => question.id !== id)
            );
        }
    };

    const updateQuestion = async (id, correctIndex) => {
        const response = await fetch(`http://localhost:4000/questions/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ correctIndex }),
        });

        if (response.ok) {
            const updatedQuestion = await response.json();
            setQuestions((prevQuestions) =>
                prevQuestions.map((question) =>
                    question.id === id ? updatedQuestion : question
                )
            );
        }
    };

    return (
        <main>
            <AdminNavBar onChangePage={setPage} />
            {page === "Form" ? (
                <QuestionForm addQuestion={addQuestion} />
            ) : (
                <QuestionList questions={questions} deleteQuestion={deleteQuestion} updateQuestion={updateQuestion} />
            )}
        </main>
    );
}

export default App;

