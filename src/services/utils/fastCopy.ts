class fastCopy {
    static fastCopy<T>(object:T):T {
        return JSON.parse(JSON.stringify(object));
    }
}
export default fastCopy.fastCopy;

const FastCopyClass = fastCopy;

export {
    FastCopyClass,
};
