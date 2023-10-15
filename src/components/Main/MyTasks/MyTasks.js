import './MyTasks.scss';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MyTask from '../MyTask/MyTask';
import iconFilter from '../../../images/SortAscending.png';
import { getTasks, getTaskInfo, confirmTask } from '../../../utils/MainApi';

function MyTasks() {
	const navigate = useNavigate();

	const [tasksArray, setTasksArray] = useState([]);
	const [isArray, setArray] = useState(true);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
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
	const storagedArray = JSON.parse(localStorage.getItem('myTasks'));

	useEffect(() => {
		getTasks()
			.then((data) => {
				const sort = data.sort(
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
	}, [navigate]);

	useEffect(() => {
		if (tasksArray.length === 0 || null) {
			setArray(false);
		} else if (tasksArray === undefined) {
			setArray(false);
		} else {
			setArray(true);
		}
	}, [tasksArray]);

	useEffect(() => {
		if (status === 'created') {
			setStatusName('на выполнении');
		}
		if (status === 'Просрочена') {
			setStatusName('истёк срок задачи');
		}
		if (status === 'Принята и выполнена') {
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
		if (storagedArray) {
			setTasksArray(storagedArray);
		}
	}

	function handleActiveTasksSort() {
		setAllTasksButton(false);
		setActiveTaskstButton(true);
		setTimeOutTasksButton(false);
		setInApproveTasksButton(false);
		if (storagedArray) {
			const filteredTasks = storagedArray.filter(
				(task) => task.status === 'created' || task.status === 'reject'
			);
			setTasksArray(filteredTasks);
		}
	}

	function handleInApproveSort() {
		setInApproveTasksButton(true);
		setActiveTaskstButton(false);
		setAllTasksButton(false);
		setTimeOutTasksButton(false);
		if (storagedArray) {
			const filteredTasks = storagedArray.filter(
				(task) => task.status === 'sent_for_review'
			);
			setTasksArray(filteredTasks);
		}
	}

	function handleTimeOutSort() {
		setTimeOutTasksButton(true);
		setInApproveTasksButton(false);
		setActiveTaskstButton(false);
		setAllTasksButton(false);
		if (storagedArray) {
			const filteredTasks = storagedArray.filter(
				(task) => task.status === 'Просрочена'
			);
			setTasksArray(filteredTasks);
		}
	}

	function handleDeadlineSort() {
		const notToSort = 'sent_for_review' || 'Принята и выполнена';

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
		(idPopup, disablePopup) => {
			if (!disablePopup) {
				getTaskInfo(idPopup)
					.then((data) => {
						setPopupInfo(data);
						setIsPopupOpen(true);
					})
					.catch((res) => {
						if (res === 500) {
							navigate('/server-error');
						} else {
							setTasksArray([]);
						}
					});
				return;
			}
			setIsPopupOpen(false);
		},
		[navigate]
	);

	function closePopupOverlay(event) {
		if (event.target.classList.contains('popup')) {
			setIsPopupOpen(false);
		}
	}

	function closePopupButton() {
		setIsPopupOpen(false);
	}

	function confirmTaskPopup() {
		confirmTask(id, popupInfo)
			.then(() => {
				setIsPopupOpen(false);
			})
			.catch((res) => {
				if (res === 500) {
					navigate('/server-error');
				}
				setIsPopupOpen(false);
			});
	}

	return (
		<section className="tasks">
			<h2 className="tasks__title">Мои задачи</h2>
			<nav className="tasks__nav">
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
					На&nbsp;подтверждении
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

				<button className="tasks__filter" onClick={handleDeadlineSort}>
					<div className="tasks__filter-title">
						Сортировать&nbsp;по&nbsp;дате&nbsp;дедлайна
					</div>
					<img
						className="tasks__filter-img"
						src={iconFilter}
						alt="значок сортировки"
					/>
				</button>
			</nav>
			{isArray ? (
				<div className="tasks__list">
					{tasksArray.map((task) => (
						<MyTask onClick={handlePopupOpen} task={task} key={task.id} />
					))}
				</div>
			) : (
				<p className="tasks__empty">Здесь будут ваши задачи</p>
			)}
			{isPopupOpen ? (
				<div
					className="popup"
					onClick={closePopupOverlay}
					role="button"
					tabIndex={0}
					onKeyDown={null}
				>
					<div className="popup__container">
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
		</section>
	);
}
export default MyTasks;
