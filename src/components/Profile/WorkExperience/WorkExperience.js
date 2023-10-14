import './WorkExperience.scss';
import React from 'react';
import PropTypes from 'prop-types';

function WorkExperience({ hardSkills }) {
	return (
		<section className="section">
			<h2 className="section__title">Рaбочий стаж</h2>
			<p className="section__text">Общий рабочий стаж: 5 лет 8 месяцев</p>
			<p className="section__text">Рабочий стаж в компании: 3 года 2 месяца</p>
			<h2 className="section__title">HardSkills</h2>
			<ul className="section__hardskills-list">
				{hardSkills.map((skill) => (
					<li className="section__hardskills-item" key={skill}>
						{skill.name}
					</li>
				))}
			</ul>
		</section>
	);
}

export default WorkExperience;

WorkExperience.propTypes = {
	hardSkills: PropTypes.node.isRequired,
};
