export default {
  toggles: [
    {
      id: 'itemViewerPrototype',
      title: 'Show the prototype UI for the item viewer',
      description:
        'Adds a sidebar with structured metadata about the item being viewed',
      defaultValue: false,
    },
    {
      id: 'showCanvasLabels',
      title: 'Show canvas labels on viewer thumbnails',
      description:
        'Shows the canvas label on the viewer thumbnails above the image number',
      defaultValue: false,
    },
    {
      id: 'openWithAdvisoryPrototype',
      title: 'Open with advisory',
      description:
        'Adds functionality for viewing digitised items with an access condition of open-with-advisory',
      defaultValue: true,
    },
    {
      id: 'onlineResourcesPrototype',
      title: 'Online resources',
      description: `Adds links to any third-party resources associated with items (inside 'Available online')`,
      defaultValue: false,
    },
    {
      id: 'buildingReopening',
      title: 'Wellcome Collection reopening UI changes',
      description:
        'Show additions/amendments made in preparation for the reopening of the Wellcome Collection building',
      defaultValue: false,
    },
    {
      id: 'stagingApi',
      title: 'Staging API',
      defaultValue: false,
      description: 'Use the staging catalogue API',
    },
    {
      id: 'relevanceRating',
      title: 'Rate search result relevance',
      defaultValue: false,
      description:
        'Give your search results a rating of 1 to 4 stars to help us improve search relevance',
    },
    {
      id: 'stacksRequestService',
      title: 'Items status and requesting',
      defaultValue: false,
      description: 'Get the status of items and request them from the stacks',
    },
    {
      id: 'helveticaRegular',
      title: 'Helvetica regular',
      defaultValue: false,
      description:
        'Displays body copy in Helvetica regular (where it is currently Helvetica light)',
    },
  ] as const,
};
