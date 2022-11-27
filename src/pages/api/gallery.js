import CorsMiddleware from '@modules/cors-middleware';

export default async function galleryApi(req, res) {
	await CorsMiddleware(req, res, {
		methods: 'GET',
	});

	res.status(200).json([
		{
			src: 'asdrubal-luna.jpg',
			caption:
				'I can feel how much you love me and it just blows me asdrubal',
		},
		{
			src: 'eugenivy-now.jpg',
			caption:
				'I can feel how much you love me and it just blows me eugenivy',
		},
		{
			src: 'luwadlin-bosman.jpg',
			caption:
				'I can feel how much you love me and it just blows me luwadlin',
		},
		{
			src: 'olivia-bauso.jpg',
			caption:
				'I can feel how much you love me and it just blows me olivia',
		},
		{
			src: 'victoria-priessnitz.jpg',
			caption:
				'I can feel how much you love me and it just blows me victoria',
		},
	]);
}
