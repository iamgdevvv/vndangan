import { useEffect } from 'react';
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
import { isDefined } from 'validate.js';
import { useState } from 'react';
import { createRef } from 'react';
import { useCallback } from 'react';
import styles from '@styles/SiteAudio.module.css';
import { useRouter } from 'next/router';

const playlists = [
	{
		title: "Can't Help Falling in Love - Kina Grannis",
		src: 'cant-help-falling-in-love.mp3',
	},
	{
		title: 'Tak Ingin Kau Pergi - Angga Jippy',
		src: 'tak-igin-kau-pergi.mp3',
	},
];

export default function SiteAudio({ navigation = [], className = '' }) {
	const router = useRouter();
	const audioRef = createRef();
	const [toggleAudio, setToggleAudio] = useState(false);
	const [autoPlay, setAutoPlay] = useState(true);
	const [playlist, setPlaylist] = useState(0);

	useEffect(() => {
		if (isDefined(window)) {
			// document.onclick = (e) => {
			// 	if (autoPlay === true) {
			// 		audioRef.current?.audio.current.play();
			// 	}

			// 	setAutoPlay(false);
			// };

			document
				.querySelector('#popup-root')
				.addEventListener('click', function (event) {
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

	console.log('toggleAudio', toggleAudio);

	const handleNextPlaylist = useCallback(() => {
		const currentPlaylist = playlist;

		if (currentPlaylist < playlists.length - 1) {
			setPlaylist(currentPlaylist + 1);
		} else {
			setPlaylist(0);
		}
	}, [playlist]);

	if (router.query?.noaudio) {
		return null;
	}

	return (
		<div
			className={`${styles.site_audio} ${
				toggleAudio ? styles.site_audio__active : ''
			}`}>
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
