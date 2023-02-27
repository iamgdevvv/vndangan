import { useMemo, useCallback } from 'react';
import { isArray, isEmpty } from 'validate.js';

import ImageVN from '@components/ImageVN';
import styles from '@styles/BrideGroom.module.css';

export default function BrideGroom({ data = [] }) {
	const dataType = useCallback(
		(type) => data.filter((item) => item.type === type),
		[data]
	);

	const dataGroom = useMemo(() => dataType('groom'), [dataType]);

	const dataBride = useMemo(() => dataType('bride'), [dataType]);

	if (isEmpty(data) || !isArray(data)) {
		return null;
	}

	return (
		<div className={styles.bridegroom_wrapper}>
			{dataGroom ? (
				<div className={styles.item_bridegroom}>
					<h3 className={styles.title_bridegroom}>groomsman</h3>
					<ul className={styles.lists_bridegroom}>
						{dataGroom.map((item) => (
							<li key={item.name}>
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
						{dataBride.map((item) => (
							<li key={item.name}>
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
