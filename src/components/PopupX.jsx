import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { IoCloseCircleOutline } from 'react-icons/io5';
import styles from '@styles/PopupX.module.css';
import { isFunction } from 'validate.js';
import { useCallback } from 'react';

function PopupX({
	open,
	closeHandler,
	slotHeader,
	slotFooter,
	className = '',
	children,
}) {
	const [isClosing, setIsClosing] = useState(false);

	const handlerClose = useCallback(() => {
		setIsClosing(true);
		if (isFunction(closeHandler)) {
			const delayClose = setTimeout(function () {
				closeHandler();
				setIsClosing(false);
			}, 300);

			return () => {
				clearInterval(delayClose);
			};
		}
	}, [closeHandler]);

	return (
		<Popup
			className={className}
			open={open}
			closeOnDocumentClick={false}
			repositionOnResize={false}>
			<div
				className={`${styles.popupx} ${
					isClosing ? styles['popupx-closing'] : ''
				} ${className}`}>
				<div className={styles['popupx-inner']}>
					<header className={styles['popupx-header']}>
						{slotHeader}
						<button
							type='button'
							className={styles['close-popupx']}
							onClick={handlerClose}>
							<IoCloseCircleOutline />
						</button>
					</header>
					<main className={styles['popupx-main']}>{children}</main>
					{!!slotFooter && (
						<footer className={styles['popupx-footer']}>
							{slotFooter}
						</footer>
					)}
				</div>
				<div
					className={styles['popupx-overlay']}
					onClick={handlerClose}
					aria-hidden='true'
				/>
			</div>
		</Popup>
	);
}

export default PopupX;
