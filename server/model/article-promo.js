import entities from 'entities';
export type ArticlePromo = {|
  url: string;
  headline: string;
  description: string;
  thumbnail: Picture;
|};

export class ArticlePromoFactory {
  static fromWpApi(json): ArticlePromo {
    const url = `/articles/${json.slug}`; // TODO: this should be discoverable, not hard coded
    const headline = entities.decode(json.title);
    const description = json.excerpt;
    const wpThumbnail = json.post_thumbnail;
    const thumbnail: Picture = {
      contentUrl: wpThumbnail.URL,
      width: wpThumbnail.width,
      height: wpThumbnail.height
    };

    const articlePromo: ArticlePromo = { url, headline, description, thumbnail };
    return articlePromo;
  }
}
