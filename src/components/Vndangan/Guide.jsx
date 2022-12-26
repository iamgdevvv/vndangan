import { isArray, isEmpty, isObject } from 'validate.js';
import ImageVN from '@components/ImageVN';
import styles from '@styles/Guide.module.css';
import ImageCF from '@components/ImageCF';
import xss from 'xss';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

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
