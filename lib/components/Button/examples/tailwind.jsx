import { Button } from '@components/Button/Button';


export const TailwindButton = (props) => {
	return (
		<Button
			className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded outline-solid data-focused:outline-yellow-500"
			{ ...props }
		/>
	)
}

export default TailwindButton;
