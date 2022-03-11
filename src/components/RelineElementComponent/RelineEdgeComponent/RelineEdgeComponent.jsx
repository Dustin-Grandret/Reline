/* eslint-disable react/prop-types */
import React, { Component } from "react";

class RelineEdgeComponent extends Component {
    render() {
        const {
            headx,
            heady,
            tailx,
            taily,
        } = this.props;

        return (
            <line
                x1={headx}
                y1={heady}
                x2={tailx}
                y2={taily}
            />
        );
    }
}

export default RelineEdgeComponent;
