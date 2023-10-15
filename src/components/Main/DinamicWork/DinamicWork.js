import React from 'react';
import PropTypes from 'prop-types';
import styles from './DinamicWork.module.scss';

function DinamicWork({ myDinamic, departmentDinamic }) {
	const calculatePercentage = (value) => Math.round(value);

	const calculateProgressBarColor = (percentage) => {
		if (percentage >= 100) {
			return styles.completed;
		}
		if (percentage > 0) {
			return styles.inProgress;
		}
		return styles.notStarted;
	};

	return (
		<section className={styles.main}>
			<div className={styles.dinamicWork}>
				<h1 className={styles.toptext}>Динамика работы</h1>
				<div className={styles.field}>
					<div className={styles.fieldInfo}>
						<h3 className={styles.texth3}>Мои достижения</h3>
						<span className={styles.progressPercentage}>
							{calculatePercentage(myDinamic)}%
						</span>
					</div>
					<div
						className={`${styles.progressBar} ${calculateProgressBarColor(
							myDinamic
						)}`}
					>
						<div
							className={styles.progressFill}
							style={{
								width: `${calculatePercentage(myDinamic)}%`,
								backgroundColor: '#49536E',
							}}
						/>
					</div>
				</div>
				<div className={styles.field}>
					<div className={styles.fieldInfo}>
						<h3 className={styles.texth3}>Достижения отдела</h3>
						<span className={styles.progressPercentageDepartment}>
							{calculatePercentage(departmentDinamic)}%
						</span>
					</div>
					<div
						className={`${
							styles.progressBarDepartment
						} ${calculateProgressBarColor(departmentDinamic)}`}
					>
						<div
							className={styles.progressFill}
							style={{
								width: `${calculatePercentage(departmentDinamic || 0)}%`,
								backgroundColor: '#2561ED',
							}}
						/>
					</div>
				</div>
				<div className={styles.field}>
					<p className={styles.text}>% от достижений компании за месяц</p>
				</div>
			</div>
		</section>
	);
}

DinamicWork.propTypes = {
	departmentDinamic: PropTypes.number,
	myDinamic: PropTypes.number,
};

DinamicWork.defaultProps = {
	departmentDinamic: 0,
	myDinamic: 0,
};

export default DinamicWork;
