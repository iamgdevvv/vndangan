import { useMemo, useState, useCallback } from 'react';
import { isObject, isArray, isEmpty } from 'validate.js';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { printDate } from '@modules/utils';
import ImageVN from '@components/ImageVN';
import Agenda from '@components/Agenda';
import styles from '@styles/WeddingCard.module.css';
import FormGuest from '@components/FormGuest';

export default function WeddingCard({
	identity = {},
	agenda = [],
	gallery = [],
	loveStories = [],
	brideGroom = [],
	name = '',
	className = '',
}) {
	const [popupGallery, setPopupGallery] = useState(false);

	const closePopupGallery = useCallback(() => {
		setPopupGallery(false);
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
			autoHeight: true,
		};
	}, []);

	const confGallerySplide = useMemo(() => {
		return {
			type: 'slide',
			perPage: 1,
			rewind: true,
			drag: true,
			autoplay: true,
			interval: 2000,
			arrows: false,
			pagination: true,
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
					{!isEmpty(identity) && isObject(identity) ? (
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
					{!isEmpty(agenda) && isArray(agenda) ? (
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
					{!isEmpty(gallery) &&
					isArray(gallery) &&
					!isEmpty(loveStories) &&
					isArray(loveStories) ? (
						<SplideSlide>
							<div className={styles.item_wedding_card}>
								<h2 className={styles.title_wedding_card}>
									Gallery & Cerita
								</h2>
								<Splide
									options={confGallerySplide}
									className={styles.gallery_wedding}>
									{gallery.map((itemGallery, index) => (
										<SplideSlide key={`image-${index}`}>
											<ImageVN
												src={`/images/${itemGallery.src}`}
												alt={itemGallery.caption}
												className={
													styles.image_gallery_wedding
												}
												onClick={() => {
													console.log('index', index);
													setPopupGallery(index);
												}}
											/>
											<figcaption>
												{itemGallery.caption}
											</figcaption>
										</SplideSlide>
									))}
								</Splide>
								<h3 className={styles.title_love_stories}>
									Cerita Kisah Cinta
								</h3>
								<ul className={styles.love_stories}>
									{loveStories.map((item, index) => (
										<li key={`item-${index}`}>
											<ImageVN
												src={`/images/${item.image}`}
												parentClass={
													styles.thumb_love_story
												}
											/>
											<div
												className={
													styles.desc_love_story
												}>
												<span
													className={
														styles.date_love_story
													}>
													{printDate(item.dateStory)}
												</span>
												{item.desc}
											</div>
										</li>
									))}
								</ul>
							</div>
						</SplideSlide>
					) : null}
					{!isEmpty(brideGroom) && isArray(brideGroom) ? (
						<SplideSlide>
							<div className={styles.item_wedding_card}>
								<h2 className={styles.title_wedding_card}>
									Pengiring Mempelai
								</h2>
								<div className={styles.bridegroom_wrapper}>
									<div className={styles.item_bridegroom}>
										<h3 className={styles.title_bridegroom}>
											groomsman
										</h3>
										<ul className={styles.lists_bridegroom}>
											{brideGroom
												.filter(
													(item) =>
														item.type === 'groom'
												)
												.map((item, index) => (
													<li key={`item-${index}`}>
														<ImageVN
															src={`/images/${item.avatar}`}
															parentClass={
																styles.thumb_bridegroom
															}
														/>
														<span
															className={
																styles.name_bridegroom
															}>
															{item.name}
														</span>
													</li>
												))}
										</ul>
									</div>
									<div className={styles.item_bridegroom}>
										<h3 className={styles.title_bridegroom}>
											bridesmaid
										</h3>
										<ul className={styles.lists_bridegroom}>
											{brideGroom
												.filter(
													(item) =>
														item.type === 'bride'
												)
												.map((item, index) => (
													<li key={`item-${index}`}>
														<ImageVN
															src={`/images/${item.avatar}`}
															parentClass={
																styles.thumb_bridegroom
															}
														/>
														<span
															className={
																styles.name_bridegroom
															}>
															{item.name}
														</span>
													</li>
												))}
										</ul>
									</div>
								</div>
								<ImageVN
									src='/images/asdrubal-luna.jpg'
									parentClass={`${styles.background_bridgegroom} ${styles.background_bridgegroom__left}`}
								/>
								<ImageVN
									src='/images/asdrubal-luna.jpg'
									parentClass={`${styles.background_bridgegroom} ${styles.background_bridgegroom__right}`}
								/>
							</div>
						</SplideSlide>
					) : null}
					<SplideSlide>
						<div className={styles.item_wedding_card}>
							<h2 className={styles.title_wedding_card}>
								Buku Tamu & Tanda Kasih
							</h2>
							{/* <FormGuest /> */}
						</div>
					</SplideSlide>
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
				open={typeof popupGallery === 'number'}
				closeOnDocumentClick
				onClose={closePopupGallery}
				className='popup-wedding-gallery'>
				<ImageVN
					src={`/images/${gallery[popupGallery]?.src}`}
					alt={gallery[popupGallery]?.caption}
				/>
				<figcaption>{gallery[popupGallery]?.caption}</figcaption>
			</Popup>
		</div>
	);
}
