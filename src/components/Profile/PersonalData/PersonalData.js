import { useForm } from 'react-hook-form';
import React from 'react';
import './PersonalData.scss';
import PropTypes from 'prop-types';
import ModalMenuImage from './ModalMenuImage/ModalMenuImage';
import { useUser } from '../../context/UserContext';
import { setUsersInfo } from '../../../utils/MainApi';
import changePhoto from '../../../images/change-photo.svg';

function PersonalData({
	personalData,
	contacts,
	handleOpenUploadModal,
	handleOpenModalMenu,
	handleCloseModalMenu,
	handleOpenDeleteModal,
	isMenuModal,
}) {
	const { register, handleSubmit } = useForm({
		mode: 'onTouched',
	});
	const { userData } = useUser();
	const firstNameInitial = personalData.first_name
		? personalData.first_name.charAt(0).toUpperCase()
		: '';
	const lastNameInitial = personalData.last_name
		? personalData.last_name.charAt(0).toUpperCase()
		: '';
	const initials = `${firstNameInitial}${lastNameInitial}`;
	const fullName = `${personalData.first_name} ${personalData.last_name}`;

	function handlePersonalData(data) {
		setUsersInfo(data)
			.then((newdata) => {
				console.log(newdata);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function onSubmit(data, evt) {
		evt.preventDefault();
		handlePersonalData(data);
	}

	return (
		<section className="personal-data">
			<div className="personal-data__photo-container">
				{userData && userData.image ? (
					<img
						className="personal-data__photo"
						src={userData.image}
						alt="Фотография сотрудника"
					/>
				) : (
					<div className="personal-data__plug">{initials}</div>
				)}
				<h1 className="personal-data__name">{fullName}</h1>
				<p className="personal-data__job">{personalData.role || ' '}</p>
				<p className="personal-data__department">{personalData.department}</p>
				<p className="personal-data__level">{`Уровень: ${personalData.position}`}</p>
				<button
					className="personal-data__change-photo-button"
					type="button"
					onClick={handleOpenModalMenu}
				>
					<img
						className="personal-data__change-photo-logo"
						src={changePhoto}
						alt="изменить фото"
					/>
				</button>
			</div>
			<div className="personal-data__data-container">
				<form className="personal-data__form" onSubmit={handleSubmit(onSubmit)}>
					<label
						className="personal-data__label personal-data__label_phone"
						htmlFor="phone"
					>
						Телефон
						<input
							className="personal-data__input "
							defaultValue={contacts.phone || ''}
							type="number"
							name="phone"
							id="phone"
							{...register('phone', { required: false })}
						/>
					</label>
					<label
						className="personal-data__label personal-data__label_telegram"
						htmlFor="telegram"
					>
						Telegram
						<input
							className="personal-data__input"
							defaultValue={contacts.telegram}
							type="text"
							name="telegram"
							id="telegram"
							{...register('telegram', { required: false })}
						/>
					</label>
					<label
						className="personal-data__label personal-data__label_email"
						htmlFor="email"
					>
						Электронная почта
						<input
							className="personal-data__input "
							defaultValue={personalData.email}
							type="email"
							name="email"
							id="email"
							{...register('email', { required: false })}
						/>
					</label>
					<label
						className="personal-data__label personal-data__label_github"
						htmlFor="github"
					>
						GitHub
						<input
							className="personal-data__input "
							defaultValue={contacts.github}
							type="text"
							name="github"
							id="github"
							{...register('github', { required: false })}
						/>
					</label>
					<label
						className="personal-data__label personal-data__label_linkedin"
						htmlFor="linkedin"
					>
						LinkedIn
						<input
							className="personal-data__input "
							defaultValue={contacts.linkedin}
							type="text"
							name="linkedin"
							id="linkedin"
							{...register('linkedin', { required: false })}
						/>
					</label>
					<label
						className="personal-data__label personal-data__label_birthday"
						htmlFor="birthday"
					>
						Дата рождения
						<input
							className="personal-data__input "
							defaultValue={personalData.birthday}
							type="text"
							name="birthday"
							id="birthday"
							{...register('birthday', { required: false })}
						/>
					</label>
					<button
						className="personal-data__submit-button personal-data__submit-button_save"
						type="submit"
					>
						Сохранить изменения
					</button>
					<button
						className="personal-data__submit-button personal-data__submit-button_dont-save"
						type="button"
					>
						Не сохранять
					</button>
				</form>
			</div>
			{isMenuModal && (
				<ModalMenuImage
					onClose={handleCloseModalMenu}
					handleOpenUploadModal={handleOpenUploadModal}
					handleOpenDeleteModal={handleOpenDeleteModal}
				/>
			)}
		</section>
	);
}

export default PersonalData;

PersonalData.propTypes = {
	handleOpenUploadModal: PropTypes.func.isRequired,
	handleOpenModalMenu: PropTypes.func.isRequired,
	handleCloseModalMenu: PropTypes.func.isRequired,
	handleOpenDeleteModal: PropTypes.func.isRequired,
	isMenuModal: PropTypes.bool.isRequired,
	contacts: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	personalData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

PersonalData.defaultProps = {
	personalData: {
		first_name: 'Имя',
		last_name: 'Фамилия',
		image: '',
		department: 'Опредляется',
		reward_points_for_current_month: 0,
		reward_points: 0,
		rating: 0,
		birthday: '',
		email: '',
		role: '',
		position: '',
	},

	contacts: {
		linkedin: '',
		github: '',
		telegram: '',
		phone: '',
	},
};
