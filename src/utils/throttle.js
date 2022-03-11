/* eslint-disable import/prefer-default-export */
const throttle = (f) => {
    let token = null;
    let lastArgs = null;
    const invoke = () => {
        f(...lastArgs);
        token = null;
    };
    const result = (...args) => {
        lastArgs = args;
        if (!token) {
            token = requestAnimationFrame(invoke);
        }
    };
    result.cancel = () => token && cancelAnimationFrame(token);
    return result;
};

export {
    throttle,
};
