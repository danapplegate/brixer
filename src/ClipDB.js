// In the following line, you should include the prefixes of implementations you want to test.
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// DON'T use "var indexedDB = ..." if you're not in a function.
// Moreover, you may need references to some window.IDB* objects:
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!window.indexedDB) {
    window.alert('Offline file storage is not supported in this browser. Your work will be lost if you leave this page!');
}

const DB_NAME = "BrixerDB"
const OBJECT_STORE_NAME = "clipstore";
const DB_VERSION = 1;

export default class ClipDB {

    isOpen = false;
    db = null;
    clipObjectStore = null;

    open = () => {
        if (isOpen) {
            return;
        }

        console.log("Opening database");

        const request = window.indexedDB.open(DB_NAME, DB_VERSION);
        request.onerror = (event) => {
            console.log("Error opening database: ", event.target.errorCode);
        }
        request.onupgradeneeded = (event) => {
            console.log("Creating object stores");
            const db = event.target.result;
            db.createObjectStore(OBJECT_STORE_NAME, {keyPath: 'id', autoIncrement: true});
        }
        request.onsuccess = (event) => {
            console.log("Successfully opened database");
            this.db = event.target.result;
            this.isOpen = true;
        }
    }

    getClip = (clipId) => {

    }
}
