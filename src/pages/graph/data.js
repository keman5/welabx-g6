export default {
  nodes: [
    {
      id:   '1',
      data: {
        action: '初始化',
      },
      x:     500,
      y:     100,
      type:  'rect-node', // 对应注册的节点name
      style: {
        fill:          '#39495b',
        lineDash:      [1, 2],
        shadowOffsetX: 0,
        shadowOffsetY: 2,
        shadowColor:   '#666',
        shadowBlur:    10,
        width:         160,
        height:        70,
      },
      label:    'new Vue()',
      // node 文本默认样式
      labelCfg: {
        fill:         '#fff',
        textAlign:    'center',
        textBaseline: 'middle',
        fontWeight:   'bold',
        fontSize:     24,
      },
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
      id:    '4',
      x:     500,
      y:     450,
      label: '初始化\n注入 & 校验',
      style: {
        width:     200,
        height:    60,
        fill:      '#65b586',
        lineWidth: 0,
      },
      labelCfg: {
        fontSize:  18,
        fill:      '#fff',
        textAlign: 'left',
        x:         -45,
      },
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
      sourceAnchor: 2,
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
    },
    {
      source: '2',
      target: '3',
      data:   {
        type:   'B',
        amount: '100,000 元',
        date:   '2019-08-03',
      },
      label:           '终止',
      edgeStateStyles: {
        'edgeState:default': {
          strokeOpacity: 1,
        },
        'edgeState:hover': {
          strokeOpacity: 0.6,
        },
        'edgeState:selected': {
          strokeOpacity: 1,
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
      label:           '循环',
      edgeStateStyles: {
        'edgeState:default': {
          strokeOpacity: 1,
        },
        'edgeState:hover': {
          strokeOpacity: 0.6,
          stroke:        '#ccc',
        },
        'edgeState:selected': {
          strokeOpacity: 1,
          stroke:        '#ccc',
        },
      },
    },
    {
      source: '4',
      target: '5',
      data:   {
        type:   'C',
        amount: '100,000 元',
        date:   '2019-08-03',
      },
      label: '否',
    },
    {
      source: '4',
      target: '6',
      data:   {
        type:   'B',
        amount: '100,000 元',
        date:   '2019-08-03',
      },
      label: '小于',
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
  /* nodes: [
    {
      id:    'Start',
      label: '开始',
      data:  {
        type:       'start',
        ruleName:   'Start',
        ruleRemark: '',
        ruleType:   '',
        fieldType:  '',
      },
    },
    {
      id:    'id_check',
      label: '身份证校验',
      data:  {
        type:       'rule',
        ruleName:   'id_check',
        ruleRemark: '身份证校验',
        ruleType:   'RuleField',
        fieldType:  'Integer',
      },
    },
    {
      id:    'BairongAmountCompoundField',
      label: '百融评分提额',
      data:  {
        type:       'calculate',
        ruleName:   'BairongAmountCompoundField',
        ruleRemark: '百融评分提额',
        ruleType:   'CompoundField',
        fieldType:  'String',
      },
    },
    {
      id:    'AmountDecision',
      label: '额度决策树',
      data:  {
        type:       'calculate',
        ruleName:   'AmountDecision',
        ruleRemark: '额度决策树',
        ruleType:   'DecisionTree',
        fieldType:  'Double',
      },
    },
    {
      id:    'End',
      label: '结束',
      data:  {
        type:       'end',
        ruleName:   'End',
        ruleRemark: '',
        ruleType:   '',
        fieldType:  '',
      },
    },
  ],
  edges: [
    {
      source: 'Start',
      target: 'id_check',
      label:  '',
      data:   { ruleTitle: '', nextStep: 'id_check' },
    },
    {
      source: 'id_check',
      label:  '身份证校验通过',
      target: 'BairongAmountCompoundField',
      data:   {
        operator:   'equals',
        fieldValue: '1',
        ruleTitle:  '身份证校验通过',
        nextStep:   'BairongAmountCompoundField',
      },
    },
    {
      source: 'id_check',
      label:  '身份证校验未通过',
      target: 'AmountDecision',
      data:   {
        operator:   'notEquals',
        fieldValue: '1',
        ruleTitle:  '身份证校验未通过',
        nextStep:   'AmountDecision',
      },
    },
    {
      source: 'BairongAmountCompoundField',
      label:  '计算提额额度',
      target: 'AmountDecision',
      data:   {
        operator:  'calculate',
        ruleTitle: '计算提额额度',
        nextStep:  'AmountDecision',
      },
    },
    {
      source: 'AmountDecision',
      label:  '计算额度',
      target: 'End',
      data:   { operator: 'calculate', ruleTitle: '计算额度', nextStep: 'End' },
    },
  ], */
};
