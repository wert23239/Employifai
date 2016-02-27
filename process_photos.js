
var Queue = require('firebase-queue'),
    Firebase = require('firebase');

var queueRef = new Firebase('https://team-red.firebaseio.com/queue');

queueRef.child("tasks").on("child_added", function (entrySnap) {
    var entry = entrySnap.val();
    console.log(entry);

    // Do api calls, then eventually, write to result/
    //{}

    badurl= ["one","two"];
    entrySnap.ref().child("result").set({bad: ["one", "two"],warning: "asd"});
    //entrySnap.ref().child("result").set({result: true});
})
//var queue = new Queue(queueRef, {sanitize: false}, function(data, progress, resolve, reject) {
//    // Read and process task data
//    console.log(data);
//
//    // Do some work
//    //ref = new Firebase("https://team-red.firebaseio.com/");
//    //ref.push({'foo': data});
//    //ref.push({'foo': "fuck.me"});
//    progress(50);
//    console.log("asfok");
//    resolve({success: true});
//    // Finish the job asynchronously
//    //setTimeout(function() {
//    //    resolve({"result": "true"});
//    //}, 1000);
//});
