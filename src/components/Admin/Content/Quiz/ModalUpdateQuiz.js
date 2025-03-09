import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import { putUpdateQuizForAdmin } from '../../../../services/apiService';
import _ from 'lodash'
import { set } from 'nprogress';

const ModalUpdateQuiz = (props) => {
    const { show, setShow, dataUpdate, setDataUpdate } = props

    const handleClose = () => {
        setShow(false)
        setName("")
        setDescription("")
        setType("")
        setImage("")
        setPreviewImage("")
        setDataUpdate({})
    };

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [type, setType] = useState("")
    const [image, setImage] = useState("")
    const [previewImage, setPreviewImage] = useState("")
    const [difficulty, setDifficulty] = useState(''); // Khởi tạo state

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setName(dataUpdate.name || '');
            setDescription(dataUpdate.description || '');
            setDifficulty(dataUpdate.difficulty || ''); // Lấy giá trị đã lưu
            setImage('');
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
            }
        }
    }, [dataUpdate]);

    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        }
    }

    // const validateEmail = (email) => {
    //     return String(email)
    //         .toLowerCase()
    //         .match(
    //             /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //         );
    // };


    const handSubmitUpdateQuiz = async () => {
        let data = await putUpdateQuizForAdmin(dataUpdate.id, name, description, difficulty, image);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await props.fetchQuiz();
        } else if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    };


    return (
        <>

            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                backdrop="static"
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update a user</Modal.Title>
                </Modal.Header>
                {/* ------------------------------------------ */}
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}

                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                value={description}

                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Type</label>
                            <select
                                className="form-select"
                                onChange={(event) => setDifficulty(event.target.value)}
                                value={difficulty} // Hiển thị giá trị đã lưu
                            >
                                <option value="EASY">EASY</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HARD">HARD</option>
                            </select>
                        </div>

                        <div className='col-md-12'>
                            <label className="form-label label-upload" htmlFor='labelUpload'>
                                <FcPlus />Upload File Image
                            </label>
                            <input
                                type="file"
                                id="labelUpload" hidden
                                onChange={(event) => handleChangeFile(event)}
                            />
                        </div>

                        <div className='col-md-12 img-preview'>
                            {previewImage ?
                                <img src={previewImage} />
                                :
                                <span>Preview Image</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                {/* ------------------------------------------ */}

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handSubmitUpdateQuiz()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateQuiz