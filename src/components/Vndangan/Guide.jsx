import { isEmpty, isObject } from 'validate.js';
import ImageVN from '@components/ImageVN';
import styles from '@styles/Guide.module.css';

export default function Guide({ data, title }) {
	if (isEmpty(data) || !isObject(data)) {
		return null;
	}

	return (
		<>
			<ImageVN
				src='/images/olivia-bauso.jpg'
				parentClass={styles.photo_guide}
			/>
			<div className={styles.lists_guide}>
				<h3 className={styles.title_guide}>{title}</h3>
				<ul className={styles.lists_guide_wrapper}>
					{data.map((itemGuide, index) => (
						<li key={`guide-${index}`}>{itemGuide}</li>
					))}
				</ul>
			</div>
		</>
	);
}
