// This works on all devices/browsers, and uses IndexedDBShim as a final fallback 
//var indexedDB = window.indexedDB || window.mozIndexedDB
//		|| window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
//
//var request, db;
//
//// Open (or create) the database
//var open = indexedDB.open("MyDatabase", 1);
//
// // Create the schema
// open.onupgradeneeded = function() {
// var db = open.result;
// var store = db.createObjectStore("MyObjectStore", {keyPath: "id"});
// var index = store.createIndex("NameIndex", ["name.last", "name.first"]);
// };
//
// open.onsuccess = function() {
// // Start a new transaction
// var db = open.result;
// var tx = db.transaction("MyObjectStore", "readwrite");
// var store = tx.objectStore("MyObjectStore");
// var index = store.index("NameIndex");
//
// // Add some data
// store.put({id: 12345, name: {first: "John", last: "Doe"}, age: 42});
// store.put({id: 67890, name: {first: "Bob", last: "Smith"}, age: 35});
//    
// // Query the data
// var getJohn = store.get(12345);
// var getBob = index.get(["Smith", "Bob"]);
//
// getJohn.onsuccess = function() {
// console.log(getJohn.result.name.first); // => "John"
// };
//
// getBob.onsuccess = function() {
// console.log(getBob.result.name.first); // => "Bob"
// };
//
// // Close the db when the transaction is done
// tx.oncomplete = function() {
// db.close();
// };
// }
// function open(version) {
// var request = indexedDB.open("stuff", version);
//
// request.onupgradeneeded = function(e) {
// var db = e.target.result;
// e.target.transaction.onerror = database.onerror;
//
// if(db.objectStoreNames.contains("items")) {
// db.deleteObjectStore("items");
// }
//
// var store = db.createObjectStore("items",
// {keyPath: "time"});
// };
//
// request.onsuccess = function(e) {
// database.db = e.target.result;
// };
//
// request.onerror = database.onerror;
// };
window.indexedDB = window.indexedDB || window.webkitIndexedDB
		|| window.mozIndexedDB || window.msIndexedDB;

var request, db;

request = indexedDB.open("stuff", 2);

request.onerror = function(event) {
	console.log("Error opening DB", event);
}

request.onupgradeneeded = function(event) {
	console.log("Upgrading");
	db = event.target.result;

	if (db.objectStoreNames.contains("items")) {
		db.deleteObjectStore("items");
	}

	var store = db.createObjectStore("items", {
		keyPath : "id"
	});
};

request.onsuccess = function(e) {
	console.log("Success opening DB");
	db = e.target.result;
};

function add() {
	var transaction = db.transaction(["items"],"readwrite");
	
    transaction.oncomplete = function(event) {
        console.log("Success :)");
    };
    
    transaction.onerror = function(event) {
        console.log("Error :(");
    };
    
    var objectStore = db.transaction.objectStore("items");
    
    var currentDate = new Date()
    var day = currentDate.getDate()
    var month = currentDate.getMonth() + 1
    var year = currentDate.getFullYear()
    objectStore.add({id: 1, code: "AX", rate: 1.3, lastdatemodified: day + "/" + month + "/" + year});
    objectStore.add({id: 2, code: "BY", rate: 2.3, lastdatemodified: day + "/" + month + "/" + year});
    objectStore.add({id: 3, code: "CZ", rate: 6.7, lastdatemodified: day + "/" + month + "/" + year});
}

function readall() {
    var objectStore = db.transaction("items").objectStore("items");

    objectStore.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
    	  addrow(cursor.key, cursor.value.code, cursor.value.rate, cursor.value.lastdatemodified);
            cursor.continue();
      }
    };     
}


function cleardata() {
	var transaction = db.transaction(["items"], "readwrite");
	    

	 transaction.oncomplete = function(event) {
	   console.log("Transaction ok");
	  };
	    
	  transaction.onerror = function(event) {
	    console.log("Transaction ko");
	  };

	  var objectStore = transaction("items").objectStore("items");
	  var objectStoreRequest = objectStore.clear();
	    
	  objectStoreRequest.onsuccess = function(event) {
	  	 console.log("Transaction ko");
	  };
}
