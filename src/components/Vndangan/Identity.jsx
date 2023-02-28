import { isEmpty, isObject } from 'validate.js';

import ImageCF from '@components/ImageCF';
import styles from '@styles/Identity.module.css';
import ImageVN from '@components/ImageVN';

export default function Identity({ data = {}, name, isSunnah = false }) {
	if (isEmpty(data) || !isObject(data)) {
		return null;
	}

	return (
		<>
			<div className={styles.photo_identity_wrapper}>
				<ImageCF
					id={
						isSunnah
							? data?.thumbnailSunnah?.sys?.id
							: data?.thumbnail?.sys?.id
					}
					height={176}
					width={176}
					className={styles.photo_wedding_identity}
				/>
				<ImageCF
					id={
						isSunnah
							? data?.thumbnailSunnahAlt?.sys?.id
							: data?.thumbnailAlt?.sys?.id || 0
					}
					height={176}
					width={176}
					className={`${styles.photo_wedding_identity} animate-flash`}
				/>
			</div>
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
