import { useState, useEffect } from 'react'
import './ManageQuiz.scss'
import Select from 'react-select'
import { postCreateNewQuiz } from '../../../../services/apiService'
import { toast } from 'react-toastify'
import TableQuiz from './TableQuiz'
import Accordion from 'react-bootstrap/Accordion';
import { getAllQuizForAdmin } from '../../../../services/apiService'
import QuizQA from './QuizQA'
import AssignQuiz from './AssignQuiz'

const options = [
    { value: 'Easy', label: 'Easy' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Hard', label: 'Hard' }
]

const ManageQuiz = (props) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const [image, setImage] = useState(null)
    const [listQuiz, setListQuiz] = useState([]);


    // Hàm fetch quiz
    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            setListQuiz(res.DT)
        }
    }

    useEffect(() => {
        fetchQuiz(); // Fetch data when component mounts
    }, []);


    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0])
        }
    }

    const handleSubmitQuiz = async () => {
        if (!name || !description) {
            toast.error(`Missing fields`)
            return
        }

        let res = await postCreateNewQuiz(name, description, type?.value, image)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setName('')
            setDescription('')
            setType('')
            setImage(null)

            // Gọi fetchQuiz sau khi quiz được tạo thành công
            fetchQuiz();
        } else {
            toast.error(res.EM)
        }
    }


    return (
        <div className="quiz-container">
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Manage Quizzes</Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new">
                            <fieldset className="border rounded-3 p-3">
                                <legend className="float-none w-auto px-3">Add new Quiz:</legend>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder='Enter name'
                                        value={name}
                                        onChange={(event) => {
                                            setName(event.target.value)
                                        }}
                                    />
                                    <label >Name</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder='Enter description'
                                        value={description}
                                        onChange={(event) => {
                                            setDescription(event.target.value)
                                        }}
                                    />
                                    <label >Description</label>
                                </div>
                                <div className='my-3'>
                                    <Select
                                        value={type}
                                        defaultValue={type}
                                        onChange={setType}
                                        options={options}
                                        placeholder={"Select type"}
                                    />
                                </div>

                                <div className="more-action form-group">
                                    <label className='mb-1'>Upload image</label>
                                    <input
                                        type="file"
                                        className='form-control'
                                        onChange={event => {
                                            handleChangeFile(event)
                                        }}
                                    />
                                    <div className='mt-3'>
                                        <button
                                            className='btn btn-warning'
                                            onClick={() => handleSubmitQuiz()}
                                        >
                                            Save
                                        </button>
                                    </div>

                                </div>
                            </fieldset>
                        </div >
                        <div className="list-detail">
                            {/* <TableQuiz listQuiz={listQuiz} fetchQuiz={fetchQuiz} /> */}
                            <TableQuiz />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey='1'>
                    <Accordion.Header>Update Q/A Quiz</Accordion.Header>
                    <Accordion.Body>
                        <QuizQA />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey='2'>
                    <Accordion.Header>Assign to Users</Accordion.Header>
                    <Accordion.Body>
                        <AssignQuiz />
                    </Accordion.Body>
                </Accordion.Item>

            </Accordion>




        </div >
    )
}

export default ManageQuiz