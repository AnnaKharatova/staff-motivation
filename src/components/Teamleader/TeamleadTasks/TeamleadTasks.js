import './TeamleadTasks.scss';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import iconFilter from '../../../images/SortAscending.png';
import DepartmentTasks from '../DepartmentTasks/DepartmentTasks';
import { tasksList } from '../../../utils/constants';
import PopupAddTask from './PopupAddTask/PopupAddTask';
import PopupEditTask from './PopupEditTask/PopupEditTask';

import {
	/* getTasks, */ getTaskInfo,
	confirmTask,
} from '../../../utils/MainApi';

function TeamleadTasks() {
	const navigate = useNavigate();

	const [tasksArray, setTasksArray] = useState(tasksList);
	const [isPopupTaskOpen, setPopupTaskOpen] = useState(false);
	const [isPopupAddTaskOpen, setPopupAddTaskOpen] = useState(false);
	const [isPopupEditTaskOpen, setPopupEditTaskOpen] = useState(false);
	const [allTasksButton, setAllTasksButton] = useState(true);
	const [activeTasksButton, setActiveTaskstButton] = useState(false);
	const [inApproveTasksButton, setInApproveTasksButton] = useState(false);
	const [timeOutTasksButton, setTimeOutTasksButton] = useState(false);
	const [popupInfo, setPopupInfo] = useState([]);
	const [statusName, setStatusName] = useState('');
	const [isDeadlineSort, setDeadlineSort] = useState(false);

	const {
		status,
		reward_points,
		title,
		description,
		created_at,
		deadline,
		id,
	} = popupInfo;

	const dateDeadline = new Date(deadline);
	const dateCreated = new Date(created_at);
	const options = { day: 'numeric', month: 'numeric' };
	const formattedDateDeadline = dateDeadline.toLocaleDateString(
		'ru-RU',
		options
	);
	const formattedDateCreated = dateCreated.toLocaleDateString('ru-RU', options);
	// const storagedArray = JSON.parse(localStorage.getItem('myTasks'));

	const marketingItems = tasksArray.filter(
		(item) => item.department === 'Маркетинг'
	);
	const backendItems = tasksArray.filter(
		(item) => item.department === 'Бэкенд'
	);
	const frontendItems = tasksArray.filter(
		(item) => item.department === 'Фронтенд'
	);
	const designItems = tasksArray.filter(
		(item) => item.department === 'UX/UI дизайн'
	);

	/* useEffect(() => {
		getTasks()
			.then((data) => {
				const sort = data.tasks.sort(
					(a, b) => new Date(a.created_at) - new Date(b.created_at)
				);
				setTasksArray(sort);
				localStorage.setItem('myTasks', JSON.stringify(sort));
			})
			.catch((res) => {
				if (res === 500) {
					navigate('/server-error');
				} else {
					setTasksArray([]);
				}
			});
	}, [navigate]); */

	useEffect(() => {
		if (status === 'created') {
			setStatusName('на выполнении');
		}
		if (status === 'is_overdue') {
			setStatusName('истёк срок задачи');
		}
		if (status === 'approve') {
			setStatusName('подтверждено');
		}
		if (status === 'sent_for_review') {
			setStatusName('на подтверждении');
		}
		if (status === 'rejected') {
			setStatusName('на доработке');
		}
	}, [status]);

	function handleAllTasksSort() {
		setAllTasksButton(true);
		setTimeOutTasksButton(false);
		setInApproveTasksButton(false);
		setActiveTaskstButton(false);
		setTasksArray(tasksList);
	}

	function handleActiveTasksSort() {
		setAllTasksButton(false);
		setActiveTaskstButton(true);
		setTimeOutTasksButton(false);
		setInApproveTasksButton(false);
		const filteredTasks = tasksList.filter(
			(task) => task.status === 'created' || task.status === 'rejected'
		);
		setTasksArray(filteredTasks);
	}

	function handleInApproveSort() {
		setInApproveTasksButton(true);
		setActiveTaskstButton(false);
		setAllTasksButton(false);
		setTimeOutTasksButton(false);
		const filteredTasks = tasksList.filter(
			(task) => task.status === 'sent_for_review'
		);
		setTasksArray(filteredTasks);
	}

	function handleTimeOutSort() {
		setTimeOutTasksButton(true);
		setInApproveTasksButton(false);
		setActiveTaskstButton(false);
		setAllTasksButton(false);
		const filteredTasks = tasksList.filter(
			(task) => task.status === 'is_overdue'
		);
		setTasksArray(filteredTasks);
	}

	function handleDeadlineSort() {
		const notToSort = 'sent_for_review' || 'approve';

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
					} /* else {
						setTasksArray([]);
					} */
				});
			if (statusPopup === 'approve') {
				setPopupTaskOpen(true);
				return;
			}
			setPopupEditTaskOpen(true);
		},
		[navigate]
	);

	function closePopupOverlay(event) {
		if (event.target.classList.contains('popup')) {
			setPopupTaskOpen(false);
			setPopupAddTaskOpen(false);
		}
	}

	function closePopupButton() {
		setPopupTaskOpen(false);
		setPopupAddTaskOpen(false);
	}

	function confirmTaskPopup() {
		confirmTask(id, popupInfo)
			.then(() => {
				setPopupTaskOpen(false);
			})
			.catch((res) => {
				if (res === 500) {
					navigate('/server-error');
				}
			});
	}

	const handleAddTaskPopupOpen = useCallback(() => {
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
				/>
				<DepartmentTasks
					name="Бэкенд"
					array={backendItems}
					handlePopupOpen={handlePopupOpen}
					handleAddTaskPopupOpen={handleAddTaskPopupOpen}
				/>
				<DepartmentTasks
					name="Маркетинг"
					array={marketingItems}
					handlePopupOpen={handlePopupOpen}
					handleAddTaskPopupOpen={handleAddTaskPopupOpen}
				/>
				<DepartmentTasks
					name="UX/UI дизайн"
					array={designItems}
					handlePopupOpen={handlePopupOpen}
					handleAddTaskPopupOpen={handleAddTaskPopupOpen}
				/>

				{isPopupTaskOpen ? (
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
						</div>
					</div>
				) : null}

				{isPopupAddTaskOpen ? (
					<PopupAddTask setPopupAddTaskOpen={setPopupAddTaskOpen} />
				) : null}
				{isPopupEditTaskOpen ? (
					<PopupEditTask
						setPopupEditTaskOpen={setPopupEditTaskOpen}
						popupInfo={popupInfo}
					/>
				) : null}
			</div>
		</section>
	);
}

export default TeamleadTasks;
