import './DepartmentTasks.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CaretDown from '../../../images/CaretDown.svg';
import CaretUp from '../../../images/CaretUp.svg';
import DepartmentTask from '../DepartmentTask/DepartmentTask';

function DepartmentTasks({
	name,
	array,
	handlePopupOpen,
	handleAddTaskPopupOpen,
}) {
	const [isOpenTasksList, setOpenTasksList] = useState(false);

	function handleTasksOpen() {
		if (isOpenTasksList) {
			setOpenTasksList(false);
			return;
		}
		setOpenTasksList(true);
	}

	return (
		<ul className="department-tasks__departments">
			<button
				type="button"
				className={
					!isOpenTasksList
						? 'department-tasks__department'
						: 'department-tasks__department department-tasks__department-open'
				}
				onClick={handleTasksOpen}
			>
				<div className="department-tasks__department-title">{name}</div>
				<img
					className="department-tasks__department-caret"
					src={isOpenTasksList ? CaretUp : CaretDown}
					alt="стрелочка открыть/закрыть"
				/>
			</button>
			{isOpenTasksList ? (
				<>
					<button
						className="department-tasks__add-task"
						onClick={handleAddTaskPopupOpen}
					>
						Добавить задачу
					</button>
					<div className="tasks__list">
						{array.map((task) => (
							<DepartmentTask
								onClick={handlePopupOpen}
								task={task}
								key={task.id}
							/>
						))}
					</div>
				</>
			) : null}
		</ul>
	);
}

export default DepartmentTasks;

DepartmentTasks.propTypes = {
	name: PropTypes.string.isRequired,
	handlePopupOpen: PropTypes.func.isRequired,
	handleAddTaskPopupOpen: PropTypes.func.isRequired,
	array: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			status: PropTypes.string.isRequired,
			reward_points: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
			created_at: PropTypes.string.isRequired,
			deadline: PropTypes.string.isRequired,
			assigned_to: PropTypes.number.isRequired,
			department: PropTypes.string.isRequired,
		})
	),
};

DepartmentTasks.defaultProps = {
	array: {
		id: 101,
		status: 'created',
		reward_points: 10,
		title: 'Составить контент план',
		description: 'Описание в разработке',
		created_at: '2023-09-23T12:26:38.755Z',
		deadline: '2023-09-29T12:26:38.755Z',
		assigned_to: 0,
		department: 'Маркетинг',
	},
};
