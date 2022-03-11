import React from "react";
import { createPortal } from "react-dom";

function EditableDiv() {
    return (
        <input
            type="text"
            name="name"
            onChange={
                () => {
                    console.log(123);
                }
            }
            style={
                {
                    zIndex: 5,
                    backgroundColor: "red",
                    position: "absolute",
                }
            }
            placeholder="123"
        />
    );
}
function EditableDivContainer() {
    return createPortal(
        <EditableDiv />,
        document.body,
    );
}

export default EditableDivContainer;
