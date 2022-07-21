import body, { slice } from './body';
import heading from './heading';
import link from './link';
import text from './text';
import structuredText from './structured-text';
import gifVideoSlice from './gif-video-slice';
import title from './title';

export default {
  fieldset: 'Body content',
  type: 'Slices',
  config: {
    labels: {
      editorialImage: [
        {
          name: 'featured',
          display: 'Featured',
        },
        {
          name: 'supporting',
          display: 'Supporting',
        },
        {
          name: 'standalone',
          display: 'Standalone',
        },
      ],
      gifVideo: [
        {
          name: 'supporting',
          display: 'Supporting',
        },
      ],
      iframe: [
        {
          name: 'supporting',
          display: 'Supporting',
        },
        {
          name: 'standalone',
          display: 'Standalone',
        },
      ],
      vimeoVideoEmbed: [
        {
          name: 'featured',
          display: 'Featured',
        },
        {
          name: 'supporting',
          display: 'Supporting',
        },
        {
          name: 'standalone',
          display: 'Standalone',
        },
      ],
      youtubeVideoEmbed: [
        {
          name: 'featured',
          display: 'Featured',
        },
        {
          name: 'supporting',
          display: 'Supporting',
        },
        {
          name: 'standalone',
          display: 'Standalone',
        },
      ],
      editorialImageGallery: [
        {
          name: 'standalone',
          display: 'Standalone',
        },
      ],
      quoteV2: [
        {
          name: 'pull',
          display: 'Pull',
        },
        {
          name: 'review',
          display: 'Review',
        },
      ],
    },
    choices: {
      text: {
        type: 'Slice',
        fieldset: 'Text',
        'non-repeat': {
          text: {
            type: 'StructuredText',
            config: {
              label: 'Text',
              multi:
                'heading2,heading3,paragraph,strong,em,hyperlink,list-item,embed',
            },
          },
        },
      },
      editorialImage: body.config.choices.editorialImage,
      editorialImageGallery: body.config.choices.editorialImageGallery,
      gifVideo: gifVideoSlice(),
      iframe: {
        type: 'Slice',
        fieldset: 'Iframe',
        'non-repeat': {
          iframeSrc: {
            type: 'Text',
            config: {
              label: 'iframe src',
              placeholder: 'iframe src',
            },
          },
          previewImage: {
            type: 'Image',
            config: {
              label: 'Preview image',
            },
          },
        },
      },
      standfirst: {
        type: 'Slice',
        fieldset: 'Standfirst',
        'non-repeat': {
          text: {
            type: 'StructuredText',
            config: {
              single: 'strong,em,hyperlink',
              label: 'Standfirst',
            },
          },
        },
      },
      quoteV2: body.config.choices.quote,
      embed: {
        type: 'Slice',
        fieldset: 'Embed',
        'non-repeat': {
          embed: {
            type: 'Embed',
            fieldset: 'Embed',
          },
          caption: {
            type: 'StructuredText',
            config: {
              label: 'Caption',
              single: 'hyperlink,em',
              placeholder: 'Caption',
            },
          },
        },
      },
      soundcloudEmbed: {
        type: 'Slice',
        fieldset: 'SoundCloud embed',
        'non-repeat': {
          iframeSrc: {
            type: 'Text',
            config: {
              label: 'iframe src',
            },
          },
        },
      },
      vimeoVideoEmbed: {
        type: 'Slice',
        fieldset: 'Vimeo video',
        'non-repeat': {
          embed: {
            type: 'Embed',
            fieldset: 'Vimeo embed',
          },
        },
      },
      instagramEmbed: {
        type: 'Slice',
        fieldset: 'Instagram embed',
        'non-repeat': {
          embed: {
            type: 'Embed',
            fieldset: 'Instagram embed',
          },
        },
      },
      twitterEmbed: {
        type: 'Slice',
        fieldset: 'Twitter embed',
        'non-repeat': {
          embed: {
            type: 'Embed',
            fieldset: 'Twitter embed',
          },
        },
      },
      youtubeVideoEmbed: {
        type: 'Slice',
        fieldset: '[Deprecated] YouTube video (please use embed)',
        'non-repeat': {
          embed: {
            type: 'Embed',
            fieldset: 'YouTube embed',
          },
          caption: {
            type: 'StructuredText',
            config: {
              label: 'Caption',
              single: 'hyperlink,em',
              placeholder: 'Caption',
            },
          },
        },
      },
      discussion: slice('Discussion', {
        nonRepeat: {
          title: heading('Title', 2),
          text: structuredText({ label: 'Text' }),
        },
      }),
      tagList: slice('Tag List', {
        nonRepeat: {
          title: heading('Title', 2),
        },
        repeat: {
          link: link('Link', 'web'),
          linkText: text('Link text'),
        },
      }),
      imageList: {
        type: 'Slice',
        fieldset:
          '[Deprecated] Image list (please use captioned image or image gallery)',
        'non-repeat': {
          listStyle: {
            type: 'Select',
            config: {
              options: ['numeric'],
              label: 'List style',
            },
          },
          description: {
            type: 'StructuredText',
            config: {
              multi: 'paragraph,hyperlink,em',
              label: 'Description',
            },
          },
        },
        repeat: {
          title: {
            type: 'StructuredText',
            config: {
              label: 'Title',
              single: 'heading1',
            },
          },
          subtitle: {
            type: 'StructuredText',
            config: {
              single: 'heading2',
              label: 'Subtitle',
            },
          },
          image: {
            type: 'Image',
            config: {
              label: 'Image',
            },
          },
          caption: {
            type: 'StructuredText',
            config: {
              label: 'Caption',
              single: 'strong,em,hyperlink',
            },
          },
          description: {
            type: 'StructuredText',
            config: {
              label: 'Description',
              multi: 'paragraph,hyperlink,em',
            },
          },
        },
      },
      audioPlayer: slice('Audio Player', {
        nonRepeat: {
          title,
          audio: link('Audio', 'media', []),
        },
      }),
    },
  },
};
