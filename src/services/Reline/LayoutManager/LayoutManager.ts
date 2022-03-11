/* eslint-disable guard-for-in */
import LayoutNone from "../Layouts/LayoutNone";
import LayoutHierarchySimple from "../Layouts/LayoutHierarchySimple";
import LayoutHierarchy from "../Layouts/LayoutHierarchy";

const LayoutManager = {
    none: LayoutNone,
    hierarchySimple: LayoutHierarchySimple,
    hierarchy: LayoutHierarchy,
};
export default LayoutManager;
