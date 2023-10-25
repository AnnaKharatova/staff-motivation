import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { activateRegister } from '../../../utils/MainApi';
import logoActivation from '../../../images/CircleWavyCheck.svg';
import Modal from '../Modal/Modal';
import styles from '../Modal/Modal.module.scss';

function ActivateProfile() {
	const navigate = useNavigate();
	const { uid, token } = useParams();

	useEffect(() => {
		console.log(uid, token);
		activateRegister(uid, token)
			.then(() => {
				setTimeout(() => {
					navigate('/signin');
				}, 2000);
			})
			.catch((res) => {
				if (res === 500) {
					navigate('/server-error');
				} else {
					navigate('/approving-register');
				}
			});
	}, [navigate, uid, token]);

	return (
		<Modal>
			<section className={styles.ModalPort}>
				<div className={styles.Module}>
					<img src={logoActivation} className="App-logo" alt="logo" />
					<h1 className={styles.Text1}>Активация профиля</h1>
					<h2 className={styles.Text2}>
						Идет перенаправление на страницу входа......
					</h2>
				</div>
			</section>
		</Modal>
	);
}

export default ActivateProfile;
