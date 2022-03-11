/* eslint-disable react/prop-types */
// 可修改的text. ReactEditableSvgLabel有位置错误,事件绑定错误这样的问题,所以决定重写一个
import React from "react";
import EditableDiv from "./EditableDiv";

function EditableSvgLable(props) {
    const {
        x,
        y,
        text,
        style,
        dominantBaseline,
    } = props;

    const editStart = () => {
        console.log("start");
    };

    const editEnd = () => {
        console.log("end");
    };

    return (
        <>
            <text
                x={x}
                y={y}
                style={style}
                dominantBaseline={dominantBaseline}
                onDoubleClick={editStart}
                onBlur={editEnd}
            >
                { text }
            </text>
            <EditableDiv />
        </>
    );
}

export default EditableSvgLable;
