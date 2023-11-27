import React, { useState, useEffect } from 'react';
import './Profile.scss';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import PersonalData from './PersonalData/PersonalData';
import { getUsersInfo } from '../../utils/MainApi';
import WorkExperience from './WorkExperience/WorkExperience';
import ProgressDiagram from './ProgressDiagram/ProgressDiagram';
import TrackRecord from './TrackRecord/TrackRecord';

function Profile({ handleOpenUploadModal, handleOpenDeleteModal }) {
	const [isMenuModal, setIsMenuModal] = useState(false);
	const navigate = useNavigate();
	const [personalData, setPersonalData] = useState([]);
	const [contacts, setContacts] = useState([]);
	const [hardSkills, setHardSkills] = useState([]);

	const handleOpenModalMenu = () => setIsMenuModal(true);
	const handleCloseModalMenu = () => setIsMenuModal(false);

	useEffect(() => {
		getUsersInfo()
			.then((data) => {
				setContacts(data.contacts);
				setPersonalData(data);
				setHardSkills(data.hardskills);
			})
			.catch((res) => {
				if (res === 500) {
					navigate('/server-error');
				}
				console.log(res);
			});
	}, [navigate]);

	return (
		<main className="main-page">
			<section className="main-page__section">
				<div className="profile">
					<div className="profile__data">
						<PersonalData
							personalData={personalData}
							contacts={contacts}
							handleOpenUploadModal={handleOpenUploadModal}
							handleOpenModalMenu={handleOpenModalMenu}
							handleCloseModalMenu={handleCloseModalMenu}
							handleOpenDeleteModal={handleOpenDeleteModal}
							isMenuModal={isMenuModal}
						/>
						<div className="profile__sections">
							<ProgressDiagram />
							<WorkExperience hardSkills={hardSkills} />
						</div>
					</div>
					<TrackRecord />
				</div>
			</section>
		</main>
	);
}

Profile.propTypes = {
	handleOpenUploadModal: PropTypes.func.isRequired,
	handleOpenDeleteModal: PropTypes.func.isRequired,
};

export default Profile;
