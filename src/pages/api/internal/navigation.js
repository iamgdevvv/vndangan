import CorsMiddleware from '@modules/cors-middleware';

export default async function handler(req, res) {
	await CorsMiddleware(req, res, {
		methods: 'GET',
	});

	res.status(200).json([
		{
			id: 1,
			icon: 'BiHomeHeart',
			title: 'Undangan Pernikahan',
			slug: 'undangan-pernikahan',
			default: true,
		},
		{
			id: 2,
			icon: 'BiStoreAlt',
			title: 'Rentetan Acara Pernikahan',
			slug: 'rentetan-acara-pernikahan',
			default: false,
		},
		{
			id: 3,
			icon: 'BiMessageAltDots',
			title: 'Gallery & Cerita',
			slug: 'gallery-cerita',
			default: false,
		},
		{
			id: 4,
			icon: 'BiShapePolygon',
			title: 'Pengiring Mempelai',
			slug: 'pengiring-mempelai',
			default: false,
		},
		{
			id: 5,
			icon: 'BiBookReader',
			title: 'Buku Tamu & Tanda Kasih',
			slug: 'buku-tamu-tanda-kasih',
			default: false,
		},
		{
			id: 6,
			icon: 'BiHelpCircle',
			title: 'Panduan & Protokol',
			slug: 'panduan-protokol',
			default: false,
		},
	]);
}
