import './NewPassword.scss';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NewPasswordSchema } from '../../utils/ValidationSchemes';
import { setPassword } from '../../utils/MainApi';
import { ERROR_MESSAGES } from '../../utils/Config';
import logo1 from '../../images/CircleWavyCheck.svg';
import logo from '../../images/M-check.svg';
import eyeButton from '../../images/Icon-hidden-pass.svg';
import Modal from '../App/Modal/Modal';
import styles from '../App/Modal/Modal.module.scss';

function NewPassword() {
	const navigate = useNavigate();
	const { uid, token } = useParams();
	const [isOpen, setIsOpen] = useState(false);
	const handleLogin = () => {
		navigate('/signin');
	};

	const [isError, setIsError] = useState(false);
	const [error, setError] = useState(null);
	const [isPasswordHidden, setPasswordHidden] = useState(false);
	const [isConfirmPasswordHidden, setConfirmPasswordHidden] = useState(false);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isValid, isDirty },
	} = useForm({
		mode: 'onChange',
		// mode: 'onTouched',
		resolver: yupResolver(NewPasswordSchema),
	});

	useEffect(() => {
		if (errors.password) {
			setIsError(true);
			setError(errors.password.message);
		} else if (errors.confirmPassword) {
			setIsError(true);
			setError(errors.confirmPassword.message);
		} else if (isValid) {
			setIsError(false);
		} else if (watch('password') !== watch('confirmPassword')) {
			setIsError(true);
		} else {
			setIsError(false);
		}
	}, [errors.password, errors.confirmPassword, isValid, watch]);

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
	const onSubmit = (data, evt) => {
		evt.preventDefault();
		if (watch('password') === watch('confirmPassword')) {
			setPassword(uid, token, data.password)
				.then(() => {
					setIsOpen(true);
				})
				.catch((err) => {
					if (err === 400) {
						setIsError(true);
						setError('Такой пароль не подходит');
					} else if (err === 500) {
						navigate(ERROR_MESSAGES.SERVER.ELSE);
					} else {
						setIsOpen(true);
					}
				});
		} else {
			setIsError(true);
			setError(ERROR_MESSAGES.PASSWORD.MUST_MATCH);
		}
	};

	return (
		<div className="form">
			<div className="new-password">
				<header className="form__header">
					<img className="form__logo" src={logo} alt="Логотип" />
					<h1 className="form__title">Motivation System</h1>
				</header>
				<main className="form__main">
					{isError ? (
						<h2 className="new-password__error">{error}</h2>
					) : (
						<h2 className="form__subtitle">
							Войдите в аккаунт, чтобы получить доступ к приложению
						</h2>
					)}
					<form
						className="form__form"
						onSubmit={handleSubmit(onSubmit)}
						noValidate
					>
						<div className="form__pass-input">
							<label className="form__label" htmlFor="password">
								Пароль
								<input
									id="password"
									name="password"
									type={isPasswordHidden ? 'text' : 'password'}
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
									type={isConfirmPasswordHidden ? 'text' : 'password'}
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
							Изменить пароль
						</button>
					</form>
					{isOpen ? (
						<Modal>
							<section className={styles.ModulePort}>
								<div className={styles.Module}>
									<img src={logo1} className="App-logo" alt="logo" />
									<h2 className={styles.Text3}>Ваш пароль успешно изменен!</h2>
									<button className={styles.button} onClick={handleLogin}>
										Войти
									</button>
								</div>
							</section>
						</Modal>
					) : null}
				</main>
			</div>
		</div>
	);
}

export default NewPassword;
