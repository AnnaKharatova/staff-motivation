import './PopupAddTask.scss';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { addTask, getTasks } from '../../../../utils/MainApi';
import { PopupAddTaskSchema } from '../../../../utils/ValidationSchemes';

function PopupAddTask({
	setPopupAddTaskOpen,
	users,
	departmentName,
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
		resolver: yupResolver(PopupAddTaskSchema),
	});

	const [executor, setExecutor] = useState('');
	const [isAreaBorder, setAreaBorder] = useState(false);
	const [selectedUserId, setSelectedUserId] = useState();
	const [departmentData, setDepartmentData] = useState('');
	const [errorSpan, setErrorSpan] = useState(false);

	useEffect(() => {
		if (
			errors.deadline ||
			errors.description ||
			errors.title ||
			errors.reward_points
		) {
			setErrorSpan(true);
		} else {
			setErrorSpan(false);
		}
	}, [
		errors.deadline,
		errors.description,
		errors.title,
		errors.reward_points,
		isValid,
		isDirty,
	]);

	useEffect(() => {
		if (departmentName === 'Фронтенд') {
			setDepartmentData('frontend');
		} else if (departmentName === 'Бэкенд') {
			setDepartmentData('backend');
		} else if (departmentName === 'Quality Assurance') {
			setDepartmentData('qa');
		} else if (departmentName === 'UX/UI дизайн') {
			setDepartmentData('ux_ui');
		} else {
			setDepartmentData('other');
		}
	}, [departmentName]);

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

	function closePopupOverlay(event) {
		if (event.target.classList.contains('popup')) {
			setPopupAddTaskOpen(false);
		}
	}

	function closePopupButton() {
		setPopupAddTaskOpen(false);
	}

	function onSubmit(data, evt) {
		if (isValid && executor) {
			const date = new Date(data.deadline);
			const formattedDate = date.toISOString();
			evt.preventDefault();
			setPopupAddTaskOpen(false);
			const newData = {
				status: 'created',
				deadline: formattedDate,
				description: data.description,
				title: data.title,
				reward_points: data.reward_points,
				department: departmentData,
				assigned_to: selectedUserId,
			};
			addTask(newData)
				.then(() => {
					setPopupAddTaskOpen(false);
					getNewTasks();
				})
				.catch((res) => {
					if (res === 500) {
						navigate('/server-error');
					} else {
						setErrorSpan(true);
					}
				});
		}
		setErrorSpan(true);
	}

	const handleClick = (name, id) => {
		setSelectedUserId(id);
		setExecutor(name);
	};

	function setAreaStyle() {
		setAreaBorder(true);
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
					<h3 className="popup-addtask">Новая задача</h3>
					<button className="popup__close-button" onClick={closePopupButton}>
						{}
					</button>
				</div>

				<form className="popup-addtask__form" onSubmit={handleSubmit(onSubmit)}>
					<label className="popup-addtask__label" htmlFor="title">
						Название задачи
						<input
							className={`popup-addtask__input ${
								errors.title && !isValid && isDirty
									? 'popup-addtask__input_no-valid'
									: ''
							} ${watch('title') ? 'popup-addtask__input_filled' : ''}`}
							type="text"
							name="title"
							id="title"
							{...register('title', { required: true })}
						/>
					</label>
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
							placeholder="Добавьте описание задачи"
							type="text"
							name="description"
							id="description"
							onFocus={setAreaStyle}
							{...register('description', { required: true })}
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
							placeholder="дд.мм"
							type="date"
							name="dealine"
							id="deadline"
							{...register('deadline', { required: true })}
						/>
					</label>

					<label className="popup-addtask__label-bottom" htmlFor="balls">
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
							type="number"
							name="reward_points"
							id="reward_points"
							{...register('reward_points', { required: true })}
						/>
					</label>

					{errorSpan ? (
						<span className="popup-addtask__error-span">
							Ошибка ввода данных
						</span>
					) : (
						<div className="popup-addtask__error-area" />
					)}

					<button
						className="popup-addtask__button"
						type="submit"
						disabled={!isValid}
					>
						Добавить задачу
					</button>
				</form>
			</div>
		</div>
	);
}
export default PopupAddTask;

PopupAddTask.propTypes = {
	setfirstTasksArray: PropTypes.func.isRequired,
	setPopupAddTaskOpen: PropTypes.func.isRequired,
	departmentName: PropTypes.string.isRequired,
	users: PropTypes.arrayOf(
		PropTypes.shape({
			first_name: PropTypes.string,
			last_name: PropTypes.string,
			id: PropTypes.number,
		})
	).isRequired,
};
