import {configureStore} from "@reduxjs/toolkit"
import sliceReducer from '../Action/Action'
export const store=configureStore({
    reducer:{
        counter:sliceReducer,
    }
})
