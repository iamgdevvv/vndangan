import Image from 'next/image';
import Link from 'next/link';

const loaderOverride = ({ src, width, quality }) =>
	`/_next/image?url=${src}&w=${width}&q=${quality || 100}`;

export default function ImageVN({
	link = '',
	parentClass = '',
	src,
	width,
	height,
	alt,
	..._props
}) {
	let imageType = 'figure-native';
	let elImage = (
		<img
			alt={alt}
			src={src}
			loading='lazy'
			{..._props}
		/>
	);

	if (width && height) {
		imageType = 'figure-next';
		elImage = (
			<Image
				loader={loaderOverride}
				src={src}
				width={width}
				height={height}
				alt={alt}
				{..._props}
			/>
		);
	}

	return (
		<figure className={`figure-image ${imageType} ${parentClass}`}>
			{link && link !== '' ? (
				<Link
					href={link}
					className='image-wrapper image-wrapper--link'>
					{elImage}
				</Link>
			) : (
				<div className='image-wrapper'>{elImage}</div>
			)}
		</figure>
	);
}
