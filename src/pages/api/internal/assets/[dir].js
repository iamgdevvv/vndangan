import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
	const dirRelativeToPublicFolder = req?.query?.dir ?? '';

	try {
		const dir = path.resolve('./public', dirRelativeToPublicFolder);

		const fileAssets = fs
			.readdirSync(dir)
			.filter((file) => file.includes('.'));

		res.statusCode = 200;
		res.json(fileAssets);
	} catch (err) {
		res.statusCode = 404;
		res.json(err);
	}
}
