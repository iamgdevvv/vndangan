import { isArray, isEmpty } from 'validate.js';
import { printDate } from '@modules/utils';
import ImageVN from '@components/ImageVN';
import styles from '@styles/LoveStory.module.css';

export default function LoveStory({ title, data }) {
	if (isEmpty(data) || !isArray(data)) {
		return null;
	}

	return (
		<>
			<h3 className={styles.title_love_stories}>{title}</h3>
			<ul className={styles.love_stories}>
				{data.map((item, index) => (
					<li key={`item-${index}`}>
						<ImageVN
							src={`/images/${item.image}`}
							parentClass={styles.thumb_love_story}
						/>
						<div className={styles.desc_love_story}>
							<span className={styles.date_love_story}>
								{printDate(item.dateStory)}
							</span>
							{item.desc}
						</div>
					</li>
				))}
			</ul>
		</>
	);
}
