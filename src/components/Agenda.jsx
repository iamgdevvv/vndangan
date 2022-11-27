import xss from 'xss';
import { isObject } from 'validate.js';
import { BiAlarm, BiCalendar, BiMap, BiCalendarPlus } from 'react-icons/bi';
import {
	nameMonthbyDate,
	number2digits,
	stringCapitalize,
	escapeHtml
} from '@modules/utils';
import styles from '@styles/Agenda.module.css';
import Link from 'next/link';
import { useMemo } from 'react';

export default function Agenda({ data = {}, intro = {}, title = '', className = '' }) {
	const titleAgenda = useMemo(() => {
		return stringCapitalize(title || data?.title);
	}, [title, data]);

	const dataTime = useMemo(() => {
		let getDataTime = '';

		if (data?.dateStart) {
			const timeStart = new Date(data?.dateStart);

			getDataTime = `${number2digits(
				timeStart.getHours()
			)} : ${number2digits(timeStart.getMinutes())}`;

			if (data?.isDateRange && data?.dateEnd) {
				const timeEnd = new Date(data?.dateEnd);

				getDataTime = `${getDataTime} - ${number2digits(
					timeEnd.getHours()
				)} : ${number2digits(timeEnd.getMinutes())}`;
			} else {
				getDataTime = `${getDataTime} - Selesai`;
			}
		}

		return getDataTime;
	}, [data]);

	const dataDate = useMemo(() => {
		let getDataDate = '';

		if (data?.dateStart) {
			const dateStart = new Date(data?.dateStart);
			getDataDate = `${number2digits(
				dateStart.getDate()
			)} ${nameMonthbyDate(dateStart)} ${dateStart.getFullYear()}`;

			if (data?.isDateRange && data?.dateEnd) {
				const dateEnd = new Date(data?.dateEnd);
				getDataDate = `${getDataDate} - ${number2digits(
					dateEnd.getDate()
				)} ${nameMonthbyDate(dateEnd)} ${dateEnd.getFullYear()}`;
			}
		}

		return getDataDate;
	}, [data]);

	const dataAddress = useMemo(() => {
		let getDataAddress = '';

		if (data?.address) {
			getDataAddress = `${data?.address}${
				data?.district ? `, ${data?.district}` : null
			}${data?.province ? `, ${data?.province}` : null}`;
		}

		return getDataAddress;
	}, [data]);

	const urlAddress = useMemo(() => {
		let queryAddress = dataAddress;

		if (isObject(data?.maploc) && data?.maploc?.lat && data?.maploc?.long) {
			queryAddress = `loc:${data.maploc.lat}+${data.maploc.long}`;
		}

		return `https://maps.google.com/maps?z=12&t=m&q=${queryAddress}`;
	}, [data, dataAddress]);

	const urlCalendar = useMemo(() => {
		const calendarStart = new Date(data?.dateStart);
		let calendarDate = `${calendarStart.getFullYear()}${number2digits(
			calendarStart.getMonth() + 1
		)}${number2digits(calendarStart.getDate())}T${number2digits(
			calendarStart.getHours()
		)}${number2digits(calendarStart.getMinutes())}${number2digits(
			calendarStart.getSeconds()
		)}Z`;

		if (data?.dateEnd) {
			const calendarEnd = new Date(data?.dateEnd);
			calendarDate = `${calendarDate}%2F${calendarEnd.getFullYear()}${number2digits(
				calendarEnd.getMonth() + 1
			)}${number2digits(calendarEnd.getDate())}T${number2digits(
				calendarEnd.getHours()
			)}${number2digits(calendarEnd.getMinutes())}${number2digits(
				calendarEnd.getSeconds()
			)}Z`;
		}

		return `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${calendarDate}&details=Undangan ${escapeHtml(intro.title)} %0A${dataAddress} pada ${dataDate} dengan waktu ${dataTime}. %0A %0A${xss(intro.description)}&location=${dataAddress}&text=Undangan ${titleAgenda} ${escapeHtml(intro.title)}`;
	}, [data, intro]);

	if (!isObject(data)) {
		return null;
	}

	return (
		<div className={`${styles.agenda_wrapper} ${className}`}>
			<h4 className={styles.title_agenda}>{titleAgenda}</h4>
			<ul className={styles.info_agenda}>
				{dataTime ? (
					<li
						className={`${styles.item_info_agenda} ${styles.item_info_agenda__time}`}>
						<BiAlarm className={styles.icon_info_agenda} />
						<span className={styles.label_info_agenda}>
							{dataTime}
						</span>
					</li>
				) : null}
				{dataDate ? (
					<li
						className={`${styles.item_info_agenda} ${styles.item_info_agenda__date}`}>
						<BiCalendar className={styles.icon_info_agenda} />
						<span className={styles.label_info_agenda}>
							{dataDate}
						</span>
					</li>
				) : null}
				{dataAddress ? (
					<li
						className={`${styles.item_info_agenda} ${styles.item_info_agenda__date}`}>
						<Link
							href={urlAddress}
							target='_blank'>
							<BiMap className={styles.icon_info_agenda} />
							<span className={styles.label_info_agenda}>
								{dataAddress}
							</span>
						</Link>
					</li>
				) : null}
			</ul>
			<div className={styles.action_agenda}>
				{urlCalendar ? (
					<Link
						href={urlCalendar}
						target='_blank'
						className={`${styles.cta_action_agenda} ${styles.cta_action_agenda__calendar}`}>
						Ingatkan saya
						<BiCalendarPlus />
					</Link>
				) : null}
				{urlAddress ? (
					<Link
						href={urlAddress}
						target='_blank'
						className={`${styles.cta_action_agenda} ${styles.cta_action_agenda__map}`}>
						Lihat peta lokasi
						<BiMap />
					</Link>
				) : null}
			</div>
		</div>
	);
}
