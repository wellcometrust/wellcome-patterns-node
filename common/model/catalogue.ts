export type Work = {
  type: 'Work' | 'Collection' | 'Section' | 'Series';
  id: string;
  title: string;
  alternativeTitles: string[];
  referenceNumber?: string;
  description?: string;
  physicalDescription: string;
  workType: WorkType;
  lettering?: string;
  createdDate?: Period;
  contributors: Contributor[];
  identifiers: Identifier[];
  subjects: Subject[];
  genres: Genre[];
  thumbnail?: DigitalLocation;
  items?: Item<Location>[];
  production: Production[];
  languages: Language[];
  edition?: string;
  notes: Note[];
  duration?: number;
  images?: ImageInclude[];
  parts: RelatedWork[];
  partOf: RelatedWork[];
  precededBy: RelatedWork[];
  succeededBy: RelatedWork[];
  totalParts?: number;
  totalDescendentParts?: number;
  availableOnline?: boolean;
  availabilities?: Availability[];
  holdings: Holding[];
};

export type ItemsList = {
  type: 'ItemsList';
  totalResults: number;
  results: Item<Location>[];
};

export type Holding = {
  note?: string;
  enumeration: string[];
  location?: Location;
  type: 'Holdings';
};

type MinimalRelatedWorkFields =
  | 'id'
  | 'title'
  | 'alternativeTitles'
  | 'referenceNumber'
  | 'availableOnline'
  | 'availabilities'
  | 'type';
export type RelatedWork = Partial<Work> & Pick<Work, MinimalRelatedWorkFields>;

type WorkType = {
  id: string;
  label: string;
  type: 'Format';
};

type Period = {
  id?: string;
  identifiers?: Identifier[];
  label: string;
  type: 'Period';
};

type IdentifierType = {
  id: string;
  label: string;
  type: 'IdentifierType';
};

export type Identifier = {
  value: string;
  identifierType: IdentifierType;
  type: 'Identifier';
};

type AgentType = 'Agent' | 'Person' | 'Organisation' | 'Meeting';

type Agent = {
  id?: string;
  identifiers?: Identifier[];
  label: string;
  type: AgentType;
};

type ContributorRole = {
  label: string;
  type: 'ContributionRole';
};

export type Contributor = {
  agent: Agent;
  roles: ContributorRole[];
  type: 'Contributor';
  primary: boolean;
};

type Subject = {
  id?: string;
  identifiers?: Identifier[];
  label: string;
  concepts: Concept[];
  type: 'Subject';
};

type Genre = {
  label: string;
  concepts: Concept[];
  type: 'Genre';
};

type ConceptType = 'Concept' | 'Period' | 'Place';

export type Concept = {
  id?: string;
  identifiers?: Identifier[];
  label: string;
  type: ConceptType;
};

export type DigitalLocation = {
  title?: string;
  linkText?: string;
  locationType: LocationType;
  url: string;
  credit?: string;
  license: License;
  accessConditions: AccessCondition[];
  type: 'DigitalLocation';
};

export type PhysicalLocation = {
  locationType: LocationType;
  label: string;
  shelfmark?: string;
  accessConditions: AccessCondition[];
  type: 'PhysicalLocation';
};

export type Location = DigitalLocation | PhysicalLocation;

type LocationType = {
  id: string;
  label: string;
  type: 'LocationType';
};

export type License = {
  id: string;
  label: string;
  url: string;
  type: 'License';
};

export type AccessCondition = {
  status?: AccessStatus;
  terms?: string;
  to?: string;
  type: 'AccessCondition';
  method?: AccessMethod;
  note?: string;
};

type AccessMethod = {
  id: string;
  label: string;
  type: 'AccessMethod';
};

type AccessStatus = {
  id: string;
  label: string;
  type: 'AccessStatus';
};

type Availability = {
  id: string;
  label: string;
  type: 'Availability';
};

export type Item<LocationType> = {
  id?: string;
  identifiers?: Identifier[];
  title?: string;
  locations: LocationType[];
  type: 'Item';
  note?: string;
};

export type PhysicalItem = Item<PhysicalLocation> & {
  status?: {
    id: string;
    label: string;
    type: string;
  };
};

type Date = {
  label: string;
  type: 'Period';
};

type Place = {
  id?: string;
  identifiers?: Identifier[];
  label: string;
  type: 'Place';
};

type Production = {
  label: string;
  places: Place[];
  agents: Agent[];
  dates: Date[];
  type: 'ProductionEvent';
};

type Language = {
  id?: string;
  label: string;
  type: 'Language';
};

type Note = {
  contents: string[];
  noteType: NoteType;
  type: 'Note';
};

type NoteType = {
  id: string;
  label: string;
  type: 'NoteType';
};

type ImageInclude = {
  id: string;
  type: 'Image';
};

// Response objects
export type CatalogueApiError = {
  errorType: string;
  httpStatus: number;
  label: string;
  description: string;
  type: 'Error';
};

export type CatalogueApiRedirect = {
  status: number;
  redirectToId: string;
  type: 'Redirect';
};

export type Image = {
  type: 'Image';
  id: string;
  locations: DigitalLocation[];
  source: {
    id: string;
    title: string;
    contributors?: Contributor[];
    type: string;
  };
  visuallySimilar?: Image[];
};

export type CatalogueAggregationBucket = {
  count: number;
  data: {
    id: string;
    label: string;
    type: string;
  };
  type: 'AggregationBucket';
};

export type CatalogueAggregationBucketNoId = {
  count: number;
  data: {
    label: string;
    type: string;
  };
  type: 'AggregationBucket';
};

export type CatalogueAggregation = {
  buckets: CatalogueAggregationBucket[];
  type: 'Aggregation';
};

export type CatalogueAggregationNoId = {
  buckets: CatalogueAggregationBucketNoId[];
  type: 'Aggregation';
};

export type WorkAggregations = {
  workType: CatalogueAggregation;
  availabilities: CatalogueAggregation;
  languages?: CatalogueAggregation;
  'genres.label'?: CatalogueAggregationNoId;
  'subjects.label'?: CatalogueAggregationNoId;
  'contributors.agent.label'?: CatalogueAggregationNoId;
  type: 'Aggregations';
};

export type ImageAggregations = {
  license?: CatalogueAggregation;
  'source.genres.label'?: CatalogueAggregation;
  'source.subjects.label'?: CatalogueAggregation;
  'source.contributors.agent.label'?: CatalogueAggregation;
  type: 'Aggregations';
};

export type ConceptAggregations = null;

export type HasWorkAggregations = {
  aggregations?: WorkAggregations;
};

export type HasImageAggregations = {
  aggregations?: ImageAggregations;
};
