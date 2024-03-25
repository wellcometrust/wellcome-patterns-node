// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismic from '@prismicio/client';

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

/**
 * Primary content in *AudioPlayer → Primary*
 */
export interface AudioPlayerSliceDefaultPrimary {
  /**
   * Title field in *AudioPlayer → Primary*
   *
   * - **Field Type**: Title
   * - **Placeholder**: *None*
   * - **API ID Path**: audioPlayer.primary.title
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  title: prismic.TitleField;

  /**
   * Audio field in *AudioPlayer → Primary*
   *
   * - **Field Type**: Link to Media
   * - **Placeholder**: *None*
   * - **API ID Path**: audioPlayer.primary.audio
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  audio: prismic.LinkToMediaField;

  /**
   * Transcript (Collapsible content) field in *AudioPlayer → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: audioPlayer.primary.transcript
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  transcript: prismic.RichTextField;
}

/**
 * Default variation for AudioPlayer Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type AudioPlayerSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<AudioPlayerSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *AudioPlayer*
 */
type AudioPlayerSliceVariation = AudioPlayerSliceDefault;

/**
 * AudioPlayer Shared Slice
 *
 * - **API ID**: `audioPlayer`
 * - **Description**: AudioPlayer
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type AudioPlayerSlice = prismic.SharedSlice<
  'audioPlayer',
  AudioPlayerSliceVariation
>;

/**
 * Primary content in *CollectionVenue → Primary*
 */
export interface CollectionVenueSliceDefaultPrimary {
  /**
   * Content item field in *CollectionVenue → Primary*
   *
   * - **Field Type**: Content Relationship
   * - **Placeholder**: *None*
   * - **API ID Path**: collectionVenue.primary.content
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  content: prismic.ContentRelationshipField<'collection-venue'>;

  /**
   * Show closing times field in *CollectionVenue → Primary*
   *
   * - **Field Type**: Select
   * - **Placeholder**: *None*
   * - **API ID Path**: collectionVenue.primary.showClosingTimes
   * - **Documentation**: https://prismic.io/docs/field#select
   */
  showClosingTimes: prismic.SelectField<'yes'>;
}

/**
 * Default variation for CollectionVenue Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type CollectionVenueSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<CollectionVenueSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *CollectionVenue*
 */
type CollectionVenueSliceVariation = CollectionVenueSliceDefault;

/**
 * CollectionVenue Shared Slice
 *
 * - **API ID**: `collectionVenue`
 * - **Description**: CollectionVenue
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type CollectionVenueSlice = prismic.SharedSlice<
  'collectionVenue',
  CollectionVenueSliceVariation
>;

/**
 * Primary content in *Contact → Primary*
 */
export interface ContactSliceDefaultPrimary {
  /**
   * content field in *Contact → Primary*
   *
   * - **Field Type**: Content Relationship
   * - **Placeholder**: *None*
   * - **API ID Path**: contact.primary.content
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  content: prismic.ContentRelationshipField<'teams'>;
}

/**
 * Default variation for Contact Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ContactSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<ContactSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *Contact*
 */
type ContactSliceVariation = ContactSliceDefault;

/**
 * Contact Shared Slice
 *
 * - **API ID**: `contact`
 * - **Description**: Contact
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ContactSlice = prismic.SharedSlice<
  'contact',
  ContactSliceVariation
>;

/**
 * Primary content in *ContentList → Primary*
 */
export interface ContentListSliceDefaultPrimary {
  /**
   * Title field in *ContentList → Primary*
   *
   * - **Field Type**: Title
   * - **Placeholder**: *None*
   * - **API ID Path**: contentList.primary.title
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  title: prismic.TitleField;
}

/**
 * Primary content in *ContentList → Items*
 */
export interface ContentListSliceDefaultItem {
  /**
   * Content item field in *ContentList → Items*
   *
   * - **Field Type**: Content Relationship
   * - **Placeholder**: *None*
   * - **API ID Path**: contentList.items[].content
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  content: prismic.ContentRelationshipField<
    | 'pages'
    | 'event-series'
    | 'books'
    | 'events'
    | 'articles'
    | 'exhibitions'
    | 'card'
    | 'seasons'
    | 'guides'
  >;
}

/**
 * Default variation for ContentList Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ContentListSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<ContentListSliceDefaultPrimary>,
  Simplify<ContentListSliceDefaultItem>
>;

/**
 * Slice variation for *ContentList*
 */
type ContentListSliceVariation = ContentListSliceDefault;

/**
 * ContentList Shared Slice
 *
 * - **API ID**: `contentList`
 * - **Description**: ContentList
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ContentListSlice = prismic.SharedSlice<
  'contentList',
  ContentListSliceVariation
>;

/**
 * Primary content in *EditorialImage → Primary*
 */
export interface EditorialImageSliceDefaultPrimary {
  /**
   * Image field in *EditorialImage → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: editorialImage.primary.image
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  image: prismic.ImageField<'32:15' | '16:9' | 'square'>;

  /**
   * Caption field in *EditorialImage → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: editorialImage.primary.caption
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  caption: prismic.RichTextField;

  /**
   * round image corners field in *EditorialImage → Primary*
   *
   * - **Field Type**: Boolean
   * - **Placeholder**: *None*
   * - **Default Value**: false
   * - **API ID Path**: editorialImage.primary.hasRoundedCorners
   * - **Documentation**: https://prismic.io/docs/field#boolean
   */
  hasRoundedCorners: prismic.BooleanField;
}

/**
 * Default variation for EditorialImage Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type EditorialImageSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<EditorialImageSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *EditorialImage*
 */
type EditorialImageSliceVariation = EditorialImageSliceDefault;

/**
 * EditorialImage Shared Slice
 *
 * - **API ID**: `editorialImage`
 * - **Description**: EditorialImage
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type EditorialImageSlice = prismic.SharedSlice<
  'editorialImage',
  EditorialImageSliceVariation
>;

/**
 * Primary content in *EditorialImageGallery → Primary*
 */
export interface EditorialImageGallerySliceDefaultPrimary {
  /**
   * Title field in *EditorialImageGallery → Primary*
   *
   * - **Field Type**: Title
   * - **Placeholder**: *None*
   * - **API ID Path**: editorialImageGallery.primary.title
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  title: prismic.TitleField;
}

/**
 * Primary content in *EditorialImageGallery → Items*
 */
export interface EditorialImageGallerySliceDefaultItem {
  /**
   * Image field in *EditorialImageGallery → Items*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: editorialImageGallery.items[].image
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  image: prismic.ImageField<'32:15' | '16:9' | 'square'>;

  /**
   * Caption field in *EditorialImageGallery → Items*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: editorialImageGallery.items[].caption
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  caption: prismic.RichTextField;

  /**
   * round image corners field in *EditorialImageGallery → Items*
   *
   * - **Field Type**: Boolean
   * - **Placeholder**: *None*
   * - **Default Value**: false
   * - **API ID Path**: editorialImageGallery.items[].hasRoundedCorners
   * - **Documentation**: https://prismic.io/docs/field#boolean
   */
  hasRoundedCorners: prismic.BooleanField;
}

/**
 * Default variation for EditorialImageGallery Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type EditorialImageGallerySliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<EditorialImageGallerySliceDefaultPrimary>,
  Simplify<EditorialImageGallerySliceDefaultItem>
>;

/**
 * Slice variation for *EditorialImageGallery*
 */
type EditorialImageGallerySliceVariation = EditorialImageGallerySliceDefault;

/**
 * EditorialImageGallery Shared Slice
 *
 * - **API ID**: `editorialImageGallery`
 * - **Description**: EditorialImageGallery
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type EditorialImageGallerySlice = prismic.SharedSlice<
  'editorialImageGallery',
  EditorialImageGallerySliceVariation
>;

/**
 * Primary content in *Embed → Primary*
 */
export interface EmbedSliceDefaultPrimary {
  /**
   * `embed` field in *Embed → Primary*
   *
   * - **Field Type**: Embed
   * - **Placeholder**: *None*
   * - **API ID Path**: embed.primary.embed
   * - **Documentation**: https://prismic.io/docs/field#embed
   */
  embed: prismic.EmbedField;

