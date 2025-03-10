import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

// const PrivateRoute = (props) => {
//     const isAuthenticated = useSelector(
//         (state) => state.user.isAuthenticated
//     )
//     if (!isAuthenticated) {
//         return <Navigate to="/login" ></Navigate>
//     }
//     return (
//         <>
//             {props.children}
//         </>
//     )
// }
const PrivateRoute = ({ children, requiredRole }) => {
    const { isAuthenticated, account } = useSelector((state) => state.user);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && account?.role !== requiredRole) {
        toast.error("You do not have permission to access the admin page.");
        return <Navigate to="/" />;
    }
    return children;
}
export default PrivateRoute;