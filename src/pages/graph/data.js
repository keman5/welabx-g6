export default {
  nodes: [
    {
      id:    '1',
      label: 'new Vue()',
      data:  {
        date: '2020-04-20',
      },
      type:  'diamond-node', // 对应注册的节点name
      style: {
        hover: {
          fill: '#ccc',
        },
        selected: {
          stroke: '#ccc',
        },
        // node 文本默认样式
        nodeLabelStyles: {
          cursor:       'default',
          fill:         'red',
          textAlign:    'center',
          textBaseline: 'middle',
          fontSize:     13,
        },
      },
    },
    {
      id:    '2',
      label: 'id: 2',
      type:  'circle-node',
    },
    {
      id:    '3',
      label: 'id: 3',
      // type:  'rect-node',
    },
    {
      id:    '4',
      label: 'id: 4',
      style: {
        size: [130, 100],
      },
      type: 'ellipse-node',
    },
    {
      id:    '5',
      label: 'id: 5',
      type:  'diamond-node',
    },
    {
      id:    '8',
      label: 'id: 8',
      style: {
        size: [130, 100],
      },
      type: 'ellipse-node',
    },
    {
      id:    '9',
      label: 'id: 9',
    },
  ],
  edges: [
    {
      source: '1',
      target: '2',
      data:   {
        type:   'A',
        amount: '100,000 元',
        date:   '2019-08-03',
      },
      label: '条件',
    },
    {
      source: '1',
      target: '3',
      data:   {
        type:   'B',
        amount: '100,000 元',
        date:   '2019-08-03',
      },
      label: '终止',
    },
    {
      source: '2',
      target: '5',
      data:   {
        type:   'C',
        amount: '100,000 元',
        date:   '2019-08-03',
      },
      label: '循环',
    },
    {
      source: '3',
      target: '4',
      data:   {
        type:   'C',
        amount: '100,000 元',
        date:   '2019-08-03',
      },
      label: '否',
    },
    {
      source: '1',
      target: '8',
      data:   {
        type:   'B',
        amount: '100,000 元',
        date:   '2019-08-03',
      },
      label: '小于',
    },
    {
      source: '1',
      target: '9',
      data:   {
        type:   'C',
        amount: '100,000 元',
        date:   '2019-08-03',
      },
    },
  ],
};
