import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import { AuthContext } from '../../shared/context/auth-context';
import './PlaceItem.css';

const PlaceItem = (props) => {
    const { id, image, title, address, description, coordinates } = props;

    const auth = useContext(AuthContext);

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const [showMap, setShowMap] = useState(false);

    const openMapHandler = () => setShowMap(true);

    const closeMapHandler = () => setShowMap(false);

    const showDeleteWarningHandler = () => setShowConfirmModal(true);

    const cancelDeleteHandler = () => setShowConfirmModal(false);

    const confirmDeleteHandler = () => {
        setShowConfirmModal(false);
        console.log('Deleting...');
    };

    return (
        <>
            <Modal
                show={showMap}
                onCancel={closeMapHandler}
                header={address}
                contentClass='place-item__modal-content'
                footerClass='place-item__modal-actions'
                footer={<Button onClick={closeMapHandler}>Close</Button>}
            >
                <div className='map-container'>
                    <Map center={coordinates} zoom={16} />
                </div>
            </Modal>
            <Modal
                show={showConfirmModal}
                onCancel={cancelDeleteHandler}
                header='Are you sure?'
                footerClass='place-item__modal-actions'
                footer={
                    <>
                        <Button inverse onClick={cancelDeleteHandler}>
                            Cancel
                        </Button>
                        <Button danger onClick={confirmDeleteHandler}>
                            Delete
                        </Button>
                    </>
                }
            >
                <p>
                    Do you want to proceed and delete this place? Please note
                    that it can't be undone thereafter
                </p>
            </Modal>
            <li className='place-item'>
                <Card className='place-item__content'>
                    <div className='place-item__image'>
                        <img src={image} alt={title} />
                    </div>
                    <div className='place-item__info'>
                        <h2>{title}</h2>
                        <h3>{address}</h3>
                        <p>{description}</p>
                    </div>
                    <div className='place-item__actions'>
                        <Button inverse onClick={openMapHandler}>
                            View on map
                        </Button>
                        {auth.isLoggedIn && (
                            <Button to={`/places/${id}`}>Edit</Button>
                        )}
                        {auth.isLoggedIn && (
                            <Button danger onClick={showDeleteWarningHandler}>
                                Delete
                            </Button>
                        )}
                    </div>
                </Card>
            </li>
        </>
    );
};

export default PlaceItem;
