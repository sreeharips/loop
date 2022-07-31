import React, { useEffect, useReducer, useState } from "react";
import { ACTIONS } from "../reducer/LoopAction";
import { LoopReducer } from "../reducer/LoopReducer";

export const LoopContext = React.createContext(null);
export const LoopProvider = ({children}) =>{
    const url = 'https://us-central1-practice-40e69.cloudfunctions.net';
    //const url="http://127.0.0.1:5000/api/v1"
    const [state,dispatch] = useReducer(LoopReducer,{});
    const [snackbarMessage,setSnackbarMessage] = useState('');
    const [snackbarOpen,setSnackbarOpen] = useState(false);
    const [hideNav,setHideNav] = useState( window.innerWidth <= 760? false: true);
   

    const handleSnackbarClose = ()=>{
        setSnackbarOpen(false);
    }

    const showSnackbarMessage = (message) =>{
        setSnackbarOpen(true);
        setSnackbarMessage(message);
    }
    const login = async (userId,password)=>{

        const response =   fetch(url+"/signIn",{
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({'user':userId,'pwd':password})
        }).then((resp)=>resp.json()).
        then(data=>data);
        return response;

    }


    const loadRestaurants = async()=>{
        
        const response =   fetch(url+"/fetchAllRestaurants",{
            method: 'GET',
            mode: 'cors'
        }).then((resp)=>resp.json()).
        then(data=>{
            console.log(data);
           const newRecords =  data.all.records.map((record) =>{
                return {name: record['fields']['Name'],id: record['id']};
            })
            dispatch({type: ACTIONS.ALLRESTAU,payload:{allRestau:newRecords}})
            
            return newRecords;
        });
        return response;

    }
    const bookmark = (bookmarked) =>{
        dispatch({type:ACTIONS.BOOKMARK,payload:{bookmarked:bookmarked}});
        showSnackbarMessage(bookmarked.name+' is added to Boomark');
        deleteAdded(bookmarked.id);
         
    }
    const updateAddedValues = (added) =>{
        dispatch({type:ACTIONS.ADDED,payload:{added:added}});
        showSnackbarMessage(added.name + ' Added ');
    }
    const setAuth = (auth) =>{
        dispatch({type:ACTIONS.AUTHSET,payload:{auth:auth}});
    }

    const initApp = () =>{
        dispatch({type:ACTIONS.INITIALIZE});
    }
    const deleteAdded = (id) =>{
        dispatch({type:ACTIONS.DELETE_ADDED,payload:{id:id}});
        showSnackbarMessage('Removed from Added ');
    }
    const deleteBookmark = (id) =>{
        dispatch({type:ACTIONS.DELETE_BOOKMARK,payload:{id:id}});
        showSnackbarMessage('Removed from Boomark');
    }
    useEffect(()=>{
        initApp();
    
    },[]);

    return <LoopContext.Provider value={{initApp,snackbarMessage,handleSnackbarClose,snackbarOpen,showSnackbarMessage,deleteAdded,deleteBookmark,login,loadRestaurants,allRestau: state.allRestau,updateAddedValues,bookmarked:state.bookmarked,added:state.added,setAuth,auth:state.auth,bookmark,hideNav,setHideNav}}>
        {children}

    </LoopContext.Provider>;
}