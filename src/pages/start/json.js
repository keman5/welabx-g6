const data = {
  nodes: [
    {
      id:    '1',
      label: 'alps_file1',
    },
    {
      id:    '2',
      label: 'alps_file2',
    },
    {
      id:    '3',
      label: 'alps_file3',
    },
    {
      id:    '4',
      label: 'sql_file1',
    },
    {
      id:    '5',
      label: 'sql_file2',
    },
    {
      id:    '6',
      label: 'feature_etl_1',
    },
    {
      id:    '7',
      label: 'feature_etl_1',
    },
    {
      id:    '8',
      label: 'feature_extractor',
    },
  ],
  edges: [
    {
      source: '1',
      target: '2',
    },
    {
      source: '1',
      target: '3',
    },
    {
      source: '2',
      target: '4',
    },
    {
      source: '3',
      target: '4',
    },
    {
      source: '4',
      target: '5',
    },
    {
      source: '5',
      target: '6',
    },
    {
      source: '6',
      target: '7',
    },
    {
      source: '6',
      target: '8',
    },
  ],
};
