import { NextApiRequest, NextApiResponse } from 'next';
import { isJson, isString } from '@weco/common/utils/array';
import { createClient } from '@weco/content/services/prismic/fetch';
import { fetchArticles } from '@weco/content/services/prismic/fetch/articles';
import { transformQuery } from '@weco/content/services/prismic/transformers/paginated-results';
import {
  transformArticle,
  transformArticleToArticleBasic,
} from '@weco/content/services/prismic/transformers/articles';
import superjson from 'superjson';

type NotFound = { notFound: true };

export default async (
  req: NextApiRequest,
  res: NextApiResponse<string | NotFound>
): Promise<void> => {
  const { params } = req.query;

  // Reject anybody trying to send nonsense to the API
  if (!isString(params) || !isJson(params)) {
    return res.status(404).json({ notFound: true });
  }

  const parsedParams = JSON.parse(params);

  const client = createClient({ req });
  const query = await fetchArticles(client, parsedParams);

  if (query) {
    const articles = transformQuery(query, article =>
      transformArticleToArticleBasic(transformArticle(article))
    );
    return res
      .status(200)
      .json(superjson.serialize(articles) as unknown as string);
  }
};
