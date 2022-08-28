import { HasWorkAggregations } from '../../../model/catalogue';

const aggregations: HasWorkAggregations = {
  aggregations: {
    workType: {
      buckets: [
        {
          data: {
            id: 'a',
            label: 'Books',
            type: 'Format',
          },
          count: 113802,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'h',
            label: 'Archives and manuscripts',
            type: 'Format',
          },
          count: 13402,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'k',
            label: 'Pictures',
            type: 'Format',
          },
          count: 3755,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'l',
            label: 'Ephemera',
            type: 'Format',
          },
          count: 2149,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'd',
            label: 'Journals',
            type: 'Format',
          },
          count: 1722,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'g',
            label: 'Videos',
            type: 'Format',
          },
          count: 1078,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'q',
            label: 'Digital Images',
            type: 'Format',
          },
          count: 1016,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'i',
            label: 'Audio',
            type: 'Format',
          },
          count: 369,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'n',
            label: 'Film',
            type: 'Format',
          },
          count: 259,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'w',
            label: 'Student dissertations',
            type: 'Format',
          },
          count: 120,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'm',
            label: 'CD-Roms',
            type: 'Format',
          },
          count: 13,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'r',
            label: '3-D Objects',
            type: 'Format',
          },
          count: 8,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'b',
            label: 'Manuscripts',
            type: 'Format',
          },
          count: 5,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'p',
            label: 'Mixed materials',
            type: 'Format',
          },
          count: 2,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'e',
            label: 'Maps',
            type: 'Format',
          },
          count: 1,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'c',
            label: 'Music',
            type: 'Format',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'u',
            label: 'Standing order',
            type: 'Format',
          },
          count: 0,
          type: 'AggregationBucket',
        },
      ],
      type: 'Aggregation',
    },
    'genres.label': {
      buckets: [
        {
          data: {
            label: 'Electronic books.',
            type: 'Genre',
          },
          count: 79272,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Annual reports.',
            type: 'Genre',
          },
          count: 75113,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'MOH reports.',
            type: 'Genre',
          },
          count: 71740,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Statistics.',
            type: 'Genre',
          },
          count: 22725,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Pamphlets.',
            type: 'Genre',
          },
          count: 6539,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Electronic Books.',
            type: 'Genre',
          },
          count: 3752,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Colonial reports.',
            type: 'Genre',
          },
          count: 3090,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Posters.',
            type: 'Genre',
          },
          count: 2482,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Lithographs.',
            type: 'Genre',
          },
          count: 2360,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Ephemera.',
            type: 'Genre',
          },
          count: 2127,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Leaflets.',
            type: 'Genre',
          },
          count: 1208,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Conference proceedings.',
            type: 'Genre',
          },
          count: 1135,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Periodicals.',
            type: 'Genre',
          },
          count: 889,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Videocassettes.',
            type: 'Genre',
          },
          count: 593,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Academic dissertations.',
            type: 'Genre',
          },
          count: 565,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'DVDs.',
            type: 'Genre',
          },
          count: 493,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Sound recordings.',
            type: 'Genre',
          },
          count: 360,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Engravings.',
            type: 'Genre',
          },
          count: 350,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Popular works.',
            type: 'Genre',
          },
          count: 335,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Zines.',
            type: 'Genre',
          },
          count: 314,
          type: 'AggregationBucket',
        },
      ],
      type: 'Aggregation',
    },
    'subjects.label': {
      buckets: [
        {
          data: {
            label: 'Sanitation.',
            type: 'Subject',
          },
          count: 66287,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Public Health.',
            type: 'Subject',
          },
          count: 65705,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Water Supply.',
            type: 'Subject',
          },
          count: 62971,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Disease Outbreaks.',
            type: 'Subject',
          },
          count: 62551,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Great Britain.',
            type: 'Subject',
          },
          count: 3631,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Public Health Administration.',
            type: 'Subject',
          },
          count: 3398,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'School Health Services.',
            type: 'Subject',
          },
          count: 3355,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Health Services Administration.',
            type: 'Subject',
          },
          count: 3172,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'United States.',
            type: 'Subject',
          },
          count: 1746,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Public Health - history.',
            type: 'Subject',
          },
          count: 1415,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'AIDS (Disease)',
            type: 'Subject',
          },
          count: 1177,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'London (England)',
            type: 'Subject',
          },
          count: 1036,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Hygiene.',
            type: 'Subject',
          },
          count: 1031,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: '20th century.',
            type: 'Subject',
          },
          count: 993,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Harbors. sh 85058838',
            type: 'Subject',
          },
          count: 981,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Health.',
            type: 'Subject',
          },
          count: 958,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Mental Health.',
            type: 'Subject',
          },
          count: 920,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Condoms.',
            type: 'Subject',
          },
          count: 842,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Health Education.',
            type: 'Subject',
          },
          count: 842,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Diet.',
            type: 'Subject',
          },
          count: 758,
          type: 'AggregationBucket',
        },
      ],
      type: 'Aggregation',
    },
    'contributors.agent.label': {
      buckets: [
        {
          data: {
            label: 'Augustus Long Health Sciences Library',
            type: 'Organisation',
          },
          count: 2630,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Health Education Council',
            type: 'Agent',
          },
          count: 1978,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'World Health Organization.',
            type: 'Organisation',
          },
          count: 813,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Royal College of Surgeons of England',
            type: 'Organisation',
          },
          count: 798,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Great Britain. Department of Health.',
            type: 'Organisation',
          },
          count: 730,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Feminist Library (London, England)',
            type: 'Organisation',
          },
          count: 479,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: "Women's Health (Organization)",
            type: 'Organisation',
          },
          count: 472,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'National Library of Medicine (U.S.)',
            type: 'Organisation',
          },
          count: 420,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'University of Glasgow. Library',
            type: 'Organisation',
          },
          count: 405,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'London School of Hygiene and Tropical Medicine',
            type: 'Organisation',
          },
          count: 392,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Royal College of Physicians of Edinburgh',
            type: 'Organisation',
          },
          count: 367,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Great Britain. Ministry of Health.',
            type: 'Organisation',
          },
          count: 360,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Great Britain. General Board of Health.',
            type: 'Organisation',
          },
          count: 349,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Health Education Authority (Great Britain)',
            type: 'Organisation',
          },
          count: 317,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Harvey Cushing/John Hay Whitney Medical Library',
            type: 'Organisation',
          },
          count: 311,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Francis A. Countway Library of Medicine',
            type: 'Organisation',
          },
          count: 300,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Royal College of Physicians of London',
            type: 'Organisation',
          },
          count: 230,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Great Britain. Department of Health and Social Security.',
            type: 'Organisation',
          },
          count: 211,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Great Britain. Colonial Office.',
            type: 'Organisation',
          },
          count: 208,
          type: 'AggregationBucket',
        },
        {
          data: {
            label: 'Great Britain. National Health Service.',
            type: 'Organisation',
          },
          count: 206,
          type: 'AggregationBucket',
        },
      ],
      type: 'Aggregation',
    },
    languages: {
      buckets: [
        {
          data: {
            id: 'eng',
            label: 'English',
            type: 'Language',
          },
          count: 120057,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'ger',
            label: 'German',
            type: 'Language',
          },
          count: 2068,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'fre',
            label: 'French',
            type: 'Language',
          },
          count: 1788,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'spa',
            label: 'Spanish',
            type: 'Language',
          },
          count: 638,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'ita',
            label: 'Italian',
            type: 'Language',
          },
          count: 472,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'lat',
            label: 'Latin',
            type: 'Language',
          },
          count: 297,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'por',
            label: 'Portuguese',
            type: 'Language',
          },
          count: 187,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'dut',
            label: 'Dutch',
            type: 'Language',
          },
          count: 156,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'rus',
            label: 'Russian',
            type: 'Language',
          },
          count: 129,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'cad',
            label: 'Caddo',
            type: 'Language',
          },
          count: 114,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'ara',
            label: 'Arabic',
            type: 'Language',
          },
          count: 85,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'swa',
            label: 'Swahili',
            type: 'Language',
          },
          count: 82,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'chi',
            label: 'Chinese',
            type: 'Language',
          },
          count: 77,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'tam',
            label: 'Tamil',
            type: 'Language',
          },
          count: 75,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'amh',
            label: 'Amharic',
            type: 'Language',
          },
          count: 61,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'cze',
            label: 'Czech',
            type: 'Language',
          },
          count: 55,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'jpn',
            label: 'Japanese',
            type: 'Language',
          },
          count: 45,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'swe',
            label: 'Swedish',
            type: 'Language',
          },
          count: 43,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'pol',
            label: 'Polish',
            type: 'Language',
          },
          count: 37,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'hin',
            label: 'Hindi',
            type: 'Language',
          },
          count: 36,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'wel',
            label: 'Welsh',
            type: 'Language',
          },
          count: 33,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'nor',
            label: 'Norwegian',
            type: 'Language',
          },
          count: 21,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'san',
            label: 'Sanskrit',
            type: 'Language',
          },
          count: 21,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'dan',
            label: 'Danish',
            type: 'Language',
          },
          count: 19,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'heb',
            label: 'Hebrew',
            type: 'Language',
          },
          count: 19,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'hun',
            label: 'Hungarian',
            type: 'Language',
          },
          count: 19,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'cat',
            label: 'Catalan',
            type: 'Language',
          },
          count: 18,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'rum',
            label: 'Romanian',
            type: 'Language',
          },
          count: 15,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'tur',
            label: 'Turkish',
            type: 'Language',
          },
          count: 15,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'ben',
            label: 'Bengali',
            type: 'Language',
          },
          count: 14,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'hau',
            label: 'Hausa',
            type: 'Language',
          },
          count: 13,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'yor',
            label: 'Yoruba',
            type: 'Language',
          },
          count: 13,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'urd',
            label: 'Urdu',
            type: 'Language',
          },
          count: 12,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'bnt',
            label: 'Bantu (Other)',
            type: 'Language',
          },
          count: 11,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'grc',
            label: 'Greek, Ancient (to 1453)',
            type: 'Language',
          },
          count: 11,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'hrv',
            label: 'Croatian',
            type: 'Language',
          },
          count: 11,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'fin',
            label: 'Finnish',
            type: 'Language',
          },
          count: 10,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'slo',
            label: 'Slovak',
            type: 'Language',
          },
          count: 9,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'lug',
            label: 'Ganda',
            type: 'Language',
          },
          count: 8,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'luo',
            label: 'Luo (Kenya and Tanzania)',
            type: 'Language',
          },
          count: 8,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'gre',
            label: 'Greek, Modern (1453- )',
            type: 'Language',
          },
          count: 7,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'tha',
            label: 'Thai',
            type: 'Language',
          },
          count: 7,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'tib',
            label: 'Tibetan',
            type: 'Language',
          },
          count: 7,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'vie',
            label: 'Vietnamese',
            type: 'Language',
          },
          count: 7,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'yid',
            label: 'Yiddish',
            type: 'Language',
          },
          count: 7,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'may',
            label: 'Malay',
            type: 'Language',
          },
          count: 6,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'ind',
            label: 'Indonesian',
            type: 'Language',
          },
          count: 5,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'pan',
            label: 'Panjabi',
            type: 'Language',
          },
          count: 5,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'per',
            label: 'Persian',
            type: 'Language',
          },
          count: 5,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'afr',
            label: 'Afrikaans',
            type: 'Language',
          },
          count: 4,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'baq',
            label: 'Basque',
            type: 'Language',
          },
          count: 4,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'guj',
            label: 'Gujarati',
            type: 'Language',
          },
          count: 4,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'som',
            label: 'Somali',
            type: 'Language',
          },
          count: 4,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'bul',
            label: 'Bulgarian',
            type: 'Language',
          },
          count: 3,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'lao',
            label: 'Lao',
            type: 'Language',
          },
          count: 3,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'mao',
            label: 'Maori',
            type: 'Language',
          },
          count: 3,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'scc',
            label: 'Serbian',
            type: 'Language',
          },
          count: 3,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'slv',
            label: 'Slovenian',
            type: 'Language',
          },
          count: 3,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'cpe',
            label: 'Creoles and Pidgins, English-based (Other)',
            type: 'Language',
          },
          count: 2,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'cre',
            label: 'Cree',
            type: 'Language',
          },
          count: 2,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'dak',
            label: 'Dakota',
            type: 'Language',
          },
          count: 2,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'egy',
            label: 'Egyptian',
            type: 'Language',
          },
          count: 2,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'gla',
            label: 'Scottish Gaelic',
            type: 'Language',
          },
          count: 2,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'iri',
            label: 'Irish',
            type: 'Language',
          },
          count: 2,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'lit',
            label: 'Lithuanian',
            type: 'Language',
          },
          count: 2,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'mal',
            label: 'Malayalam',
            type: 'Language',
          },
          count: 2,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'paa',
            label: 'Papuan (Other)',
            type: 'Language',
          },
          count: 2,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'sho',
            label: 'Shona',
            type: 'Language',
          },
          count: 2,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'sin',
            label: 'Sinhalese',
            type: 'Language',
          },
          count: 2,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'srp',
            label: 'Serbian',
            type: 'Language',
          },
          count: 2,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'xho',
            label: 'Xhosa',
            type: 'Language',
          },
          count: 2,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'akk',
            label: 'Akkadian',
            type: 'Language',
          },
          count: 1,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'ang',
            label: 'English, Old (ca. 450-1100)',
            type: 'Language',
          },
          count: 1,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'arm',
            label: 'Armenian',
            type: 'Language',
          },
          count: 1,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'asm',
            label: 'Assamese',
            type: 'Language',
          },
          count: 1,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'ath',
            label: 'Athapascan (Other)',
            type: 'Language',
          },
          count: 1,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'cam',
            label: 'Khmer',
            type: 'Language',
          },
          count: 1,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'day',
            label: 'Dayak',
            type: 'Language',
          },
          count: 1,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'div',
            label: 'Divehi',
            type: 'Language',
          },
          count: 1,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'esk',
            label: 'Eskimo languages',
            type: 'Language',
          },
          count: 1,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'est',
            label: 'Estonian',
            type: 'Language',
          },
          count: 1,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'gem',
            label: 'Germanic (Other)',
            type: 'Language',
          },
          count: 1,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'geo',
            label: 'Georgian',
            type: 'Language',
          },
          count: 1,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'ibo',
            label: 'Igbo',
            type: 'Language',
          },
          count: 1,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'ice',
            label: 'Icelandic',
            type: 'Language',
          },
          count: 1,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'lad',
            label: 'Ladino',
            type: 'Language',
          },
          count: 1,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'lin',
            label: 'Lingala',
            type: 'Language',
          },
          count: 1,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'mni',
            label: 'Manipuri',
            type: 'Language',
          },
          count: 1,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'nic',
            label: 'Niger-Kordofanian (Other)',
            type: 'Language',
          },
          count: 1,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'pag',
            label: 'Pangasinan',
            type: 'Language',
          },
          count: 1,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'pam',
            label: 'Pampanga',
            type: 'Language',
          },
          count: 1,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'phi',
            label: 'Philippine (Other)',
            type: 'Language',
          },
          count: 1,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'pus',
            label: 'Pushto',
            type: 'Language',
          },
          count: 1,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'rom',
            label: 'Romani',
            type: 'Language',
          },
          count: 1,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'ssa',
            label: 'Nilo-Saharan (Other)',
            type: 'Language',
          },
          count: 1,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'sso',
            label: 'Sotho',
            type: 'Language',
          },
          count: 1,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'syr',
            label: 'Syriac, Modern',
            type: 'Language',
          },
          count: 1,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'tag',
            label: 'Tagalog',
            type: 'Language',
          },
          count: 1,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'tir',
            label: 'Tigrinya',
            type: 'Language',
          },
          count: 1,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'tpi',
            label: 'Tok Pisin',
            type: 'Language',
          },
          count: 1,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'ukr',
            label: 'Ukrainian',
            type: 'Language',
          },
          count: 1,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'war',
            label: 'Waray',
            type: 'Language',
          },
          count: 1,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'wen',
            label: 'Sorbian (Other)',
            type: 'Language',
          },
          count: 1,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'ace',
            label: 'Achinese',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'alb',
            label: 'Albanian',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'alg',
            label: 'Algonquian (Other)',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'apa',
            label: 'Apache languages',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'arc',
            label: 'Aramaic',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'ave',
            label: 'Avestan',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'aym',
            label: 'Aymara',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'aze',
            label: 'Azerbaijani',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'bad',
            label: 'Banda languages',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'bam',
            label: 'Bambara',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'bel',
            label: 'Belarusian',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'bis',
            label: 'Bislama',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'bos',
            label: 'Bosnian',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'bra',
            label: 'Braj',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'bre',
            label: 'Breton',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'btk',
            label: 'Batak',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'bug',
            label: 'Bugis',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'bur',
            label: 'Burmese',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'cai',
            label: 'Central American Indian (Other)',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'cha',
            label: 'Chamorro',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'che',
            label: 'Chechen',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'chn',
            label: 'Chinook jargon',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'cho',
            label: 'Choctaw',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'chr',
            label: 'Cherokee',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'chu',
            label: 'Church Slavic',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'cop',
            label: 'Coptic',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'dra',
            label: 'Dravidian (Other)',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'dum',
            label: 'Dutch, Middle (ca. 1050-1350)',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'efi',
            label: 'Efik',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'enm',
            label: 'English, Middle (1100-1500)',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'esp',
            label: 'Esperanto',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'eth',
            label: 'Ethiopic',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'fij',
            label: 'Fijian',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'fri',
            label: 'Frisian',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'frm',
            label: 'French, Middle (ca. 1300-1600)',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'fro',
            label: 'French, Old (ca. 842-1300)',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'fry',
            label: 'Frisian',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'gae',
            label: 'Scottish Gaelix',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'gez',
            label: 'Ethiopic',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'gil',
            label: 'Gilbertese',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'gle',
            label: 'Irish',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'glg',
            label: 'Galician',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'gmh',
            label: 'German, Middle High (ca. 1050-1500)',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'goh',
            label: 'German, Old High (ca. 750-1050)',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'gsw',
            label: 'Swiss German',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'gua',
            label: 'Guarani',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'hat',
            label: 'Haitian French Creole',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'haw',
            label: 'Hawaiian',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'him',
            label: 'Western Pahari languages',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'hit',
            label: 'Hittite',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'hup',
            label: 'Hupa',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'iba',
            label: 'Iban',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'iku',
            label: 'Inuktitut',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'ilo',
            label: 'Iloko',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'inc',
            label: 'Indic (Other)',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'ine',
            label: 'Indo-European (Other)',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'int',
            label: 'Interlingua (International Auxiliary Language Association)',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'ira',
            label: 'Iranian (Other)',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'jav',
            label: 'Javanese',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'jrb',
            label: 'Judeo-Arabic',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'kal',
            label: 'Kalâtdlisut',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'kan',
            label: 'Kannada',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'kas',
            label: 'Kashmiri',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'kaz',
            label: 'Kazakh',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'kho',
            label: 'Khotanese',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'kin',
            label: 'Kinyarwanda',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'kor',
            label: 'Korean',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'lan',
            label: 'Occitan (post 1500)',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'lap',
            label: 'Sami',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'lav',
            label: 'Latvian',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'ltz',
            label: 'Luxembourgish',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'mac',
            label: 'Macedonian',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'mad',
            label: 'Madurese',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'mah',
            label: 'Marshallese',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'mak',
            label: 'Makasar',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'man',
            label: 'Mandingo',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'map',
            label: 'Austronesian (Other)',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'mar',
            label: 'Marathi',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'max',
            label: 'Manx',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'mic',
            label: 'Micmac',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'mis',
            label: 'Miscellaneous languages',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'mla',
            label: 'Malagasy',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'mlt',
            label: 'Maltese',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'moh',
            label: 'Mohawk',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'mol',
            label: 'Moldavian',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'mon',
            label: 'Mongolian',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'mus',
            label: 'Creek',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'myn',
            label: 'Mayan languages',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'nah',
            label: 'Nahuatl',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'nai',
            label: 'North American Indian (Other)',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'nau',
            label: 'Nauru',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'nav',
            label: 'Navajo',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'nep',
            label: 'Nepali',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'new',
            label: 'Newari',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'niu',
            label: 'Niuean',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'nub',
            label: 'Nubian languages',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'oji',
            label: 'Ojibwa',
            type: 'Language',
          },
          count: 0,
          type: 'AggregationBucket',
        },
      ],
      type: 'Aggregation',
    },
    availabilities: {
      buckets: [
        {
          data: {
            id: 'online',
            label: 'Online',
            type: 'Availability',
          },
          count: 88984,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'closed-stores',
            label: 'Closed stores',
            type: 'Availability',
          },
          count: 52178,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'open-shelves',
            label: 'Open shelves',
            type: 'Availability',
          },
          count: 12345,
          type: 'AggregationBucket',
        },
      ],
      type: 'Aggregation',
    },
    type: 'Aggregations',
  },
};

export default aggregations;
