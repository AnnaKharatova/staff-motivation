import React from 'react';
import './SideNavbar.scss';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Newspaper } from '../../../images/Newspaper.svg';
import { ReactComponent as House } from '../../../images/House.svg';
import { ReactComponent as Users } from '../../../images/Users.svg';
import { ReactComponent as Gear } from '../../../images/GearSix.svg';
import { ReactComponent as Tasks } from '../../../images/Tasks.svg';

function SideNavbar() {
	const setActiveLink = ({ isActive }) =>
		isActive
			? 'side-navbar__navigation-link_active'
			: 'side-navbar__navigation-link';
	return (
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
				<li className="side-navbar__navigation-item">
					<Tasks className="side-navbar__navigation-icon" />
					<NavLink className={setActiveLink} to="/teamleader">
						Задачи
					</NavLink>
				</li>
				<li className="side-navbar__navigation-item">
					<Gear className="side-navbar__navigation-icon" />
					<NavLink className={setActiveLink} to="/profile">
						Профиль
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default SideNavbar;
