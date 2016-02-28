from firebase import firebase
import json
import facebook
import time

fb= firebase.FirebaseApplication('https://team-red.firebaseio.com/')
while True:
    if (fb.get('/queue', None)):
        result = fb.get('/queue', None)
        for key in result:
            user_token = result[key]
            graph = facebook.GraphAPI(access_token=user_token)
            photos = graph.get_connections(id = 'me', connection_name = 'user/photos')

        print photos
        break;
    time.sleep(1)
