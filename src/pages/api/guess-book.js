import CorsMiddleware from '@modules/cors-middleware';

export default async function handler(req, res) {
	await CorsMiddleware(req, res, {
		methods: 'GET',
	});

	res.status(200).json([
		{
			name: 'Begajul Squad',
			donateNominal: '500000',
			donateProvider: 'bca',
			desc: 'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.',
			image: 'eugenivy-now.jpg',
		},
		{
			name: 'Begajul Grils',
			donateNominal: '100000',
			donateProvider: 'bri',
			desc: 'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.',
			image: 'olivia-bauso.jpg',
		},
		{
			name: 'Begajul',
			donateNominal: '',
			donateProvider: 'bca',
			desc: 'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.',
			image: 'asdrubal-luna.jpg',
		},
	]);
}
