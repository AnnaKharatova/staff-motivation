import React, { createContext, useContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
	const [userData, setUserData] = useState({
		first_name: '',
		last_name: '',
		image: '',
		reward_points_for_current_month: 0,
		reward_points: 0,
		rating: 0,
	});

	const contextValue = useMemo(
		() => ({
			userData,
			setUserData,
		}),
		[userData, setUserData]
	);

	return (
		<UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
	);
};

UserProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
