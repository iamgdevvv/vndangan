import ImageVN from '@components/ImageVN';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useMemo } from 'react';
import { isArray, isEmpty } from 'validate.js';
import styles from '@styles/Gallery.module.css';
import { useState } from 'react';
import PopupX from '@components/PopupX';

export default function Gallery({ data }) {
	const [popupGallery, setPopupGallery] = useState(false);

	const confGallerySplide = useMemo(() => {
		return {
			type: 'slide',
			perPage: 1,
			rewind: true,
			drag: true,
			autoplay: true,
			interval: 2000000000000000000,
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
				{data.map((itemGallery, index) => (
					<SplideSlide key={`image-${index}`}>
						<div className={styles.gallery_wedding_item}>
							<ImageVN
								src={`/images/${itemGallery.src}`}
								alt={itemGallery.caption}
								className={styles.image_gallery_wedding}
								onClick={() => setPopupGallery(index)}
							/>
							{itemGallery?.desc ? (
								<div className={styles.desc_gallery_wedding}>
									<div className={styles.desc_inner}>
										{itemGallery.desc}
									</div>
								</div>
							) : null}
							{itemGallery?.caption ? (
								<figcaption aria-hidden='true' onClick={() => setPopupGallery(index)}>
									{itemGallery.caption}
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
					src={`/images/${data[popupGallery]?.src}`}
					alt={data[popupGallery]?.caption}
				/>
				{data[popupGallery]?.caption ? (
					<figcaption>{data[popupGallery]?.caption}</figcaption>
				) : null}
			</PopupX>
		</>
	);
}
