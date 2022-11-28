import CorsMiddleware from '@modules/cors-middleware';

export default async function handler(req, res) {
	await CorsMiddleware(req, res, {
		methods: 'GET',
	});

	res.status(200).json({
		title: 'Grafis Nuresa <br /> Mutia Maighina Evson',
		description: 'Pernikahan adalah ibadah, dan setiap ibadah bermuara pada cinta-Nya sebagai tujuan. Sudah sewajarnya setiap upaya meraih cinta-Nya dilakukan dengan sukacita.',
	});
}
