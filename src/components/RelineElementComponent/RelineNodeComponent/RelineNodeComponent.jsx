/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/style-prop-object */
import React from "react";

import { useSelector, useDispatch } from "react-redux";

import ReactEditableSvgLabel from "react-editable-svg-label";
// import EditableSvgLabel from "../../EditableSvgLabel/EditableSvgLabel";

import { changeCurActivElem } from "../../../redux/store/MainViewStatusSlice";

import { createEditingLabelBox } from "../../../redux/store/DiagramSlice";

import {
    TEXT_HEIGHT,
    FONT_SIZE,
    RX,
    RY,
    STROKE_WIDTH,
    NODE_RECT_SHRINK_PARA,
    MIN_WIDTH,
} from "../../../assets/constants";

function RelineNodeComponent(props) {
    const { curActivElemId } = useSelector((state) => state.mainViewStatus);
    const {
        nodeId,
        x,
        y,
        text,
        editingBoxRef,
    } = props;
    const curActiv = (curActivElemId === nodeId);
    const width = Math.max(FONT_SIZE * text.length * NODE_RECT_SHRINK_PARA, MIN_WIDTH);
    const height = TEXT_HEIGHT;

    const dispatch = useDispatch();

    // eslint-disable-next-line no-unused-vars
    const handleDoubleClick = () => {
        editingBoxRef.current.focus();
        dispatch(createEditingLabelBox());
    };

    const handleKeyPress = (event) => {
        if (event.key) {
            console.log(event.key);
        }
    };

    return (
        <>
            <rect
                x={x - width / 2}
                y={y - height / 2}
                width={width}
                height={height}
                style={
                    curActiv ? {
                        fill: "AliceBlue",
                        opacity: 0.8,
                        stroke: "black",
                        strokeWidth: STROKE_WIDTH,
                        strokeOpacity: 0.3,
                        rx: RX,
                        ry: RY,
                    } : {
                        fill: "blue",
                        stroke: "black",
                        strokeWidth: STROKE_WIDTH,
                        strokeOpacity: 0.3,
                        rx: RX,
                        ry: RY,
                    }
                }
                onClick={(event) => {
                    event.stopPropagation();
                    dispatch(changeCurActivElem(nodeId));
                }}
                onDoubleClick={handleDoubleClick}
            />
            <text
                x={x}
                y={y}
                dominantBaseline="central"
                style={{
                    fill: "black",
                    fontSize: FONT_SIZE,
                    textAnchor: "middle",
                }}
                onClick={(event) => {
                    event.stopPropagation();
                    dispatch(changeCurActivElem(nodeId));
                }}
                onDoubleClick={handleDoubleClick}
            >
                {text}
            </text>
        </>
    );
}

export default RelineNodeComponent;
