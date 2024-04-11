import { FunctionComponent, PropsWithChildren, useContext } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Header from '@weco/common/views/components/Header/Header';
import { GlobalStyle } from '@weco/common/views/themes/default';
import useIsFontsLoaded from '@weco/common/hooks/useIsFontsLoaded';
import Favicons from '@weco/common/views/components/Favicons/Favicons';
import Footer from '@weco/common/views/components/Footer';
import { AppContext } from '@weco/common/views/components/AppContext/AppContext';
import { usePrismicData } from '@weco/common/server-data/Context';
import { transformCollectionVenues } from '@weco/common/services/prismic/transformers/collection-venues';

const Main = styled.div`
  ${props =>
    props.theme.media('medium')(`
      background: ${props.theme.color('warmNeutral.300')};
      min-height: calc(100vh - ${props.theme.navHeight}px);
  `)}
`;

type Props = {
  title: string;
};

export const PageWrapper: FunctionComponent<PropsWithChildren<Props>> = ({
  title,
  children,
}) => {
  const { isEnhanced } = useContext(AppContext);
  const { collectionVenues } = usePrismicData();
  const venues = transformCollectionVenues(collectionVenues);

  return (
    <>
      <Head>
        <title>{title} | Wellcome Collection</title>
        <Favicons />
      </Head>
      <GlobalStyle isFontsLoaded={useIsFontsLoaded()} />
      <Header siteSection="collections" />
      <Main>{children}</Main>
      {isEnhanced && <Footer venues={venues} />}
    </>
  );
};
