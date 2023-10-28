import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import '../SideNavbar.scss';
import { NavLink } from 'react-router-dom';
import UserInfo from '../../Header/UserInfo/UserInfo';
import { useUser } from '../../../context/UserContext';
import { ReactComponent as Newspaper } from '../../../../images/Newspaper.svg';
import { ReactComponent as House } from '../../../../images/House.svg';
import { ReactComponent as Users } from '../../../../images/Users.svg';
import { ReactComponent as Gear } from '../../../../images/GearSix.svg';
import { ReactComponent as Tasks } from '../../../../images/Tasks.svg';

function MobileSidebar({ handleOpenModalConfirm }) {
	const { isMobileOpen, setIsMobileOpen, showUserInfoHeader, userData } =
		useUser();
	const onClose = () => {
		setIsMobileOpen(false);
	};
	const setActiveLink = ({ isActive }) =>
		isActive
			? 'side-navbar__navigation-link_active'
			: 'side-navbar__navigation-link';
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
		<>
			<nav
				className={`mobile-sidebar ${isMobileOpen && 'mobile-sidebar_opened'}`}
			>
				{!showUserInfoHeader ? <UserInfo /> : null}
				<ul className="side-navbar__navigation">
					<li className="side-navbar__navigation-item">
						<House className="side-navbar__navigation-icon" />
						<NavLink className={setActiveLink} to="/" onClick={onClose}>
							Главная
						</NavLink>
					</li>
					<li className="side-navbar__navigation-item">
						<Newspaper className="side-navbar__navigation-icon" />
						<NavLink
							className={setActiveLink}
							to="/developing-page"
							onClick={onClose}
						>
							Новости
						</NavLink>
					</li>
					<li className="side-navbar__navigation-item">
						<Users className="side-navbar__navigation-icon" />
						<NavLink
							className={setActiveLink}
							to="/developing-page"
							onClick={onClose}
						>
							База данных
						</NavLink>
					</li>
					{userData.role === 'teamleader' ? (
						<li className="side-navbar__navigation-item">
							<Tasks className="side-navbar__navigation-icon side-navbar__navigation-icon_active" />
							<NavLink
								className={setActiveLink}
								to="/teamleader"
								onClick={onClose}
							>
								Задачи
							</NavLink>
						</li>
					) : null}
					<li className="side-navbar__navigation-item">
						<Gear className="side-navbar__navigation-icon" />
						<NavLink className={setActiveLink} to="/profile" onClick={onClose}>
							Профиль
						</NavLink>
					</li>
					<li className="side-navbar__navigation-item">
						<NavLink
							className="side-navbar__navigation-btn side-navbar__navigation-link"
							onClick={handleOpenModalConfirm}
						>
							Выйти из профиля
						</NavLink>
					</li>
				</ul>
			</nav>
			<div
				className={`mobile-background ${
					isMobileOpen && 'mobile-background_active'
				}`}
				onClick={onClose}
				aria-hidden="true"
			/>
		</>
	);
}

export default MobileSidebar;

MobileSidebar.propTypes = {
	handleOpenModalConfirm: PropTypes.func.isRequired,
};
