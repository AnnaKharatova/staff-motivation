import PropTypes from 'prop-types';
import './ModalDeleteImage.scss';
import React, { useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { deleteImage, getUsersInfo } from '../../../utils/MainApi';
import circleYellow from '../../../images/circleYellow.svg';

function ModalDeleImage({ onClose }) {
	const { handleGetUserData } = useUser();

	const handleEscClose = (event) => {
		if (event.key === 'Escape') {
			onClose();
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', handleEscClose);
		return () => {
			window.removeEventListener('keydown', handleEscClose);
		};
	});

	const handleDeleteImage = () => {
		getUsersInfo()
			.then((userData) => {
				const userId = userData.id;
				if (userId) {
					deleteImage(userId)
						.then(() => {
							handleGetUserData();
							onClose();
						})
						.catch((error) => {
							console.log('Ошибка удаления изображения', error);
						});
				}
			})
			.catch((error) => {
				console.log('Ошибка получения данных пользователя', error);
			});
	};

	return (
		<div className="modal-background" aria-hidden="true" onClick={onClose}>
			<div
				className="modalDelete"
				aria-hidden="true"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					className="modalDelete__close-btn"
					aria-label="close-btn"
					onClick={onClose}
				/>
				<h2 className="modalDelete__title">Удаление фотографии</h2>
				<img src={circleYellow} alt="Папка" className="modalDelete__image" />
				<p className="modalUpload__text">
					Вы уверены, что хотите удалить фотографию?
				</p>
				<div className="modalDelete__button-container">
					<button className="modalDelete__btn" onClick={onClose}>
						Отменить
					</button>
					<button
						className="modalDelete__btn modalDelete__btn_confirm"
						onClick={handleDeleteImage}
					>
						Удалить
					</button>
				</div>
			</div>
		</div>
	);
}

export default ModalDeleImage;

ModalDeleImage.propTypes = {
	onClose: PropTypes.func.isRequired,
};
