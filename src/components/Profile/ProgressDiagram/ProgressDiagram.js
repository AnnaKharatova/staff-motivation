import './ProgressDiagram.scss';
import React from 'react';

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
					<svg
						className="section__progress-circle"
						id="progress-circle"
						width="120"
						height="120"
					>
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
					<p className="section__progress-number">{progress}%</p>
				</div>

				<div className="section__diagram-caption">
					<p className="section__text">Заданий выполнено: 23</p>
					<p className="section__text">Осталось до выполнения плана: 27</p>
				</div>
			</div>
		</section>
	);
}

export default ProgressDiagram;
