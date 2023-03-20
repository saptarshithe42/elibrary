import React from 'react'
import { useState } from 'react'

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}


function MCQInput(props) {

    const [question, setQuestion] = useState("")
    const [marks, setMarks] = useState(5)
    const [questionEntered, setQuestionEntered] = useState(false)
    const [option, setOption] = useState("")
    const [enterOption, setEnterOption] = useState(false)
    const [optionsList, setOptionsList] = useState([])
    const [correctAnswer, setCorrectAnswer] = useState("")
    const [enteredCorrectAnswer, setEnteredCorrectAnswer] = useState(false)

    const addOption = () => {

        setOptionsList((prevList) => {
            return [...prevList, option]
        })
        setOption("")
        setEnterOption(false)
    }

    const addCorrectAnswer = () => {

        setEnteredCorrectAnswer(true)
        setOptionsList((prevList) => {
            return [...prevList, correctAnswer]
        })

    }


    const handleSubmit = () => {
        props.updateQuestionCount(props.questionNumber + 1)
        props.updateQuestionList((prevList) => {

            const temp = optionsList[0]
            let index = Math.floor(Math.random() * (optionsList.length))
            optionsList[0] = optionsList[index];
            optionsList[index] = temp

            const questionObject = {
                question: question,
                options: shuffle(optionsList),
                correctAnswer: correctAnswer,
                qno: props.questionNumber,
                marks : Number(marks)
            }

            return [...prevList, questionObject]
        })
        setQuestion("")
        setOptionsList([])
        setQuestionEntered(false)
        setCorrectAnswer("")
        setEnteredCorrectAnswer(false)
        setEnterOption(false)
    }




    return (
        <div className="mcq-input">
            {questionEntered && <div>{question}</div>}
            {!questionEntered &&
                <div className="mcq-input">
                    <label>
                        <div style={{margin : "1rem"}}>({props.questionNumber})  Enter Question : </div>
                        <textarea
                            required
                            onChange={(e) => setQuestion(e.target.value)}
                            value={question}
                            style={{borderRadius : "12px"}}
                        ></textarea>

                    </label>
                    <br />
                    <label>
                        <span>Enter Marks : </span>
                        <input
                            required
                            type="number"
                            onChange={(e) => setMarks(e.target.value)}
                            value={marks}
                            style={{width : "15%", borderRadius : "10px"}}
                        ></input>
                    </label>
                    <button onClick={() => { setQuestionEntered(true) }} 
                    className="btn btn-primary"
                    style={{marginLeft : "auto", marginRight:"auto", width:"35%", marginTop : "1rem"}}>
                    Add question</button>
                </div>
            }

            {!enteredCorrectAnswer && questionEntered &&
                <label style={{width : "75%"}}>
                    <span>Enter correct answer : </span>
                    <input
                        required
                        type="text"
                        onChange={(e) => setCorrectAnswer(e.target.value)}
                        value={correctAnswer}
                        style={{width : "40%"}}
                    />
                    <button onClick={addCorrectAnswer} 
                    className="btn btn-primary"
                    style={{width : "20%", marginLeft : "0.2rem"}}
                    >OK</button>
                </label>
            }
            {questionEntered && !enterOption && enteredCorrectAnswer &&

                <button onClick={() => setEnterOption(true)} 
                className="btn btn-primary"
                style={{margin: "1rem auto"}}
                >Add other option</button>
            }
            {enterOption &&
                <label>
                    <span>Enter Option :</span>
                    <input
                        required
                        type="text"
                        onChange={(e) => setOption(e.target.value)}
                        value={option}
                    />
                    <button onClick={addOption}
                    className="btn btn-primary"
                    >OK</button>
                </label>}
            {(optionsList.length > 1) && !enterOption && 
            <button onClick={handleSubmit}
            className="btn btn-primary submit-btn"
            >Submit Question</button>}
        </div>
    )
}

export default MCQInput