import './TrackRecord.scss';
import React, { useState } from 'react';
import { trackRecordsList } from '../../../utils/constants';

function TrackRecord() {
	const [tracksArray, setTracksArray] = useState(trackRecordsList);
	const [allTracksButton, setAllTrackButton] = useState(true);
	const [activeTracksButton, setActiveTracksButton] = useState(false);
	const [doneTracksButton, setDoneTracksButton] = useState(false);

	function handleAllTracksSort() {
		setAllTrackButton(true);
		setActiveTracksButton(false);
		setDoneTracksButton(false);
		setTracksArray(trackRecordsList);
	}

	function handleActiveTracksSort() {
		setAllTrackButton(false);
		setActiveTracksButton(true);
		setDoneTracksButton(false);
		const filteredTasks = trackRecordsList.filter((i) => i.percent < 100);
		setTracksArray(filteredTasks);
	}

	function handleDoneTracksSort() {
		setAllTrackButton(false);
		setActiveTracksButton(false);
		setDoneTracksButton(true);
		const filteredTasks = trackRecordsList.filter((i) => i.percent === 100);
		setTracksArray(filteredTasks);
	}

	return (
		<section className="trackrecord">
			<h2 className="trackrecord__main-title">Задания</h2>
			<nav className="trackrecord__nav">
				<button
					className={
						allTracksButton
							? 'tasks__sort-button tasks__sort-button-active'
							: 'tasks__sort-button'
					}
					onClick={handleAllTracksSort}
				>
					Все
				</button>
				<button
					className={
						activeTracksButton
							? 'tasks__sort-button tasks__sort-button-active'
							: 'tasks__sort-button'
					}
					onClick={handleActiveTracksSort}
				>
					Активные
				</button>
				<button
					className={
						doneTracksButton
							? 'tasks__sort-button tasks__sort-button-active'
							: 'tasks__sort-button'
					}
					onClick={handleDoneTracksSort}
				>
					Выполненные
				</button>
			</nav>
			<ul className="trackrecord__items">
				{tracksArray.map((track) => (
					<li className="trackrecord__item" key={track.id}>
						<img
							className="trackrecord__image"
							src={track.image}
							alt="символическое изображение задания"
						/>
						<div className="trackrecord__info">
							<p className="trackrecord__title">{track.title}</p>
							<div className="trackrecord__progress">
								<p className="trackrecord__subtitle">{track.discription}</p>
								<p className="trackrecord__procent">{track.percent} %</p>
							</div>
							<div className="trackrecord__bar">
								<div
									className="trackrecord__fill"
									style={{ width: `${track.percent}%` }}
								/>
							</div>
						</div>
					</li>
				))}
			</ul>
		</section>
	);
}

export default TrackRecord;