  /**
   * Caption field in *Embed → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: embed.primary.caption
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  caption: prismic.RichTextField;

  /**
   * Transcript (Collapsible content) field in *Embed → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: embed.primary.transcript
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  transcript: prismic.RichTextField;
}

/**
 * Default variation for Embed Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type EmbedSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<EmbedSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *Embed*
 */
type EmbedSliceVariation = EmbedSliceDefault;

/**
 * Embed Shared Slice
 *
 * - **API ID**: `embed`
 * - **Description**: Embed (Youtube, SoundCloud, etc.)
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type EmbedSlice = prismic.SharedSlice<'embed', EmbedSliceVariation>;

/**
 * Primary content in *GifVideo → Primary*
 */
export interface GifVideoSliceDefaultPrimary {
  /**
   * Caption field in *GifVideo → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: gifVideo.primary.caption
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  caption: prismic.RichTextField;

  /**
   * TASL field in *GifVideo → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: title|author|sourceName|sourceLink|license|copyrightHolder|copyrightLink
   * - **API ID Path**: gifVideo.primary.tasl
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  tasl: prismic.KeyTextField;

  /**
   * Video field in *GifVideo → Primary*
   *
   * - **Field Type**: Link to Media
   * - **Placeholder**: Video
   * - **API ID Path**: gifVideo.primary.video
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  video: prismic.LinkToMediaField;

  /**
   * Playback rate field in *GifVideo → Primary*
   *
   * - **Field Type**: Select
   * - **Placeholder**: *None*
   * - **API ID Path**: gifVideo.primary.playbackRate
   * - **Documentation**: https://prismic.io/docs/field#select
   */
  playbackRate: prismic.SelectField<
    '0.1' | '0.25' | '0.5' | '0.75' | '1' | '1.25' | '1.5' | '1.75' | '2'
  >;

