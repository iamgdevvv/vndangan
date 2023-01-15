import { useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IoHeartSharp, IoSyncOutline } from 'react-icons/io5';
import Select from 'react-select';
import ReCAPTCHA from 'react-google-recaptcha';
import dataProvider from '@data/provider-payment.json';
import ImageVN from '@components/ImageVN';
import styles from '@styles/FormGuest.module.css';
import { isEmpty, isObject } from 'validate.js';
import queryRest from '@modules/query-rest';
import { useState } from 'react';
import PopupX from '@components/PopupX';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function FormGuest({ title }) {
	const router = useRouter();
	const [stateProgress, setStateProgress] = useState(null);
	const [infoProgress, setInfoProgress] = useState({});

	const {
		control,
		trigger,
		register,
		watch,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	const optionsProvider = useMemo(() => {
		return [
			{
				value: 'none',
				label: 'Doa',
			},
			...dataProvider,
		];
	}, [dataProvider]);

	const selectedProvider = useMemo(() => {
		return dataProvider.find((item) => item.value === 'bca');
	}, [dataProvider]);

	const getOptionLabel = useCallback((option) => {
		if (option?.icon) {
			return (
				<ImageVN
					className={styles.icon_provider}
					src={option.icon}
				/>
			);
		}

		return option.label;
	}, []);

	const onSubmit = useCallback(async (data) => {
		setStateProgress(true);
		console.log(data);

		const storeGuessBook = {
			fields: {
				identifier: {
					'en-US': `${data.name} - Grafis Nuresa`,
				},
				name: {
					'en-US': data.name,
				},
				donateNominal: {
					'en-US': Number(data.nominal),
				},
				donateProvider: {
					'en-US': data.provider,
				},
				message: {
					'en-US': {
						nodeType: 'document',
						data: {},
						content: [
							{
								nodeType: 'paragraph',
								data: {},
								content: [
									{
										nodeType: 'text',
										value: data.message,
										marks: [],
										data: {},
									},
								],
							},
						],
					},
				},
			},
			sys: {
				id: 'guestBook',
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				publishedAt: new Date().toISOString(),
				firstPublishedAt: new Date().toISOString(),
				// createdBy: {
				// 	sys: {
				// 		type: 'Link',
				// 		linkType: 'User',
				// 		id: '5MaFCcbQggleTl4RpWeVQP',
				// 	},
				// },
				// updatedBy: {
				// 	sys: {
				// 		type: 'Link',
				// 		linkType: 'User',
				// 		id: '5MaFCcbQggleTl4RpWeVQP',
				// 	},
				// },
				// publishedBy: {
				// 	sys: {
				// 		type: 'Link',
				// 		linkType: 'User',
				// 		id: '5MaFCcbQggleTl4RpWeVQP',
				// 	},
				// },
			},
		};

		try {
			const headersGuestBook = new Headers({
				'Authorization': `Bearer ${process.env.CFL_MG_TOKEN}`,
				'Content-Type': 'application/vnd.contentful.management.v1+json',
				'X-Contentful-Content-Type': 'guestBook',
			});

			const queryGuestBook = await queryRest({
				url: `${process.env.CFL_MG_URI}/entries?access_token=${process.env.CFL_MG_TOKEN}`,
				options: {
					method: 'POST',
					headers: headersGuestBook,
					body: JSON.stringify(storeGuessBook),
				},
			});

			if (queryGuestBook) {
				const statusQuery = queryGuestBook?.status;

				if (statusQuery > 199 && statusQuery < 300) {
					// const mailData = new FormData();
					// mailData.append('access_key', process.env.MAIL_TOKEN);
					// mailData.append(
					// 	'subject',
					// 	`Pesan Tanda Kasih ${data.name}`
					// );
					// mailData.append('from_name', data.name);
					// mailData.append('replyto', 'gn.mailwork@gmail.com');
					// mailData.append('Name', data.name);
					// mailData.append('Nominal', data.nominal);
					// mailData.append('Provider', data.provider);
					// mailData.append('Nominal', data.nominal);
					// mailData.append('Message', data.message);

					// const object = Object.fromEntries(formData);

					const storeMailBody = {
						access_key: process.env.MAIL_TOKEN,
						subject: `Pesan Tanda Kasih ${data.name}`,
						from_name: data.name,
						Name: data.name,
						Nominal: data.nominal,
						Provider: data.provider,
						Nominal: data.nominal,
						Message: data.message,
						Publish: `https://app.contentful.com/spaces/rhcwjbd6frv6/entries/${queryGuestBook?.response?.sys?.id}`,
					};

					const queryMail = await queryRest({
						url: 'https://api.web3forms.com/submit',
						options: {
							'method': 'POST',
							'Content-Type': 'application/json',
							'Accept': 'application/json',
							'body': JSON.stringify(storeMailBody),
						},
					});

					// setInfoProgress({
					// 	status: statusQuery,
					// 	message: `Terimakasih ${data.name} atas pesan tanda kasih nya. (Status Email : ${queryMail?.response?.message})`,
					// });

					setInfoProgress({
						status: statusQuery,
						message: `Terimakasih ${data.name} atas pesan tanda kasih nya.`,
					});
				} else {
					setInfoProgress({
						status: statusQuery || 400,
						message:
							queryGuestBook?.statusText ||
							'Query contentful error',
					});
				}
			} else {
				setInfoProgress({
					status: 500,
					message: 'Somethings wrong with database',
				});
			}

			console.log('queryGuestBook', queryGuestBook);
		} catch (error) {
			console.log('FormGuest error', error);
			setInfoProgress({
				status: 500,
				message: 'Somethings wrong here',
			});
		}

		setStateProgress(false);
	}, []);

	return (
		<>
			{!isEmpty(title) ? (
				<h3 className={styles.title_form_guest}>{title}</h3>
			) : null}
			<form
				action='https://submit-form.com/zq8ntdSi'
				onSubmit={handleSubmit(onSubmit)}>
				<div
					className={`${styles.field_input} ${
						errors?.name ? styles.field_invalid : ''
					}`}>
					<input
						type='text'
						placeholder='Nama'
						aria-invalid={Boolean(errors?.name)}
						{...register('name', { required: true })}
					/>
				</div>
				<div
					className={`${styles.field_rows} ${styles.field_rows_donate}`}>
					<div
						className={`${styles.field_col} ${
							styles.field_col_provider
						} ${errors?.provider ? styles.field_invalid : ''}`}>
						<Controller
							control={control}
							name='provider'
							defaultValue='bca'
							rules={{ required: true }}
							render={({ field: { onChange, ref } }) => (
								<Select
									instanceId='provider'
									inputRef={ref}
									options={optionsProvider}
									defaultValue={selectedProvider}
									onChange={(option) =>
										onChange(option.value)
									}
									getOptionLabel={getOptionLabel}
								/>
							)}
						/>
					</div>
					<div
						className={`${styles.field_col} ${
							styles.field_col_nominal
						} ${errors?.nominal ? styles.field_invalid : ''}`}>
						<input
							type='number'
							name='nominal'
							placeholder='IDR'
							defaultValue={10000}
							disabled={watch('provider') === 'none'}
							aria-invalid={Boolean(errors?.nominal)}
							{...register('nominal', { required: true })}
						/>
					</div>
				</div>
				<div
					className={`${styles.field_input} ${
						errors?.message ? styles.field_invalid : ''
					}`}>
					<textarea
						placeholder='Pesan tanda kasih'
						aria-invalid={Boolean(errors?.message)}
						{...register('message', { required: true })}
					/>
				</div>
				<div
					className={`${styles.field_input} ${
						errors?.recaptcha ? styles.field_invalid : ''
					}`}>
					<input
						type='hidden'
						{...register('recaptcha', { required: true })}
					/>
					<ReCAPTCHA
						sitekey={process.env.RECAPTCHA_SK}
						onChange={async (val) => {
							setValue('recaptcha', val);
							const triggerRecaptcha = await trigger('recaptcha');
						}}
					/>
					{errors?.recaptcha ? (
						<span className={styles.message_error}>
							Selesaikan recaptcha diatas terlebih dulu.
						</span>
					) : null}
				</div>
				<div className={styles.field_submit}>
					<button
						type='submit'
						disabled={stateProgress}
						className={styles.cta_field_sumbit}>
						Kirim Tanda Kasih
						{stateProgress ? (
							<IoSyncOutline className='animate-spin' />
						) : (
							<IoHeartSharp />
						)}
					</button>
				</div>
			</form>
			<PopupX
				open={!isEmpty(infoProgress) && isObject(infoProgress)}
				slotHeader={
					<strong>
						Status{' '}
						{infoProgress.status > 199 && infoProgress.status < 300
							? 'Success'
							: 'Error'}
					</strong>
				}
				closeHandler={() => {
					if (
						infoProgress.status > 199 &&
						infoProgress.status < 300
					) {
						router.reload();
					} else {
						setInfoProgress({});
					}
				}}>
				{infoProgress.message}
			</PopupX>
		</>
	);
}
