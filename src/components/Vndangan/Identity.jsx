import ImageVN from '@components/ImageVN';
import styles from '@styles/Identity.module.css';
import { isEmpty, isObject } from 'validate.js';

export default function Identity({ data, name }) {
	if (isEmpty(data) || !isObject(data)) {
		return null;
	}

	return (
		<>
			<ImageVN
				src={`/images/${data.photoIdentity}`}
				parentClass={styles.photo_wedding_identity}
			/>
			<div className={styles.brides_wedding_identity}>
				<span className={styles.brides_identity_sublabel}>
					Mempelai Pria
				</span>
				<span className={styles.brides_identity_name}>
					{data.groomsName}
				</span>
				<span className={styles.brides_identity_parents}>
					Putra dari Bapak {data.groomsFatherName} dan Ibu{' '}
					{data.groomsMotherName}.
				</span>
			</div>
			<div className={styles.brides_wedding_identity}>
				<span className={styles.brides_identity_sublabel}>
					Mempelai Pria
				</span>
				<span className={styles.brides_identity_name}>
					{data.bridesName}
				</span>
				<span className={styles.brides_identity_parents}>
					Putra dari Bapak {data.bridesFatherName} dan Ibu{' '}
					{data.bridesMotherName}.
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
