/** @type {import('next').NextConfig} */
const path = require('path');
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin');

const nextConfig = {
	webpack(config) {
		config.plugins.push(new WindiCSSWebpackPlugin());

		return config;
	},
	images: {
		unoptimized: true,
		dangerouslyAllowSVG: true,
		contentSecurityPolicy:
			"default-src 'self'; script-src 'none'; sandbox;",
	},
	reactStrictMode: true,
	swcMinify: true,
	env: {
		HOST_URL: process.env.HOST_URL,
		RECAPTCHA_SK: process.env.RECAPTCHA_SK,
	},
};

module.exports = nextConfig;
