import { useMemo } from 'react';
import Link from 'next/link';
import {
	BiHomeHeart,
	BiStoreAlt,
	BiMessageAltDots,
	BiShapePolygon,
	BiBookReader,
	BiHelpCircle,
} from 'react-icons/bi';
import styles from '@styles/SiteNav.module.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { isDefined } from 'validate.js';

const navigation = [
	{
		id: 1,
		icon: 'BiHomeHeart',
		title: 'Undangan Pernikahan',
		slug: 'undangan-pernikahan',
		default: true,
	},
	{
		id: 2,
		icon: 'BiStoreAlt',
		title: 'Rentetan Acara Pernikahan',
		slug: 'rentetan-acara-pernikahan',
		default: false,
	},
	{
		id: 3,
		icon: 'BiMessageAltDots',
		title: 'Gallery & Cerita',
		slug: 'gallery-cerita',
		default: false,
	},
	// {
	// 	id: 4,
	// 	icon: 'BiShapePolygon',
	// 	title: 'Pengiring Mempelai',
	// 	slug: 'pengiring-mempelai',
	// 	default: false,
	// },
	{
		id: 5,
		icon: 'BiBookReader',
		title: 'Buku Tamu & Tanda Kasih',
		slug: 'buku-tamu-tanda-kasih',
		default: false,
	},
	{
		id: 6,
		icon: 'BiHelpCircle',
		title: 'Panduan & Protokol',
		slug: 'panduan-protokol',
		default: false,
	},
];

export default function SiteNav({ className = '' }) {
	const [moveNav, setMoveNav] = useState(false);

	const NavbarIcon = useMemo(() => {
		return {
			BiHomeHeart: <BiHomeHeart />,
			BiStoreAlt: <BiStoreAlt />,
			BiMessageAltDots: <BiMessageAltDots />,
			BiShapePolygon: <BiShapePolygon />,
			BiBookReader: <BiBookReader />,
			BiHelpCircle: <BiHelpCircle />,
		};
	}, [navigation]);

	useEffect(() => {
		if (isDefined(window)) {
			window.onmousemove = () => {
				setMoveNav(true);
			};
		}
	}, []);

	useEffect(() => {
		const clearState = setTimeout(() => {
			setMoveNav(false);
		}, 1000);

		return () => {
			clearInterval(clearState);
		};
	}, [moveNav]);

	return !!navigation && navigation?.length > 0 ? (
		<nav
			id='navbar-vndangan'
			className={`${styles.navbar_vndangan} ${className} ${
				moveNav ? styles.navbar_active : ''
			}`}>
			<ul className={styles.nav_lists_vndangan}>
				{navigation.map((nav, index) => (
					<li
						key={nav?.id}
						className={`nav_item ${
							nav?.default ? 'nav_item_active' : ''
						}`}>
						<button
							type='button'
							title={nav?.title}
							className={styles.nav_button}
							onClick={() => {
								if (isDefined(document)) {
									document
										.querySelector(
											`#wedding-card > .splide > .splide__pagination li:nth-child(${
												index + 1
											}) .splide__pagination__page`
										)
										.click();
								}
							}}>
							{NavbarIcon[nav?.icon]}
						</button>
					</li>
				))}
			</ul>
		</nav>
	) : null;
}
