import tailwind from './tailwind.css?inline';

export const includeTailwind = (Story) => {
  return (
    <>
      <style> { tailwind } </style>
      <Story />
    </>
  )
};

export default includeTailwind;
