module.exports = {
  toggles: [
    {
      id: 'archivesPrototype',
      title:
        'Include archives in search results and view additions to the work page relating to archives',
      defaultValue: false,
      description:
        'Include archives in search results and view prototypes of breadcrumbs, trees and onward journey links for archives',
    },
    {
      id: 'unfilteredSearchResults',
      title: 'Entire catalogue search',
      defaultValue: false,
      description: 'Search the entire catalogue, including all work types',
    },
    {
      id: 'newImageSearch',
      title: 'Use the images endpoint',
      defaultValue: false,
      description:
        'Use the new images endpoint rather than filtering for works with iiif-image in images search',
    },
    {
      id: 'searchToolbar',
      title: 'Search toolbar',
      defaultValue: false,
      description:
        'Select from search query algorithms and other search functionality',
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
      id: 'isHotjarActive',
      title: 'Hotjar',
      defaultValue: true,
      description: 'Embeds the Hotjar script for user research',
    },
  ],
};
