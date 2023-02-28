import { isEmpty, isObject } from 'validate.js';

import ImageCF from '@components/ImageCF';
import styles from '@styles/Identity.module.css';
import ImageVN from '@components/ImageVN';

export default function Identity({ data = {}, name, noThumb = false }) {
	if (isEmpty(data) || !isObject(data)) {
		return null;
	}

	return (
		<>
			{!noThumb ? (
				<ImageCF
					id={data.thumbnail.sys.id}
					height={176}
					width={176}
					className={styles.photo_wedding_identity}
				/>
			) : (
				<ImageVN
					height={176}
					width={176}
					parentClass={styles.photo_wedding_identity}
				/>
			)}
			<div className={styles.brides_wedding_identity}>
				<span className={styles.brides_identity_sublabel}>
					Mempelai Wanita
				</span>
				<span className={styles.brides_identity_name}>
					{data.brideName}
				</span>
				<span className={styles.brides_identity_parents}>
					Putri dari Bapak {data.brideFatherName} dan Ibu{' '}
					{data.brideMotherName}.
				</span>
			</div>
			<div className={styles.brides_wedding_identity}>
				<span className={styles.brides_identity_sublabel}>
					Mempelai Pria
				</span>
				<span className={styles.brides_identity_name}>
					{data.groomName}
				</span>
				<span className={styles.brides_identity_parents}>
					Putra dari Bapak {data.groomFatherName} dan Ibu{' '}
					{data.groomMotherName}.
				</span>
			</div>
			<div className={styles.brides_wedding_invitation}>
				<span className={styles.brides_invitation_sublabel}>
					Dengan bahagia mengundang,
				</span>
				<span className={styles.brides_invitation_name}>{name}</span>
				<span className={styles.brides_invitation_info}>
					<span className={styles.brides_invitation_info_mark}>
						*
					</span>
					Mohon maaf bila ada kesalahan penulisan nama dan gelar
				</span>
			</div>
		</>
	);
}
