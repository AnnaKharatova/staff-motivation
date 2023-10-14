import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Preloader from './Preloader/Preloader';

function ProtectedRoute({ isLoading, loggedIn, children }) {
	useEffect(() => {}, [isLoading, loggedIn]);

	if (isLoading) {
		return <Preloader />;
	}
	if (loggedIn) {
		return children;
	}
	return <Navigate to="/signin" replace />;
}

export default ProtectedRoute;

ProtectedRoute.propTypes = {
	loggedIn: PropTypes.bool.isRequired,
	children: PropTypes.node,
	isLoading: PropTypes.bool.isRequired,
};

ProtectedRoute.defaultProps = {
	children: null,
};
