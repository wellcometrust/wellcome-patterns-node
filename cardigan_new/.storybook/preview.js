import theme from '@weco/common/views/themes/default';
import { ContextDecorator } from '@weco/cardigan_new/config/decorators';
import { grid } from '@weco/common/utils/classnames';
import ConditionalWrapper from '@weco/common/views/components/ConditionalWrapper/ConditionalWrapper';
import Markdown from 'react-markdown';

export const decorators = [
  (Story, context) => {
    return (
      <>
        <ContextDecorator>
          <ConditionalWrapper
            condition={context?.parameters?.gridSizes}
            wrapper={children => (
              <div className={grid(context.parameters.gridSizes)}>
                {children}
              </div>
            )}
          >
            <Story {...context} />
          </ConditionalWrapper>
        </ContextDecorator>
        {context.parameters.readme && (
          <div
            className="body-text"
            style={{
              marginTop: '100px',
              paddingLeft: '20px',
              paddingRight: '20px',
              border: '1px solid #eee',
              borderRadius: '6px',
              transform: 'scale(0.8)',
              transformOrigin: 'top left',
              position: 'relative',
            }}
          >
            <span
              id="readme"
              style={{
                position: 'absolute',
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#aaa',
                top: '-10px',
                padding: '0 6px',
                background: '#fff',
              }}
            >
              README
            </span>
            <div style={{ paddingTop: '20px' }}>
              <Markdown>{context.parameters.readme}</Markdown>
            </div>
          </div>
        )}
      </>
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
