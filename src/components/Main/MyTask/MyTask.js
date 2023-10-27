import './MyTask.scss';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function MyTask({ task, onClick, taskStatus, taskId }) {
	const { status, reward_points, title, deadline, id, is_overdue } = task;
	const date = new Date(deadline);
	const options = { day: 'numeric', month: 'long' };
	const formattedDate = date.toLocaleDateString('ru-RU', options);
	const [statusName, setStatusName] = useState('');
	const [disadledButton, setDisadledButton] = useState(false);
	const [titleClassName, setTitleClassName] = useState('mytask__title');
	const [statusClassName, setStatusClassName] = useState('mytask__status');
	const [ballsClassName, setBallsClassName] = useState('mytask__score');
	const [deadlineData, setDeadlieneData] = useState(formattedDate);
	const [dataClass, setDataClass] = useState('mytask__data');
	const [disablePopup, setDisablePopup] = useState(false);
	const [desktopWidth, setDesktopWidth] = useState(true);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [newStatus, setNewStatus] = useState(status);

	useEffect(() => {
		if (taskStatus && taskId === id) {
			setNewStatus(taskStatus);
		}
	}, [taskStatus, id, taskId]);

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

	useEffect(() => {
		if (newStatus === 'created') {
			setStatusName('на выполнении');
		}
	}, [newStatus]);

	useEffect(() => {
		if (newStatus === 'created' && is_overdue) {
			setTitleClassName('mytask__title mytask__title-missed');
			setStatusClassName('mytask__status mytask__status-missed');
			setBallsClassName('mytask__score mytask__score-missed');
			setStatusName('истёк срок задачи');
		} else if (newStatus === 'returned_for_revision' && is_overdue) {
			setTitleClassName('mytask__title mytask__title-missed');
			setStatusClassName('mytask__status mytask__status-missed');
			setBallsClassName('mytask__score mytask__score-missed');
			setStatusName('истёк срок задачи');
		}
	}, [newStatus, is_overdue]);

	useEffect(() => {
		if (newStatus === 'approved') {
			setStatusClassName('mytask__status mytask__status-prove');
			setBallsClassName('mytask__score mytask__score-done');
			setTitleClassName('mytask__title mytask__title-done');
			setStatusName('подтверждено');
			setDisadledButton(true);
			setDeadlieneData(`Выполнено`);
			setDataClass('mytask__data mytask__data-done');
			setDisablePopup(true);
		}
	}, [newStatus]);

	useEffect(() => {
		if (newStatus === 'sent_for_review') {
			setStatusName('на подтверждении');
			setDeadlieneData(`Выполнено`);
			setDisadledButton(true);
			setTitleClassName('mytask__title mytask__title-done');
			setDisablePopup(true);
		}
	}, [newStatus]);

	useEffect(() => {
		if (newStatus === 'returned_for_revision') {
			setStatusName('на доработке');
		}
	}, [newStatus]);

	return (
		<div
			className={!disablePopup ? 'mytask' : 'mytask__no-hover'}
			onClick={() => onClick(id, disablePopup)}
			role="button"
			tabIndex={0}
			onKeyDown={null}
		>
			<p className={titleClassName}>{title}</p>
			{desktopWidth ? (
				<p className={ballsClassName}>{reward_points} баллов</p>
			) : (
				<p className={ballsClassName}>
					{reward_points} {desktopWidth ? 'баллов' : 'Б'}
				</p>
			)}
			<p className={statusClassName}>{statusName}</p>
			<p className={dataClass}>{deadlineData}</p>
			<button className="mytask__button" disabled={disadledButton}>
				Подтвердить&nbsp;выполнение
			</button>
		</div>
	);
}
export default MyTask;

MyTask.propTypes = {
	task: PropTypes.shape({
		is_overdue: PropTypes.bool,
		title: PropTypes.string,
		status: PropTypes.string,
		reward_points: PropTypes.number,
		deadline: PropTypes.string,
		id: PropTypes.number,
	}).isRequired,
	onClick: PropTypes.func.isRequired,
	taskStatus: PropTypes.string.isRequired,
	taskId: PropTypes.number,
};

MyTask.defaultProps = {
	taskId: null,
};
