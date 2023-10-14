import './DevelopingPage.scss';
import React from 'react';
import DevelopingIcon from '../../../images/developing-icon.svg';

function DevelopingPage() {
	return (
		<section className="developing">
			<div className="developing__container">
				<img src={DevelopingIcon} className="developing__image" alt="logo" />
				<h1 className="developing__title">Страница в разработке</h1>
				<h2 className="developing__subtitle">
					Сейчас мы занимаемся разработкой и наполнением сайта. Приносим
					извинения за неудобства.
				</h2>
			</div>
		</section>
	);
}

export default DevelopingPage;
