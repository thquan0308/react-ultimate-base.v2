import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UserInfor from './UserInfor';
import Password from './Password';
import History from './History';

const Profile = (props) => {
    const { t } = useTranslation();

    const { show, setShow } = props;

    const handleClose = () => setShow(false);

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                backdrop="static"
                aria-labelledby="modal-profile"
            >
                <Modal.Header>
                    <Modal.Title>{t('profile.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        defaultActiveKey="profile"
                        id="uncontrolled-tab-example"
                        className="mb-3"

                    >
                        <Tab eventKey="profile" title="User Information">
                            <UserInfor />
                        </Tab>
                        <Tab eventKey="password" title="Password">
                            <Password />
                        </Tab>
                        <Tab eventKey="history" title="History">
                            <History />
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Profile;