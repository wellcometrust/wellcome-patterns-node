module.exports = {
  toggles: [
    {
      id: 'selectableQueries',
      title: `Selectable queries`,
      defaultValue: false,
      description:
        'Allow people to use different query types while searching the catalogue.',
    },
    {
      id: 'relevanceRating',
      title: `Search relevance rating`,
      defaultValue: false,
      description:
        'Allow people rate the relevance or results on the search results page.',
    },
    {
      id: 'useStageApi',
      title: `Use the staging API`,
      defaultValue: false,
      description:
        'Uses api.stage for requests to the API to view data that we are testing.',
    },
    {
      id: 'showWorkLocations',
      title: 'Show the locations of a work in the header',
      defaultValue: false,
      description:
        'These can be either physical or digital locations. We need to do a little bt of work figuring out what all the codes mean to get the messaging right.',
    },
    {
      id: 'showDatesPrototype',
      title:
        'Display input boxes to allow a user to refine results by a date range',
      defaultValue: false,
      description:
        'Shows additional UI to allow a user to narrow search results by a date range.',
    },
    {
      id: 'unfilteredSearchResults',
      title:
        'Return all posible results from the catalogue API, without filtering by type or location',
      defaultValue: false,
      description: 'Shows all possible search results from the catalogue API',
    },
    {
      id: 'refineFiltersPrototype',
      title: 'Display the Refine filters prototype',
      defaultValue: false,
      description:
        'Shows filters on the works search pages. Geared towards refinement.',
    },
    {
      id: 'exploreFiltersPrototype',
      title: 'Display the Explore filters prototype',
      defaultValue: false,
      description:
        'Shows filters on the works search pages. Geared towards exploration.',
    },
    {
      id: 'helveticaRegular',
      title: 'Helvetica regular',
      defaultValue: false,
      description:
        'Displays body copy in Helvetica regular (where it is currently Helvetica light)',
    },
  ],
};
