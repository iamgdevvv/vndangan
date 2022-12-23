import { useMemo } from 'react';
import { isArray, isDefined, isEmpty } from 'validate.js';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import ImageVN from '@components/ImageVN';
import Agenda from '@components/Vndangan/Agenda';
import Identity from '@components/Vndangan/Identity';
import LoveStory from '@components/Vndangan/LoveStory';
import Gallery from '@components/Vndangan/Gallery';
import BrideGroom from '@components/Vndangan/BrideGroom';
import styles from '@styles/WeddingCard.module.css';
import { printCurrency } from '@modules/utils';
import FormGuest from '@components/Vndangan/FormGuest';
import Guide from '@components/Vndangan/Guide';

export default function WeddingCard({
	identity = {},
	agenda = [],
	gallery = [],
	loveStories = [],
	brideGroom = [],
	guessBook = [],
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

	const dataGuessBook = useMemo(() => {
		const data = [];

		guessBook.map((guess) => {
			data.push({
				src: guess.image,
				caption: (
					<span className={styles.caption_guess_book}>
						{guess.name}
						{guess?.donateProvider !== 'none' &&
						!isEmpty(guess?.donateNominal) ? (
							<span className={styles.donate_guess_book}>
								<ImageVN
									parentClass={styles.icon_donate}
									src={`/images/icon-donate-${guess?.donateProvider}.svg`}
								/>
								{printCurrency(guess?.donateNominal)}
							</span>
						) : null}
					</span>
				),
				desc: guess.desc,
			});
		});

		return data;
	}, [guessBook]);

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
					{!isEmpty(identity) ? (
						<SplideSlide className='identity'>
							<div className={styles.item_wedding_card}>
								<h2 className={styles.title_wedding_card}>
									Undangan Pernikahan
								</h2>
								<Identity
									data={identity}
									name={name}
								/>
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
										data={itemAgenda?.fields}
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
									Gallery & Cerita
								</h2>
								<Gallery data={gallery} />
								<LoveStory
									data={loveStories}
									title='Cerita Kisah Cinta'
								/>
							</div>
						</SplideSlide>
					) : null}
					{!isEmpty(brideGroom) && isArray(brideGroom) ? (
						<SplideSlide>
							<div className={styles.item_wedding_card}>
								<h2 className={styles.title_wedding_card}>
									Pengiring Mempelai
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
					{!isEmpty(dataGuessBook) ? (
						<SplideSlide>
							<div className={styles.item_wedding_card}>
								<h2 className={styles.title_wedding_card}>
									Buku Tamu & Tanda Kasih
								</h2>
								<Gallery data={dataGuessBook} />
								<FormGuest title='Pesan Tanda Kasih' />
							</div>
						</SplideSlide>
					) : null}
					{!isEmpty(guide) ? (
						<SplideSlide>
							<div className={styles.item_wedding_card}>
								<h2 className={styles.title_wedding_card}>
									Panduan & Protokol
								</h2>
								<Guide
									data={guide}
									title='Panduan & Protokol'
								/>
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
		</div>
	);
}
