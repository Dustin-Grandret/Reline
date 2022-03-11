/* eslint-disable react/prop-types */
import React from "react";
import {
    useDispatch,
    useSelector,
} from "react-redux";
import {
    closeEditingLabelBox,
} from "../../redux/store/DiagramSlice";
import {
    changeElementLabel,
} from "../../redux/store/GraphSlice";
import {
    ENTER_KEY_CODE,
} from "../../assets/constants";

function EditingBox(props) {
    const {
        top,
        left,
        label,
        elemId,
        editingBoxRef,
    } = props;
    const {
        editingLabel,
    } = useSelector((state) => state.diagram);

    const dispatch = useDispatch();

    const closeEditingLabelBoxShort = () => {
        dispatch(closeEditingLabelBox());
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            closeEditingLabelBoxShort();
        }
    };
    return (
        <input
            ref={editingBoxRef}
            type="text"
            style={
                {
                    position: "absolute",
                    zIndex: 1,
                    top,
                    left,
                    display: "inline",
                    backgroundColor: "white",
                    transform: "translate(-50%, -50%)",
                    fontSize: 20,
                    visibility: editingLabel ? "visible" : "hidden",
                }
            }
            onBlur={closeEditingLabelBoxShort}
            value={label}
            onChange={
                (event) => {
                    dispatch(changeElementLabel({
                        id: elemId,
                        value: event.target.value,
                    }));
                }
            }
            onKeyPress={handleKeyPress}
        />
    );
}

export default EditingBox;
