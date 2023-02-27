import { isEmpty, isObject } from 'validate.js';
import xss from 'xss';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import ImageCF from '@components/ImageCF';
import styles from '@styles/Guide.module.css';

export default function Guide({ data, title }) {
	if (isEmpty(data) || !isObject(data)) {
		return null;
	}

	return (
		<>
			<ImageCF
				id={data?.fields?.thumbnail?.sys?.id}
				className={styles.photo_guide}
			/>
			<div
				className={styles.entry_guide}
				dangerouslySetInnerHTML={{
					__html: xss(
						documentToHtmlString(data?.fields?.description)
					),
				}}
			/>
		</>
	);
}
