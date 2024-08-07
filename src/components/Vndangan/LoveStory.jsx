import { useMemo } from 'react';
import { isArray, isEmpty } from 'validate.js';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import xss from 'xss';

import { printDate } from '@modules/utils';
import ImageCF from '@components/ImageCF';
import styles from '@styles/LoveStory.module.css';

export default function LoveStory({ title, data = [] }) {
	const dataStories = useMemo(() => {
		if (isEmpty(data) || !isArray(data)) {
			return [];
		}

		return data.sort(function (a, b) {
			return new Date(a?.fields?.date) - new Date(b?.fields?.date);
		});
	}, [data]);

	if (isEmpty(data) || !isArray(data)) {
		return null;
	}

	return (
		<>
			<h3 className={styles.title_love_stories}>{title}</h3>
			<ul className={styles.love_stories}>
				{dataStories.map((story, index) => (
					<li key={`item-${index}`}>
						<ImageCF
							id={story?.fields?.media?.sys?.id}
							height={160}
							width={160}
							className={styles.thumb_love_story}
						/>
						<div className={styles.entry_love_story}>
							<span className={styles.date_love_story}>
								{printDate(story?.fields?.date)}
							</span>
							<div
								dangerouslySetInnerHTML={{
									__html: xss(
										documentToHtmlString(
											story?.fields?.description
										)
									),
								}}
								className={styles.desc_love_story}
							/>
						</div>
					</li>
				))}
			</ul>
		</>
	);
}
