import hands from '../images/profile/image 26.jpg';
import darts from '../images/profile/Image.jpg';
import rocket from '../images/profile/image 32.svg';
import list from '../images/profile/image 31.jpg';
import hat from '../images/profile/image 25.jpg';
import arrow from '../images/profile/image 30.jpg';

export const trackRecordsList = [
	{
		id: 101,
		image: hat,
		title: 'Мастер своего дела',
		discription: 'Получить уровень Middle',
		percent: 100,
	},
	{
		id: 102,
		image: arrow,
		title: 'Git Гуру',
		discription: 'Сделать 100 коммитов',
		percent: 68,
	},
	{
		id: 103,
		image: darts,
		title: 'Прямо в цель',
		discription: 'Запустить 5 проектов',
		percent: 20,
	},

	{
		id: 104,
		image: rocket,
		title: 'Просто космос',
		discription: 'Получить новый Hard Skill',
		percent: 100,
	},
	{
		id: 106,
		image: list,
		title: 'Как Лев Толстой',
		discription: 'Написать 2 статьи для сайта',
		percent: 50,
	},
	{
		id: 107,
		image: hands,
		title: 'Социальная сеть',
		discription: 'Найти 5 новых друзей в сфере',
		percent: 0,
	},
];

export const tasksList = [
	{
		id: 101,
		status: 'created',
		reward_points: 10,
		title: 'Составить контент план',
		description: 'Описание в разработке',
		created_at: '2023-09-23T12:26:38.755Z',
		deadline: '2023-09-29T12:26:38.755Z',
		assigned_to: 0,
		department: 'Маркетинг',
	},
	{
		id: 102,
		status: 'sent_for_review',
		reward_points: 5,
		title: 'Разработать программу обучения для новых сотрудников',
		description: 'Описание в разработке',
		created_at: '2023-09-23T12:26:38.755Z',
		deadline: '2023-09-29T12:26:38.755Z',
		assigned_to: 0,
		department: 'Бэкенд',
	},
	{
		id: 103,
		status: 'approve',
		reward_points: 15,
		title: 'Добавить карусель изображений на главную страницу',
		description: 'string',
		created_at: '2023-09-23T12:26:38.755Z',
		deadline: '2023-09-25T12:26:38.755Z',
		assigned_to: 0,
		department: 'Фронтенд',
	},
	{
		id: 105,
		status: 'rejected',
		reward_points: 20,
		title: 'Созвониться  с разработчиком',
		description: 'Нужно позвонить Иванову Ивану и согласовать проект',
		created_at: '2023-09-22T12:26:38.755Z',
		deadline: '2023-09-30T12:26:38.755Z',
		assigned_to: 0,
		department: 'UX/UI дизайн',
	},

	{
		id: 106,
		status: 'is_overdue',
		reward_points: 10,
		title: 'Встретиться с клиентом',
		description:
			'Необходимо обсудить заказ. При себе иметь примеры работ. Встреча будет происходить по адресу: ул. Садовя, д.25',
		created_at: '2023-09-22T12:26:38.755Z',
		deadline: '2023-09-22T12:26:38.755Z',
		assigned_to: 0,
		department: 'UX/UI дизайн',
	},
];
