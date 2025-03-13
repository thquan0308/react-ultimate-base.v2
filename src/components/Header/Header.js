import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../services/apiService';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';
import Language from './Language';
import UserInfor from './UserInfor';
import History from './History';
import { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next'

const Header = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const account = useSelector(state => state.user.account)
    const [showUserInfor, setShowUserInfor] = useState(false);
    const [showUserHistory, setShowUserHistory] = useState(false);
    const { t } = useTranslation()

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
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    {/* <Navbar.Brand href="#home">Hỏi Dân IT</Navbar.Brand> */}
                    <NavLink to='/' className='navbar-brand'> Quizz by THQ</NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to='/' className='nav-link'>{t('header.home')}</NavLink>
                            <NavLink to='/users' className='nav-link'>{t('header.users')}</NavLink>
                            <NavLink to='/admins' className='nav-link'>{t('header.admin')}</NavLink>

                            {/* <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/users">Users</Nav.Link>
                        <Nav.Link href="/admins">Admin</Nav.Link> */}

                        </Nav>
                        <Nav>
                            {isAuthenticated === false ?
                                <>
                                    <button className='btn-login' onClick={() => handleLogin()}>{t('header.login')}</button>
                                    <button className='btn-signup' onClick={() => handleRegister()}>{t('header.signup')}</button>
                                </>
                                :
                                <NavDropdown title={t('header.setting')} id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={() => setShowUserInfor(true)}>{t('header.profile')}</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => setShowUserHistory(true)}>{t('header.history')}</NavDropdown.Item>
                                    <NavDropdown.Item
                                        onClick={() => handleLogout()}
                                    >{t('header.logout')}</NavDropdown.Item>
                                </NavDropdown>
                            }

                            <Language />

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <UserInfor show={showUserInfor} handleClose={() => setShowUserInfor(false)} />
            <History show={showUserHistory} handleClose={() => setShowUserHistory(false)} />
        </>
    );
}

export default Header;