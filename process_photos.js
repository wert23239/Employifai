
var Queue = require('firebase-queue'),
    Firebase = require('firebase');

var graph = require('fbgraph');

var queueRef = new Firebase('https://team-red.firebaseio.com/queue');

queueRef.on("child_added", function (entrySnap) {
    var access_token = entrySnap.val();
    graph.setAccessToken(access_token);
    //
    // Do api calls, then eventually, write to result/
    //{}
    console.log(access_token);
    var files= [];
    var graphObject = graph

      .get("/me/photos?fields=source", function(err, res) {
        console.log(err);
        console.log(res); // { id: '4', name: 'Mark Zuckerberg'... }
          //res.paging.toString();
          //files.append(res.data.);
        while(res.paging && res.paging.next) {
         res.paging= graph.get(res.paging.next, function(err, res) {
            //console.log(err);
            //console.log(res);
             //files.add(res.data);
            return res.paging
          });
           // res.paging=res.paging.next;
        }
      });
    queueRef.remove();
   // entrySnap.ref().child("result").set({bad: ["one", "two"],warning: "asd"});
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
