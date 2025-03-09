import { useEffect, useState } from "react"
import { useParams, useLocation } from "react-router-dom"
import { getDataQuiz, postSubmitQuiz } from "../../services/apiService"
import _ from 'lodash'
import './DetailQuiz.scss'
import Quesion from "./Question"
import { Modal } from "bootstrap"
import ModalResult from "./ModalResult"

const DetailQuiz = (props) => {
    const params = useParams()
    const location = useLocation()
    const quizId = params.id
    const [dataQuiz, setDataQuiz] = useState([])
    const [index, setIndex] = useState(0)
    const [isShowModalResult, setIsShowModalResult] = useState(false)
    const [dataModalResult, setDataModalResult] = useState({})

    useEffect(() => {
        fetchQuestion()
    }, [quizId])

    const fetchQuestion = async () => {
        let res = await getDataQuiz(quizId)
        // console.log('>>> check question: ', res)
        if (res && res.EC === 0) {
            let raw = res.DT
            let data = _.chain(raw)
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let answers = []
                    let questionDescription, image = null
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description
                            image = item.image
                        }
                        item.answers.isSelected = false
                        answers.push(item.answers)
                    })
                    return { questionId: key, answers, questionDescription, image }
                }
                )
                .value()
            setDataQuiz(data)
        }
    }

    const handlePrev = () => {
        if (index - 1 < 0) return
        setIndex(index - 1)
    }

    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1)
            setIndex(index + 1)
    }

    const handleCheckBox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz)
        let question = dataQuizClone.find(item => +item.questionId === +questionId)
        if (question && question.answers) {
            let b = question.answers.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected
                }
                return item
            })
            question.answers = b
            // console.log(b)
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
        if (index > -1) {
            dataQuizClone[index] = question
            setDataQuiz(dataQuizClone)

        }
    }

    const handleFinish = async () => {
        // console.log('finish: ', dataQuiz)
        let payload = {
            quizId: +quizId,
            answers: []
        }
        let answers = []

        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(question => {
                let questionId = question.questionId
                let userAnswerId = []

                question.answers.forEach(a => {
                    if (a.isSelected === true) {
                        userAnswerId.push(a.id)
                    }
                })
                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })

            payload.answers = answers

            //submit api
            let res = await postSubmitQuiz(payload)
            console.log('res: ', res)
            if (res && res.EC === 0) {
                setDataModalResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData
                })
                setIsShowModalResult(true)
            } else {
                alert(`something wrong...`)
            }
        }
    }

    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">
                    Quiz {quizId}: {location?.state?.quizTitle}: Không đọc đề cũng làm được (level easy)
                </div>
                <hr />
                <div className="q-body">
                    <img />
                </div>

                <div className="q-content">
                    <Quesion
                        index={index}
                        handleCheckBox={handleCheckBox}
                        data={
                            dataQuiz && dataQuiz.length > 0
                                ? dataQuiz[index]
                                : []
                        }
                    />
                </div>
                <div className="footer">
                    <button className="btn btn-secondary"
                        onClick={() => handlePrev()}
                    >Prev
                    </button>
                    <button className="btn btn-primary"
                        onClick={() => handleNext()}
                    >Next
                    </button>
                    <button className="btn btn-warning"
                        onClick={() => handleFinish()}
                    >Finish
                    </button>

                </div>
            </div>
            <div className="right-content">
                Count down
            </div>
            <ModalResult
                show={isShowModalResult}
                setShow={setIsShowModalResult}
                dataModalResult={dataModalResult}
            />
        </div>
    )
}

export default DetailQuiz