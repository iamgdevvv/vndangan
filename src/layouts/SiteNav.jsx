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


export default function SiteNav({ navigation = [], className = '' }) {

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

	return !!navigation && navigation?.length > 0 ? (
		<nav className={`${styles.navbar_vndangan} ${className}`}>
			<ul className={styles.nav_lists_vndangan}>
				{navigation.map((nav) => (
					<li
						key={nav?.id}
						className={`${styles.nav_item} ${
							nav?.default ? styles.nav_item_active : ''
						}`}>
						<Link
							href={`/${nav?.slug}`}
							title={nav?.title}
							className={styles.nav_link}>
							{NavbarIcon[nav?.icon]}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	) : null;
}
