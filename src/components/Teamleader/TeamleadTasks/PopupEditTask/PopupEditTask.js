import './PopupEditTask.scss';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { editTask, deleteTask, getTasks } from '../../../../utils/MainApi';
import { PopupEditTaskSchema } from '../../../../utils/ValidationSchemes';

function PopupEditTask({
	setPopupEditTaskOpen,
	users,
	popupInfo,
	setfirstTasksArray,
}) {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isValid, isDirty },
	} = useForm({
		mode: 'onTouched',
		resolver: yupResolver(PopupEditTaskSchema),
	});

	const {
		is_overdue,
		assigned_to,
		status,
		reward_points,
		title,
		description,
		created_at,
		deadline,
		id,
	} = popupInfo;

	const [errorSpan, setErrorSpan] = useState(false);
	const [executor, setExecutor] = useState();
	const [isAreaBorder, setAreaBorder] = useState(false);
	const [selectedUserId, setSelectedUserId] = useState();
	const [statusName, setStatusName] = useState('');
	const [deadlineDate, setDeadlineDate] = useState();

	const dateCreated = new Date(created_at);
	const formattedDateCreated = dateCreated.toLocaleDateString('ru-RU', {
		day: 'numeric',
		month: 'numeric',
	});

	function getNewTasks() {
		getTasks()
			.then((data) => {
				const sort = data.sort(
					(a, b) => new Date(a.created_at) - new Date(b.created_at)
				);
				localStorage.setItem('myTasks', JSON.stringify(sort));
				setfirstTasksArray(sort);
			})
			.catch((res) => {
				if (res === 500) {
					navigate('/server-error');
				}
				setErrorSpan(true);
			});
	}

	useEffect(() => {
		if (errors.deadline || errors.description || errors.reward_points) {
			setErrorSpan(true);
		} else {
			setErrorSpan(false);
		}
	}, [
		errors.deadline,
		errors.description,
		errors.reward_points,
		isValid,
		isDirty,
	]);

	useEffect(() => {
		const userName = users.find((user) => user.id === assigned_to);
		const firstName = userName ? userName.first_name : '';
		const lastName = userName ? userName.last_name : '';
		setExecutor(`${firstName} ${lastName}`);
	}, [users, assigned_to]);

	useEffect(() => {
		const dateDeadline = new Date(deadline);
		const formattedDateDeadline = dateDeadline.toLocaleDateString('ru-RU', {
			day: 'numeric',
			month: 'numeric',
		});
		setDeadlineDate(formattedDateDeadline);
	}, [deadline]);

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

	function closePopupOverlay(event) {
		if (event.target.classList.contains('popup')) {
			setPopupEditTaskOpen(false);
		}
	}

	function closePopupButton() {
		setPopupEditTaskOpen(false);
	}

	const handleClick = (name, userId) => {
		setSelectedUserId(userId);
		setExecutor(name);
	};

	function setAreaStyle() {
		setAreaBorder(true);
	}

	function onSubmit(data, evt) {
		evt.preventDefault();
		const date = new Date(data.deadline);
		const newDeadline = date.toISOString();
		const newData = {
			id: popupInfo.id,
			status: 'created',
			reward_points: data.reward_points || reward_points,
			department: popupInfo.department,
			title: data.title || title,
			description: data.description || description,
			created_at: popupInfo.created_at,
			deadline: newDeadline || deadline,
			is_overdue: popupInfo.is_overdue,
			assigned_to: selectedUserId,
		};
		editTask(id, newData)
			.then(() => {
				getNewTasks();
				setPopupEditTaskOpen(false);
			})
			.catch((res) => {
				if (res === 500) {
					navigate('/server-error');
				} else {
					setErrorSpan(true);
				}
			});
	}

	function handleDeleteTask() {
		deleteTask(id)
			.then(() => {
				getNewTasks();
				setPopupEditTaskOpen(false);
			})
			.catch((res) => {
				if (res === 500) {
					navigate('/server-error');
				} else {
					setErrorSpan(true);
				}
			});
	}

	return (
		<div
			className="popup"
			onClick={closePopupOverlay}
			role="button"
			tabIndex={0}
			onKeyDown={null}
		>
			<div className="popup-teamlead">
				<div className="popup-addtask__header">
					<h3 className="popup-addtask">{title}</h3>
					<button className="popup__close-button" onClick={closePopupButton}>
						{}
					</button>
				</div>
				<div className="popup-addtask__info">
					<p className="popup-addtask__created">
						Создана: &nbsp; {formattedDateCreated}
					</p>
					<p className="popup-addtask__status">Статус: &nbsp; {statusName}</p>
				</div>

				<p className="popup-edit__description">Описание</p>
				<form className="popup-addtask__form" onSubmit={handleSubmit(onSubmit)}>
					<div
						className={`popup-addtask__input-area ${
							errors.description && !isValid && isDirty
								? 'popup-addtask__input-area_no-valid'
								: ''
						}  ${
							watch('description') || isAreaBorder
								? 'popup-addtask__input-area_filled'
								: ''
						}`}
					>
						<textarea
							className="popup-addtask__input-text"
							defaultValue={description || ''}
							placeholder="Добавьте описание задачи"
							type="text"
							name="discription"
							id="discription"
							onFocus={setAreaStyle}
							{...register('discription', { required: false })}
						/>
					</div>

					<div className="popup-addtask__executors">
						<p className="popup-addtask__executor">
							Исполнитель:&nbsp;{executor}
						</p>
					</div>

					<div className="popup-addtask__executors-element">
						<ul className="popup-addtask__executors-list">
							{users.map((name) => (
								<li key={name.id}>
									<button
										type="button"
										className="popup-addtask__executors-name"
										onClick={() =>
											handleClick(
												`${name.last_name} ${name.first_name}`,
												name.id
											)
										}
									>
										{name.last_name} {name.first_name}
									</button>
								</li>
							))}
						</ul>
					</div>

					<label className="popup-addtask__label-bottom" htmlFor="data">
						Срок исполнения
						<input
							className={`popup-addtask__input-bottom ${
								errors.deadline && !isValid && isDirty
									? 'popup-addtask__input-bottom_no-valid'
									: ''
							} ${
								watch('deadline') ? 'popup-addtask__input-bottom_filled' : ''
							}`}
							defaultValue={deadlineDate || ''}
							placeholder="дд.мм"
							type={watch('deadline') ? 'date' : 'text'}
							name="deadline"
							id="deadline"
							{...register('deadline', { required: false })}
						/>
					</label>

					<label
						className="popup-addtask__label-bottom popup-edit__label-bottom"
						htmlFor="balls"
					>
						Баллы за выполнение
						<input
							className={`popup-addtask__input-bottom ${
								errors.reward_points && !isValid && isDirty
									? 'popup-addtask__input-bottom_no-valid'
									: ''
							} ${
								watch('reward_points')
									? 'popup-addtask__input-bottom_filled'
									: ''
							}`}
							defaultValue={reward_points || ''}
							type="number"
							name="reward_points"
							id="reward_points"
							{...register('reward_points', { required: false })}
						/>
					</label>

					{errorSpan ? (
						<span className="popup-addtask__error-span">
							Ошибка ввода данных
						</span>
					) : (
						<div className="popup-addtask__error-area popup-edit__error-area" />
					)}

					<button
						className="popup-addtask__button popup-edit__button"
						type="submit"
					>
						Сохранить изменения
					</button>
					<button
						className="popup__button-reject popup-edit__button-delete"
						onClick={handleDeleteTask}
					>
						Удалить задачу
					</button>
				</form>
			</div>
		</div>
	);
}
export default PopupEditTask;

PopupEditTask.propTypes = {
	setPopupEditTaskOpen: PropTypes.func.isRequired,
	popupInfo: PropTypes.shape({
		is_overdue: PropTypes.bool.isRequired,
		id: PropTypes.number.isRequired,
		status: PropTypes.string.isRequired,
		reward_points: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		created_at: PropTypes.string.isRequired,
		deadline: PropTypes.string.isRequired,
		assigned_to: PropTypes.number.isRequired,
		department: PropTypes.string.isRequired,
	}),
	users: PropTypes.arrayOf(
		PropTypes.shape({
			first_name: PropTypes.string,
			last_name: PropTypes.string,
			id: PropTypes.number,
		})
	).isRequired,
	setfirstTasksArray: PropTypes.func.isRequired,
};

PopupEditTask.defaultProps = {
	popupInfo: PropTypes.shape({
		is_overdue: true,
		id: '',
		status: '',
		reward_points: 0,
		title: '',
		description: '',
		created_at: '',
		deadline: '',
		assigned_to: 0,
		department: '',
	}),
};
