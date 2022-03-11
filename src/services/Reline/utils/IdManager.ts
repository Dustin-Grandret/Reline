export default class IdManager {
    static idPool:Set<string> = new Set();

    static addIdToIdPool(id:string) {
        this.idPool.add(id);
    }

    static generateId() {
        let resultId = "";
        do {
            resultId = Math.random().toString(36).slice(8);
        } while (this.idPool.has(resultId));
        return resultId;
    }
}
