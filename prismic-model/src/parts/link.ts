type LinkType = 'web' | 'document' | 'media';

function link(
  label: string,
  linkType: LinkType = null, // Prismic adds this as `null`, so it helps with the diffing
  linkMask: string | string[] = [],
  placeholder?: string
) {
  const customtypes = typeof linkMask === 'string' ? [linkMask] : linkMask;

  return {
    type: 'Link',
    config:
      // This is because Prismic annoyingly reorders props dependant on if customtypes is set.
      linkType === null
        ? {
            label,
            customtypes,
            select: linkType,
            placeholder,
          }
        : {
            label,
            select: linkType,
            customtypes,
            placeholder,
          },
  };
}

export function documentLink({
  label,
  linkMask,
  placeholder,
}: {
  label: string;
  linkMask: string | string[];
  placeholder?: string;
}) {
  return link(label, 'document', linkMask, placeholder);
}

export default link;
