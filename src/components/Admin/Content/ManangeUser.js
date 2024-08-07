import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss'
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import { useEffect, useState } from "react"
import { getAllUsers, getUserWithPaginate } from "../../../services/apiService"
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = (props) => {
    const LIMIT_USER = 6

    const [pageCount, setPageCount] = useState(0)

    const [currentPage, setCurrentPage] = useState(1)

    const [showModelCreateUser, setShowModalCreateUser] = useState(false)

    const [showModelUpdateUser, setShowModelUpdateUser] = useState(false)

    const [showModelViewUser, setShowModelViewUser] = useState(false)

    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)

    const [dataUpdate, setDataUpdate] = useState({})

    const [dataView, setDataView] = useState({})

    const [dataDelete, setDataDelete] = useState({})

    const [listUsers, setListUsers] = useState([])

    useEffect(() => {
        // fetchListUsers()
        fetchListUsersWithPaginate(1)
    }, [])

    const fetchListUsers = async () => {
        let res = await getAllUsers()
        if (res.EC === 0) {
            setListUsers(res.DT)
        }
    }

    const fetchListUsersWithPaginate = async (page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER)
        if (res.EC === 0) {
            console.log('res.dt = ', res.DT)
            setListUsers(res.DT.users)
            setPageCount(res.DT.totalPages)
        }
    }

    const handleClickBtnUpdate = (user) => {
        setShowModelUpdateUser(true)
        setDataUpdate(user)
    }

    const handleClickBtnView = (user) => {
        setShowModelViewUser(true)
        setDataView(user)
    }

    const resetUpdateData = () => {
        setDataUpdate({})
    }

    const resetViewData = () => {
        setDataView({})
    }

    const handleClickBtnDelete = (user) => {
        setShowModalDeleteUser(true)
        setDataDelete(user)
    }

    return (
        <div className="manage-user-container">
            <div className="title">
                Manage User
            </div>

            <div className="users-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary"
                        onClick={() => setShowModalCreateUser(true)}>
                        <FcPlus />Add new users</button>
                </div>

                <div className="table-users-container">
                    {/* <TableUser
                        listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                    /> */}
                    <TableUserPaginate
                        listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>

                <ModalCreateUser
                    show={showModelCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUsers={fetchListUsers}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalUpdateUser
                    show={showModelUpdateUser}
                    setShow={setShowModelUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUsers={fetchListUsers}
                    resetUpdateData={resetUpdateData}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalViewUser
                    show={showModelViewUser}
                    setShow={setShowModelViewUser}
                    dataView={dataView}
                    fetchListUsers={fetchListUsers}
                    resetViewData={resetViewData}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    fetchListUsers={fetchListUsers}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}

                />

            </div>
        </div>
    )
}

export default ManageUser