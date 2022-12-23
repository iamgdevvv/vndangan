/** @type {import('next').NextConfig} */
const path = require('path');
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin');

const nextConfig = {
	webpack(config) {
		config.plugins.push(new WindiCSSWebpackPlugin());

		return config;
	},
	images: {
		dangerouslyAllowSVG: true,
		contentSecurityPolicy:
			"default-src 'self'; script-src 'none'; sandbox;",
		domains: ['images.ctfassets.net'],
	},
	reactStrictMode: true,
	swcMinify: true,
	env: {
		HOST_URL: process.env.HOST_URL,
		CFL_COUPLE_ID: process.env.CFL_COUPLE_ID,
		CFL_URI: process.env.CFL_URI,
		CFL_TOKEN: process.env.CFL_TOKEN,
		RECAPTCHA_SK: process.env.RECAPTCHA_SK,
	},
};

module.exports = nextConfig;
