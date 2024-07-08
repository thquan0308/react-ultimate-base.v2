import ModalCreateUser from "./ModalCreateUser"


const ManageUser = (props) => {
    return (
        <div className="manage-user-container">
            <div className="title">
                Manage User
            </div>

            <div className="users-content">
                <button>Add new users</button>
            </div>

            <div>
                table users
                <ModalCreateUser />
            </div>
        </div>
    )
}

export default ManageUser