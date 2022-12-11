import xss from 'xss';
import { isObject } from 'validate.js';
import { BiAlarm, BiCalendar, BiMap, BiCalendarPlus } from 'react-icons/bi';
import {
	number2digits,
	stringCapitalize,
	escapeHtml,
	printDate,
	printTime,
} from '@modules/utils';
import styles from '@styles/Agenda.module.css';
import Link from 'next/link';
import { useMemo } from 'react';
import Popup from 'reactjs-popup';
import { useState } from 'react';
import PopupX from '../PopupX';

export default function Agenda({
	data = {},
	intro = {},
	title = '',
	className = '',
}) {
	const [popupMap, setPopupMap] = useState(false);

	const titleAgenda = useMemo(() => {
		return stringCapitalize(title || data?.title);
	}, [title, data]);

	const dataTime = useMemo(() => {
		let getDataTime = '';

		if (data?.dateStart) {
			getDataTime = printTime(data?.dateStart);

			if (data?.dateEnd) {
				getDataTime = `${getDataTime} - ${printTime(data?.dateEnd)}`;
			} else {
				getDataTime = `${getDataTime} - Selesai`;
			}
		}

		return getDataTime;
	}, [data]);

	const dataDate = useMemo(() => {
		let getDataDate = '';

		if (data?.dateStart) {
			getDataDate = printDate(data?.dateStart);

			if (data?.dateEnd) {
				getDataDate = `${getDataDate} - ${printDate(data?.dateEnd)}`;
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
			queryAddress = `${data.maploc.lat},${data.maploc.long}`;
		}

		return `https://maps.google.com/maps?z=14&hl=id&q=${queryAddress}&output=embed`;
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

		return `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${calendarDate}&details=Undangan ${escapeHtml(
			intro.title
		)} %0A${dataAddress} pada ${dataDate} dengan waktu ${dataTime}. %0A %0A${xss(
			intro.description
		)}&location=${dataAddress}&text=Undangan ${titleAgenda} ${escapeHtml(
			intro.title
		)}`;
	}, [data, intro]);

	if (!isObject(data)) {
		return null;
	}

	return (
		<>
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
						<button
							type='button'
							className={`${styles.cta_action_agenda} ${styles.cta_action_agenda__map}`}
							onClick={() => setPopupMap(true)}>
							Lihat peta lokasi
							<BiMap />
						</button>
					) : null}
				</div>
			</div>
			<PopupX
				open={popupMap}
				closeHandler={() => setPopupMap(false)}
				className='popup-map'>
				<iframe
					frameborder='0'
					src={urlAddress}></iframe>
			</PopupX>
		</>
	);
}
