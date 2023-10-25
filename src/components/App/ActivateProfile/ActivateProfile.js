import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { activateRegister } from '../../../utils/MainApi';

function ActivateProfile() {
	const navigate = useNavigate();
	const { uid, token } = useParams();

	// http://localhost:3000/activate/MTM/bwcmyz-1781c61a7b00f62103bcf44a10c2db7c

	useEffect(() => {
		console.log(uid, token);
		activateRegister(uid, token)
			.then(() => {
				navigate('/signin');
			})
			.catch((res) => {
				if (res === 500) {
					navigate('/server-error');
				} else {
					console.log(res);
				}
			});
	}, [navigate, uid, token]);

	return <div>Активация профиля. Перенаправляем на страницу входа.</div>;
}

export default ActivateProfile;
