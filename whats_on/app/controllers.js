import searchQuery from 'search-query-parser';
import {getInstallation} from '@weco/common/services/prismic/installations';
import {getExhibition, getExhibitionExhibits} from '@weco/common/services/prismic/exhibitions';
import {model, prismic} from 'common';

import {
  shopPromo,
  cafePromo,
  readingRoomPromo,
  restaurantPromo,
  spiritBoothPromo,
  dailyTourPromo
} from '../../server/data/facility-promos';
const {createPageConfig} = model;
const {
  getExhibitionAndEventPromos
} = prismic;

export async function renderWhatsOn(ctx, next) {
  const exhibitionAndEventPromos = await getExhibitionAndEventPromos(ctx.query);

  ctx.render('pages/whats-on', {
    pageConfig: createPageConfig({
      path: ctx.request.url,
      title: 'What\'s on',
      inSection: 'whatson',
      category: 'public-programme',
      contentType: 'list',
      canonicalUri: '/whats-on',
      pageState: {
        dateRangeName: exhibitionAndEventPromos.active
      }
    }),
    exhibitionAndEventPromos,
    tryTheseTooPromos: [readingRoomPromo, spiritBoothPromo],
    eatShopPromos: [cafePromo, shopPromo, restaurantPromo],
    cafePromo,
    shopPromo,
    dailyTourPromo
  });

  return next();
}

export async function renderInstallation(ctx, next) {
  const installation = await getInstallation(ctx.request, ctx.params.id);
  const tags = [{
    text: 'Installations',
    url: '/installations'
  }];
  ctx.render('pages/installation', {
    pageConfig: createPageConfig({
      path: ctx.request.url,
      title: installation.title,
      inSection: 'whatson',
      category: 'public-programme',
      contentType: 'installation',
      canonicalUri: `https://wellcomecollection.org/installation/${installation.id}`
    }),
    installation,
    tags
  });
}

export async function renderExhibition(ctx, next) {
  const exhibition = await getExhibition(ctx.request, ctx.params.id);
  const tags = [{
    text: 'Exhibitions',
    url: '/exhibitions'
  }];

  ctx.render('pages/exhibition', {
    pageConfig: createPageConfig({
      path: ctx.request.url,
      title: exhibition.title,
      inSection: 'whatson',
      category: 'public-programme',
      contentType: 'exhibitions',
      canonicalUri: `https://wellcomecollection.org/exhibitions/${exhibition.id}`
    }),
    exhibition,
    exhibitIds: exhibition.exhibits.map(exhibit => exhibit.item.id),
    tags
  });
}

export async function renderExhibits(ctx, next) {
  const query = searchQuery.parse(ctx.query.query, { keywords: ['ids'] });
  const ids = query.ids.split(',');
  const exhibits = await getExhibitionExhibits(ctx.request, {ids});

  ctx.render('components/exhibits/exhibits', {
    exhibits: exhibits.results
  });

  ctx.body = {
    html: ctx.body
  };
}
