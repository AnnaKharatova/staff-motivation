import PropTypes from 'prop-types';
import './ModalUpload.scss';
import { React, useEffect, useState, useRef } from 'react';
import { useUser } from '../../context/UserContext';
import { uploadImage, getUsersInfo, getUserData } from '../../../utils/MainApi';
import folder from '../../../images/folder.svg';

function ModalUpload({ onClose }) {
	const [selectedFile, setSelectedFile] = useState(null);
	const { setUserData } = useUser();
	const filePicker = useRef(null);

	const handleChange = (e) => {
		setSelectedFile(e.target.files[0]);
	};

	const handlePick = () => {
		filePicker.current.click();
	};

	const handleGetUserData = () => {
		getUserData()
			.then((data) => {
				if (data.length > 0) {
					setUserData(data[0]);
				} else {
					console.log('Ответ сервера не содержит данных пользователя.');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleUpload = () => {
		getUsersInfo()
			.then((userData) => {
				const userId = userData.id;
				if (selectedFile && userId) {
					uploadImage(selectedFile, userId)
						.then((data) => {
							handleGetUserData(data);
							onClose();
						})
						.catch((error) => {
							console.log('Ошибка загрузки', error);
						});
				}
			})
			.catch((error) => {
				console.log('Ошибка получения данных пользователя', error);
			});
	};

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

	return (
		<div className="modal-background" aria-hidden="true" onClick={onClose}>
			<div
				className="modalUpload"
				aria-hidden="true"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					className="modalUpload__close-btn"
					aria-label="close-btn"
					onClick={onClose}
				/>
				<h2 className="modalUpload__title">Загрузка фотографии</h2>
				<img src={folder} alt="Папка" className="modalUpload__image" />
				<p className="modalUpload__text">
					Коллегам будет проще узнать вас, если вы загрузите свою <br />
					настоящую фотографию <br />
					Формат: JPG, PNG. Размер: не более 10 МБ. <br />
				</p>
				{!selectedFile ? (
					<button className="modalUpload__button" onClick={handlePick}>
						<div className="modalUpload__button-icon" />
						<p className="modalUpload__button-text">Выбрать файл</p>
					</button>
				) : (
					<button className="modalUpload__button" onClick={handleUpload}>
						<div className="modalUpload__button-icon" />
						<p className="modalUpload__button-text modalUpload__button-text_load">
							Загрузить
						</p>
					</button>
				)}
				{selectedFile && (
					<p className="modalUpload__file-name">{selectedFile.name}</p>
				)}
				<input
					className="modalUpload__input modalUpload__input-hidden"
					type="file"
					ref={filePicker}
					onChange={handleChange}
					accept="image/*, .png, .jpg"
				/>
			</div>
		</div>
	);
}

export default ModalUpload;

ModalUpload.propTypes = {
	onClose: PropTypes.func.isRequired,
};
