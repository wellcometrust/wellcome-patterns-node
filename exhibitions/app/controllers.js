import {model, prismic} from 'common';
const {createPageConfig} = model;
const {
  getExhibitionAndRelatedContent,
  getPaginatedExhibitionPromos
} = prismic;

export async function renderExhibition(ctx, next) {
  const id = `${ctx.params.id}`;
  const isPreview = Boolean(ctx.params.preview);
  const exhibitionContent = await getExhibitionAndRelatedContent(ctx.request, id);
  const format = ctx.request.query.format;
  const path = ctx.request.url;
  const tags = [{
    text: 'Exhibitions',
    url: '/exhibitions'
  }];

  if (exhibitionContent) {
    if (format === 'json') {
      ctx.body = exhibitionContent;
    } else {
      ctx.render('pages/exhibition', {
        pageConfig: createPageConfig({
          path: path,
          title: exhibitionContent.exhibition.title,
          inSection: 'whatson',
          category: 'public-programme',
          contentType: 'exhibitions',
          canonicalUri: `${ctx.globals.rootDomain}/exhibitions/${exhibitionContent.exhibition.id}`
        }),
        exhibitionContent: exhibitionContent,
        isPreview: isPreview,
        tags
      });
    }
  }

  return next();
}

export async function renderExhibitionsList(ctx, next) {
  const page = Number(ctx.request.query.page);
  const paginatedExhibitions = await getPaginatedExhibitionPromos(page);

  ctx.render('pages/exhibitions', {
    pageConfig: createPageConfig({
      path: ctx.request.url,
      title: 'Exhibitions',
      inSection: 'whatson',
      category: 'public-programme',
      contentType: 'listing',
      canonicalUri: '/exhibitions'
    }),
    paginatedExhibitions
  });

  return next();
}
