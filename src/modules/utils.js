import { isString } from 'validate.js';

const faviconAssets = (dataFavicons = [], pathDir = 'favicons') => {
	const arrFavicons = [];

	dataFavicons.forEach((favicon, index) => {
		const relFavicon = favicon.includes('apple-touch-icon')
			? 'apple-touch-icon'
			: 'icon';

		if (favicon.includes('x')) {
			const [size, type] = favicon.split('x')[1].split('.');

			arrFavicons.push({
				key: `${pathDir}-${index}`,
				rel: relFavicon,
				type: `image/${type}`,
				sizes: `${size}x${size}`,
				href: `/${pathDir}/${favicon}`,
			});
		} else {
			arrFavicons.push({
				key: `${pathDir}-${index}`,
				rel: relFavicon,
				href: `/${pathDir}/${favicon}`,
			});
		}
	});

	return arrFavicons;
};

const userAgentDevices = (userAgent = '') => {
	const rulesInApp = [
		'WebView',
		'(iPhone|iPod|iPad)(?!.*Safari/)',
		'Android.*(wv|.0.0.0)',
	];
	const regexInApp = new RegExp(`(${rulesInApp.join('|')})`, 'ig');

	const isMobile = /(iPad|iPhone|Android|Mobile)/i.test(userAgent) || false;
	const isInApp = Boolean(userAgent.match(regexInApp));

	return {
		isMobile,
		isInApp,
	};
};

const nameMonthbyDate = (
	locale = navigator?.language || 'id-ID',
	date = new Date(),
	monthFormat = 'long'
) => {
	return new Intl.DateTimeFormat(locale, { month: monthFormat }).format(date);
};

const number2digits = (num) => {
	const number = Number(num);

	return number?.toString().padStart(2, '0');
};

const stringCapitalize = (string) => {
	if (!isString(string)) {
		return string;
	}

	return string.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
		letter.toUpperCase()
	);
};

const escapeHtml = (html) => {
	if (!isString(html)) {
		return html;
	}

	return html.replace(/<(.|\n)*?>/g, '');
};

const printDate = (date = '') => {
	const getPrintDate = new Date(date) || new Date();

	return `${number2digits(getPrintDate.getDate())} ${nameMonthbyDate(
		getPrintDate
	)} ${getPrintDate.getFullYear()}`;
};

const printTime = (date = '') => {
	const getPrintTime = new Date(date) || new Date();

	return `${number2digits(getPrintTime.getHours())} : ${number2digits(
		getPrintTime.getMinutes()
	)}`;
};

export {
	faviconAssets,
	userAgentDevices,
	nameMonthbyDate,
	number2digits,
	stringCapitalize,
	escapeHtml,
	printDate,
	printTime
};
