import './Achievements.scss';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import achieveLogo from '../../../images/achieve-mark.svg';

export default function Achievements({ progressForDeadline }) {
	const currentMonth = new Date().getMonth();
	const currentYear = new Date().getFullYear();
	const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
	const workScore = 30; // временно
	const deadlineScore = 45;
	const isLastDayOfMonth = new Date().getDate() === lastDayOfMonth;
	const [isAchieveDeadline, setAchieveDedline] = useState(false);

	useEffect(() => {
		if (isLastDayOfMonth && progressForDeadline === 0) {
			setAchieveDedline(true);
		}
	}, [isLastDayOfMonth, progressForDeadline]);

	return (
		<section className="achievements">
			<h2 className="achievements__title">Достижения</h2>
			<ul className="achievements__stats-container">
				<li className="achievements__achieve">
					<p className="achievements__name">Качество работы</p>
					<div className="achievements__score-container">
						{isLastDayOfMonth ? (
							<img
								className="achievements__logo"
								src={achieveLogo}
								alt="достижение"
							/>
						) : null}
						<p className="achievements__score">{`+${workScore} Б`}</p>
					</div>
					{isLastDayOfMonth ? (
						<p className="achievements__completion">
							Начислено в конце отчётного периода
						</p>
					) : (
						<p className="achievements__completion">
							Будет начислено в конце отчётного периода
						</p>
					)}
				</li>

				<li className="achievements__achieve">
					<p className="achievements__name">Соблюдение дедлайна</p>
					<div className="achievements__score-container">
						{isAchieveDeadline ? (
							<img
								className="achievements__logo"
								src={achieveLogo}
								alt="достижение"
							/>
						) : null}
						<p className="achievements__score">{`+${deadlineScore} Б`}</p>
					</div>
					{isAchieveDeadline > 0 ? (
						<p className="achievements__completion">
							Начислено в конце отчётного периода
						</p>
					) : (
						<p className="achievements__completion">{`Выполнено на: ${progressForDeadline}%`}</p>
					)}
				</li>
			</ul>
		</section>
	);
}

Achievements.propTypes = {
	progressForDeadline: PropTypes.number,
};

Achievements.defaultProps = {
	progressForDeadline: 0,
};
