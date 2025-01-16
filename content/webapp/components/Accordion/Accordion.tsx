import { FunctionComponent, ReactElement } from 'react';
import styled from 'styled-components';

import { chevron } from '@weco/common/icons';
import { font } from '@weco/common/utils/classnames';
import Icon from '@weco/common/views/components/Icon/Icon';
import Space from '@weco/common/views/components/styled/Space';

type AccordionItem = {
  summary: string;
  content: ReactElement;
};

type Props = {
  id: string;
  closeOthersOnOpen?: boolean;
  items: AccordionItem[];
};

// If we have these properties on the Summary directly, it prevents NVDA from
// correctly announcing expanded/collapsed state changes, so we need this extra
// element
const SummaryInner = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Summary = styled(Space).attrs({
  as: 'summary',
  $v: { size: 'l', properties: ['padding-top', 'padding-bottom'] },
  className: font('intr', 4),
})`
  border-top: 1px solid ${props => props.theme.color('neutral.300')};
  cursor: pointer;

  /* The two declarations below hide the disclosure triangle without affecting
  screenreaders */
  list-style: none;

  &::-webkit-details-marker {
    display: none;
  }

  .icon {
    border: 2px solid ${props => props.theme.color('black')};
    border-radius: 50%;
    transition: transform ${props => props.theme.transitionProperties};

    details[open] & {
      transform: rotate(180deg);
    }
  }
`;

const ShowHide = styled(Space).attrs({
  $h: { size: 's', properties: ['margin-right'] },
  className: font('intr', 5),
})`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    height: 2px;
    background: ${props => props.theme.color('yellow')};
    width: 0%;
    left: 0;
    transition: width ${props => props.theme.transitionProperties};
  }

  &::before {
    content: 'Show';
  }

  details[open] &::before {
    content: 'Hide';
  }

  ${Summary}:hover & {
    &::after {
      width: 100%;
    }
  }
`;

const Details = styled.details.attrs({
  className: font('intr', 5),
})`
  @media (prefers-reduced-motion: no-preference) {
    /* stylelint-disable-next-line property-no-unknown */
    interpolate-size: allow-keywords;
  }

  /* stylelint-disable-next-line selector-pseudo-element-no-unknown */
  &::details-content {
    opacity: 0;
    block-size: 0;
    overflow-y: clip;
    transition:
      content-visibility ${props => props.theme.transitionProperties}
        allow-discrete,
      opacity ${props => props.theme.transitionProperties},
      block-size ${props => props.theme.transitionProperties};
  }

  &[open] {
    padding-bottom: 20px;

    /* stylelint-disable-next-line selector-pseudo-element-no-unknown */
    &::details-content {
      opacity: 1;
      block-size: auto;
    }
  }
`;

const Accordion: FunctionComponent<Props> = ({
  id,
  closeOthersOnOpen,
  items,
}) => {
  return (
    <>
      {items.map(item => (
        // `name` is an allowed attribute on a `details` element, but our TS
        // (possibly NextJS's TS) setup is unhappy with it

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <Details key={item.summary} name={closeOthersOnOpen ? id : undefined}>
          <Summary>
            <SummaryInner>
              {item.summary}{' '}
              <span style={{ display: 'flex' }}>
                {/* Changing the pseudo text from 'show' to 'hide' based on the presence of the `open` attribute prevents some screenreaders from announcing the change of state from 'collapsed' to 'expanded'. Hiding this text with `aria-hidden` fixes the issue. */}
                <ShowHide aria-hidden="true"></ShowHide>
                <Icon icon={chevron} />
              </span>
            </SummaryInner>
          </Summary>
          <div className="spaced-text body-text">{item.content}</div>
        </Details>
      ))}
    </>
  );
};

export default Accordion;
