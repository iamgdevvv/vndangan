import Cors from 'cors';

export default function CorsMiddleware(req, res, rules = {}) {
	const whitelist = ['http://localhost:3000', 'https://grafismutia.my.id'];
	const corsOptions = {
		origin: function (origin, callback) {
			if (whitelist.indexOf(origin) !== -1) {
				callback(null, true);
			} else {
				callback('Not allowed by CORS');
			}
		},
		...rules,
	};

	return new Promise((resolve, reject) => {
		Cors(corsOptions)(req, res, (result) => {
			if (result instanceof Error) {
				return reject(result);
			}
			return resolve(result);
		});
	});
}
