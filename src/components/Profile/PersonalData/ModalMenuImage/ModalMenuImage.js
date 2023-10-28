import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './ModalMenuImage.scss';

function ModalMenuImage({
	onClose,
	handleOpenUploadModal,
	handleOpenDeleteModal,
}) {
	const handleEscClose = (event) => {
		if (event.key === 'Escape') {
			onClose();
		}
	};

	const handleOpenUpload = () => {
		onClose();
		handleOpenUploadModal();
	};

	const handleOpenDelete = () => {
		onClose();
		handleOpenDeleteModal();
	};

	useEffect(() => {
		window.addEventListener('keydown', handleEscClose);
		return () => {
			window.removeEventListener('keydown', handleEscClose);
		};
	});

	return (
		<div className="modalbackground" aria-hidden="true" onClick={onClose}>
			<div
				className="modal-menu"
				aria-hidden="true"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="modal-menu__container">
					<button className="modal-menu__btn" onClick={handleOpenUpload}>
						<div className="modal-menu__icon modal-menu__icon_user" />
						<p className="modal-menu__text">Загрузить фотографии</p>
					</button>
					<button className="modal-menu__btn" onClick={handleOpenDelete}>
						<div className="modal-menu__icon modal-menu__icon_trash" />
						<p className="modal-menu__text">Удалить фотографии</p>
					</button>
				</div>
			</div>
		</div>
	);
}

ModalMenuImage.propTypes = {
	handleOpenUploadModal: PropTypes.func.isRequired,
	handleOpenDeleteModal: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default ModalMenuImage;
