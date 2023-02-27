import { useMemo } from 'react';
import App from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
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

	const dataFavicons = useMemo(() => faviconAssets(favicons), [favicons]);

	return (
		<SiteProvider data={siteProps}>
			<Head>
				<title>Grafis Mutia - Undangan Pernikahan</title>
				<meta
					name='robots'
					content='noindex, nofollow'
				/>
				<meta
					name='viewport'
					content='initial-scale=1, width=device-width'
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
			{/* Google tag (gtag.js) */}
			<Script
				id='googletagmanager'
				strategy='lazyOnload'
				src='https://www.googletagmanager.com/gtag/js?id=G-0WY86M2LVK'
			/>
			<Script
				strategy='lazyOnload'
				id='gtag'>
				{`window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());

				gtag('config', 'G-0WY86M2LVK');`}
			</Script>
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
	if (appContext?.ctx?.res.statusCode === 404) {
		appContext?.ctx?.res.writeHead(301, { Location: '/' });
		appContext?.ctx?.res.end();
	}

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
