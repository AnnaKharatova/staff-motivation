import './Main.scss';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MyTasks from './MyTasks/MyTasks';
import Achievements from './Achievements/Achievements';
import DinamicWork from './DinamicWork/DinamicWork';
import { getUsersProgress } from '../../utils/MainApi';
import UserPoints from '../App/Header/UserPoints/UserPoints';

function Main() {
	const navigate = useNavigate();
	const [userProgressData, setUserProgressData] = useState([]);

	const { department_progress, personal_progress, progress_for_deadline } =
		userProgressData;
	useEffect(() => {
		getUsersProgress()
			.then((data) => {
				setUserProgressData(data[0]);
			})
			.catch((res) => {
				if (res === 500) {
					navigate('/server-error');
				}
				console.log(res);
			});
	}, [navigate]);

	return (
		<section className="main-page__section">
			<div className="main-page__block">
				<Achievements progressForDeadline={progress_for_deadline} />
				<div className="user-block">
					<p className="user-block__text">Статистика</p>
					<UserPoints />
				</div>
				<DinamicWork
					myDinamic={personal_progress}
					departmentDinamic={department_progress}
				/>
			</div>
			<MyTasks />
		</section>
	);
}

export default Main;

/* useEffect(() => {
		const isFirstVisit = localStorage.getItem('isFirstVisit');
		if (!isFirstVisit) {
			localStorage.setItem('isFirstVisit', 'true');
			window.location.reload();
		}
	}, []); */
