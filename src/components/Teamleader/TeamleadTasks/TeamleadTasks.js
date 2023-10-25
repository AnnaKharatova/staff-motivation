import './TeamleadTasks.scss';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import DepartmentTasks from '../DepartmentTasks/DepartmentTasks';
import PopupAddTask from './PopupAddTask/PopupAddTask';
import PopupEditTask from './PopupEditTask/PopupEditTask';
import iconFilter from '../../../images/SortAscending.png';
import {
	getUsers,
	getTaskInfo,
	reviewTask,
	rejectTask,
} from '../../../utils/MainApi';

function TeamleadTasks({ userId }) {
	const navigate = useNavigate();
	const storagedArray = JSON.parse(localStorage.getItem('myTasks'));

	const [firstTasksArray, setfirstTasksArray] = useState(storagedArray);
	const [tasksFromTeamlead, setTasksFromTeamlead] = useState([]);
	const [tasksArray, setTasksArray] = useState(tasksFromTeamlead);
	const [isPopupInfoTaskOpen, setPopupInfoTaskOpen] = useState(false);
	const [isPopupAddTaskOpen, setPopupAddTaskOpen] = useState(false);
	const [isPopupEditTaskOpen, setPopupEditTaskOpen] = useState(false);
	const [allTasksButton, setAllTasksButton] = useState(true);
	const [activeTasksButton, setActiveTaskstButton] = useState(false);
	const [inApproveTasksButton, setInApproveTasksButton] = useState(false);
	const [timeOutTasksButton, setTimeOutTasksButton] = useState(false);
	const [popupInfo, setPopupInfo] = useState([]);
	const [statusName, setStatusName] = useState('');
	const [isDeadlineSort, setDeadlineSort] = useState(false);
	const [users, setUsers] = useState([]);
	const [department, setDepartmentName] = useState('');
	const {
		status,
		is_overdue,
		reward_points,
		title,
		description,
		created_at,
		deadline,
		id,
	} = popupInfo;

	const [taskStatus, setTaskStatus] = useState(status);
	const [taskId, setTaskId] = useState(id);

	const dateDeadline = new Date(deadline);
	const dateCreated = new Date(created_at);
	const options = { day: 'numeric', month: 'numeric' };
	const formattedDateDeadline = dateDeadline.toLocaleDateString(
		'ru-RU',
		options
	);
	const formattedDateCreated = dateCreated.toLocaleDateString('ru-RU', options);

	const QAItems = tasksArray.filter((item) => item.department === 'qa');
	const backendItems = tasksArray.filter(
		(item) => item.department === 'backend'
	);
	const frontendItems = tasksArray.filter(
		(item) => item.department === 'frontend'
	);
	const designItems = tasksArray.filter((item) => item.department === 'ux_ui');

	useEffect(() => {
		const tasks = firstTasksArray.filter((task) => task.assigned_to !== userId);
		setTasksFromTeamlead(tasks);
	}, [firstTasksArray, userId]);

	useEffect(() => {
		setTasksArray(tasksFromTeamlead);
	}, [tasksFromTeamlead]);

	useEffect(() => {
		getUsers()
			.then((data) => {
				setUsers(data);
			})
			.catch((res) => {
				if (res === 500) {
					navigate('/server-error');
				} else {
					setTasksArray([]);
				}
			});
	}, [navigate]);

	useEffect(() => {
		if (status === 'created') {
			setStatusName('на выполнении');
		}
		if (status === 'created' && is_overdue) {
			setStatusName('истёк срок задачи');
		}
		if (status === 'approved') {
			setStatusName('подтверждено');
		}
		if (status === 'sent_for_review') {
			setStatusName('на подтверждении');
		}
		if (status === 'returned_for_revision') {
			setStatusName('на доработке');
		}
	}, [status, is_overdue]);

	function handleAllTasksSort() {
		setAllTasksButton(true);
		setTimeOutTasksButton(false);
		setInApproveTasksButton(false);
		setActiveTaskstButton(false);
		setTasksArray(tasksFromTeamlead);
	}

	function handleActiveTasksSort() {
		setAllTasksButton(false);
		setActiveTaskstButton(true);
		setTimeOutTasksButton(false);
		setInApproveTasksButton(false);
		const filteredTasks = tasksFromTeamlead.filter(
			(task) =>
				task.status === 'created' || task.status === 'returned_for_revision'
		);
		setTasksArray(filteredTasks);
	}

	function handleInApproveSort() {
		setInApproveTasksButton(true);
		setActiveTaskstButton(false);
		setAllTasksButton(false);
		setTimeOutTasksButton(false);
		const filteredTasks = tasksFromTeamlead.filter(
			(task) => task.status === 'sent_for_review'
		);
		setTasksArray(filteredTasks);
	}

	function handleTimeOutSort() {
		setTimeOutTasksButton(true);
		setInApproveTasksButton(false);
		setActiveTaskstButton(false);
		setAllTasksButton(false);
		const filteredTasks = tasksFromTeamlead.filter(
			(task) => task.is_overdue === true
		);
		setTasksArray(filteredTasks);
	}

	function handleDeadlineSort() {
		const notToSort = 'sent_for_review' || 'approved';

		if (isDeadlineSort) {
			setDeadlineSort(false);
			const sortArray = tasksArray.sort((a, b) => {
				if (a.status === notToSort && b.status !== notToSort) {
					return 1;
				}
				if (a.status !== notToSort && b.status === notToSort) {
					return -1;
				}
				return new Date(a.created_at) - new Date(b.created_at);
			});
			setTasksArray(sortArray);
			return;
		}

		const sortArray = tasksArray.sort((a, b) => {
			if (a.status === notToSort && b.status !== notToSort) {
				return 1;
			}
			if (a.status !== notToSort && b.status === notToSort) {
				return -1;
			}
			return new Date(a.deadline) - new Date(b.deadline);
		});
		setTasksArray(sortArray);
		setDeadlineSort(true);
	}

	const handlePopupOpen = useCallback(
		(idPopup, statusPopup) => {
			getTaskInfo(idPopup)
				.then((data) => {
					setPopupInfo(data);
				})
				.catch((res) => {
					if (res === 500) {
						navigate('/server-error');
					} else {
						setTasksArray([]);
					}
				});
			if (statusPopup === 'sent_for_review') {
				setPopupInfoTaskOpen(true);
				return;
			}
			if (statusPopup === 'approved') {
				setPopupInfoTaskOpen(true);
				return;
			}
			setPopupEditTaskOpen(true);
		},
		[navigate]
	);

	function closePopupOverlay(event) {
		if (event.target.classList.contains('popup')) {
			setPopupInfoTaskOpen(false);
			setPopupAddTaskOpen(false);
		}
	}

	function closePopupButton() {
		setPopupInfoTaskOpen(false);
		setPopupAddTaskOpen(false);
	}

	function EditTask() {
		rejectTask(id, popupInfo)
			.then(() => {
				setPopupInfoTaskOpen(false);
				setTaskStatus('sent_for_review');
				setTaskId(id);
			})
			.catch((res) => {
				if (res === 500) {
					navigate('/server-error');
				} else {
					console.log(res);
				}
			});
	}

	function confirmTaskPopup() {
		reviewTask(id, popupInfo)
			.then(() => {
				setTaskStatus('approved');
				setTaskId(id);
				setPopupInfoTaskOpen(false);
			})
			.catch((res) => {
				if (res === 500) {
					navigate('/server-error');
				} else {
					console.log(res);
				}
			});
	}

	const handleAddTaskPopupOpen = useCallback((departmentName) => {
		setDepartmentName(departmentName);
		setPopupAddTaskOpen(true);
	}, []);

	return (
		<section className="teamlead">
			<div className="teamlead-tasks">
				<h2 className="tasks__title">Управление задачами</h2>
				<nav className="tasks__nav teamlead-tasks__nav">
					<button
						className={
							allTasksButton
								? 'tasks__sort-button tasks__sort-button-active'
								: 'tasks__sort-button'
						}
						onClick={handleAllTasksSort}
					>
						Все&nbsp;задачи
					</button>
					<button
						className={
							activeTasksButton
								? 'tasks__sort-button tasks__sort-button-active'
								: 'tasks__sort-button'
						}
						onClick={handleActiveTasksSort}
					>
						В&nbsp;работе
					</button>
					<button
						className={
							inApproveTasksButton
								? 'tasks__sort-button tasks__sort-button-active'
								: 'tasks__sort-button'
						}
						onClick={handleInApproveSort}
					>
						Ждут&nbsp;подтверждения
					</button>

					<button
						className={
							timeOutTasksButton
								? 'tasks__sort-button tasks__sort-button-active'
								: 'tasks__sort-button'
						}
						onClick={handleTimeOutSort}
					>
						Просроченные
					</button>
					<button
						className="tasks__filter teamlead-tasks__filter"
						onClick={handleDeadlineSort}
					>
						<div className="tasks__filter-title">
							Сортировать по дате дедлайна
						</div>
						<img
							className="tasks__filter-img"
							src={iconFilter}
							alt="значок сортировки"
						/>
					</button>
				</nav>

				<DepartmentTasks
					name="Фронтенд"
					array={frontendItems}
					handlePopupOpen={handlePopupOpen}
					handleAddTaskPopupOpen={handleAddTaskPopupOpen}
					users={users}
					taskStatus={taskStatus}
					taskId={taskId}
				/>
				<DepartmentTasks
					name="Бэкенд"
					array={backendItems}
					handlePopupOpen={handlePopupOpen}
					handleAddTaskPopupOpen={handleAddTaskPopupOpen}
					users={users}
					taskStatus={taskStatus}
					taskId={taskId}
				/>
				<DepartmentTasks
					name="Quality Assurance"
					array={QAItems}
					handlePopupOpen={handlePopupOpen}
					handleAddTaskPopupOpen={handleAddTaskPopupOpen}
					users={users}
					taskStatus={taskStatus}
					taskId={taskId}
				/>
				<DepartmentTasks
					name="UX/UI дизайн"
					array={designItems}
					handlePopupOpen={handlePopupOpen}
					handleAddTaskPopupOpen={handleAddTaskPopupOpen}
					users={users}
					taskStatus={taskStatus}
					taskId={taskId}
				/>

				{isPopupInfoTaskOpen ? (
					<div
						className="popup"
						onClick={closePopupOverlay}
						role="button"
						tabIndex={0}
						onKeyDown={null}
					>
						<div className="popup-teamlead">
							<div className="popup__header">
								<h3 className="popup__title">{title}</h3>
								<button
									className="popup__close-button"
									onClick={closePopupButton}
								>
									{}
								</button>
							</div>
							<p className="popup__status">Создана: {formattedDateCreated}</p>
							<p className="popup__status">Статус: {statusName}</p>
							<p className="popup__description-title">Описание</p>
							<p className="popup__description-text">{description}</p>
							<p className="popup__description">
								Срок исполнения: {formattedDateDeadline}
							</p>
							<p className="popup__description">
								Баллы за выполнение: {reward_points}
							</p>
							<button className="popup__button" onClick={confirmTaskPopup}>
								Подтвердить выполнение
							</button>
							<button className="popup__button-reject" onClick={EditTask}>
								Отправить на доработку
							</button>
						</div>
					</div>
				) : null}

				{isPopupAddTaskOpen ? (
					<PopupAddTask
						setPopupAddTaskOpen={setPopupAddTaskOpen}
						users={users}
						departmentName={department}
						setfirstTasksArray={setfirstTasksArray}
						setTasksArray={setTasksArray}
					/>
				) : null}
				{isPopupEditTaskOpen ? (
					<PopupEditTask
						setPopupEditTaskOpen={setPopupEditTaskOpen}
						popupInfo={popupInfo}
						users={users}
						setfirstTasksArray={setfirstTasksArray}
					/>
				) : null}
			</div>
		</section>
	);
}

export default TeamleadTasks;

TeamleadTasks.propTypes = {
	userId: PropTypes.number,
};
TeamleadTasks.defaultProps = {
	userId: 0,
};
