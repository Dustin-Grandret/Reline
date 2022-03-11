/* eslint-disable import/prefer-default-export */
function clientToSVG(svg, x, y, inverseCTM) {
    const point = svg.createSVGPoint();
    point.x = x;
    point.y = y;
    const pointSvg = point.matrixTransform(inverseCTM);
    return {
        x: pointSvg.x,
        y: pointSvg.y,
    };
}

function SVGToClient(svg, x, y, CTM) {
    if (svg) {
        const pointSvg = svg.createSVGPoint();
        pointSvg.x = x;
        pointSvg.y = y;
        const point = pointSvg.matrixTransform(CTM);
        return {
            x: point.x,
            y: point.y,
        };
    }
    return {
        x: 0,
        y: 0,
    };
}

export {
    clientToSVG,
    SVGToClient,
};
