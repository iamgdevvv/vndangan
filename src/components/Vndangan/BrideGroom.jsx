import { useMemo } from 'react';
import { useCallback } from 'react';
import { isArray, isEmpty } from 'validate.js';
import styles from '@styles/BrideGroom.module.css';
import ImageVN from '@components/ImageVN';

export default function BrideGroom({ data = [] }) {
	const dataType = useCallback(
		(type) => {
			return data.filter((item) => item.type === type);
		},
		[data]
	);

	const dataGroom = useMemo(() => {
		return dataType('groom');
	}, [dataType]);

	const dataBride = useMemo(() => {
		return dataType('bride');
	}, [dataType]);

	if (isEmpty(data) || !isArray(data)) {
		return null;
	}

	return (
		<div className={styles.bridegroom_wrapper}>
			{dataGroom ? (
				<div className={styles.item_bridegroom}>
					<h3 className={styles.title_bridegroom}>groomsman</h3>
					<ul className={styles.lists_bridegroom}>
						{dataGroom.map((item, index) => (
							<li key={`item-${index}`}>
								<ImageVN
									src={`/images/${item.avatar}`}
									parentClass={styles.thumb_bridegroom}
								/>
								<span className={styles.name_bridegroom}>
									{item.name}
								</span>
							</li>
						))}
					</ul>
				</div>
			) : null}
			{dataBride ? (
				<div className={styles.item_bridegroom}>
					<h3 className={styles.title_bridegroom}>bridesmaid</h3>
					<ul className={styles.lists_bridegroom}>
						{dataBride.map((item, index) => (
							<li key={`item-${index}`}>
								<ImageVN
									src={`/images/${item.avatar}`}
									parentClass={styles.thumb_bridegroom}
								/>
								<span className={styles.name_bridegroom}>
									{item.name}
								</span>
							</li>
						))}
					</ul>
				</div>
			) : null}
		</div>
	);
}
