import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss'
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import { useEffect, useState } from "react"
import { getAllUsers } from "../../../services/apiService"
import ModalUpdateUser from "./ModalUpdateUser";
const ManageUser = (props) => {

    const [showModelCreateUser, setShowModalCreateUser] = useState(false)

    const [showModelUpdateUser, setShowModelUpdateUser] = useState(false)

    const [dataUpdate, setDataUpdate] = useState({})

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

    const resetUpdateDate = () => {
        setDataUpdate({})
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
                    resetUpdateDate={resetUpdateDate}
                />

            </div>
        </div>
    )
}

export default ManageUser