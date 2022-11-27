import { useMemo } from 'react';
import App from 'next/app';
import Head from 'next/head';
import NextProgress from 'next-progress';
import { SiteProvider } from '@contexts/SiteContext';
import { faviconAssets, userAgentDevices } from '@modules/utils';
import queryRest from '@modules/query-rest';
import 'windi.css';
import '@styles/globals.css';

export default function VndanganApp({
	Component,
	pageProps,
	siteProps,
	internal,
}) {
	const { favicons } = internal;

	const dataFavicons = useMemo(() => {
		return faviconAssets(favicons);
	}, [favicons]);

	return (
		<SiteProvider data={siteProps}>
			<Head>
				<title>Vndangan</title>
				<meta
					name='description'
					content='Sebar undangan untuk sebar kabar bahagia'
				/>
				{dataFavicons.map((favicon) => {
					return (
						<link
							key={favicon.key}
							{...favicon}
						/>
					);
				})}
			</Head>
			<div
				id='site'
				className='site site-vndangan'>
				<Component {...pageProps} />
				<NextProgress color='#2dd4bf' />
			</div>
		</SiteProvider>
	);
}

VndanganApp.getInitialProps = async (appContext) => {
	const appProps = await App.getInitialProps(appContext);
	const { HOST_URL } = process.env;

	const queryFavicons = await queryRest({
		url: `${HOST_URL}/api/internal/assets/favicons`,
	});

	const userAgent = appContext?.ctx?.req
		? appContext?.ctx?.req.headers['user-agent']
		: navigator?.userAgent;
	const { isMobile, isInApp } = userAgentDevices(userAgent);

	const siteProps = {
		visitorAgent: {
			userAgent,
			isMobile,
			isInApp,
		},
	};

	return {
		...appProps,
		siteProps,
		internal: {
			favicons: queryFavicons?.response || [],
		},
	};
};
