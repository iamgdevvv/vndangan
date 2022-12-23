import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useSiteContext } from '@contexts/SiteContext';
import queryRest from '@modules/query-rest';
import SiteNav from '@layouts/SiteNav';
import SiteBanner from '@layouts/SiteBanner';
import WeddingCard from '@layouts/WeddingCard';
import styles from '@styles/Vndangan.module.css';
import { useState } from 'react';
import FormInvite from '@components/Vndangan/FormInvite';
import { isEmpty } from 'validate.js';

const SiteAudioDynamic = dynamic(() => import('@layouts/SiteAudio'), {
	ssr: false,
});

const PopupInviteDynamic = dynamic(() => import('@components/PopupX'), {
	ssr: false,
});

export default function Home({
	couple,
	navigation,
	intro,
	agenda,
	identity,
	gallery,
	loveStories,
	brideGroom,
	guessBook,
	guide,
	name,
}) {
	const dataSite = useSiteContext();
	const [nameInvite, setNameInvite] = useState(name);
	const [togglePopupInvite, setTogglePopupInvite] = useState(true);

	return (
		<>
			<Head>
				<title>Grafis Mutia - Wedding Inviteation</title>
			</Head>
			<SiteAudioDynamic />
			<main className={`site-main ${styles.site_main_vndangan}`}>
				{!dataSite?.visitorAgent?.isMobile ? (
					<>
						<SiteNav
							navigation={navigation}
							className={styles.site_navigation}
						/>
						<SiteBanner
							intro={couple}
							agenda={agenda}
							gallery={gallery}
							className={styles.site_banner}
						/>
					</>
				) : null}
				<WeddingCard
					name={nameInvite}
					identity={couple}
					agenda={agenda}
					gallery={gallery}
					loveStories={loveStories}
					// brideGroom={brideGroom}
					guessBook={guessBook}
					guide={guide}
					className={styles.site_wedding}
				/>
			</main>
			<PopupInviteDynamic
				open={togglePopupInvite}
				closeHandler={() => setTogglePopupInvite(false)}
				className='popup-invite'>
				<FormInvite
					title='Nama Tamu'
					defaultName={nameInvite}
					submitName={(getName) => {
						setNameInvite(getName);
						setTogglePopupInvite(false);
					}}
				/>
			</PopupInviteDynamic>

			<style
				global
				jsx>{`
				[class*='navbar_vndangan'] + .site-main {
					@apply <xl:pb-78px;
				}
			`}</style>
		</>
	);
}

export async function getServerSideProps({ req, res, query }) {
	res.setHeader(
		'Cache-Control',
		'public, s-maxage=10, stale-while-revalidate=59'
	);

	const { HOST_URL, CFL_URI, CFL_COUPLE_ID, CFL_TOKEN } = process.env;
	const { name } = query;


	let responseCouple = [];

	try {
		const getResCouple = await queryRest({
			url: `${CFL_URI}/entries/${CFL_COUPLE_ID}?access_token=${CFL_TOKEN}&content_type=couple`,
		});

		responseCouple = getResCouple?.response?.fields || [];
	} catch (error) {
		responseCouple = error;
	}

	let resposeNavigation = [];

	try {
		const getResNavigation = await queryRest({
			url: `${HOST_URL}/api/internal/navigation`,
		});

		resposeNavigation = getResNavigation?.response || [];
	} catch (error) {
		resposeNavigation = error;
	}

	let responseIntro = {};

	try {
		const getResIntro = await queryRest({
			url: `${HOST_URL}/api/intro`,
		});

		responseIntro = getResIntro?.response || {};
	} catch (error) {
		responseIntro = error;
	}

	let responseGallery = {};

	try {
		const getResGallery = await queryRest({
			url: `${HOST_URL}/api/gallery`,
		});

		responseGallery = getResGallery?.response || {};
	} catch (error) {
		responseGallery = error;
	}

	let responseAgenda = [];

	try {
		const getResAgenda = await queryRest({
			url: `${CFL_URI}/entries/?access_token=${CFL_TOKEN}&content_type=agenda`,
		});

		responseAgenda = getResAgenda?.response?.items || [];
	} catch (error) {
		responseAgenda = error;
	}

	let responseIdentify = [];

	try {
		const getResIdentify = await queryRest({
			url: `${HOST_URL}/api/identity`,
		});

		responseIdentify = getResIdentify?.response || [];
	} catch (error) {
		responseIdentify = error;
	}

	let responseLoveStories = [];

	try {
		const getResLoveStories = await queryRest({
			url: `${HOST_URL}/api/love-stories`,
		});

		responseLoveStories = getResLoveStories?.response || [];
	} catch (error) {
		responseLoveStories = error;
	}

	let responseBrideGroom = [];

	try {
		const getResBrideGroom = await queryRest({
			url: `${HOST_URL}/api/bridegroom`,
		});

		responseBrideGroom = getResBrideGroom?.response || [];
	} catch (error) {
		responseBrideGroom = error;
	}

	let responseGuessBook = [];

	try {
		const getResGuessBook = await queryRest({
			url: `${HOST_URL}/api/guess-book`,
		});

		responseGuessBook = getResGuessBook?.response || [];
	} catch (error) {
		responseGuessBook = error;
	}

	let responseGuide = [];

	try {
		const getResGuide = await queryRest({
			url: `${HOST_URL}/api/guide`,
		});

		responseGuide = getResGuide?.response || [];
	} catch (error) {
		responseGuide = error;
	}

	return {
		props: {
			couple: responseCouple,
			navigation: resposeNavigation,
			intro: responseIntro,
			agenda: responseAgenda,
			identity: responseIdentify,
			gallery: responseGallery,
			loveStories: responseLoveStories,
			brideGroom: responseBrideGroom,
			guessBook: responseGuessBook,
			guide: responseGuide,
			name: name || 'Anda & Sekeluarga',
		},
	};
}
