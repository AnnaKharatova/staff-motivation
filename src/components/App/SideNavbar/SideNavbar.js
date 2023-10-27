import React from 'react';
import './SideNavbar.scss';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import MobileSidebar from './MobileSideNavbar/MobileSidebar';
import { ReactComponent as Newspaper } from '../../../images/Newspaper.svg';
import { ReactComponent as House } from '../../../images/House.svg';
import { ReactComponent as Users } from '../../../images/Users.svg';
import { ReactComponent as Gear } from '../../../images/GearSix.svg';
import { ReactComponent as Tasks } from '../../../images/Tasks.svg';
import { useUser } from '../../context/UserContext';

function SideNavbar({ handleOpenModalConfirm }) {
	const { userData } = useUser();
	const setActiveLink = ({ isActive }) =>
		isActive
			? 'side-navbar__navigation-link_active'
			: 'side-navbar__navigation-link';

	return (
		<>
			<nav className="side-navbar">
				<ul className="side-navbar__navigation">
					<li className="side-navbar__navigation-item">
						<House className="side-navbar__navigation-icon" />
						<NavLink className={setActiveLink} to="/">
							Главная
						</NavLink>
					</li>
					<li className="side-navbar__navigation-item">
						<Newspaper className="side-navbar__navigation-icon" />
						<NavLink className={setActiveLink} to="/developing-page">
							Новости
						</NavLink>
					</li>
					<li className="side-navbar__navigation-item">
						<Users className="side-navbar__navigation-icon" />
						<NavLink className={setActiveLink} to="/developing-page">
							База данных
						</NavLink>
					</li>
					{userData.role === 'teamleader' ? (
						<li className="side-navbar__navigation-item">
							<Tasks className="side-navbar__navigation-icon side-navbar__navigation-icon_active" />
							<NavLink className={setActiveLink} to="/teamleader">
								Задачи
							</NavLink>
						</li>
					) : null}
					<li className="side-navbar__navigation-item">
						<Gear className="side-navbar__navigation-icon" />
						<NavLink className={setActiveLink} to="/profile">
							Профиль
						</NavLink>
					</li>
				</ul>
			</nav>
			<MobileSidebar handleOpenModalConfirm={handleOpenModalConfirm} />
		</>
	);
}

export default SideNavbar;

SideNavbar.propTypes = {
	handleOpenModalConfirm: PropTypes.func.isRequired,
};
