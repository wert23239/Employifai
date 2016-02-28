
var Queue = require('firebase-queue'),
    Firebase = require('firebase');

var queueRef = new Firebase('https://team-red.firebaseio.com/queue');

queueRef.child("tasks").on("child_added", function (entrySnap) {
    var entry = entrySnap.val();
    console.log(entry);
    //
    // Do api calls, then eventually, write to result/
    //{}

    badurl= ["one","two"];
    entrySnap.ref().child("result").set({bad: ["http://www.w3schools.com/images/w3schools_green.jpg", "https://scontent.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/12508810_10208635411586437_8162708858364444974_n.jpg?oh=b55d48a05b17f6e626b29e1ee948658e&oe=57700588"],warning: "asd"});
    //entrySnap.ref().remove();
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
