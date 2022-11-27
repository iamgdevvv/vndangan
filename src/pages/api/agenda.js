import CorsMiddleware from '@modules/cors-middleware';

export default async function agendaApi(req, res) {
	await CorsMiddleware(req, res, {
		methods: 'GET',
	});

	res.status(200).json([
		{
			id: 1,
			title: 'akad nikah',
			dateStart: 1665538334995,
			dateEnd: 1665588334995,
			address: 'Jl. Maredan, Perawang Bar., Kec. Tualang',
			district: 'Siak',
			province: 'Riau',
			isDateRange: true,
		},
		{
			id: 2,
			title: 'resepsi nikah',
			dateStart: 1669538334995,
			dateEnd: 0,
			address: 'Jl. Maredan, Perawang Bar., Kec. Tualang',
			district: 'Siak',
			province: 'Riau',
			maploc: {
				lat: 0.660639,
				long: 101.580859
			},
			isDateRange: false,
		}
	]);
}
