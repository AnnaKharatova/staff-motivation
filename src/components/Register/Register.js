import './Register.scss';
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterSchema } from '../../utils/ValidationSchemes';
import { signup } from '../../utils/MainApi';

import logo from '../../images/M-check.svg';
import eyeButton from '../../images/Icon-hidden-pass.svg';

function Register() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		// setValue,
		// getValues,
		watch,
		formState: { errors, isValid, isDirty },
	} = useForm({
		mode: 'onTouched',
		resolver: yupResolver(RegisterSchema),
	});

	const [isError, setIsError] = useState(false);
	const [error, setError] = useState(null);
	const [isPasswordHidden, setPasswordHidden] = useState(false);
	const [isConfirmPasswordHidden, setConfirmPasswordHidden] = useState(false);

	function onRegister(data) {
		signup(data)
			.then(() => {
				navigate('/main');
				console.log(`${error}'Пользователь зарегистрирован'`); // проверяю успешна ли регистрация
			})
			.catch((err) => {
				if (err === 400) {
					setIsError(true);
					setError('Ошибка регистрации. Проверьте правильность ввода данных');
				} else if (err === 500) {
					navigate('/server-error');
				} else {
					setIsError(true);
					setError('Что-то пошло не так...');
				}
			});
	}

	function onSubmit(data, evt) {
		evt.preventDefault();
		onRegister(data);
	}

	function handlePasswordHidden() {
		if (isPasswordHidden) {
			setPasswordHidden(false);
		} else {
			setPasswordHidden(true);
		}
	}

	function handleConfirmPasswordHidden() {
		if (isConfirmPasswordHidden) {
			setConfirmPasswordHidden(false);
		} else {
			setConfirmPasswordHidden(true);
		}
	}

	useEffect(() => {
		if (errors.email) {
			setIsError(true);
			setError(errors.email.message);
		} else if (errors.lastName) {
			setIsError(true);
			setError(errors.lastName.message);
		} else if (errors.firstName) {
			setIsError(true);
			setError(errors.firstName.message);
		} else if (errors.password) {
			setIsError(true);
			setError(errors.password.message);
		} else if (errors.confirmPassword) {
			setIsError(true);
			setError(errors.confirmPassword.message);
		} else {
			setIsError(false);
		}
	}, [
		errors.email,
		errors.lastName,
		errors.firstName,
		errors.password,
		errors.confirmPassword,
	]);

	return (
		<div className="form">
			<div className="form__container">
				<header className="form__header">
					<img className="form__logo" src={logo} alt="Логотип" />
					<h1 className="form__title">Motivation System</h1>
				</header>
				<main className="form__main">
					{isError ? (
						<h2 className="form__error"> {error}</h2>
					) : (
						<h2 className="form__subtitle">
							{' '}
							Создайте учётную запись, чтобы получить доступ к приложению
						</h2>
					)}
					<form
						className="form__form"
						onSubmit={handleSubmit(onSubmit)}
						noValidate
					>
						<label className="form__label" htmlFor="email">
							Email
							<input
								id="email"
								name="email"
								className={`form__input ${
									errors.email && !isValid && isDirty
										? 'form__input_no-valid'
										: ''
								} ${watch('email') ? 'form__input_filled' : ''}`}
								{...register('email', { required: true })}
							/>
						</label>

						<label className="form__label" htmlFor="lastName">
							Фамилия
							<input
								id="lastName"
								name="lastName"
								className={`form__input ${
									errors.lastName && !isValid && isDirty
										? 'form__input_no-valid'
										: ''
								} ${watch('lastName') ? 'form__input_filled' : ''}`}
								{...register('lastName', { required: true })}
							/>
						</label>

						<label className="form__label" htmlFor="firstName">
							Имя
							<input
								id="firstName"
								name="firstName"
								className={`form__input ${
									errors.firstName && !isValid && isDirty
										? 'form__input_no-valid'
										: ''
								} ${watch('firstName') ? 'form__input_filled' : ''}`}
								{...register('firstName', { required: true })}
							/>
						</label>

						<div className="form__pass-input">
							<label className="form__label" htmlFor="password">
								Пароль
								<input
									id="password"
									name="password"
									type={isPasswordHidden ? 'password' : 'text'}
									className={`form__input ${
										errors.password && !isValid && isDirty
											? 'form__input_no-valid'
											: ''
									} ${watch('password') ? 'form__input_filled' : ''}`}
									{...register('password', { required: true })}
								/>
								{watch('password') ? (
									<button
										className="form__eye-button"
										type="button"
										onClick={handlePasswordHidden}
									>
										<img src={eyeButton} alt="скрыть пароль" />
									</button>
								) : null}
							</label>
						</div>

						<div className="form__pass-input">
							<label className="form__label" htmlFor="confirmPassword">
								Повторите пароль
								<input
									id="confirmPassword"
									name="confirmPassword"
									type={isPasswordHidden ? 'password' : 'text'}
									className={`form__input ${
										errors.confirmPassword && !isValid && isDirty
											? 'form__input_no-valid'
											: ''
									} ${watch('confirmPassword') ? 'form__input_filled' : ''}`}
									{...register('confirmPassword', { required: true })}
								/>
								{watch('confirmPassword') ? (
									<button
										className="form__eye-button"
										type="button"
										onClick={handleConfirmPasswordHidden}
									>
										<img src={eyeButton} alt="скрыть пароль" />
									</button>
								) : null}
							</label>
						</div>

						<button
							className="form__submit-button"
							type="submit"
							disabled={!isValid || !isDirty || isError}
						>
							Зарегистрироваться
						</button>
					</form>
					<NavLink to="/signin" className="form__caption-link">
						У меня есть аккаунт.&#8194;Войти
					</NavLink>
				</main>
			</div>
		</div>
	);
}

export default Register;
