import queryRest from '@modules/query-rest';
import { isEmpty } from 'validate.js';

export default async function handler(req, res) {
	// res.setHeader('Cache-Control', 's-maxage=3600');

	const getAssetIds = req?.query?.ids ?? '';

	if (isEmpty(getAssetIds)) {
		return res.status(400);
	}

	const { CFL_URI, CFL_TOKEN } = process.env;

	const assetIds = getAssetIds.split(',');

	const contentfulAssets = [];

	try {
		assetIds.map(async (assetId) => {
			if (!isEmpty(assetId)) {
				const queryAsset = await queryRest({
					url: `${CFL_URI}/assets/${assetId}?access_token=${CFL_TOKEN}`,
				});

				contentfulAssets.push(queryAsset?.response?.fields);
			}
		});
	} catch (err) {
		res.status(500).json({ ...err });
	}

	res.status(200).json(contentfulAssets);
}
