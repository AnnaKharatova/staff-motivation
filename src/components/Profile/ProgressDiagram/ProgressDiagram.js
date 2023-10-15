import './ProgressDiagram.scss';
import React, { useState, useEffect } from 'react';

function ProgressDiagram() {
	const progress = 46;
	const proggressReflex = 100 - progress;
	const today = new Date();
	const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
	const formattedLastDayOfMonth = lastDayOfMonth.toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	});
	const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
	const formattedFirstDayOfMonth = firstDayOfMonth.toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	});

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
		if (windowWidth <= 1100) {
			setDesktopWidth(false);
		}
	}, [windowWidth]);

	return (
		<section className="section">
			<div className="section__header">
				<h2 className="section__title">Успехи за месяц</h2>
				<p className="section__data">
					{formattedFirstDayOfMonth}-{formattedLastDayOfMonth}
				</p>
			</div>
			<div className="section__diagram">
				<div className="section__progress">
					{desktopWidth ? (
						<svg className="section__progress-circle" id="progress-circle">
							<circle
								className="section__progress-bar"
								r="57"
								cx="60"
								cy="60"
								style={{
									strokeDashoffset:
										proggressReflex * 2 * Math.PI -
										(50 / 100) * (proggressReflex * 2 * Math.PI),
								}}
							/>
						</svg>
					) : (
						<svg className="section__progress-circle-mini" id="progress-circle">
							<circle
								className="section__progress-bar"
								r="47"
								cx="50"
								cy="50"
								style={{
									strokeDashoffset:
										proggressReflex * 2 * Math.PI -
										(50 / 100) * (proggressReflex * 2 * Math.PI),
								}}
							/>
						</svg>
					)}
					<p className="section__progress-number">{progress}%</p>
				</div>

				<div className="section__diagram-caption">
					<p className="section__diagram-text">Заданий выполнено: 23</p>
					<p className="section__diagram-text">
						Осталось до&nbsp;выполнения&nbsp;плана:&nbsp;27
					</p>
				</div>
			</div>
		</section>
	);
}

export default ProgressDiagram;
