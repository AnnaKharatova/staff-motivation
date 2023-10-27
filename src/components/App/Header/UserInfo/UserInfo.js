import React from 'react';
import '../Header.scss';
import { useUser } from '../../../context/UserContext';

function UserInfo() {
	const { userData } = useUser();
	const firstNameInitial = userData.first_name
		? userData.first_name.charAt(0).toUpperCase()
		: '';
	const lastNameInitial = userData.last_name
		? userData.last_name.charAt(0).toUpperCase()
		: '';
	const initials = `${firstNameInitial}${lastNameInitial}`;
	const fullName = `${userData.first_name} ${userData.last_name}`;
	return (
		<div className="header__user-info">
			{userData && userData.image ? (
				<img
					className="header__photo"
					src={userData.image}
					alt="Фотография сотрудника"
				/>
			) : (
				<div className="header__plug">{initials}</div>
			)}
			<div className="header__details">
				<div className="header__name">{fullName}</div>
				<div className="header__position">
					{userData.department === 'None' ? 'Не указан' : userData.department}
				</div>
			</div>
		</div>
	);
}

export default UserInfo;
