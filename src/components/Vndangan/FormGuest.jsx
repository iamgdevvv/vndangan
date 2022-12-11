import { useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IoHeartSharp } from 'react-icons/io5';
import Select from 'react-select';
import ReCAPTCHA from 'react-google-recaptcha';
import dataProvider from '@data/provider-payment.json';
import ImageVN from '@components/ImageVN';
import styles from '@styles/FormGuest.module.css';

export default function FormGuest() {
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
				label: '-',
			},
			...dataProvider,
		];
	}, [dataProvider]);

	const selectedProvider = useMemo(() => {
		return dataProvider.find((item) => item.value === 'bca');
	}, [dataProvider]);

	const onSubmit = useCallback((data) => {
		console.log(data);
	}, []);

	return (
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
			<div className={`${styles.field_rows} ${styles.field_rows_donate}`}>
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
								inputRef={ref}
								options={optionsProvider}
								defaultValue={selectedProvider}
								onChange={(option) => onChange(option.value)}
								getOptionLabel={(option) => {
									if (option?.icon) {
										return (
											<ImageVN
												className={styles.icon_provider}
												src={option.icon}
											/>
										);
									}

									return option.label;
								}}
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
					className={styles.cta_field_sumbit}>
					Kirim Tanda Kasih
					<IoHeartSharp />
				</button>
			</div>
		</form>
	);
}
