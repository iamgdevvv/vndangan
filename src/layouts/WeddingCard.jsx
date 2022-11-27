import { useMemo, useState, useCallback } from 'react';
import { isObject, isArray } from 'validate.js';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ImageVN from '@components/ImageVN';
import Agenda from '@components/Agenda';
import styles from '@styles/WeddingCard.module.css';

export default function WeddingCard({
	identity = {},
	agenda = [],
	gallery = [],
	name = '',
	className = '',
}) {
	const [popupGallery, setPopupGallery] = useState(0);

	const closePopupGallery = useCallback(() => {
		setPopupGallery(0);
	}, [popupGallery]);

	const confWeddingSplide = useMemo(() => {
		return {
			type: 'fade',
			rewind: true,
			drag: false,
			autoplay: false,
			interval: 3000,
			arrows: true,
			pagination: false,
		};
	}, []);

	const confGallerySplide = useMemo(() => {
		return {
			type: 'loop',
			perPage: 1.2,
			perMove: 1,
			rewind: false,
			drag: true,
			autoplay: true,
			interval: 2000,
			arrows: false,
			pagination: false,
			gap: '10px',
		};
	}, []);

	return (
		<div className={`${styles.wedding_card_wrapper} ${className}`}>
			<Splide
				hasTrack={false}
				options={confWeddingSplide}
				className={styles.wedding_cards}>
				<SplideTrack>
					{isObject(identity) ? (
						<SplideSlide>
							<div className={styles.item_wedding_card}>
								<h2 className={styles.title_wedding_card}>
									Undangan Pernikahan
								</h2>
								<ImageVN
									src={`/images/${identity.photoIdentity}`}
									parentClass={styles.photo_wedding_identity}
								/>
								<div className={styles.brides_wedding_identity}>
									<span
										className={
											styles.brides_identity_sublabel
										}>
										Mempelai Pria
									</span>
									<span
										className={styles.brides_identity_name}>
										{identity.groomsName}
									</span>
									<span
										className={
											styles.brides_identity_parents
										}>
										Putra dari Bapak{' '}
										{identity.groomsFatherName} dan Ibu{' '}
										{identity.groomsMotherName}.
									</span>
								</div>
								<div className={styles.brides_wedding_identity}>
									<span
										className={
											styles.brides_identity_sublabel
										}>
										Mempelai Pria
									</span>
									<span
										className={styles.brides_identity_name}>
										{identity.bridesName}
									</span>
									<span
										className={
											styles.brides_identity_parents
										}>
										Putra dari Bapak{' '}
										{identity.bridesFatherName} dan Ibu{' '}
										{identity.bridesMotherName}.
									</span>
								</div>
								<div
									className={
										styles.brides_wedding_invitation
									}>
									<span
										className={
											styles.brides_invitation_sublabel
										}>
										Dengan bahagia mengundang,
									</span>
									<span
										className={
											styles.brides_invitation_name
										}>
										{name}
									</span>
									<span
										className={
											styles.brides_invitation_info
										}>
										<span
											className={
												styles.brides_invitation_info_mark
											}>
											*
										</span>
										Mohon maaf bila ada kesalahan penulisan
										nama dan gelar
									</span>
								</div>
							</div>
						</SplideSlide>
					) : null}
					{isArray(agenda) ? (
						<SplideSlide>
							<div className={styles.item_wedding_card}>
								<h2 className={styles.title_wedding_card}>
									Rentetan Acara Pernikahan
								</h2>
								{agenda.map((itemAgenda) => (
									<Agenda
										data={itemAgenda}
										key={itemAgenda.id}
									/>
								))}
							</div>
						</SplideSlide>
					) : null}
					{isArray(gallery) ? (
						<SplideSlide>
							<div className={styles.item_wedding_card}>
								<h2 className={styles.title_wedding_card}>
									Gallery & Cerita
								</h2>
								<Splide
									options={confGallerySplide}
									className={styles.gallery_wedding}>
									{gallery.map((itemGallery, index) => (
										<SplideSlide
											key={`image-${index}`}
											onClick={() =>
												setPopupGallery(index + 1)
											}>
											<ImageVN
												src={`/images/${itemGallery.src}`}
												alt={itemGallery.caption}
												className={
													styles.image_gallery_wedding
												}
											/>
											<figcaption>
												{itemGallery.caption}
											</figcaption>
										</SplideSlide>
									))}
								</Splide>
							</div>
						</SplideSlide>
					) : null}
				</SplideTrack>
				<div className='splide__arrows'>
					<button
						type='button'
						className='splide__arrow splide__arrow--prev'>
						<BiLeftArrowAlt />
					</button>
					<button
						type='button'
						className='splide__arrow splide__arrow--next'>
						<BiRightArrowAlt />
					</button>
				</div>
			</Splide>
			<Popup
				open={!!popupGallery}
				closeOnDocumentClick
				onClose={closePopupGallery}>
				<ImageVN
					src={`/images/${gallery[popupGallery - 1]?.src}`}
					alt={gallery[popupGallery - 1]?.caption}
				/>
				<figcaption>{gallery[popupGallery - 1]?.caption}</figcaption>
			</Popup>
		</div>
	);
}
