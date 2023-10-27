import React from 'react';
import logoActivation from '../../../images/CircleWavyCheck.svg';
import Modal from '../../App/Modal/Modal';
import styles from '../../App/Modal/Modal.module.scss';

function ApprovingRegisterPage() {
	return (
		<Modal>
			<section className={styles.ModalPort}>
				<div className={styles.Module}>
					<img src={logoActivation} className="App-logo" alt="logo" />
					<h2 className={styles.Message}>
						После активации аккаунта мы отправим вам электронное письмо. В нём
						будет ссылка на вашу страницу в приложении.
					</h2>
				</div>
			</section>
		</Modal>
	);
}

export default ApprovingRegisterPage;
