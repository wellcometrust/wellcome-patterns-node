import { Page as PageType } from '../types/pages';
import Exhibition from '../components/Exhibition/Exhibition';
import { Exhibition as ExhibitionType } from '../types/exhibitions';
import Installation from '../components/Installation/Installation';
import { AppErrorProps, WithGaDimensions } from '@weco/common/views/pages/_app';
import { FC } from 'react';
import { GetServerSideProps } from 'next';
import { getServerData } from '@weco/common/server-data';
import { createClient } from '../services/prismic/fetch';
import { fetchExhibition } from '../services/prismic/fetch/exhibitions';
import { transformQuery } from '../services/prismic/transformers/paginated-results';
import { transformPage } from '../services/prismic/transformers/pages';
import { transformExhibition } from '../services/prismic/transformers/exhibitions';
import { looksLikePrismicId } from '@weco/common/services/prismic';
import { exhibitionLd } from 'services/prismic/transformers/json-ld';
import { JsonLdObj } from '@weco/common/views/components/JsonLd/JsonLd';

type Props = {
  exhibition: ExhibitionType;
  jsonLd: JsonLdObj;
  pages: PageType[];
} & WithGaDimensions;

const ExhibitionPage: FC<Props> = ({ exhibition, pages, jsonLd }) =>
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
        props: {
          exhibition: exhibitionDoc,
          pages: relatedPages?.results || [],
          jsonLd,
          serverData,
          gaDimensions: {
            partOf: exhibitionDoc.seasons.map(season => season.id),
          },
        },
      };
    } else {
      return { notFound: true };
    }
  };

export default ExhibitionPage;
