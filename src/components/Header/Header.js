import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../services/apiService';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';

const Header = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const account = useSelector(state => state.user.account)

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login')
    }

    const handleRegister = () => {
        navigate('/register')
    }

    const handleLogout = async () => {
        let rs = await logout("account.email", account.refresh_token)
        if (rs && rs.EC === 0) {
            dispatch(doLogout())
            navigate('/login')
        }
        else {
            toast.error(rs.EM)
        }
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                {/* <Navbar.Brand href="#home">Hỏi Dân IT</Navbar.Brand> */}
                <NavLink to='/' className='navbar-brand'> Quizz by THQ</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to='/' className='nav-link'>Home</NavLink>
                        <NavLink to='/users' className='nav-link'>Users</NavLink>
                        <NavLink to='/admins' className='nav-link'>Admin</NavLink>

                        {/* <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/users">Users</Nav.Link>
                        <Nav.Link href="/admins">Admin</Nav.Link> */}

                    </Nav>
                    <Nav>
                        {isAuthenticated === false ?
                            <>
                                <button className='btn-login' onClick={() => handleLogin()}>Log in</button>
                                <button className='btn-signup' onClick={() => handleRegister()}>Sign up</button>
                            </>
                            :
                            <NavDropdown title="Settings" id="basic-nav-dropdown">

                                <NavDropdown.Item >Profile</NavDropdown.Item>
                                <NavDropdown.Item
                                    onClick={() => handleLogout()}
                                >Log out</NavDropdown.Item>
                            </NavDropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;