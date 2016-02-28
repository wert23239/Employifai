
var Queue = require('firebase-queue'),
    Firebase = require('firebase');

var graph = require('fbgraph');
var ref = new Firebase('https://team-red.firebaseio.com/');
var queueRef = ref.child("queue");
var photos = ref.child("photos");

function retrievePhotos(photo_list, url, callback){
  var graphObject = graph
  .get(url, function(err, res) {
    console.log(err);
    console.log(res); // { id: '4', name: 'Mark Zuckerberg'... }
    //res.paging.toString();
    for(var i = 0; i < res.data.length; i++){
      values = {}
      values[url] = res.data[i]["source"];
      values[link] = res.data[i]["link"]
      photo_list.push(values);
      }

    //files.append(res.data.);
    if (res.paging && res.paging.next){
      retrievePhotos(photo_list, res.paging.next, callback);
    }

    else{
      callback();
    }

  });
}


queueRef.on("child_added", function (entrySnap) {
  var access_token = entrySnap.val();
  graph.setAccessToken(access_token);
  var files= [];
  retrievePhotos(files, "/me/photos/uploaded?fields=source, link", function() {
    console.log("Finished retriving photos.")
  })
  photos.set({links:files});
});

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
