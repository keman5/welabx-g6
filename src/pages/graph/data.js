export default {
  nodes: [
    {
      id:   '1', // 非必选
      data: {
        action: '初始化',
      },
      x:     500, // 该元素在画布中的位置
      y:     100,
      style: { // 节点样式
        fill:          '#39495b',
        lineDash:      [1, 2],
        shadowOffsetX: 0,
        shadowOffsetY: 2,
        shadowColor:   '#666',
        shadowBlur:    10,
        width:         160,
        height:        70,
      },
      label:    'new Vue()', // 节点上的文本
      // node 文本默认样式
      labelCfg: {
        fill:         '#fff',
        textAlign:    'center',
        textBaseline: 'middle',
        fontWeight:   'bold',
        fontSize:     24,
      },
      // 当前节点的多状态样式
      nodeStateStyles: {
        'nodeState:default': {
          fill: '#39495b',
        },
        'nodeState:hover': {
          fill: '#ffbd17',
        },
        'nodeState:selected': {
          fill: '#f1ac00',
        },
      },
      // 自定义锚点数量和位置
      anchorPoints: [
        [0, 0],
        [0.5, 0],
        [0, 1],
        [0.5, 1],
        [1, 0],
        [1, 1],
      ],
    },
    {
      id:    '2',
      type:  'circle-node',
      style: {
        r:         50,
        width:     230,
        height:    60,
        fill:      '#65b586',
        lineWidth: 0,
      },
      x:        500,
      y:        250,
      label:    '初始化\n事件和生命周期',
      labelCfg: {
        stroke:    '#ccc',
        lineWidth: 2,
        fontSize:  18,
        fill:      '#fff',
        textAlign: 'center',
      },
    },
    {
      id:    '3',
      type:  'rect-node',
      style: {
        fill:      '#fff',
        stroke:    '#c96164',
        lineWidth: 3,
        width:     180,
        height:    60,
      },
      x:        200,
      y:        170,
      label:    'beforeCreate',
      labelCfg: {
        fill:       '#c96164',
        width:      200,
        height:     60,
        fontSize:   20,
        fontWeight: '700',
      },
      anchorHotsoptStyles: {
        r:    11,
        fill: 'green',
      },
      anchorPointStyles: {
        r:         4,
        fill:      '#fff',
        stroke:    '#1890FF',
        lineWidth: 2,
      },
    },
    {
      id:    '4',
      x:     500,
      y:     450,
      type:  'triangle-node',
      label: '初始化\n注入 & 校验',
      // direction: 'down',
      style: {
        fill:      '#65b586',
        size:      [100, 160],
        lineWidth: 0,
      },
      labelCfg: {
        fontSize:  12,
        fill:      '#fff',
        stroke:    '#65b586',
        textAlign: 'left',
        x:         -30,
        y:         -20,
      },
      /* anchorPoints: [
        [1, 0],
        [0, 0],
        [0.5, 1],
      ], */
    },
    {
      id:    '5',
      x:     200,
      y:     360,
      label: 'created',
      type:  'rect-node',
      style: {
        fill:      '#fff',
        stroke:    '#c96164',
        lineWidth: 3,
        width:     180,
        height:    60,
      },
      labelCfg: {
        fill:     '#c96164',
        fontSize: 20,
      },
    },
    {
      id:    '6',
      x:     500,
      y:     600,
      type:  'diamond-node',
      label: '是否指定 "el" 选项?',
      style: {
        size:   [160, 100],
        fill:   '#f1b953',
        stroke: '#f1b953',
      },
      labelCfg: {
        fill:     '#fff',
        stroke:   '#f1b953',
        fontSize: 20,
      },
    },
    {
      id:    '7',
      x:     800,
      y:     700,
      label: '当调用 vm.$mount(el) 函数时',
      style: {
        size: [130, 100],
      },
      type: 'ellipse-node',
    },
    {
      x:     500,
      y:     800,
      id:    '8',
      label: '是否指定 "template" 选项',
    },
    {
      id:    '9',
      x:     250,
      y:     900,
      label: '将 template 编译\n到 render 函数中',
    },
    {
      id:    '10',
      x:     800,
      y:     900,
      label: '将 el 外部的 HTML\n作为 template 编译',
    },
  ],
  edges: [
    {
      source:       '1',
      target:       '2',
      sourceAnchor: 3,
      data:         {
        type:   'A',
        amount: '100,000 元',
        date:   '2019-08-03',
      },
      label: '新建 Vue 实例',
      shape: 'cubic-edge',
      style: {
        stroke:          'red',
        lineDash:        [5, 2],
        lineWidth:       2,
        lineAppendWidth: 10,
        cursor:          'hand',
      },
      labelCfg: {
        position:   'center', // 其实默认就是 center，这里写出来便于理解
        autoRotate: true, // 使文本随边旋转
        style:      {
          stroke:    'white', // 给文本添加白边和白色背景
          fill:      '#722ed1', // 文本颜色
          lineWidth: 5, // 文本白边粗细
        },
      },
      edgeStateStyles: {
        'edgeState:default': {
          strokeOpacity: 1,
          cursor:        'default',
        },
        'edgeState:hover': {
          strokeOpacity: 0.6,
          cursor:        'pointer',
        },
        'edgeState:selected': {
          strokeOpacity: 1,
          cursor:        'pointer',
        },
      },
    },
    {
      source:       '1',
      target:       '3',
      sourceAnchor: 3,
      targetAnchor: 4,
      data:         {
        type:   'B',
        amount: '100,000 元',
        date:   '2019-08-03',
      },
      label:           '',
      edgeStateStyles: {
        'edgeState:default': {
          strokeOpacity: 1,
          cursor:        'default',
        },
        'edgeState:hover': {
          strokeOpacity: 0.6,
          cursor:        'pointer',
        },
        'edgeState:selected': {
          strokeOpacity: 1,
          cursor:        'pointer',
        },
      },
    },
    {
      source: '2',
      target: '4',
      data:   {
        type:   'C',
        amount: '100,000 元',
        date:   '2019-08-03',
      },
      label:           '',
      edgeStateStyles: {
        'edgeState:default': {
          strokeOpacity: 1,
          animate:       false,
        },
        'edgeState:hover': {
          strokeOpacity: 0.6,
          stroke:        '#ccc',
          animate:       false,
        },
        'edgeState:selected': {
          strokeOpacity: 1,
          stroke:        '#ccc',
        },
      },
    },
    {
      source:       '2',
      target:       '5',
      sourceAnchor: 2,
      targetAnchor: 1,
      data:         {
        type:   'C',
        amount: '100,000 元',
        date:   '2019-08-03',
      },
      label: '准备',
    },
    {
      source: '4',
      target: '6',
      data:   {
        type:   'B',
        amount: '100,000 元',
        date:   '2019-08-03',
      },
      label: '继续',
    },
    {
      source: '6',
      target: '7',
      data:   {
        type:   'C',
        amount: '100,000 元',
        date:   '2019-08-03',
      },
    },
    {
      source: '6',
      target: '8',
      data:   {
        type:   'C',
        amount: '100,000 元',
        date:   '2019-08-03',
      },
    },
    {
      source: '8',
      target: '9',
      data:   {
        type:   'C',
        amount: '100,000 元',
        date:   '2019-08-03',
      },
    },
    {
      source: '8',
      target: '10',
      data:   {
        type:   'C',
        amount: '100,000 元',
        date:   '2019-08-03',
      },
    },
  ],
};
