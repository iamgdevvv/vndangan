import { useMemo } from 'react';
import xss from 'xss';
import { isObject, isArray } from 'validate.js';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import ImageVN from '@components/ImageVN';
import Agenda from '@components/Agenda';
import styles from '@styles/SiteBanner.module.css';

export default function SiteBanner({
	intro = {},
	agenda = [],
	gallery = [],
	className = '',
}) {

	const confImagesSplide = useMemo(() => {
		return {
			type: 'fade',
			rewind: true,
			drag: true,
			autoplay: true,
			interval: 3000,
			arrows: true,
			pagination: true,
		};
	}, []);

	const confAgendaSplide = useMemo(() => {
		return {
			type: 'fade',
			rewind: true,
			drag: true,
			autoplay: true,
			interval: 3000,
			arrows: false,
			pagination: false,
		};
	}, []);

	return (
		<div
			role='banner'
			className={`${styles.site_banner} ${className}`}>
			{isArray(gallery) ? (
				<Splide
					options={confImagesSplide}
					className={styles.banner_images}>
					{gallery.map((image, index) => (
						<SplideSlide key={`image-${index}`}>
							<ImageVN src={`/images/${image.src}`} alt={image.caption} />
						</SplideSlide>
					))}
				</Splide>
			) : null}
			<div className={styles.banner_content}>
				<h1 dangerouslySetInnerHTML={{ __html: xss(intro?.title) }} />
				<div
					className={styles.banner_content_desc}
					dangerouslySetInnerHTML={{ __html: xss(intro?.description) }}
				/>
			</div>
			{isArray(agenda) ? (
				<Splide
					options={confAgendaSplide}
					className={styles.banner_agenda}>
					{agenda.map((itemAgenda) => (
						<SplideSlide key={itemAgenda.id}>
							<Agenda
								data={itemAgenda}
								intro={intro}
								className={styles.slide_agenda}
							/>
						</SplideSlide>
					))}
				</Splide>
			) : null}
		</div>
	);
}
