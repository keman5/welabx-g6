import Shape from '@antv/g6/es/shape/shape';
import { shapeBase } from '@antv/g6/es/shape/ShapeBase';
import defaultStyles from '../utils/defaultStyles';

export default G6 => {
    const { Util } = G6;

    // 创建锚点
    Shape.registerFactory('anchor', {
        defaultShapeType: 'marker',
    });
    // 注册锚点 nodeName, options
    Shape.registerNode('single-anchor', Util.mix({}, shapeBase, {
        itemType: 'anchor',
        // 绘制shape
        drawShape(cfg, group) {
            const shapeType = this.shapeType;
            const style = this.getShapeStyle(cfg);

            return group.addShape(shapeType, {
                attrs: style,
            });
        },
        // 设置状态 cfg
        update (name, value, item) {
            if (name === 'active-anchor') {
                // 激活锚点
                if (value) {
                    // hover
                    this.update({
                        style: { ...defaultStyles.archorStateStyle.anchorPointHoverStyle }, item,
                    });
                } else {
                    // 恢复默认
                    this.update({
                        style: { ...defaultStyles.archorStateStyle.anchorPointStyle }, item,
                    });
                }
            }
        },
    }), 'circle');

    // 将锚点注册为单个锚点
    Shape.registerNode('marker', { shapeType: 'marker' }, 'single-anchor');
};
