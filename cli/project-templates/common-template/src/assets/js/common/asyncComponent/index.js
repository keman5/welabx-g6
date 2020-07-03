/**
 * 异步组件 loading
 */

import LoadingComponent from './LoadingComponent';
import ErrorComponent from './ErrorComponent';

const asyncComponent = (componentPromise) => {
    const AsyncHandler = () => ({
        component: componentPromise,
        loading:   LoadingComponent,
        error:     ErrorComponent,
        timeout:   10000,
        delay:     100,
    });

    return Promise.resolve({
        functional: true,
        render(h, { data, children }) {
            // Transparently pass any props or children
            // to the view component.
            return h(AsyncHandler, data, children);
        },
    });
};

export default asyncComponent;
