import { defineConfig } from 'windicss/helpers';

export default defineConfig({
	extract: {
		include: ['**/*.{jsx,tsx,css}'],
		exclude: ['node_modules', '.git', '.next'],
	},
	darkMode: 'class',
	theme: {
		extend: {
			screens: {
				'sm': '375px',
				'md': '600px',
				'lg': '900px',
				'xl': '1200px',
				'2xl': '1600px',
			},
			fontFamily: {
				sans: [
					'Plus Jakarta Sans',
					'ui-sans-serif',
					'system-ui',
					'-apple-system',
					'BlinkMacSystemFont',
					'Segoe UI',
					'Roboto',
					'Helvetica Neue',
					'Arial',
					'Noto Sans',
					'sans-serif',
					'Apple Color Emoji',
					'Segoe UI Emoji',
					'Segoe UI Symbol',
					'Noto Color Emoji',
				],
				serif: [
					'Dancing Script',
					'Georgia',
					'Cambria',
					'"Times New Roman"',
					'Times',
					'serif',
				],
			},
		},
		fontSize: {
			h1: ['56px', '1.3'],
			h2: ['48px', '1.3'],
			h3: ['40px', '1.3'],
			h4: ['32px', '1.3'],
			h5: ['24px', '1.3'],
			h6: ['20px', '1.3'],
		},
		transitionDuration: {
			DEFAULT: '300ms',
		},
	},
	shortcuts: {
		'unlist': 'pl-0 list-none',
		'_content': 'content-a text-0px',
		'flexs': 'flex flex-row flex-wrap items-center',
		'flexs-center': 'flexs justify-center',
		'cta': 'flexs inline-flex font-bold text-current px-20px py-12px transition-all md:(text-16px leading-tight) <md:(text-14px leading-tight)',
		'cta-primary': 'cta relative text-teal-100 bg-teal-400 rounded-6px hover:(bg-teal-500)',
		'cta-secondary': 'cta relative text-teal-400 bg-teal-100 rounded-6px hover:(text-teal-500)',
		'cta-icon':
			'after:(_content inline-block w-10px h-16px mt-1px bg-contain bg-no-repeat bg-center transform-gpu transition-all)',
		'cta-iconright':
			'cta-icon after:ml-12px hover:after:(translate-x-3px) after:order-last',
		'cta-iconleft':
		'cta-icon after:mr-12px hover:after:(-translate-x-3px) after:order-first',
		'fsize-l': 'md:(text-24px leading-tight) <md:(text-20px leading-tight)',
		'fsize-md': 'md:(text-28px leading-tight) <md:(text-22px leading-tight)',
		'fsize-lg': 'md:(text-32px leading-tight) <md:(text-26px leading-tight)'
	},
	plugins: [
		require('windicss/plugin/line-clamp'),
		require('windicss/plugin/aspect-ratio'),
	],
});
