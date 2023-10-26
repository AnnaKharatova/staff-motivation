import '../../Main/MyTask/MyTask.scss';
import './DepartmentTask.scss';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import WarningCircle from '../../../images/WarningCircle.svg';

function DepartmentTask({ task, onClick, users, taskStatus, taskId }) {
	const { status, title, deadline, id, assigned_to, is_overdue } = task;
	const date = new Date(deadline);
	const options = { day: 'numeric', month: 'long' };
	const formattedDate = date.toLocaleDateString('ru-RU', options);
	const [statusName, setStatusName] = useState('');
	const [titleClassName, setTitleClassName] = useState(
		'mytask__title department-task__task-title'
	);
	const [statusClassName, setStatusClassName] = useState('mytask__status');
	const [deadlineData, setDeadlieneData] = useState(formattedDate);
	const [dataClass, setDataClass] = useState('mytask__data');
	const [executor, setExecutor] = useState('');
	const [currentTaskStatus, setCurrentTaskStatus] = useState(status);
	const [noHoverTask, setNoHoverTask] = useState(false);

	useEffect(() => {
		if (taskStatus && taskId === id) {
			setCurrentTaskStatus(taskStatus);
		}
	}, [taskId, taskStatus, id]);

	useEffect(() => {
		const userName = users.find((user) => user.id === assigned_to);
		setExecutor(`${userName.last_name} ${userName.first_name}`);
	}, [users, assigned_to]);

	useEffect(() => {
		if (currentTaskStatus === 'created' && !is_overdue) {
			setStatusName('на выполнении');
		}
	}, [currentTaskStatus, is_overdue]);

	useEffect(() => {
		if (currentTaskStatus === 'created' && is_overdue) {
			setTitleClassName(
				'mytask__title department-task__task-title mytask__title-missed'
			);
			setStatusClassName('mytask__status mytask__status-missed');
			setStatusName('истёк срок задачи');
		} else if (currentTaskStatus === 'returned_for_revision' && is_overdue) {
			setTitleClassName(
				'mytask__title department-task__task-title mytask__title-missed'
			);
			setStatusClassName('mytask__status mytask__status-missed');
			setStatusName('истёк срок задачи');
		}
	}, [currentTaskStatus, is_overdue]);

	useEffect(() => {
		if (currentTaskStatus === 'approved') {
			setStatusClassName('mytask__status mytask__status-prove');
			setTitleClassName(
				'mytask__title department-task__task-title mytask__title-done'
			);
			setStatusName('подтверждено');
			setDeadlieneData(`Выполнено`);
			setDataClass('mytask__data mytask__data-done');
			setNoHoverTask(true);
		}
	}, [currentTaskStatus]);

	useEffect(() => {
		if (currentTaskStatus === 'sent_for_review') {
			setStatusName(
				<div className="department-task">
					<img
						className="department-task__img"
						src={WarningCircle}
						alt="Знак Внимание"
					/>
					<p className="department-task__title">подтвердить</p>
				</div>
			);
			setDeadlieneData(`Выполнено`);
			setTitleClassName(
				'mytask__title department-task__task-title mytask__title-done'
			);
		}
	}, [currentTaskStatus]);

	useEffect(() => {
		if (currentTaskStatus === 'returned_for_revision' && !is_overdue) {
			setStatusName('на доработке');
		}
	}, [currentTaskStatus, is_overdue]);

	return (
		<div
			className={`mytask ${noHoverTask ? 'department-task__no-hover' : ''}`}
			onClick={() => onClick(id, status)}
			role="button"
			tabIndex={0}
			onKeyDown={null}
		>
			<p className={titleClassName}>{title}</p>
			<p className="mytask__realizer">{executor}</p>
			<div className={`${statusClassName} mytask__status-department-task`}>
				{statusName}
			</div>
			<p className={dataClass}>{deadlineData}</p>
		</div>
	);
}
export default DepartmentTask;

DepartmentTask.propTypes = {
	task: PropTypes.shape({
		assigned_to: PropTypes.number,
		title: PropTypes.string,
		status: PropTypes.string,
		reward_points: PropTypes.number,
		deadline: PropTypes.string,
		id: PropTypes.number,
		is_overdue: PropTypes.bool,
	}).isRequired,
	onClick: PropTypes.func.isRequired,
	users: PropTypes.arrayOf(
		PropTypes.shape({
			first_name: PropTypes.string,
			last_name: PropTypes.string,
			id: PropTypes.number,
		})
	).isRequired,
	taskStatus: PropTypes.string,
	taskId: PropTypes.number,
};

DepartmentTask.defaultProps = {
	taskStatus: '',
	taskId: 0,
};
