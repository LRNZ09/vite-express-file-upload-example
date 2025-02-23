import { useBoolean } from 'ahooks';

export const BackgroundImage = () => {
	const [isLoaded, { setTrue: setIsLoaded }] = useBoolean(false);

	return (
		<img
			alt="background image"
			aria-hidden="true"
			className={`absolute inset-0 -z-10 h-full w-full object-cover object-top transition-opacity duration-500 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
			onLoad={setIsLoaded}
			src="https://picsum.photos/id/67/2848"
		/>
	);
};
