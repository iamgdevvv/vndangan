import { useMemo } from 'react';
import { isArray, isDefined, isEmpty } from 'validate.js';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import ImageVN from '@components/ImageVN';
import Agenda from '@components/Vndangan/Agenda';
import Identity from '@components/Vndangan/Identity';
import LoveStory from '@components/Vndangan/LoveStory';
import Gallery from '@components/GalleryCF';
import BrideGroom from '@components/Vndangan/BrideGroom';
import { printCurrency } from '@modules/utils';
import FormGuest from '@components/Vndangan/FormGuest';
// import Guide from '@components/Vndangan/Guide';
import GuestBook from '@components/Vndangan/GuestBook';
import styles from '@styles/WeddingCard.module.css';

export default function WeddingCard({
	couple = {},
	agenda = [],
	gallery = [],
	loveStories = [],
	brideGroom = [],
	guestBook = [],
	guide = [],
	name = '',
	className = '',
}) {
	const confWeddingSplide = useMemo(() => {
		return {
			type: 'fade',
			rewind: true,
			drag: true,
			autoplay: false,
			interval: 3000,
			arrows: true,
			pagination: true,
			autoHeight: true,
		};
	}, []);

	const dataGuestBook = useMemo(() => {
		if (isEmpty(guestBook) || !isArray(guestBook)) {
			return [];
		}

		return guestBook.map((guest) => {
			return {
				src: `https://source.unsplash.com/480x320/?romance,wedding&name=${guest?.fields?.name}`,
				caption: (
					<span className={styles.caption_guest_book}>
						{guest?.fields?.name}
						{!isEmpty(guest?.fields?.donateProvider) &&
						guest?.fields?.donateProvider !== 'none' ? (
							<span className={styles.donate_guest_book}>
								<ImageVN
									src={`/images/icon-donate-${guest?.fields?.donateProvider}.svg`}
									width={60}
									height={60}
									parentClass={styles.icon_donate}
								/>
								{printCurrency(guest?.fields?.donateNominal)}
							</span>
						) : null}
					</span>
				),
				desc: documentToHtmlString(guest?.fields?.message),
			};
		});
	}, [guestBook]);

	return (
		<div
			id='wedding-card'
			className={`${styles.wedding_card_wrapper} ${className}`}>
			<Splide
				hasTrack={false}
				options={confWeddingSplide}
				className={styles.wedding_cards}
				onActive={(e) => {
					if (isDefined(document)) {
						if (document.getElementById('navbar-vndangan')) {
							document
								.querySelector(
									'#navbar-vndangan .nav_item_active'
								)
								.classList.remove('nav_item_active');
							document
								.querySelector(
									`#navbar-vndangan .nav_item:nth-child(${
										e.index + 1
									})`
								)
								.classList.add('nav_item_active');
						}
					}
				}}>
				<SplideTrack>
					{!isEmpty(couple) ? (
						<SplideSlide>
							<div className={styles.item_wedding_card}>
								<h2 className={styles.title_wedding_card}>
									{couple?.titleIdentity}
								</h2>
								<Identity
									data={couple}
									name={name}
								/>
							</div>
						</SplideSlide>
					) : null}
					{!isEmpty(agenda) && isArray(agenda) ? (
						<SplideSlide>
							<div className={styles.item_wedding_card}>
								<h2 className={styles.title_wedding_card}>
									{couple?.titleAgenda}
								</h2>
								{agenda.map((itemAgenda) => (
									<Agenda
										data={itemAgenda?.fields}
										couple={couple}
										key={itemAgenda.sys.id}
									/>
								))}
							</div>
						</SplideSlide>
					) : null}
					{!isEmpty(gallery) || !isEmpty(loveStories) ? (
						<SplideSlide>
							<div className={styles.item_wedding_card}>
								<h2 className={styles.title_wedding_card}>
									{couple?.titleStoryGallery}
								</h2>
								<Gallery data={gallery} />
								<LoveStory
									data={loveStories}
									title={couple?.titleStory}
								/>
							</div>
						</SplideSlide>
					) : null}
					{!isEmpty(brideGroom) && isArray(brideGroom) ? (
						<SplideSlide>
							<div className={styles.item_wedding_card}>
								<h2 className={styles.title_wedding_card}>
									{couple?.titleBrideGroom}
								</h2>
								<BrideGroom data={brideGroom} />
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
					{!isEmpty(dataGuestBook) ? (
						<SplideSlide>
							<div className={styles.item_wedding_card}>
								<h2 className={styles.title_wedding_card}>
									{couple?.titleGuestBook}
								</h2>
								<GuestBook data={dataGuestBook} />
								<FormGuest title={couple?.titleFormGuest} />
							</div>
						</SplideSlide>
					) : null}
					{/* {!isEmpty(guide) ? (
						<SplideSlide>
							<div className={styles.item_wedding_card}>
								<h2 className={styles.title_wedding_card}>
									{couple?.titleGuide}
								</h2>
								<Guide data={guide} />
							</div>
						</SplideSlide>
					) : null} */}
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
		</div>
	);
}
