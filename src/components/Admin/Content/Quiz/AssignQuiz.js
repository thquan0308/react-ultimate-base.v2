import Select from "react-select";
import { useState, useEffect } from "react";
import { getAllQuizForAdmin, getAllUsers } from "../../../../services/apiService";

const AssignQuiz = (props) => {
    const [listQuiz, setListQuiz] = useState([]);
    const [listUsers, setListUsers] = useState([]);

    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [selectedUser, setSelectedUser] = useState({});

    useEffect(() => {
        fetchQuiz()
        fetchUser()
    }, [])

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin()
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                }
            })
            setListQuiz(newQuiz)
        }
    }

    const fetchUser = async () => {
        let res = await getAllUsers()
        if (res && res.EC === 0) {
            let users = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`
                }
            })
            setListUsers(users)
        }
    }

    return (
        <div className="assign-quiz-container row">
            <div className="col-6 form-group">
                <label className="mb-2">Selected Quiz:</label>
                <Select
                    defaultValue={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                />
            </div>

            <div className="col-6 form-group">
                <label className="mb-2">Selected User:</label>
                <Select
                    defaultValue={selectedUser}
                    onChange={setSelectedUser}
                    options={listUsers}
                />
            </div>

            <div>
                <button className="btn btn-warning">Assign</button>
            </div>

        </div>
    )

}

export default AssignQuiz;