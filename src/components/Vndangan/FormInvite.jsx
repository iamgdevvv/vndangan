import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiRightArrowAlt } from 'react-icons/bi';
import { isEmpty, isFunction } from 'validate.js';

import styles from '@styles/FormInvite.module.css';

export default function FormInvite({ title, defaultName, submitName }) {
	const {
		register,
		handleSubmit,
		setValue,
		setFocus,
		formState: { errors },
	} = useForm();

	useState(() => {
		setValue('name', defaultName);
		const focusTimeout = setTimeout(() => setFocus('name'), 0);

		return () => {
			clearInterval(focusTimeout);
		};
	}, []);

	const onSubmit = useCallback((data) => {
		if (isFunction(submitName)) {
			submitName(data.name);
		}
	}, [submitName]);

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
