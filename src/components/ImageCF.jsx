import { useEffect, useCallback, useState } from 'react';
import { isEmpty } from 'validate.js';

import queryRest from '@modules/query-rest';
import ImageVN from '@components/ImageVN';

export default function ImageCF({ id, width, height, alt, className = '' }) {
	const [thumbnail, setThumbnail] = useState({});

	const fetchThumbnail = useCallback(async () => {
		if (isEmpty(id)) {
			return false;
		}

		try {
			const queryThumbnail = await queryRest({
				url: `/api/contentful/assets/${id}`,
			});

			if (queryThumbnail) {
				setThumbnail(queryThumbnail?.response[0]);
			}
		} catch (error) {
			console.error(error);
		}

		return true;
	}, [id]);

	useEffect(() => {
		fetchThumbnail();
	}, [fetchThumbnail]);

	return (
		<ImageVN
			src={`https:${thumbnail?.file?.url}`}
			height={height || thumbnail?.file?.details?.image?.height}
			width={width || thumbnail?.file?.details?.image?.width}
			alt={alt || thumbnail?.description}
			parentClass={className}
		/>
	);
}
