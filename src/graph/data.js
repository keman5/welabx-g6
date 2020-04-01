export default {
    nodes: [
        {
          id:    '1',
          label: '公司1',
        },
        {
          id:    '2',
          label: '公司2',
        },
        {
          id:    '3',
          label: '公司3',
        },
        {
          id:    '4',
          label: '公司4',
        },
        {
          id:    '5',
          label: '公司5',
        },
        {
          id:    '8',
          label: '公司8',
        },
        {
          id:    '9',
          label: '公司9',
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
          label: '大于',
        },
    ],
};
