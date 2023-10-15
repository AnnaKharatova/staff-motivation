import '../../Main/MyTask/MyTask.scss';
import './DepartmentTask.scss';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import WarningCircle from '../../../images/WarningCircle.svg';

function DepartmentTask({ task, onClick }) {
	const { status, title, deadline, id } = task;
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

	useEffect(() => {
		if (status === 'created') {
			setStatusName('на выполнении');
		}
	}, [status]);

	useEffect(() => {
		if (status === 'is_overdue') {
			setTitleClassName(
				'mytask__title department-task__task-title mytask__title-missed'
			);
			setStatusClassName('mytask__status mytask__status-missed');
			setStatusName('истёк срок задачи');
		}
	}, [status]);

	useEffect(() => {
		if (status === 'approve') {
			setStatusClassName('mytask__status mytask__status-prove');
			setTitleClassName(
				'mytask__title department-task__task-title mytask__title-done'
			);
			setStatusName('подтверждено');
			setDeadlieneData(`Выполнено`);
			setDataClass('mytask__data mytask__data-done');
		}
	}, [status]);

	useEffect(() => {
		if (status === 'sent_for_review') {
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
	}, [status]);

	useEffect(() => {
		if (status === 'rejected') {
			setStatusName('на доработке');
		}
	}, [status]);

	return (
		<div
			className="mytask"
			onClick={() => onClick(id, status)}
			role="button"
			tabIndex={0}
			onKeyDown={null}
		>
			<p className={titleClassName}>{title}</p>
			<p className="mytask__realizer">Исполнитель</p>
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
		title: PropTypes.string,
		status: PropTypes.string,
		reward_points: PropTypes.number,
		deadline: PropTypes.string,
		id: PropTypes.number,
	}).isRequired,
	onClick: PropTypes.func.isRequired,
};
