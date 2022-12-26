import ImageVN from '@components/ImageVN';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useMemo } from 'react';
import { isArray, isEmpty } from 'validate.js';
import styles from '@styles/Gallery.module.css';
import xss from 'xss';

export default function GuestBook({ data = [] }) {
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
		<Splide
			options={confGallerySplide}
			className={styles.gallery_wedding}>
			{data.map((guest, index) => (
				<SplideSlide key={`image-${index}`}>
					<div className={styles.gallery_wedding_item}>
						<ImageVN
							src={guest?.src}
							parentClass={styles.image_gallery_wedding}
						/>
						{guest?.desc ? (
							<div className={styles.desc_gallery_wedding}>
								<div
									className={styles.desc_inner}
									dangerouslySetInnerHTML={{
										__html: xss(guest?.desc),
									}}
								/>
							</div>
						) : null}
						{guest?.caption ? (
							<figcaption>{guest?.caption}</figcaption>
						) : null}
					</div>
				</SplideSlide>
			))}
		</Splide>
	);
}
