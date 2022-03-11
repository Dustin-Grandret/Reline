import {
    getOptions,
} from "./mainActions";

const global = {
    shared: {},
};
global.shared.options = getOptions();

export default global;