  /**
   * Auto play field in *GifVideo → Primary*
   *
   * - **Field Type**: Boolean
   * - **Placeholder**: *None*
   * - **Default Value**: true
   * - **API ID Path**: gifVideo.primary.autoPlay
   * - **Documentation**: https://prismic.io/docs/field#boolean
   */
  autoPlay: prismic.BooleanField;

  /**
   * Loop video field in *GifVideo → Primary*
   *
   * - **Field Type**: Boolean
   * - **Placeholder**: *None*
   * - **Default Value**: true
   * - **API ID Path**: gifVideo.primary.loop
   * - **Documentation**: https://prismic.io/docs/field#boolean
   */
  loop: prismic.BooleanField;

  /**
   * Mute video field in *GifVideo → Primary*
   *
   * - **Field Type**: Boolean
   * - **Placeholder**: *None*
   * - **Default Value**: true
   * - **API ID Path**: gifVideo.primary.mute
   * - **Documentation**: https://prismic.io/docs/field#boolean
   */
  mute: prismic.BooleanField;

  /**
   * Show controls field in *GifVideo → Primary*
   *
   * - **Field Type**: Boolean
   * - **Placeholder**: *None*
   * - **Default Value**: false
   * - **API ID Path**: gifVideo.primary.showControls
   * - **Documentation**: https://prismic.io/docs/field#boolean
   */
  showControls: prismic.BooleanField;
}

/**
 * Default variation for GifVideo Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type GifVideoSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<GifVideoSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *GifVideo*
 */
type GifVideoSliceVariation = GifVideoSliceDefault;

/**
 * GifVideo Shared Slice
 *
 * - **API ID**: `gifVideo`
 * - **Description**: GifVideo
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type GifVideoSlice = prismic.SharedSlice<
  'gifVideo',
  GifVideoSliceVariation
>;

/**
 * Default variation for Iframe Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type IframeSliceDefault = prismic.SharedSliceVariation<
  'default',
  Record<string, never>,
  never
>;

/**
 * Slice variation for *Iframe*
 */
type IframeSliceVariation = IframeSliceDefault;

/**
 * Iframe Shared Slice
 *
 * - **API ID**: `iframe`
 * - **Description**: Iframe
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type IframeSlice = prismic.SharedSlice<'iframe', IframeSliceVariation>;

/**
 * Primary content in *InfoBlock → Primary*
 */
export interface InfoBlockSliceDefaultPrimary {
  /**
   * Title field in *InfoBlock → Primary*
   *
   * - **Field Type**: Title
   * - **Placeholder**: *None*
   * - **API ID Path**: infoBlock.primary.title
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  title: prismic.TitleField;

  /**
   * Text field in *InfoBlock → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: infoBlock.primary.text
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  text: prismic.RichTextField;

  /**
   * Button link field in *InfoBlock → Primary*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: infoBlock.primary.link
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  link: prismic.LinkField;

  /**
   * Button text field in *InfoBlock → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: infoBlock.primary.linkText
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  linkText: prismic.KeyTextField;
}

/**
 * Default variation for InfoBlock Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type InfoBlockSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<InfoBlockSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *InfoBlock*
 */
type InfoBlockSliceVariation = InfoBlockSliceDefault;

/**
 * InfoBlock Shared Slice
 *
 * - **API ID**: `infoBlock`
 * - **Description**: InfoBlock
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type InfoBlockSlice = prismic.SharedSlice<
  'infoBlock',
  InfoBlockSliceVariation
>;

/**
 * Primary content in *Map → Primary*
 */
export interface MapSliceDefaultPrimary {
  /**
   * Title field in *Map → Primary*
   *
   * - **Field Type**: Title
   * - **Placeholder**: *None*
   * - **API ID Path**: map.primary.title
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  title: prismic.TitleField;

  /**
   * Geo point field in *Map → Primary*
   *
   * - **Field Type**: GeoPoint
   * - **Placeholder**: *None*
   * - **API ID Path**: map.primary.geolocation
   * - **Documentation**: https://prismic.io/docs/field#geopoint
   */
  geolocation: prismic.GeoPointField;
}

/**
 * Default variation for Map Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type MapSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<MapSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *Map*
 */
type MapSliceVariation = MapSliceDefault;

/**
 * Map Shared Slice
 *
 * - **API ID**: `map`
 * - **Description**: Map
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type MapSlice = prismic.SharedSlice<'map', MapSliceVariation>;

/**
 * Primary content in *Quote → Primary*
 */
export interface QuoteSliceDefaultPrimary {
  /**
   * Quote field in *Quote → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: quote.primary.text
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  text: prismic.RichTextField;

  /**
   * Citation field in *Quote → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: quote.primary.citation
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  citation: prismic.RichTextField;
}

/**
 * Default variation for Quote Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type QuoteSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<QuoteSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *Quote*
 */
type QuoteSliceVariation = QuoteSliceDefault;

/**
 * Quote Shared Slice
 *
 * - **API ID**: `quote`
 * - **Description**: Quote
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type QuoteSlice = prismic.SharedSlice<'quote', QuoteSliceVariation>;

/**
 * Default variation for QuoteV2 Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type QuoteV2SliceDefault = prismic.SharedSliceVariation<
  'default',
  Record<string, never>,
  never
>;

/**
 * Slice variation for *QuoteV2*
 */
type QuoteV2SliceVariation = QuoteV2SliceDefault;

/**
 * QuoteV2 Shared Slice
 *
 * - **API ID**: `quoteV2`
 * - **Description**: QuoteV2
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type QuoteV2Slice = prismic.SharedSlice<
  'quoteV2',
  QuoteV2SliceVariation
>;

/**
 * Primary content in *SearchResults → Primary*
 */
export interface SearchResultsSliceDefaultPrimary {
  /**
   * Title field in *SearchResults → Primary*
   *
   * - **Field Type**: Title
   * - **Placeholder**: *None*
   * - **API ID Path**: searchResults.primary.title
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  title: prismic.TitleField;

  /**
   * Query field in *SearchResults → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: searchResults.primary.query
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  query: prismic.KeyTextField;
}

/**
 * Default variation for SearchResults Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type SearchResultsSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<SearchResultsSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *SearchResults*
 */
type SearchResultsSliceVariation = SearchResultsSliceDefault;

/**
 * SearchResults Shared Slice
 *
 * - **API ID**: `searchResults`
 * - **Description**: SearchResults
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type SearchResultsSlice = prismic.SharedSlice<
  'searchResults',
  SearchResultsSliceVariation
>;

/**
 * Primary content in *Standfirst → Primary*
 */
export interface StandfirstSliceDefaultPrimary {
  /**
   * Standfirst field in *Standfirst → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: standfirst.primary.text
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  text: prismic.RichTextField;
}

/**
 * Default variation for Standfirst Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type StandfirstSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<StandfirstSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *Standfirst*
 */
type StandfirstSliceVariation = StandfirstSliceDefault;

/**
 * Standfirst Shared Slice
 *
 * - **API ID**: `standfirst`
 * - **Description**: Standfirst
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type StandfirstSlice = prismic.SharedSlice<
  'standfirst',
  StandfirstSliceVariation
>;

/**
 * Primary content in *TagList → Primary*
 */
export interface TagListSliceDefaultPrimary {
  /**
   * Title field in *TagList → Primary*
   *
   * - **Field Type**: Title
   * - **Placeholder**: *None*
   * - **API ID Path**: tagList.primary.title
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  title: prismic.TitleField;
}

/**
 * Primary content in *TagList → Items*
 */
export interface TagListSliceDefaultItem {
  /**
   * Link field in *TagList → Items*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: tagList.items[].link
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  link: prismic.LinkField;

  /**
   * Link text field in *TagList → Items*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: tagList.items[].linkText
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  linkText: prismic.KeyTextField;
}

/**
 * Default variation for TagList Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type TagListSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<TagListSliceDefaultPrimary>,
  Simplify<TagListSliceDefaultItem>
>;

/**
 * Slice variation for *TagList*
 */
type TagListSliceVariation = TagListSliceDefault;

/**
 * TagList Shared Slice
 *
 * - **API ID**: `tagList`
 * - **Description**: TagList
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type TagListSlice = prismic.SharedSlice<
  'tagList',
  TagListSliceVariation
>;

/**
 * Primary content in *Text → Primary*
 */
export interface TextSliceDefaultPrimary {
  /**
   * text field in *Text → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: text.primary.text
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  text: prismic.RichTextField;
}

/**
 * Default variation for Text Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type TextSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<TextSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *Text*
 */
type TextSliceVariation = TextSliceDefault;

/**
 * Text Shared Slice
 *
 * - **API ID**: `text`
 * - **Description**: Text
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type TextSlice = prismic.SharedSlice<'text', TextSliceVariation>;

/**
 * Primary content in *TextAndIcons → Primary*
 */
export interface TextAndIconsSliceDefaultPrimary {
  /**
   * Text field in *TextAndIcons → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: textAndIcons.primary.text
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  text: prismic.RichTextField;
}

/**
 * Primary content in *TextAndIcons → Items*
 */
export interface TextAndIconsSliceDefaultItem {
  /**
   * Icon (will display at 100px wide) field in *TextAndIcons → Items*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: textAndIcons.items[].icon
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  icon: prismic.ImageField<never>;
}

/**
 * Default variation for TextAndIcons Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type TextAndIconsSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<TextAndIconsSliceDefaultPrimary>,
  Simplify<TextAndIconsSliceDefaultItem>
>;

/**
 * Slice variation for *TextAndIcons*
 */
type TextAndIconsSliceVariation = TextAndIconsSliceDefault;

/**
 * TextAndIcons Shared Slice
 *
 * - **API ID**: `textAndIcons`
 * - **Description**: Text and icons (side-by-side)
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type TextAndIconsSlice = prismic.SharedSlice<
  'textAndIcons',
  TextAndIconsSliceVariation
>;

/**
 * Primary content in *TextAndImage → Primary*
 */
export interface TextAndImageSliceDefaultPrimary {
  /**
   * Text field in *TextAndImage → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: textAndImage.primary.text
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  text: prismic.RichTextField;

  /**
   * Image field in *TextAndImage → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: textAndImage.primary.image
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  image: prismic.ImageField<never>;

  /**
   * Allow image to be zoomed to fill viewport? field in *TextAndImage → Primary*
   *
   * - **Field Type**: Boolean
   * - **Placeholder**: *None*
   * - **Default Value**: false
   * - **API ID Path**: textAndImage.primary.isZoomable
   * - **Documentation**: https://prismic.io/docs/field#boolean
   */
  isZoomable: prismic.BooleanField;
}

/**
 * Default variation for TextAndImage Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type TextAndImageSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<TextAndImageSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *TextAndImage*
 */
type TextAndImageSliceVariation = TextAndImageSliceDefault;

/**
 * TextAndImage Shared Slice
 *
 * - **API ID**: `textAndImage`
 * - **Description**: Text and image (side-by-side)
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type TextAndImageSlice = prismic.SharedSlice<
  'textAndImage',
  TextAndImageSliceVariation
>;

/**
 * Primary content in *TitledTextList → Items*
 */
export interface TitledTextListSliceDefaultItem {
  /**
   * Title field in *TitledTextList → Items*
   *
   * - **Field Type**: Title
   * - **Placeholder**: *None*
   * - **API ID Path**: titledTextList.items[].title
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  title: prismic.TitleField;

  /**
   * Text field in *TitledTextList → Items*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: titledTextList.items[].text
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  text: prismic.RichTextField;

  /**
   * Link field in *TitledTextList → Items*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: titledTextList.items[].link
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  link: prismic.LinkField;
}

/**
 * Default variation for TitledTextList Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type TitledTextListSliceDefault = prismic.SharedSliceVariation<
  'default',
  Record<string, never>,
  Simplify<TitledTextListSliceDefaultItem>
>;

/**
 * Slice variation for *TitledTextList*
 */
type TitledTextListSliceVariation = TitledTextListSliceDefault;

/**
 * TitledTextList Shared Slice
 *
 * - **API ID**: `titledTextList`
 * - **Description**: Descriptive links list
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type TitledTextListSlice = prismic.SharedSlice<
  'titledTextList',
  TitledTextListSliceVariation
>;

declare module '@prismicio/client' {
  interface CreateClient {
    (
      repositoryNameOrEndpoint: string,
      options?: prismic.ClientConfig
    ): prismic.Client;
  }

  namespace Content {
    export type {
      AudioPlayerSlice,
      AudioPlayerSliceDefaultPrimary,
      AudioPlayerSliceVariation,
      AudioPlayerSliceDefault,
      CollectionVenueSlice,
      CollectionVenueSliceDefaultPrimary,
      CollectionVenueSliceVariation,
      CollectionVenueSliceDefault,
      ContactSlice,
      ContactSliceDefaultPrimary,
      ContactSliceVariation,
      ContactSliceDefault,
      ContentListSlice,
      ContentListSliceDefaultPrimary,
      ContentListSliceDefaultItem,
      ContentListSliceVariation,
      ContentListSliceDefault,
      EditorialImageSlice,
      EditorialImageSliceDefaultPrimary,
      EditorialImageSliceVariation,
      EditorialImageSliceDefault,
      EditorialImageGallerySlice,
      EditorialImageGallerySliceDefaultPrimary,
      EditorialImageGallerySliceDefaultItem,
      EditorialImageGallerySliceVariation,
      EditorialImageGallerySliceDefault,
      EmbedSlice,
      EmbedSliceDefaultPrimary,
      EmbedSliceVariation,
      EmbedSliceDefault,
      GifVideoSlice,
      GifVideoSliceDefaultPrimary,
      GifVideoSliceVariation,
      GifVideoSliceDefault,
      IframeSlice,
      IframeSliceVariation,
      IframeSliceDefault,
      InfoBlockSlice,
      InfoBlockSliceDefaultPrimary,
      InfoBlockSliceVariation,
      InfoBlockSliceDefault,
      MapSlice,
      MapSliceDefaultPrimary,
      MapSliceVariation,
      MapSliceDefault,
      QuoteSlice,
      QuoteSliceDefaultPrimary,
      QuoteSliceVariation,
      QuoteSliceDefault,
      QuoteV2Slice,
      QuoteV2SliceVariation,
      QuoteV2SliceDefault,
      SearchResultsSlice,
      SearchResultsSliceDefaultPrimary,
      SearchResultsSliceVariation,
      SearchResultsSliceDefault,
      StandfirstSlice,
      StandfirstSliceDefaultPrimary,
      StandfirstSliceVariation,
      StandfirstSliceDefault,
      TagListSlice,
      TagListSliceDefaultPrimary,
      TagListSliceDefaultItem,
      TagListSliceVariation,
      TagListSliceDefault,
      TextSlice,
      TextSliceDefaultPrimary,
      TextSliceVariation,
      TextSliceDefault,
      TextAndIconsSlice,
      TextAndIconsSliceDefaultPrimary,
      TextAndIconsSliceDefaultItem,
      TextAndIconsSliceVariation,
      TextAndIconsSliceDefault,
      TextAndImageSlice,
      TextAndImageSliceDefaultPrimary,
      TextAndImageSliceVariation,
      TextAndImageSliceDefault,
      TitledTextListSlice,
      TitledTextListSliceDefaultItem,
      TitledTextListSliceVariation,
      TitledTextListSliceDefault,
    };
  }
}