import React from 'react';
import '../Header.scss';
import { useUser } from '../../../context/UserContext';

function UserPoints() {
	const { userData } = useUser();
	return (
		<div className="header__user-points ">
			<div className="header__points-container">
				<div className="header__points">{`${userData.reward_points_for_current_month} Б`}</div>
				<div className="header__points-text">за месяц</div>
			</div>
			<div className="header__points-container">
				<div className="header__points header__points_rating">{`${userData.reward_points} Б`}</div>
				<div className="header__points-text header__points-text_rating">
					рейтинг
				</div>
			</div>
			<div className="header__points-container">
				<div className="header__points header__points_place">{`${userData.rating}-й`}</div>
				<div className="header__points-text header__points-text_place">
					в рейтинге
				</div>
			</div>
		</div>
	);
}

export default UserPoints;
