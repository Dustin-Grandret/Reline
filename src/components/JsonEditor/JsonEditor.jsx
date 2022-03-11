/* eslint-disable react/prop-types */
import React from "react";
import ReactJson from "react-json-view";

function JsonEditor(props) {
    const { src, setData } = props;
    return (
        <>
            <ReactJson
                src={src}
                onEdit={
                    (edit) => {
                        setData(edit);
                    }
                }
                onAdd={
                    (edit) => {
                        setData(edit);
                    }
                }
                onDelete={
                    (edit) => {
                        setData(edit);
                    }
                }
            />
            <div />
        </>
    );
}

export default JsonEditor;
