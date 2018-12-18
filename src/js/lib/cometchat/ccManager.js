/**
 * CCManager class : To manage cometchat SDK
 */

import {CometChat,UsersRequestBuilder,GroupsRequestBuilder,UserMessagesRequestBuilder,MESSAGE_REQUEST,MESSAGE_TYPE,RECEIVER_TYPE,TextMessage,MediaMessage,MessageEventListener} from '@cometchat-pulse/cometchat-pulse.js';

import * as actionCreator from './../../store/actions/cc_action';

export default class CCManager {

    static cometchat = null;
    
    
    static appId        =   '219cb4a5aed5';
    static apiKey       =   '5b0c573f6e87a45beccea8bb3109f478f479aea0';
    static LISTENER_KEY   =   "listener1";

    // static appId        =   '{APP_ID}';     //Enter your App ID 
    // static apiKey       =   '{API_KEY}';    //Enter your API KEY


    // static LISTENER_KEY   =   'Listener_Key';


    static usersRequestBuilder  = null;
    static groupsRequestBuilder = null;
  
    
    static init(dispatcher){
            
        //initialize cometchat manager
        CometChat.init(this.appId);

        //initiate Chat API POJO objects
        CCManager.usersRequestBuilder   = new UsersRequestBuilder();
        CCManager.groupsRequestBuilder  = new GroupsRequestBuilder();
       
    }


    static getInstance() {
        if (CCManager.cometchat == null) {
            CCManager.cometchat = CometChat.init(this.appId);
        }

        return CCManager.cometchat;
    }


    static getTextMessage(uid, text){
        return new TextMessage(uid, text,  MESSAGE_TYPE.TEXT, RECEIVER_TYPE.USER);
    }

    static addMessageListener(dispatch){
        console.log("ccmangr addMessageListener: ");
        try{
            CometChat.addMessageEventListner(
                this.LISTENER_KEY, null, 
                new MessageEventListener({
                    onActionRecived: (message) => {
    
                        // handle actions
                        // console.log("ccmangr action: " + JSON.stringify(message));
                        // console.log("ccmessanger : " + {message});
                        
                        this.handleActionMessage(message,dispatch);     
                    },
                    onMessageReceived: (message) => {
    
                        // console.log("ccmangr recieved msg: " + JSON.stringify(message));
    
                        // console.log("ccmessanger  recieved : " + {message});
        
                        if( message instanceof TextMessage){
                            // handle text messages	              
                            this.handleTextMessage(message,dispatch);
                            
                        }else if(message instanceof MediaMessage) {
                            // handle media messages
                            this.handleMediaMessage(message,dispatch);
                        }                
                    }
                })
            );
        }catch(err){
            console.log("error captured",{err});
        }
    

    }

    static handleMediaMessage(message,dispatch){
        //console.log("ccmangr msg: " + JSON.stringify(message));
        dispatch(actionCreator.handleMediaMessage(message));
    }

    static handleTextMessage(message,dispatch){
        //console.log("ccmangr msg: " + JSON.stringify(message));
        actionCreator.handleTextMessage(message,dispatch);
    }

    static handleActionMessage(action,dispatch){
        
    }

    static messageRequestBuilder(uid,limit){

        let currentTime=parseInt((new Date().getTime() / 1000).toString());

        console.log("Current time : " + currentTime);

        let messageRequestBuilder = new UserMessagesRequestBuilder(uid,currentTime, MESSAGE_REQUEST.SENT_AT);

        let messageRequest = messageRequestBuilder.setLimit(limit).build();

        return messageRequest;
    }

}


