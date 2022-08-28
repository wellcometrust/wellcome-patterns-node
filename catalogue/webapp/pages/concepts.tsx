import { GetServerSideProps, NextPage } from 'next';
import { Concept as ConceptType } from '@weco/common/model/catalogue';
import { CatalogueResultsList } from '../model/catalogue';
import { removeUndefinedProps } from '@weco/common/utils/json';
import { appError, AppErrorProps } from '@weco/common/views/pages/_app';
import { getServerData } from '@weco/common/server-data';
import { getConcepts } from 'services/catalogue/concepts';
import CataloguePageLayout from 'components/CataloguePageLayout/CataloguePageLayout';

type Props = {
  concepts: CatalogueResultsList<ConceptType>;
};

export const ConceptsPage: NextPage<Props> = ({ concepts }) => {
  return (
    <CataloguePageLayout
      title={'Concepts'}
      description={'<TBC>'}
      url={{ pathname: '/concepts' }}
      openGraphType={'website'}
      siteSection={'collections'}
      jsonLd={{ '@type': 'WebPage' }}
      hideNewsletterPromo={true}
    >
      <div className="container">
        <p>
          <h1>Concepts</h1>
        </p>
        <p>
          <strong>Prototype note:</strong>
          This is a mostly random selection of concepts from the prototype
          concepts API. It&rsquo;s meant to help us find examples of concepts
          pages.
        </p>
        <ul>
          {concepts.results.map(c => (
            <li key={c.id}>
              <a href={`/concepts/${c.id}`}>{c.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </CataloguePageLayout>
  );
};

export const getServerSideProps: GetServerSideProps<Props | AppErrorProps> =
  async context => {
    const serverData = await getServerData(context);

    // Note: These pages don't need to be behind a toggle, but I'm putting them here
    // as a way to test the concepts toggle.
    //
    // We will want a toggle in place for linking to concepts from works pages.
    if (!serverData.toggles.conceptsPages) {
      return { notFound: true };
    }

    const concepts = await getConcepts({
      params: {},
      toggles: serverData.toggles,
    });

    if (concepts.type === 'Error') {
      return appError(context, concepts.httpStatus, concepts.description);
    }

    return {
      props: removeUndefinedProps({
        concepts,
        serverData,
      }),
    };
  };

export default ConceptsPage;
