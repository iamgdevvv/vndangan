import { useMemo } from 'react';
import Head from 'next/head';
import { useSiteContext } from '@contexts/SiteContext';
import queryRest from '@modules/query-rest';
import SiteNav from '@layouts/SiteNav';
import SiteBanner from '@layouts/SiteBanner';
import WeddingCard from '@layouts/WeddingCard';
import styles from '@styles/Vndangan.module.css';

export default function Home({
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

	return (
		<>
			<Head>
				<title>Grafis Mutia - Wedding Invitation</title>
			</Head>
			<SiteNav navigation={navigation} />
			<main className={`site-main ${styles.site_main_vndangan}`}>
				{!dataSite?.visitorAgent?.isMobile ? (
					<SiteBanner
						intro={intro}
						agenda={agenda}
						gallery={gallery}
						className={styles.site_banner}
					/>
				) : null}
				<WeddingCard
					name={name}
					identity={identity}
					agenda={agenda}
					gallery={gallery}
					loveStories={loveStories}
					brideGroom={brideGroom}
					guessBook={guessBook}
					guide={guide}
					className={styles.site_wedding}
				/>
			</main>
			<style global jsx>{`
				[class*='navbar_vndangan'] + .site-main {
					@apply pb-78px;
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

	const { HOST_URL } = process.env;
	const { name } = query;

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
			url: `${HOST_URL}/api/agenda`,
		});

		responseAgenda = getResAgenda?.response || [];
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
