import './App.scss';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Register from '../Register/Register';
import Login from '../Login/Login';
import ResetPassword from '../ResetPassword/ResetPassword';
import NewPassword from '../NewPassword/NewPassword';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import ServerError from '../ServerError/ServerError';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from './Header/Header';
import SideNavbar from './SideNavbar/SideNavbar';
import ModalConfirm from './ModalConfirm/ModalConfirm';
import ModalUpload from './ModalUpload/ModalUpload';
import Notifications from './Header/Notifications/Notifications';
import Teamleader from '../Teamleader/TeamleadTasks/TeamleadTasks';
import { getUserData, getNotification, getTasks } from '../../utils/MainApi';
import DevelopingPage from './DevelopingPage/DevelopingPage';
import ActivateProfile from './ActivateProfile/ActivateProfile';

function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isOpenModalConfirm, setIsOpenModalconfirm] = useState(false);
	const [isOpenPushesModal, setIsPushesModal] = useState(false);
	const [isUploadModal, setIsUploadModal] = useState(false);
	const [notificationsData, setNotificationsData] = useState([]);
	const [isCheckboxPressed, setCheckboxPressed] = useState(true);
	const [tasksArray, setTasksArray] = useState([]);
	const [userId, setUserId] = useState();
	const navigate = useNavigate();
	const token = localStorage.getItem('token');
	const [userData, setUserData] = useState({
		first_name: '',
		last_name: '',
		image: '',
		reward_points_for_current_month: '0',
		reward_points: '',
		rating: '',
		id: '',
	});
	function removeToken() {
		if (!isCheckboxPressed) {
			localStorage.removeItem('token');
		}
		window.removeEventListener('beforeunload', removeToken);
	}
	window.addEventListener('beforeunload', removeToken);

	useEffect(() => {
		if (loggedIn) {
			Promise.all([getUserData(), getTasks(), getNotification()])
				.then(([userInfo, tasksArrayData, notification]) => {
					if (userInfo.length > 0) {
						setUserData(userInfo[0]);
						setUserId(userInfo[0].id);
					} else {
						console.log('Ответ сервера не содержит данных пользователя.');
					}
					const sort = tasksArrayData.sort(
						(a, b) => new Date(a.created_at) - new Date(b.created_at)
					);
					localStorage.setItem('myTasks', JSON.stringify(sort));
					setNotificationsData(notification);
					setTasksArray(tasksArrayData);
				})
				.catch((res) => {
					if (res === 500) {
						navigate('/server-error');
					}
					console.log(res);
				});
		}
	}, [navigate, loggedIn, token]);

	const handleLogOut = () => {
		setLoggedIn(false);
		setIsOpenModalconfirm(false);
		localStorage.clear();
		navigate('/signin');
	};

	const handleOpenModalConfirm = () => setIsOpenModalconfirm(true);
	const handleCloseModalConfirm = () => {
		setIsOpenModalconfirm(false);
	};
	const handleOpenPushesModal = () => setIsPushesModal(true);
	const handleClosePushesModal = () => setIsPushesModal(false);
	const handleOpenUploadModal = () => setIsUploadModal(true);
	const handleCloseUploadModal = () => setIsUploadModal(false);

	useEffect(() => {
		if (token) {
			setLoggedIn(!!token);
		}
	}, [token]);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 50);
	}, []);

	return (
		<div className="App">
			<Routes>
				<Route
					path="/"
					element={
						<ProtectedRoute
							loggedIn={loggedIn}
							isLoading={isLoading}
							key={loggedIn}
						>
							<Header
								handleOpenModalConfirm={handleOpenModalConfirm}
								handleOpenPushesModal={handleOpenPushesModal}
								handleOpenUploadModal={handleOpenUploadModal}
								notificationsData={notificationsData}
								userData={userData}
								onExit={handleLogOut}
							/>
							<SideNavbar />
							<Main tasksArray={tasksArray} userId={userId} />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/profile"
					element={
						<ProtectedRoute
							loggedIn={loggedIn}
							isLoading={isLoading}
							key={loggedIn}
						>
							<Header
								handleOpenModalConfirm={handleOpenModalConfirm}
								handleOpenPushesModal={handleOpenPushesModal}
								handleOpenUploadModal={handleOpenUploadModal}
								notificationsData={notificationsData}
								userData={userData}
								onExit={handleLogOut}
							/>
							<SideNavbar />
							<Profile />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/teamleader"
					element={
						<ProtectedRoute
							loggedIn={loggedIn}
							isLoading={isLoading}
							key={loggedIn}
						>
							<Header
								handleOpenModalConfirm={handleOpenModalConfirm}
								handleOpenPushesModal={handleOpenPushesModal}
								handleOpenUploadModal={handleOpenUploadModal}
								notificationsData={notificationsData}
								userData={userData}
								onExit={handleLogOut}
							/>
							<SideNavbar />
							<Teamleader userId={userId} />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/developing-page"
					element={
						<ProtectedRoute
							loggedIn={loggedIn}
							isLoading={isLoading}
							key={loggedIn}
						>
							<Header
								handleOpenModalConfirm={handleOpenModalConfirm}
								handleOpenPushesModal={handleOpenPushesModal}
								handleOpenUploadModal={handleOpenUploadModal}
								notificationsData={notificationsData}
								userData={userData}
								onExit={handleLogOut}
							/>
							<SideNavbar />
							<DevelopingPage />
						</ProtectedRoute>
					}
				/>
				<Route path="/signup" element={<Register />} />
				<Route path="/new-password" element={<NewPassword />} />
				<Route
					path="/signin"
					element={
						<Login
							setLoggedIn={setLoggedIn}
							isCheckboxPressed={isCheckboxPressed}
							setCheckboxPressed={setCheckboxPressed}
						/>
					}
				/>
				<Route path="/reset-password" element={<ResetPassword />} />
				<Route path="/server-error" element={<ServerError />} />
				<Route path="/activate/:uid/:token" element={<ActivateProfile />} />

				{/* роут для ошибки 404 */}
			</Routes>
			{isOpenModalConfirm && (
				<ModalConfirm onClose={handleCloseModalConfirm} onExit={handleLogOut} />
			)}
			{isOpenPushesModal && (
				<Notifications
					onClose={handleClosePushesModal}
					notificationsData={notificationsData}
				/>
			)}
			{isUploadModal && <ModalUpload onClose={handleCloseUploadModal} />}
		</div>
	);
}

export default App;
