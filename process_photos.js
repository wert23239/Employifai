
var Queue = require('firebase-queue'),
    Firebase = require('firebase');
var queueRef = new Firebase('https://team-red.firebaseio.com/queue');
var queue = new Queue(queueRef, function(data, progress, resolve, reject) {
    // Read and process task data
    console.log(data);

    // Do some work
    ref = new Firebase("https://team-red.firebaseio.com/");
    ref.push({'foo': data});
    ref.push({'foo': "fuck.me"});
    progress(50);
    console.log("asfok");
    // Finish the job asynchronously
    setTimeout(function() {
        resolve();
    }, 1000);
});
