import { Page as PageType } from '@weco/content/types/pages';
import Exhibition from '@weco/content/components/Exhibition/Exhibition';
import { Exhibition as ExhibitionType } from '@weco/content/types/exhibitions';
import Installation from '@weco/content/components/Installation/Installation';
import { AppErrorProps } from '@weco/common/services/app';
import { GaDimensions } from '@weco/common/services/app/google-analytics';
import { FunctionComponent } from 'react';
import { GetServerSideProps } from 'next';
import { removeUndefinedProps } from '@weco/common/utils/json';
import { getServerData } from '@weco/common/server-data';
import { createClient } from '@weco/content/services/prismic/fetch';
import { fetchExhibition } from '@weco/content/services/prismic/fetch/exhibitions';
import { transformQuery } from '@weco/content/services/prismic/transformers/paginated-results';
import { transformPage } from '@weco/content/services/prismic/transformers/pages';
import { transformExhibition } from '@weco/content/services/prismic/transformers/exhibitions';
import { looksLikePrismicId } from '@weco/common/services/prismic';
import { exhibitionLd } from 'services/prismic/transformers/json-ld';
import { JsonLdObj } from '@weco/common/views/components/JsonLd/JsonLd';
import { Pageview } from '@weco/common/services/conversion/track';

type Props = {
  exhibition: ExhibitionType;
  jsonLd: JsonLdObj;
  pages: PageType[];
  gaDimensions: GaDimensions;
  pageview: Pageview;
};

const ExhibitionPage: FunctionComponent<Props> = ({
  exhibition,
  pages,
  jsonLd,
}) =>
  exhibition.format && exhibition.format.title === 'Installation' ? (
    <Installation installation={exhibition} jsonLd={jsonLd} />
  ) : (
    <Exhibition exhibition={exhibition} jsonLd={jsonLd} pages={pages} />
  );

export const getServerSideProps: GetServerSideProps<Props | AppErrorProps> =
  async context => {
    const serverData = await getServerData(context);
    const { id } = context.query;

    if (!looksLikePrismicId(id)) {
      return { notFound: true };
    }

    const client = createClient(context);
    const { exhibition, pages } = await fetchExhibition(client, id);

    if (exhibition) {
      const exhibitionDoc = transformExhibition(exhibition);
      const relatedPages = transformQuery(pages, transformPage);
      const jsonLd = exhibitionLd(exhibitionDoc);

      return {
        props: removeUndefinedProps({
          exhibition: exhibitionDoc,
          pages: relatedPages?.results || [],
          jsonLd,
          serverData,
          gaDimensions: {
            partOf: exhibitionDoc.seasons.map(season => season.id),
          },
          pageview: {
            name: 'exhibition',
            properties: {},
          },
        }),
      };
    } else {
      return { notFound: true };
    }
  };

export default ExhibitionPage;
