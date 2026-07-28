import { CheckboxInput } from '@components/CheckboxInput/CheckboxInput';


export const TailwindCheckboxInput = (props) => {
  return (
    <CheckboxInput
      className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft data-focused:ring-2 data-focused:ring-brand-soft data-focused:ring-yellow-500"
      { ...props }
    />
  )
}

export default TailwindCheckboxInput;
