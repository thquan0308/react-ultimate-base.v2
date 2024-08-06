import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss'
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import { useEffect, useState } from "react"
import { getAllUsers } from "../../../services/apiService"
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";

const ManageUser = (props) => {

    const [showModelCreateUser, setShowModalCreateUser] = useState(false)

    const [showModelUpdateUser, setShowModelUpdateUser] = useState(false)

    const [showModelViewUser, setShowModelViewUser] = useState(false)

    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)

    const [dataUpdate, setDataUpdate] = useState({})

    const [dataView, setDataView] = useState({})

    const [dataDelete, setDataDelete] = useState({})

    const [listUsers, setListUsers] = useState([])

    useEffect(() => {
        fetchListUsers()
    }, [])

    const fetchListUsers = async () => {
        let res = await getAllUsers()
        if (res.EC === 0) {
            setListUsers(res.DT)
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
                    <TableUser
                        listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}

                    />
                </div>

                <ModalCreateUser
                    show={showModelCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUsers={fetchListUsers}
                />
                <ModalUpdateUser
                    show={showModelUpdateUser}
                    setShow={setShowModelUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUsers={fetchListUsers}
                    resetUpdateData={resetUpdateData}
                />
                <ModalViewUser
                    show={showModelViewUser}
                    setShow={setShowModelViewUser}
                    dataView={dataView}
                    fetchListUsers={fetchListUsers}
                    resetViewData={resetViewData}
                />
                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    fetchListUsers={fetchListUsers}

                />

            </div>
        </div>
    )
}

export default ManageUser