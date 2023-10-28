import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { getUserData } from '../../utils/MainApi';

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
		role: '',
	});

	const [isMobileOpen, setIsMobileOpen] = useState(false);
	const [showUserPointsHeader, setShowUserPointsHeader] = useState(true);
	const [showUserInfoHeader, setShowUserInfoHeader] = useState(true);

	useEffect(() => {
		const handleResize = () => {
			const windowWidth = window.innerWidth;

			const showUserPoints = windowWidth >= 1240;
			const showUserInfo = windowWidth >= 768;

			setShowUserPointsHeader(showUserPoints);
			setShowUserInfoHeader(showUserInfo);
		};
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	// useEffect(() => {
	// 	const handleResize = () => {
	// 		if (window.innerWidth < 1240) {
	// 			setShowUserPointsHeader(false);
	// 		} else {
	// 			setShowUserPointsHeader(true);
	// 		}
	// 		if (window.innerWidth < 768 && window.innerWidth >= 360) {
	// 			setShowUserInfoHeader(false);
	// 		} else {
	// 			setShowUserInfoHeader(true);
	// 		}
	// 	};

	// 	window.addEventListener('resize', handleResize);
	// 	handleResize();

	// 	return () => {
	// 		window.removeEventListener('resize', handleResize);
	// 	};
	// }, []);

	const contextValue = useMemo(() => {
		const handleGetUserData = () => {
			getUserData()
				.then((data) => {
					if (data.length > 0) {
						setUserData(data[0]);
					} else {
						console.log('Ответ сервера не содержит данных пользователя.');
					}
				})
				.catch((err) => {
					console.log(err);
				});
		};

		return {
			userData,
			isMobileOpen,
			setIsMobileOpen,
			setUserData,
			handleGetUserData,
			showUserPointsHeader,
			showUserInfoHeader,
		};
	}, [
		userData,
		setUserData,
		showUserPointsHeader,
		showUserInfoHeader,
		setIsMobileOpen,
		isMobileOpen,
	]);

	return (
		<UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
	);
};

UserProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
