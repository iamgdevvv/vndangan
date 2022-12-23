import { useMemo } from 'react';
import xss from 'xss';
import { isObject, isArray } from 'validate.js';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import ImageVN from '@components/ImageVN';
import Agenda from '@components/Vndangan/Agenda';
import styles from '@styles/SiteBanner.module.css';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

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

	console.log('intro', intro);

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
							<ImageVN
								src={`/images/${image.src}`}
								alt={image.caption}
							/>
						</SplideSlide>
					))}
				</Splide>
			) : null}
			<div
				dangerouslySetInnerHTML={{
					__html: xss(documentToHtmlString(intro?.introduce)),
				}}
				className={styles.banner_content}
			/>
			{isArray(agenda) ? (
				<Splide
					options={confAgendaSplide}
					className={styles.banner_agenda}>
					{agenda.map((itemAgenda, index) => (
						<SplideSlide key={itemAgenda.sys.id}>
							<Agenda
								data={itemAgenda?.fields}
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
