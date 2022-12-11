import CorsMiddleware from '@modules/cors-middleware';

export default async function handler(req, res) {
	await CorsMiddleware(req, res, {
		methods: 'GET',
	});

	res.status(200).json([
		'Fill my heart with song and let me sing forevermore. You are all I long for all I worship and adore. In other words, I love you.',
		'Fill my heart with song and let me sing forevermore. You are all I long for all I worship and adore. In other words, I love you.',
		'Fill my heart with song and let me sing forevermore. You are all I long for all I worship and adore. In other words, I love you.',
		'Fill my heart with song and let me sing forevermore. You are all I long for all I worship and adore. In other words, I love you.',
		'Fill my heart with song and let me sing forevermore. You are all I long for all I worship and adore. In other words, I love you.',
	]);
}
