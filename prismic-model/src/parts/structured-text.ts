type StructuredTextProps = {
  label: string;
  singleOrMulti?: 'single' | 'multi';
  extraHtmlTypes?: string[];
  placeholder?: string;
  overrideDefaultHtmlTypes?: string[];
};

export default function structuredText({
  label,
  singleOrMulti = 'multi',
  extraHtmlTypes = [],
  placeholder,
  overrideDefaultHtmlTypes,
}: StructuredTextProps) {
  return {
    type: 'StructuredText',
    config: {
      // This is too complicated but it's because we've overloaded this type with things like keywords.
      // See interpretation-types.abbreviation for an example.
      [singleOrMulti]: overrideDefaultHtmlTypes
        ? overrideDefaultHtmlTypes.join(',')
        : ['paragraph', 'hyperlink', 'strong', 'em']
            .concat(extraHtmlTypes)
            .join(','),
      label: label,
      placeholder,
    },
  };
}
