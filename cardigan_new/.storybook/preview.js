import theme from '@weco/common/views/themes/default';
import { ContextDecorator } from '@weco/cardigan_new/config/decorators';
import { grid } from '@weco/common/utils/classnames';
import ConditionalWrapper from '@weco/common/views/components/ConditionalWrapper/ConditionalWrapper';

export const decorators = [
  (Story, context) => {
    return (
      <ContextDecorator>
        <ConditionalWrapper
          condition={context?.parameters?.gridSizes}
          wrapper={children => (
            <div className={grid(context.parameters.gridSizes)}>{children}</div>
          )}
        >
          <Story {...context} />
        </ConditionalWrapper>
      </ContextDecorator>
    );
  },
];

const themeColors = Object.entries(theme.colors).map(([key, value]) => ({
  name: key,
  value,
}));

export const parameters = {
  options: {
    name: 'Cardigan',
    url: 'https://cardigan.wellcomecollection.org',
  },
  backgrounds: {
    values: themeColors,
    grid: {
      disable: true,
    },
  },
  actions: { argTypesRegex: '^on.*' },
  chromatic: {
    viewports: [375, 1200],
  },
};
