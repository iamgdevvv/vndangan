import { useEffect, useState, useRef, useCallback } from 'react';
import { isDefined } from 'validate.js';
import {
	BiPlayCircle,
	BiPauseCircle,
	BiRewind,
	BiFastForward,
	BiSkipPrevious,
	BiSkipNext,
	BiMusic,
} from 'react-icons/bi';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import styles from '@styles/SiteAudio.module.css';

const playlists = [
	{
		title: 'Minang Instrument Welcome',
		src: 'minang-instrument-welcome.mp3',
	},
	{
		title: "Can't Help Falling in Love - Kina Grannis",
		src: 'cant-help-falling-in-love.mp3',
	},
];

export default function SiteAudio({ className = '' }) {
	const audioRef = useRef();
	const [toggleAudio, setToggleAudio] = useState(false);
	const [autoPlay, setAutoPlay] = useState(true);
	const [playlist, setPlaylist] = useState(0);

	useEffect(() => {
		if (isDefined(window)) {
			document.onclick = (e) => {
				if (autoPlay === true) {
					audioRef.current?.audio.current.play();
				}

				setAutoPlay(false);
			};

			document
				.querySelector('#popup-root')
				?.addEventListener('click', function (event) {
					if (autoPlay === true) {
						audioRef.current?.audio.current.play();
					}

					setAutoPlay(false);
				});
		}
	}, [autoPlay, audioRef]);

	const handlePrevPlaylist = useCallback(() => {
		const currentPlaylist = playlist;

		if (currentPlaylist > 0) {
			setPlaylist(currentPlaylist - 1);
		} else {
			setPlaylist(0);
		}
	}, [playlist]);

	const handleNextPlaylist = useCallback(() => {
		const currentPlaylist = playlist;

		if (currentPlaylist < playlists.length - 1) {
			setPlaylist(currentPlaylist + 1);
		} else {
			setPlaylist(0);
		}
	}, [playlist]);

	return (
		<div
			className={`${styles.site_audio} ${
				toggleAudio ? styles.site_audio__active : ''
			} ${className}`}>
			<h3 className={styles.title_audio}>{playlists[playlist].title}</h3>
			<AudioPlayer
				ref={audioRef}
				// autoPlay this is not work idkw
				autoPlay={false}
				autoPlayAfterSrcChange
				src={`/musics/${playlists[playlist].src}`}
				showSkipControls
				showJumpControls={false}
				customIcons={{
					play: <BiPlayCircle />,
					pause: <BiPauseCircle />,
					rewind: <BiRewind />,
					forward: <BiFastForward />,
					previous: <BiSkipPrevious />,
					next: <BiSkipNext />,
				}}
				customAdditionalControls={[]}
				customVolumeControls={[]}
				onClickPrevious={handlePrevPlaylist}
				onClickNext={handleNextPlaylist}
				onEnded={handleNextPlaylist}
			/>
			<button
				type='button'
				className={styles.cta_audio}
				onClick={() => setToggleAudio(!toggleAudio)}>
				<BiMusic className='animate-spin' />
			</button>
		</div>
	);
}
