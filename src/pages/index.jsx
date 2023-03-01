import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { isArray, isEmpty, isString } from 'validate.js';

import { useSiteContext } from '@contexts/SiteContext';
import queryRest from '@modules/query-rest';
import dataNavigation from '@data/navigation.json';
import SiteNav from '@layouts/SiteNav';
import SiteBanner from '@layouts/SiteBanner';
import WeddingCard from '@layouts/WeddingCard';
import FormInvite from '@components/Vndangan/FormInvite';
import styles from '@styles/Vndangan.module.css';

const SiteAudioDynamic = dynamic(() => import('@layouts/SiteAudio'), {
	ssr: false,
});

const PopupInviteDynamic = dynamic(() => import('@components/PopupX'), {
	ssr: false,
});

export default function Home({
	couple,
	agenda,
	gallery,
	loveStories,
	brideGroom,
	guestBook,
	guide,
	name,
}) {
	const dataSite = useSiteContext();
	const [nameInvite, setNameInvite] = useState(name);
	const [togglePopupInvite, setTogglePopupInvite] = useState(true);

	const [avatarIdentity, setAvatarIdentity] = useState({});

	const fetchAvatarIdentity = useCallback(async () => {
		try {
			const queryAvatarAsset = await queryRest({
				url: `/api/contentful/assets/${couple.thumbnail.sys.id}`,
			});

			if (
				queryAvatarAsset &&
				!isEmpty(queryAvatarAsset?.response) &&
				isArray(queryAvatarAsset?.response)
			) {
				setAvatarIdentity(queryAvatarAsset?.response[0]);
			}
		} catch (error) {
			console.log(error);
		}
	}, [couple]);

	useEffect(() => {
		fetchAvatarIdentity();
	}, [fetchAvatarIdentity]);

	return (
		<>
			<Head>
				<title>{`${couple.identifier} - Undangan Pernikahan`}</title>
				<meta
					name='title'
					content={`${couple.identifier} - Undangan Pernikahan`}
				/>
				<meta
					name='description'
					content={`Undangan Pernikahan Grafis Nuresa (Putra dari Bapak ${couple.groomFatherName} dan Ibu ${couple.groomMotherName}) dan Mutia Maighina Evson (Putri dari Bapak ${couple.brideFatherName} dan Ibu ${couple.brideMotherName})`}
				/>

				<meta
					property='og:type'
					content='website'
				/>
				<meta
					property='og:url'
					content={process.env.HOST_URL}
				/>
				<meta
					property='og:title'
					content={`${couple.identifier} - Undangan Pernikahan`}
				/>
				<meta
					property='og:description'
					content={`Undangan Pernikahan Grafis Nuresa (Putra dari Bapak ${couple.groomFatherName} dan Ibu ${couple.groomMotherName}) dan Mutia Maighina Evson (Putri dari Bapak ${couple.brideFatherName} dan Ibu ${couple.brideMotherName})`}
				/>
				<meta
					property='og:image'
					content={avatarIdentity?.file?.url || '/images/thumbnail-branding.jpg'}
				/>

				<meta
					property='twitter:card'
					content='summary_large_image'
				/>
				<meta
					property='twitter:url'
					content={process.env.HOST_URL}
				/>
				<meta
					property='twitter:title'
					content={`${couple.identifier} - Undangan Pernikahan`}
				/>
				<meta
					property='twitter:description'
					content={`Undangan Pernikahan Grafis Nuresa (Putra dari Bapak ${couple.groomFatherName} dan Ibu ${couple.groomMotherName}) dan Mutia Maighina Evson (Putri dari Bapak ${couple.brideFatherName} dan Ibu ${couple.brideMotherName})`}
				/>
				<meta
					property='twitter:image'
					content={avatarIdentity?.file?.url || '/images/thumbnail-branding.jpg'}
				/>
			</Head>
			<SiteAudioDynamic />
			<main className={`site-main ${styles.site_main_vndangan}`}>
				{!dataSite?.visitorAgent?.isMobile ? (
					<>
						<SiteNav navigation={dataNavigation} className={styles.site_navigation} />
						<SiteBanner
							couple={couple}
							agenda={agenda}
							gallery={gallery}
							className={styles.site_banner}
						/>
					</>
				) : null}
				<WeddingCard
					name={nameInvite}
					couple={couple}
					agenda={agenda}
					gallery={gallery}
					loveStories={loveStories}
					brideGroom={brideGroom}
					guestBook={guestBook}
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

export async function getServerSideProps({ res, query }) {
	res.setHeader(
		'Cache-Control',
		'public, s-maxage=3600, stale-while-revalidate=59'
	);

	const { CFL_URI, CFL_COUPLE_ID, CFL_TOKEN } = process.env;
	const { name } = query;

	const getName = (name || '').replace(/-./g, ' ');

	let responseCouple = [];

	try {
		const queryCouple = await queryRest({
			url: `${CFL_URI}/entries/${CFL_COUPLE_ID}?access_token=${CFL_TOKEN}&content_type=couple`,
		});

		responseCouple = queryCouple?.response?.fields || [];
	} catch (error) {
		responseCouple = error;
	}

	let responseGallery = {};

	try {
		const getGalleryAsset = [];

		if (
			!isEmpty(responseCouple?.gallery) &&
			isArray(responseCouple.gallery)
		) {
			responseCouple.gallery.map(async (itemGallery) => {
				if (!isEmpty(itemGallery?.sys?.id)) {
					const queryGalleryAsset = await queryRest({
						url: `${CFL_URI}/assets/${itemGallery.sys.id}?access_token=${CFL_TOKEN}`,
					});

					getGalleryAsset.push(queryGalleryAsset?.response?.fields);
				}
			});
		}

		responseGallery = getGalleryAsset || {};
	} catch (error) {
		responseGallery = error;
	}

	let responseAgenda = [];

	try {
		const agedaIds =
			responseCouple?.agenda?.map((agenda) => agenda.sys.id) || [];

		const queryAgenda = await queryRest({
			url: `${CFL_URI}/entries/?access_token=${CFL_TOKEN}&content_type=agenda&sys.id[in]=${agedaIds.join(
				','
			)}`,
		});

		responseAgenda = queryAgenda?.response?.items || [];
	} catch (error) {
		responseAgenda = error;
	}

	let responseLoveStories = [];

	try {
		const storyIds =
			responseCouple?.story?.map((story) => story.sys.id) || [];

		const queryStories = await queryRest({
			url: `${CFL_URI}/entries/?access_token=${CFL_TOKEN}&content_type=story&sys.id[in]=${storyIds.join(
				','
			)}`,
		});

		responseLoveStories = queryStories?.response?.items || [];
	} catch (error) {
		responseLoveStories = error;
	}

	let responseBrideGroom = [];

	try {
		const bridegroomIds =
			responseCouple?.bridegroom?.map(
				(bridegroom) => bridegroom.sys.id
			) || [];

		const queryBrideGroom = await queryRest({
			url: `${CFL_URI}/entries/?access_token=${CFL_TOKEN}&content_type=bridegroom&sys.id[in]=${bridegroomIds.join(
				','
			)}`,
		});

		responseBrideGroom = queryBrideGroom?.response?.items || [];
	} catch (error) {
		responseBrideGroom = error;
	}

	let responseGuestBook = [];

	try {
		const queryGuestBook = await queryRest({
			url: `${CFL_URI}/entries/?access_token=${CFL_TOKEN}&content_type=guestBook`,
		});

		responseGuestBook = queryGuestBook?.response?.items || [];
	} catch (error) {
		responseGuestBook = error;
	}

	let responseGuide = [];

	try {
		const guideId = responseCouple?.guide?.sys?.id;

		const queryGuide = await queryRest({
			url: `${CFL_URI}/entries/${guideId}?access_token=${CFL_TOKEN}`,
		});

		responseGuide = queryGuide?.response || {};
	} catch (error) {
		responseGuide = error;
	}

	return {
		props: {
			couple: responseCouple,
			agenda: responseAgenda,
			gallery: responseGallery,
			loveStories: responseLoveStories,
			brideGroom: responseBrideGroom,
			guestBook: responseGuestBook,
			guide: responseGuide,
			name: getName || 'Anda & Sekeluarga',
		},
	};
}
