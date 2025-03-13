import { useEffect, useState } from "react"
import { getQuizByUser } from "../../services/apiService"
import './ListQuiz.scss'
import { useNavigate } from "react-router-dom"
const ListQuiz = () => {
    const navigate = useNavigate()
    const [arrQuiz, setArrQuiz] = useState([])

    useEffect(() => {
        getQuizData()
    }, [])

    const getQuizData = async () => {
        const res = await getQuizByUser()
        if (res && res.EC === 0) {
            setArrQuiz(res.DT)
        }
    }
    console.log("arrQuiz:", arrQuiz);

    return (
        <div className="list-quiz-container container">
            {arrQuiz && arrQuiz.length > 0 &&
                arrQuiz.map((quiz, index) => {
                    return (
                        <div key={`${index}-quiz`} className="card" style={{ width: "18rem" }}>
                            <img
                                src={`data:image/jpeg;base64, ${quiz.image}`}
                                className="card-img-top"
                                alt="..."
                                style={{ height: "300px", objectFit: "cover" }}
                            />                            <div className="card-body" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                                <div className="card-body" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                                    <h5 className="card-title" style={{ marginTop: "auto", marginBottom: "5px" }}>Quiz {index + 1}</h5>
                                    <p className="card-text" style={{ marginBottom: "5px" }}>{quiz.description}</p>
                                    <button className="btn btn-primary" onClick={() => navigate(`/quiz/${quiz.id}`, { state: { quizTitle: quiz.description } })}>
                                        Start now
                                    </button>
                                </div>

                            </div>
                        </div>
                    )
                })
            }
            {
                arrQuiz && arrQuiz.length === 0 &&
                < div > You don't have any quiz now...</div>
            }
        </div >
    )
}

export default ListQuiz