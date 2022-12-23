import ImageVN from '@components/ImageVN';
import queryRest from '@modules/query-rest';
import styles from '@styles/Identity.module.css';
import { useEffect } from 'react';
import { useState, useCallback } from 'react';
import { isEmpty, isObject } from 'validate.js';

export default function Identity({ data = {}, name }) {
	const [avatarIdentity, setAvatarIdentity] = useState({});

	const fetchAvatarIdentity = useCallback(async () => {
		try {
			const getAvatarAsset = await queryRest({
				url: `${process.env.CFL_URI}/assets/${data.thumbnail.sys.id}?access_token=${process.env.CFL_TOKEN}`,
			});

			setAvatarIdentity(getAvatarAsset?.response?.fields);
		} catch (error) {
			console.log(error);
		}
	}, [data]);

	useEffect(() => {
		fetchAvatarIdentity();
	}, [fetchAvatarIdentity]);

	if (isEmpty(data) || !isObject(data)) {
		return null;
	}

	return (
		<>
			<ImageVN
				src={`https:${avatarIdentity?.file?.url}`}
				height={176}
				width={176}
				alt={avatarIdentity?.description}
				parentClass={styles.photo_wedding_identity}
			/>
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
			<div className={styles.brides_wedding_identity}>
				<span className={styles.brides_identity_sublabel}>
					Mempelai Pria
				</span>
				<span className={styles.brides_identity_name}>
					{data.brideName}
				</span>
				<span className={styles.brides_identity_parents}>
					Putra dari Bapak {data.brideFatherName} dan Ibu{' '}
					{data.brideMotherName}.
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
