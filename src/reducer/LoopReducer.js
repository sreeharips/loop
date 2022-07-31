import { ACTIONS } from "./LoopAction";

export const LoopReducer = (state,action) =>{

    
    switch(action.type){
        case ACTIONS.INITIALIZE:
            let savedData = localStorage.getItem(state.auth)
            if(savedData){
                savedData = JSON.parse(savedData);
            }
            let added = savedData?savedData['addedRestau']:[];
            let bookmarked = (savedData && savedData['bookmarkedRestau'])?savedData['bookmarkedRestau']:[];
            return {...state,added:added,bookmarked:bookmarked};
        case ACTIONS.AUTHSET:
            return {...state,auth:action.payload.auth};
        case ACTIONS.ALLRESTAU:
            return {...state,allRestau : action.payload.allRestau};
        case ACTIONS.ADDED:
            if(!state.added){
                state.added = []
            }
            let set = new Set();
            
            for(let ad of state.added){
                set.add(ad.id);
            }
            let uniqueList = action.payload.added.filter((ade)=>{
                if(set.has(ade.id)){
                    return false;
                }
                return true;
            });
            console.log('uniqueList::::::',uniqueList);
            let addData = (localStorage.getItem(state.auth))?JSON.parse(localStorage.getItem(state.auth)):{};
            addData['addedRestau'] = [...state.added,...uniqueList];
            localStorage.setItem(state.auth,JSON.stringify(addData));
            return {...state,added:[...state.added,...uniqueList] };
        case  ACTIONS.DELETE_ADDED:
            const did = action.payload.id;
            let afterDeleteList = state.added.filter(add=>{
                if(did === add.id){
                    return false;
                }
                return true;
            });
            if(!afterDeleteList){
                afterDeleteList = [];
            }
            let deletedaddData = (localStorage.getItem(state.auth))?JSON.parse(localStorage.getItem(state.auth)):{};
            deletedaddData['addedRestau'] = afterDeleteList;
            localStorage.setItem(state.auth,JSON.stringify(deletedaddData));
            return {...state,added:afterDeleteList };
        case ACTIONS.BOOKMARK:
                if(!state.added){
                    state.added = []
                }
                let bookmarkData = (localStorage.getItem(state.auth))?JSON.parse(localStorage.getItem(state.auth)):{};
                bookmarkData['bookmarkedRestau'] = [...state.bookmarked,action.payload.bookmarked];
                
                localStorage.setItem(state.auth,JSON.stringify(bookmarkData));
                return {...state,bookmarked:[...state.bookmarked,action.payload.bookmarked] };
        case  ACTIONS.DELETE_BOOKMARK:
            const bid = action.payload.id;
            let afterDeleteBookmarkList = state.bookmarked.filter(add=>{
                if(bid === add.id){
                    return false;
                }
                return true;
            });
            if(!afterDeleteBookmarkList){
                afterDeleteBookmarkList = [];
            }
            let deletedbkData = (localStorage.getItem(state.auth))?JSON.parse(localStorage.getItem(state.auth)):{};
            deletedbkData['bookmarkedRestau'] = afterDeleteBookmarkList;
            localStorage.setItem(state.auth,JSON.stringify(deletedbkData));
            return {...state,bookmarked:afterDeleteBookmarkList };
    }

}