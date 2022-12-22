import { useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BiRightArrowAlt } from 'react-icons/bi';
import Select from 'react-select';
import ReCAPTCHA from 'react-google-recaptcha';
import dataProvider from '@data/provider-payment.json';
import ImageVN from '@components/ImageVN';
import styles from '@styles/FormInvite.module.css';
import { isEmpty } from 'validate.js';
import { useState } from 'react';

export default function FormInvite({ title, defaultName, submitName }) {
	const {
		register,
		handleSubmit,
        setValue,
		formState: { errors },
	} = useForm();

    useState(() => {
        setValue('name', defaultName);
    }, []);

	const onSubmit = useCallback((data) => {
		console.log(data);
		submitName(data.name);
	}, []);

	return (
		<>
			{!isEmpty(title) ? (
				<h3 className={styles.title_form_invite}>{title}</h3>
			) : null}
			<form
				className={styles.form_invite}
				action='https://submit-form.com/zq8ntdSi'
				onSubmit={handleSubmit(onSubmit)}>
				<div
					className={`${styles.field_input} ${
						errors?.name ? styles.field_invalid : ''
					}`}>
					<input
						type='text'
						placeholder='Isi Nama'
						aria-invalid={Boolean(errors?.name)}
						defaultValue={defaultName}
						{...register('name', { required: true })}
					/>
				</div>
				<div className={styles.field_submit}>
					<button
						type='submit'
						className={styles.cta_field_sumbit}>
						<BiRightArrowAlt />
					</button>
				</div>
			</form>
		</>
	);
}
