import { useMemo } from 'react';
import xss from 'xss';
import { isArray, isEmpty } from 'validate.js';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import '@splidejs/react-splide/css';

import ImageVN from '@components/ImageVN';
import Agenda from '@components/Vndangan/Agenda';
import styles from '@styles/SiteBanner.module.css';

export default function SiteBanner({
	couple = {},
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
			{!isEmpty(gallery) && isArray(gallery) ? (
				<Splide
					options={confImagesSplide}
					className={styles.banner_images}>
					{gallery.map((asset, index) => (
						<SplideSlide key={`image-${index}`}>
							<ImageVN
								src={`https:${asset?.file?.url}`}
								width={asset?.file?.details?.image?.width}
								height={asset?.file?.details?.image?.height}
								alt={asset?.description}
							/>
						</SplideSlide>
					))}
				</Splide>
			) : null}
			<div
				dangerouslySetInnerHTML={{
					__html: xss(documentToHtmlString(couple?.introduce)),
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
								couple={couple}
								className={styles.slide_agenda}
							/>
						</SplideSlide>
					))}
				</Splide>
			) : null}
		</div>
	);
}
