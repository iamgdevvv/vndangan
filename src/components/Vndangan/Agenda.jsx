import { useMemo, useState } from 'react';
import Link from 'next/link';
import xss from 'xss';
import { isEmpty, isObject } from 'validate.js';
import {
	BiNavigation,
	BiAlarm,
	BiCalendar,
	BiMap,
	BiCalendarPlus,
} from 'react-icons/bi';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import {
	number2digits,
	stringCapitalize,
	escapeHtml,
	printDate,
	printTime,
} from '@modules/utils';
import PopupX from '@components/PopupX';
import styles from '@styles/Agenda.module.css';

export default function Agenda({
	data = {},
	couple = {},
	title = '',
	className = '',
}) {
	const [popupMap, setPopupMap] = useState(false);

	const titleAgenda = useMemo(
		() => stringCapitalize(title || data?.title),
		[title, data]
	);

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

		if (!isEmpty(data?.dateStart)) {
			getDataDate = printDate(data?.dateStart);

			if (!isEmpty(data?.dateEnd)) {
				const getDateEnd = printDate(data?.dateEnd);

				if (getDateEnd !== getDataDate) {
					getDataDate = `${getDataDate} - ${printDate(
						data?.dateEnd
					)}`;
				}
			}
		}

		return getDataDate;
	}, [data]);

	const dataAddress = useMemo(() => {
		if (isEmpty(data?.address) || !isObject(data?.address)) {
			return '';
		}

		return documentToHtmlString(data?.address);
	}, [data]);

	const urlAddress = useMemo(() => {
		let queryAddress = !isEmpty(dataAddress) ? escapeHtml(dataAddress) : '';

		if (
			isObject(data?.location) &&
			data?.location?.lat &&
			data?.location?.lon
		) {
			queryAddress = `${data.location.lat},${data.location.lon}`;
		}

		return `https://maps.google.com/maps?z=14&hl=id&q=${queryAddress}&output=embed`;
	}, [data, dataAddress]);

	const urlDirecctionAddress = useMemo(() => {
		let queryAddress = !isEmpty(dataAddress) ? escapeHtml(dataAddress) : '';

		if (
			isObject(data?.location) &&
			data?.location?.lat &&
			data?.location?.lon
		) {
			queryAddress = `${data.location.lat},${data.location.lon}`;
		}

		return `https://www.google.com/maps/dir/Current+Location/${queryAddress}`;
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
			couple.identifier
		)} %0A${dataAddress} pada ${dataDate} dengan waktu ${dataTime}. %0A %0A${xss(
			couple.description
		)}&location=${escapeHtml(dataAddress)}&text=Undangan ${titleAgenda} ${escapeHtml(
			couple.identifier
		)}`;
	}, [data, couple, dataAddress, dataDate, dataTime, titleAgenda]);

	if (!isObject(data)) {
		return null;
	}

	console.log('couple', couple);

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
					{!isEmpty(dataDate) ? (
						<li
							className={`${styles.item_info_agenda} ${styles.item_info_agenda__date}`}>
							<BiCalendar className={styles.icon_info_agenda} />
							<span className={styles.label_info_agenda}>
								{dataDate}
							</span>
						</li>
					) : null}
					{!isEmpty(dataAddress) ? (
						<li
							className={`${styles.item_info_agenda} ${styles.item_info_agenda__date}`}>
							<Link
								href={urlAddress}
								target='_blank'
								onClick={(e) => {
									e.preventDefault();
									setPopupMap(true);
								}}>
								<BiMap className={styles.icon_info_agenda} />
								<div
									className={styles.label_info_agenda}
									dangerouslySetInnerHTML={{
										__html: xss(dataAddress),
									}}
								/>
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
				slotHeader={
					<div className='flexs justify-between'>
						<h4 className='mb-0 text-22px leading-normal'>
							{titleAgenda}
						</h4>
						<a
							href={urlDirecctionAddress}
							target='_blank'
							rel='noopener noreferrer'
							className='cta-primary'>
							Navigasi Vanue
							<BiNavigation className='ml-10px text-20px' />
						</a>
					</div>
				}
				open={popupMap}
				closeHandler={() => setPopupMap(false)}
				className='popup-map'>
				<iframe
					title={`Agenda ${titleAgenda}`}
					frameBorder='0'
					src={urlAddress}
				/>
			</PopupX>
		</>
	);
}
