import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Header.scss';
import { useUser } from '../../context/UserContext';
import UserPoints from './UserPoints/UserPoints';
import UserInfo from './UserInfo/UserInfo';

function Header({
	notificationsData,
	handleOpenModalConfirm,
	handleOpenPushesModal,
}) {
	const { showUserPointsHeader, showUserInfoHeader, setIsMobileOpen } =
		useUser();
	const pushesCount = notificationsData.length;
	// анимация тени хедера при скролле
	useEffect(() => {
		const headerContainer = document.querySelector('.header');
		window.addEventListener('scroll', () => {
			if (window.scrollY >= 25) {
				headerContainer.classList.add('header_scrolling');
			} else {
				headerContainer.classList.remove('header_scrolling');
			}
		});
	}, []);

	return (
		<header className="header">
			<div className="header__container">
				<button
					aria-label="открыть меню"
					className="header__burger-btn"
					onClick={() => setIsMobileOpen(true)}
				/>
				<div className="header__logo">Motivation System</div>
				{showUserInfoHeader ? <UserInfo /> : null}
				{showUserPointsHeader ? <UserPoints /> : null}
				<div className="header__user-buttons">
					<div className="header__bell-container">
						<button
							className="header__bell-btn"
							aria-label="Уведомления"
							onClick={handleOpenPushesModal}
						/>
						{pushesCount > 0 ? (
							<div className="header__push-number">{pushesCount}</div>
						) : null}
					</div>
					<button
						className="header__exit-btn"
						aria-label="Выход"
						onClick={handleOpenModalConfirm}
					/>
				</div>
			</div>
		</header>
	);
}

export default Header;

Header.propTypes = {
	handleOpenModalConfirm: PropTypes.func.isRequired,
	handleOpenPushesModal: PropTypes.func.isRequired,
	notificationsData: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			message: PropTypes.string.isRequired,
			created_at: PropTypes.string.isRequired,
			read: PropTypes.bool.isRequired,
			user: PropTypes.number.isRequired,
		})
	).isRequired,
};
