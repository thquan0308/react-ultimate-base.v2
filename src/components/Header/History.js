import React, { useEffect, useState } from 'react';
import { Modal, Button, Table, Pagination } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { getHistory } from '../../services/apiService'; // Giả sử bạn có một service để gọi API

const History = ({ show, handleClose }) => {
    const [listHistory, setListHistory] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const token = useSelector(state => state.user.account?.access_token);

    useEffect(() => {
        if (show) {
            fetchHistory();
        }
    }, [show]);

    const fetchHistory = async () => {
        try {
            let res = await getHistory(token); // Giả sử hàm getHistory cần token
            if (res && res.EC === 0) {
                let newData = res.DT.data.map(item => ({
                    id: item.id,
                    total_correct: item.total_correct,
                    total_questions: item.total_questions,
                    name: item.quizHistory?.name ?? "Unknown Quiz",
                    description: item.quizHistory?.description ?? "Unknown Quiz",
                    date: moment(item.createdAt).utc().format('YYYY-MM-DD HH:mm:ss')
                }));

                setListHistory(newData);
                setError(null);
            } else {
                setError(res.EM || 'Failed to fetch history.');
            }
        } catch (error) {
            console.error('Error fetching history:', error);
            setError('Failed to fetch history. Please try again.');
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = listHistory.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(listHistory.length / itemsPerPage);

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>History</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error ? (
                    <p className="text-danger">{error}</p>
                ) : listHistory.length > 0 ? (
                    <>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Test ID</th>
                                    <th>Quiz Name</th>
                                    <th>Description</th>
                                    <th>Total Questions</th>
                                    <th>Correct Answers</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>{item.total_questions}</td>
                                        <td>{item.total_correct}</td>
                                        <td>{item.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Pagination className="justify-content-center">
                            {[...Array(totalPages).keys()].map(page => (
                                <Pagination.Item
                                    key={page + 1}
                                    active={page + 1 === currentPage}
                                    onClick={() => setCurrentPage(page + 1)}>
                                    {page + 1}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                    </>
                ) : (
                    <p>No history available.</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default History;
