"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pouchdb_1 = __importDefault(require("pouchdb"));
// const dbPath:string= "/home/dustin/Documents/SRTP/reline/db";
var MGSManager = /** @class */ (function () {
    /**
     * Construct a MGSManager with a given db
     * It could be a diftinition of db that
     * let db = new PouchDB('dbfile');
     * @param db DB
     */
    function MGSManager(db) {
        this.db = db;
        this.mindGraphs = [];
    }
    /**
     * load and check docs in this.db to this.mindGraph
     * @returns undefined
     */
    MGSManager.prototype.loadDB = function () {
        var _this = this;
        // TODO: check the doc is mindGraph with json schema
        this.db.allDocs({
            include_docs: true,
        }).then(function (data) {
            _this.mindGraphs = data.rows.map(function (row) { return row.doc; });
        }).catch(function (err) {
            console.log(err);
        });
    };
    MGSManager.prototype.dumpDB = function () {
    };
    /**
     * Create and return an empty root Node.
     * @returns {Node} An empty node
     */
    MGSManager.createRootNode = function () {
        return {
            label: "",
            metadata: {
                type: [""],
            },
        };
    };
    MGSManager.prototype.commit = function () {
    };
    MGSManager.prototype.deleteMG = function () {
    };
    MGSManager.prototype.deleteNode = function () {
    };
    MGSManager.prototype.getNode = function () {
    };
    MGSManager.prototype.insertRootNode = function () {
    };
    MGSManager.prototype.insertChildNode = function () {
    };
    MGSManager.prototype.toString = function () {
    };
    MGSManager.prototype.updateNode = function () {
    };
    MGSManager.prototype.getParentNode = function () {
    };
    MGSManager.prototype.getChildNodePosition = function () {
    };
    MGSManager.prototype.getChildNode = function () {
    };
    return MGSManager;
}());
exports.default = MGSManager;
var pathD = new pouchdb_1.default("/home/dustin/Documents/SRTP/reline/db/mindGraph");
var a = new MGSManager(pathD);
a.loadDB();
//# sourceMappingURL=DBManager.js.map