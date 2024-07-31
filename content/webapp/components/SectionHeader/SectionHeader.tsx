import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { SizeMap, font } from '@weco/common/utils/classnames';
import Space from '@weco/common/views/components/styled/Space';
import Layout, { gridSize12 } from '@weco/common/views/components/Layout';
import ConditionalWrapper from '@weco/common/views/components/ConditionalWrapper/ConditionalWrapper';

const YellowBox = styled.div`
  display: inline-block;
  width: 60px;
  height: 18px;
  background: ${props => props.theme.color('yellow')};

  ${props => props.theme.media('medium')`
    width: 58px;
  `}

  ${props => props.theme.media('large')`
    width: 64px;
    height: 19px;
  `}
`;

const TitleWrapper = styled(Space).attrs({
  $h: { size: 's', properties: ['margin-left'] },
})`
  display: inline;
`;

const Title = styled.span`
  .bg-dark & {
    color: ${props => props.theme.color('white')};
  }
`;

type Props = {
  title: string;
  gridSize?: SizeMap;
};

const SectionHeader: FunctionComponent<Props> = ({ title, gridSize }) => {
  return (
    <div className={font('wb', 2)}>
      <ConditionalWrapper
        condition={!!gridSize}
        wrapper={children => (
          <Layout gridSizes={gridSize || gridSize12()}>{children}</Layout>
        )}
      >
        <YellowBox />
        <TitleWrapper as="h2">
          <Title>{title}</Title>
        </TitleWrapper>
      </ConditionalWrapper>
    </div>
  );
};

export default SectionHeader;
