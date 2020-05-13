/**
 * @author claude
 * @date 2020-05-12
 * @description 支持固定位置的布局, 支持动画和保存位置
 * @example https://g6.antv.vision/zh/docs/manual/advanced/custom-layout
 */
export default G6 => {
  G6.registerLayout('position-remember', {
    /**
     * 定义自定义行为的默认参数，会与用户传入的参数进行合并
     */
    getDefaultCfg() {
      return {
        center: [0, 0], // 布局的中心
      };
    },
    /**
     * 初始化
     * @param {object} data 数据
     */
    init(data) {

    },
    /**
     * 执行布局
     */
    execute() {

    },
    /**
     * 根据传入的数据进行布局
     * @param {object} data 数据
     */
    layout(data) {},
    /**
     * 更新布局配置，但不执行布局
     * @param {object} cfg 需要更新的配置项
     */
    updateCfg(cfg) {},
    /**
     * 销毁
     */
    destroy() {},
  });
};
