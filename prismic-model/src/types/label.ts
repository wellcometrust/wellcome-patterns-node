import title from '../parts/title';
import structuredText from '../parts/structured-text';

export default function label(label: string) {
  return {
    [label]: {
      title,
      description: structuredText({ label: 'Description' }),
    },
  };
}
