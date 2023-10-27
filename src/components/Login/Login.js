import './Login.scss';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema } from '../../utils/ValidationSchemes';
import * as MainApi from '../../utils/MainApi';
import { ERROR_MESSAGES } from '../../utils/Config';
import logo from '../../images/M-check.svg';
import eyeButton from '../../images/Icon-hidden-pass.svg';

export default function Login({
	setLoggedIn,
	isCheckboxPressed,
	setCheckboxPressed,
}) {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		// getValues,
		watch,
		formState: { errors, isValid, isDirty },
	} = useForm({
		mode: 'onTouched',
		resolver: yupResolver(LoginSchema),
	});
	// чекбокс для "Запомнить меня"
	const handleIsRememberMePressed = () => {
		setCheckboxPressed(!isCheckboxPressed);
	};

	// стейт скрытого пароля
	const [isPasswordHidden, setIsPasswordHidden] = useState(true);
	const handleIsPasswordHidden = () => {
		setIsPasswordHidden(!isPasswordHidden);
	};
	// ошибки
	const [isError, setIsError] = useState(false);
	const [error, setError] = useState(null);

	const handleLogin = (email, password) => {
		MainApi.login(email, password)
			.then((data) => {
				localStorage.setItem('token', data.auth_token);
				setLoggedIn(true);
				navigate('/');
			})
			.catch((err) => {
				if (err === 400) {
					setIsError(true);
					setError(ERROR_MESSAGES.SERVER.DATA);
				} else if (err === 500) {
					navigate('/server-error');
				} else {
					setIsError(true);
					setError(ERROR_MESSAGES.SERVER.ELSE);
				}
			});
	};

	function onSubmit(data, evt) {
		evt.preventDefault();
		handleLogin(data.email, data.password);
	}

	// toggle для кнопки "запомнить меня"
	const handleRememberButton = () => {
		handleIsRememberMePressed();
	};

	useEffect(() => {
		if (errors.email) {
			setIsError(true);
			setError(errors.email.message);
		} else if (errors.password) {
			setIsError(true);
			setError(errors.password.message);
		} else {
			setIsError(false);
		}
	}, [errors.email, errors.password]);

	return (
		<div className="form">
			<div className="login">
				<header className="form__header">
					<img className="form__logo" src={logo} alt="Логотип" />
					<h1 className="form__title">Motivation System</h1>
				</header>
				<main className="form__main">
					{isError ? (
						<h2 className="login__error">{error}</h2>
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
										onClick={handleIsPasswordHidden}
									>
										<img src={eyeButton} alt="скрыть пароль" />
									</button>
								) : null}
							</label>
						</div>

						<div className="login__links">
							<label
								className="login__checkbox-container"
								htmlFor="remember-checkbox"
							>
								<input
									className="login__checkbox"
									checked={isCheckboxPressed}
									onChange={handleRememberButton}
									id="remember-checkbox"
									type="checkbox"
									name="remember-checkbox"
								/>
								<span />

								<p className="login__checkbox-message">Запомнить меня</p>
							</label>
							<NavLink className="login__link" to="/reset-password">
								Забыли пароль?
							</NavLink>
						</div>
						<button
							className="form__submit-button"
							type="submit"
							disabled={!isValid || !isDirty || isError}
						>
							Войти
						</button>
					</form>
					<NavLink to="/signup" className="form__caption-link">
						У меня нет аккаунта. Зарегистрироваться
					</NavLink>
				</main>
			</div>
		</div>
	);
}
Login.propTypes = {
	setLoggedIn: PropTypes.func.isRequired,
	isCheckboxPressed: PropTypes.bool.isRequired,
	setCheckboxPressed: PropTypes.func.isRequired,
};
