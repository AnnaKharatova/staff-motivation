import './App.scss';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Teamleader from '../Teamleader/TeamleadTasks/TeamleadTasks';
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
import ModalDeleteImage from './ModalDeleteImage/ModalDeleteImage';
import { useUser } from '../context/UserContext';
import Notifications from './Header/Notifications/Notifications';
import { getUserData, getNotification } from '../../utils/MainApi';
import DevelopingPage from './DevelopingPage/DevelopingPage';

function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isOpenModalConfirm, setIsOpenModalconfirm] = useState(false);
	const [isOpenPushesModal, setIsPushesModal] = useState(false);
	const [isUploadModal, setIsUploadModal] = useState(false);
	const [isDeleteModal, setIsDeleteModal] = useState(false);
	const [notificationsData, setNotificationsData] = useState([]);
	const { setUserData } = useUser();
	const navigate = useNavigate();
	const [isCheckboxPressed, setCheckboxPressed] = useState(true);
	const token = localStorage.getItem('token');

	function removeToken() {
		if (!isCheckboxPressed) {
			localStorage.removeItem('token');
		}
		window.removeEventListener('beforeunload', removeToken);
	}
	window.addEventListener('beforeunload', removeToken);

	useEffect(() => {
		if (loggedIn) {
			getUserData()
				.then((data) => {
					if (data.length > 0) {
						setUserData(data[0]);
					} else {
						console.log('Ответ сервера не содержит данных пользователя.');
					}
				})
				.catch((res) => {
					if (res === 500) {
						navigate('/server-error');
					}
					console.log(res);
				});
		}
	}, [navigate, loggedIn, token, setUserData]);

	const handleLogOut = () => {
		setLoggedIn(false);
		setIsOpenModalconfirm(false);
		localStorage.clear();
		navigate('/signin');
	};
	// Confirm modal
	const handleOpenModalConfirm = () => setIsOpenModalconfirm(true);
	const handleCloseModalConfirm = () => setIsOpenModalconfirm(false);
	// Notifications modal
	const handleOpenPushesModal = () => setIsPushesModal(true);
	const handleClosePushesModal = () => setIsPushesModal(false);
	// Upload modal
	const handleOpenUploadModal = () => setIsUploadModal(true);
	const handleCloseUploadModal = () => setIsUploadModal(false);
	// Delete image modal
	const handleOpenDeleteModal = () => setIsDeleteModal(true);
	const handleCloseDeleteModal = () => setIsDeleteModal(false);

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

	useEffect(() => {
		if (loggedIn) {
			const fetchData = async () => {
				try {
					const data = await getNotification();
					setNotificationsData(data);
				} catch (res) {
					if (res === 500) {
						navigate('/server-error');
					}
					console.log(res);
				}
			};
			fetchData();
		}
	}, [navigate, loggedIn]);

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
								notificationsData={notificationsData}
								onExit={handleLogOut}
							/>
							<SideNavbar />
							<Main />
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
								notificationsData={notificationsData}
								onExit={handleLogOut}
							/>
							<SideNavbar />
							<Profile
								handleOpenUploadModal={handleOpenUploadModal}
								handleOpenDeleteModal={handleOpenDeleteModal}
							/>
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
								notificationsData={notificationsData}
								onExit={handleLogOut}
							/>
							<SideNavbar />
							<Teamleader />
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
			{isDeleteModal && <ModalDeleteImage onClose={handleCloseDeleteModal} />}
		</div>
	);
}

export default App;
