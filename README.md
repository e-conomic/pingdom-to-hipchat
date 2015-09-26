A simple Pingdom to hipchat service
===================================

Needs a few environment variables:
  * SECRET the string to passed in the query parameter secret
  * HIPCHAT_TOKEN_roomname A token for each room the service needs to
    post to. The roomname should be uppercased

In pingdom, setup a webhook to point to the following URl:

 <serviceurl>/alert?secret=<somesecret>&room=<someroom>
 
  
