import structuredText from './structured-text';

const description = structuredText({
  label: 'Description',
  singleOrMulti: 'multi',
  extraHtmlTypes: ['heading2'],
});

export default description;
