import './WorkExperience.scss';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function WorkExperience({ hardSkills }) {
	const [desktopWidth, setDesktopWidth] = useState(true);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		if (windowWidth <= 1024) {
			setDesktopWidth(false);
		}
	}, [windowWidth]);

	return (
		<>
			<section className="section">
				<h2 className="section__title">Рaбочий стаж</h2>
				<div className="section__text-area">
					<p className="section__text">Общий рабочий стаж:&nbsp;</p>
					<p className="section__text-data">5 лет 8 месяцев</p>
				</div>
				<div className="section__text-area">
					<p className="section__text">Рабочий стаж в компании:&nbsp;</p>
					<p className="section__text-data">3 года 2 месяца</p>
				</div>
				{desktopWidth ? (
					<>
						<h2 className="section__title">HardSkills</h2>
						<ul className="section__hardskills-list">
							{hardSkills.map((skill) => (
								<li className="section__hardskills-item" key={skill.name}>
									{skill.name}
								</li>
							))}
						</ul>
					</>
				) : null}
			</section>
			{!desktopWidth ? (
				<section className="section">
					<h2 className="section__title">HardSkills</h2>
					<ul className="section__hardskills-list">
						{hardSkills.map((skill) => (
							<li className="section__hardskills-item" key={skill.name}>
								{skill.name}
							</li>
						))}
					</ul>
				</section>
			) : null}
		</>
	);
}

export default WorkExperience;

WorkExperience.propTypes = {
	hardSkills: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
		})
	).isRequired,
};
