import ImageVN from '@components/ImageVN';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useMemo } from 'react';
import { isArray, isEmpty } from 'validate.js';
import styles from '@styles/Gallery.module.css';
import { useState } from 'react';
import PopupX from '@components/PopupX';
import { useEffect } from 'react';
import { useCallback } from 'react';
import queryRest from '@modules/query-rest';

export default function Gallery({ data = [] }) {
	const [popupGallery, setPopupGallery] = useState(false);

	const confGallerySplide = useMemo(() => {
		return {
			type: 'slide',
			perPage: 1,
			rewind: true,
			drag: false,
			autoplay: true,
			interval: 1600,
			arrows: false,
			pagination: true,
			gap: '10px',
		};
	}, []);

	if (isEmpty(data) || !isArray(data)) {
		return null;
	}

	return (
		<>
			<Splide
				options={confGallerySplide}
				className={styles.gallery_wedding}>
				{data.map((asset, index) => (
					<SplideSlide key={`image-${index}`}>
						<div className={styles.gallery_wedding_item}>
							<ImageVN
								src={`https:${asset?.file?.url}`}
								width={520}
								height={300}
								alt={asset?.title || asset?.description}
								parentClass={styles.image_gallery_wedding}
								onClick={() => setPopupGallery(index)}
							/>
							{asset?.title ? (
								<figcaption
									aria-hidden='true'
									onClick={() => setPopupGallery(index)}>
									{asset?.description}
								</figcaption>
							) : null}
						</div>
					</SplideSlide>
				))}
			</Splide>
			<PopupX
				open={typeof popupGallery === 'number'}
				closeHandler={() => setPopupGallery(false)}
				className='popup-gallery'>
				<ImageVN
					src={`https:${data[popupGallery]?.file?.url}`}
					alt={data[popupGallery]?.description}
				/>
				{data[popupGallery]?.title ? (
					<figcaption>{data[popupGallery]?.title}</figcaption>
				) : null}
			</PopupX>
		</>
	);
}
