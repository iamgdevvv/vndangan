import CorsMiddleware from '@modules/cors-middleware';

export default async function identityApi(req, res) {
	await CorsMiddleware(req, res, {
		methods: 'GET',
	});

	res.status(200).json({
		groomsName: 'Grafis Nuresa',
        groomsFatherName: 'Herry Herriawan A.Md.',
        groomsMotherName: 'Aida Fitri',
        bridesName: 'Mutia Maighina Evson',
        bridesFatherName: 'Mardisony',
        bridesMotherName: 'Eva Yalaraf',
	    photoIdentity: 'olivia-bauso.jpg',
	});
}
