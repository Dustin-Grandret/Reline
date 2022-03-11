/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, createRef } from "react";
import ReactEditableSvgLabel from "react-editable-svg-label";
import { useSelector, useDispatch } from "react-redux";

import { changeCurActivElem } from "../../redux/store/MainViewStatusSlice";
import { layoutGraph } from "../../redux/store/GraphSlice";

import RelineEdgeComponent from "../RelineElementComponent/RelineEdgeComponent/RelineEdgeComponent";
import RelineNodeComponent from "../RelineElementComponent/RelineNodeComponent/RelineNodeComponent";

import {
    clientToSVG,
    SVGToClient,
} from "../../utils/svgUtils";

import {
    // move,
    // scale,
    // setOffset,
    // setSize,
    saveOffSet,
    startDrag,
    endDrag,
    setOffsetBegin,
    setOffsetEnd,
    scale,
} from "../../redux/store/DiagramSlice";

import "../../assets/style.css";

import {
    SCALE_SIZE,
    HIERARCHY_LAYOUT_MAINAXSEP,
    HIERARCHY_LAYOUT_SUBAXSEP,
    HIERARCHY_LAYOUT_OFFSETX,
    HIERARCHY_LAYOUT_OFFSETY,
} from "../../assets/constants";
import EditingBox from "../EditingBox/EditingBox";
import RelineGraphUtil from "../../services/Reline/utils/RelineGraphUtil";

function RelineDiagram() {
    const {
        graph,
    } = useSelector((state) => state.graph);

    const {
        curActivElemId,
    } = useSelector((state) => state.mainViewStatus);

    const {
        size,
        offsetX,
        offsetY,
        offsetStartX,
        offsetEndX,
        offsetStartY,
        offsetEndY,
    } = useSelector((state) => state.diagram);

    const dispatch = useDispatch();

    const svg = useRef(null);

    const CTM = useRef(null);
    // for fast responding
    const inverseCTM = useRef(null);

    const editingBoxRef = createRef();

    // From https://stackoverflow.com/questions/53458053/how-to-handle-react-svg-drag-and-drop-with-react-hooks
    const handleMouseMove = useRef(
        (event) => {
            dispatch(setOffsetEnd(
                clientToSVG(svg.current, event.clientX, event.clientY, inverseCTM.current),
            ));
        },
    );

    const handleMouseDown = (event) => {
        dispatch(setOffsetBegin(
            clientToSVG(svg.current, event.clientX, event.clientY, inverseCTM.current),
        ));
        document.addEventListener("mousemove", handleMouseMove.current);
    };

    const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove.current);
        dispatch(saveOffSet());
    };

    const handleMouseLeave = () => {
        document.removeEventListener("mousemove", handleMouseMove.current);
        dispatch(saveOffSet());
    };

    useEffect((props, state) => {
        dispatch(layoutGraph({
            layoutId: "hierarchy",
            options: {
                mainAxSEP: HIERARCHY_LAYOUT_MAINAXSEP,
                subAxSEP: HIERARCHY_LAYOUT_SUBAXSEP,
                offsetX: HIERARCHY_LAYOUT_OFFSETX,
                offsetY: HIERARCHY_LAYOUT_OFFSETY,
            },
        }));
    });

    useEffect((props, state) => {
        CTM.current = svg.current.getScreenCTM();
        inverseCTM.current = CTM.current.inverse();
    }, [size, offsetX, offsetY]);

    const handleWheel = (event) => {
        if (event.ctrlKey) {
            dispatch(scale({
                dsize: (event.deltaY > 0 ? 1 : -1) * SCALE_SIZE,
            }));
        }
    };

    const curActivElem = graph.nodes[curActivElemId];
    const {
        x,
        y,
    } = (curActivElem) ? SVGToClient(
        svg.current,
        curActivElem.metadata.show.x,
        curActivElem.metadata.show.y,
        CTM.current,
    ) : {
        x: 0,
        y: 0,
    };
    const curActivElemClientX = x;
    const curActivElemClientY = y;
    const curActivElemLabel = (curActivElem) ? curActivElem.metadata.basic.label : "";

    return (
        <div>
            <svg
                viewBox={`${-(offsetX + offsetEndX - offsetStartX)} ${-(offsetY + offsetEndY - offsetStartY)} ${size} ${size}`}
                xmlns="<http://www.w3.org/2000/svg>"
                requiredFeatures="http://w3.org"
                onClick={() => {
                    if (curActivElemId !== "") {
                        dispatch(changeCurActivElem(""));
                    }
                }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onWheel={handleWheel}
                ref={svg}
                className="RelineDiagram"
            >
                {
                    graph.edges.map(
                        (edge) => (
                            <RelineEdgeComponent
                                key={edge.id}
                                headx={edge.metadata.show.headx}
                                heady={edge.metadata.show.heady}
                                tailx={edge.metadata.show.tailx}
                                taily={edge.metadata.show.taily}
                            />
                        ),
                    )
                }
                {
                    Object.keys(graph.nodes).map(
                        (nodeId) => (
                            <RelineNodeComponent
                                key={nodeId}
                                nodeId={nodeId}
                                x={graph.nodes[nodeId].metadata.show.x}
                                y={graph.nodes[nodeId].metadata.show.y}
                                text={graph.nodes[nodeId].metadata.basic.label}
                                editingBoxRef={editingBoxRef}
                            />
                        ),
                    )
                }
            </svg>
            <EditingBox
                top={curActivElemClientY}
                left={curActivElemClientX}
                label={curActivElemLabel}
                elemId={curActivElemId}
                editingBoxRef={editingBoxRef}
            />
        </div>
    );
}

export default RelineDiagram;
