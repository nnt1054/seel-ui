import { RangeInput } from '@components/RangeInput/RangeInput';


export const TailwindRangeInput = (props) => {
	return (
	    <RangeInput
			className="w-64 appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-black/25 rounded-full outline-solid outline-transparent data-focused:outline-yellow-500"
	     	{ ...props }
	    />
	)
}

export default TailwindRangeInput;
