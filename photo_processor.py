import time
from clarifai.client import ClarifaiApi
from firebase import firebase

ref = firebase.FirebaseApplication('https://team-red.firebaseio.com/')

while True:
    time.sleep(5)
    if (ref.get('/photos', None)):

        photo_list = ref.get('/photos', None)["links"]
        #print(photo_list)
        clarifai_api2 = ClarifaiApi('TXjKzuGltUsD3O-SX_NEHmMcUt9YaxmhtBsGPq5l',\
                                    'b2cR6i4a5PLZcB1a2OL4hvN0O4wSInqnLFldiQVM') # assumes environment variables are set.

        #tags to search
        tags = "drink,beer,wine,bar,drug,rave,sexy,smoke,tobacco,alcohol,bottle,weapon,police,party,club,drink,shirtless"

        high=[]
        medium=[]
        low=[]


        for image in photo_list:
            url = image['url'];
            tag_dict = {}
            result2 = clarifai_api2.tag_image_urls(url, select_classes=tags)
            bad=0
            sum=0
            for i in range (len(result2['results'][0]['result']['tag']['classes'])):

                tag = result2['results'][0]['result']['tag']['classes'][i]
                prob = result2['results'][0]['result']['tag']['probs'][i]

                if tag in tag_dict and tag_dict[tag] > prob:
                    pass

                else:
                    tag_dict[tag] = prob


                if prob > .8:
                    bad = bad+1

            for tag in tag_dict:
                sum += tag_dict[tag]
                print (tag, tag_dict[tag])

            print(len(tag_dict),sum,bad)

            if (sum >= 5 and bad >= 3) or sum>6:
                    print ("high")
                    high.append(image)
            elif (sum <= 3 and bad <= 2) or (sum<1.25 or bad==0):
                    print ("low")
                    low.append(image)
            else:
                    print("medium")
                    medium.append(image)



        print("high",high)
        print("medium",medium)
        if len(high)==0:
            high.append({'url' : 0})

        if len(medium)==0:
            medium.append({'url' : 0})


        final_photos_list = {"high":high, "medium": medium}

        ref.put('/final_photos', 'final_photos', final_photos_list)
