export default {
  toggles: [
    {
      id: 'itemViewerPrototype',
      title: 'Show the prototype UI for the item viewer',
      description:
        'Adds a sidebar with structured metadata about the item being viewed',
      defaultValue: true,
    },
    {
      id: 'showHoldingsOnWork',
      title: 'Show holdings on the work page',
      description: 'Shows the holding information for a work',
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
    {
      id: 'switchIIIFManifestSource',
      title: 'Switch IIIF manifest source',
      defaultValue: false,
      description:
        'Switches the manifest sources from wellcomelibrary.org to iiif.wellcomecollection.org for testing.',
    },
  ] as const,
};
