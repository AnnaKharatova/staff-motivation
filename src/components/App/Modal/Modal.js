import React from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.scss';

function Modal({ children }) {
	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modal}>{children}</div>
		</div>
	);
}
Modal.propTypes = {
	children: PropTypes.node,
};
Modal.defaultProps = {
	children: null,
};

export default Modal;
