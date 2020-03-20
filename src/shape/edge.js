
import defaultStyles from '../utils/defaultStyles';

// 可点坐标
/* const dashCorner = [
    [0, 0],
]; */

/*
 * flow:
 * 注册基础edge => 创建锚点/图标 => 绘制edge => 初始化edge状态 => dege动画(设置交互动画)
 */

export default G6 => {
    G6.registerNode('base-edge', {
        // 节点样式
        options: {
            icon: null, // 默认不带图标
            ...defaultStyles.iconStyle,
            ...defaultStyles.nodeStateStyles,
        },
        // 绘制图标
        drawIcon (cfg) {

        },
        // 绘制锚点
        initAnchor (cfg) {

        },
        /* 绘制节点，包含文本 */
        draw (cfg, group) {
            const shapeType = this.shapeType;
            const style = this.getShapeStyle(cfg);
            const shape = group.addShape(shapeType, {
                attrs: {
                    ...style,
                },
            });

            this.drawIcon(cfg,group);
            this.initAnchor(group);
            return shape;
        },
        // 动画函数
        runAnimate (cfg, group) {
            if (cfg.active) {
                //
            }
        },
        /* 绘制后的附加操作，默认没有任何操作 */
        afterDraw (cfg, group) {
            this.runAnimate(cfg, group);
        },
        /* 更新节点，包含文本 */
        update (cfg, node) {

        },
        /* 更新节点后的操作，同 afterDraw 配合使用 */
        /* afterUpdate (cfg, group) {
            // 显示/隐藏图标
            const icon = group.get('group').icon;

            if (icon) {
                if(cfg.hideIcon && icon.get('visible')){
                    icon.hide();
                }else if(!cfg.hideIcon && !icon.get('visible')){
                    icon.show();
                }
            }
        }, */
        /* 设置节点的状态，主要是交互状态，业务状态请在 draw 方法中实现 */
        setState (name, value, node) {

        },
        /* 获取锚点（相关边的连入点） */
        getAnchorPoints (cfg) {
            return [
                [0.5, 0], // top
                [1, 0.5], // right
                [0.5, 1], // bottom
                [0, 0.5], // left
            ];
        },
    }, 'single-shape');
};
