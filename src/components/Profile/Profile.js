import './Profile.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PersonalData from './PersonalData/PersonalData';
import WorkExperience from './WorkExperience/WorkExperience';
import TrackRecordDiagram from './TrackRecordDiagram/TrackRecordDiagram';
import TrackRecord from './TrackRecord/TrackRecord';

function Profile({ handleOpenUploadModal, handleOpenDeleteModal }) {
	const [isMenuModal, setIsMenuModal] = useState(false);
	const handleOpenModalMenu = () => setIsMenuModal(true);
	const handleCloseModalMenu = () => setIsMenuModal(false);

	return (
		<main className="main-page">
			<section className="main-page__section">
				<div className="profile">
					<div className="profile__data">
						<PersonalData
							handleOpenUploadModal={handleOpenUploadModal}
							handleOpenModalMenu={handleOpenModalMenu}
							handleCloseModalMenu={handleCloseModalMenu}
							handleOpenDeleteModal={handleOpenDeleteModal}
							isMenuModal={isMenuModal}
						/>
						<div className="profile__sections">
							<WorkExperience />
							<TrackRecordDiagram />
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
