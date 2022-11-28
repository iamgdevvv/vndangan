import CorsMiddleware from '@modules/cors-middleware';

export default async function handler(req, res) {
	await CorsMiddleware(req, res, {
		methods: 'GET',
	});

	res.status(200).json([
		{
			name: 'Begajul Squad',
			avatar: 'eugenivy-now.jpg',
			type: 'groom',
		},
		{
			name: 'Begajul Squad',
			avatar: 'eugenivy-now.jpg',
			type: 'groom',
		},
		{
			name: 'Begajul Squad',
			avatar: 'eugenivy-now.jpg',
			type: 'groom',
		},
		{
			name: 'Begajul Squad',
			avatar: 'eugenivy-now.jpg',
			type: 'groom',
		},
		{
			name: 'Begajul Squad',
			avatar: 'eugenivy-now.jpg',
			type: 'groom',
		},
		{
			name: 'Begajul Squad',
			avatar: 'eugenivy-now.jpg',
			type: 'bride',
		},
		{
			name: 'Begajul Squad',
			avatar: 'eugenivy-now.jpg',
			type: 'bride',
		},
		{
			name: 'Begajul Squad',
			avatar: 'eugenivy-now.jpg',
			type: 'bride',
		},
		{
			name: 'Begajul Squad',
			avatar: 'eugenivy-now.jpg',
			type: 'bride',
		},
		{
			name: 'Begajul Squad',
			avatar: 'eugenivy-now.jpg',
			type: 'bride',
		},
	]);
}
