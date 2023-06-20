import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    tasks: []
}
export const sliceFile = createSlice({
    name: "Sticky",
    initialState: initialState,
    reducers: {
        addData: (state, action) => {
            state.tasks.push({
                id: action.payload.id,
                title: action.payload.title,
                content: action.payload.content
            });
        },
        deleteData: (state, action) => {
            state.tasks = state.tasks.filter((item) => {
                console.log(action);
                return item.id !== action.payload;
            })
        },
        editData: (state, action) => {
            console.log(action);
            state.tasks.map((item) => {
                if (item.id === action.payload.previd) {
                    item.id = action.payload.id;
                    item.title = action.payload.prevTitle;
                    item.content = action.payload.prevContent;
                }
            })
        }
    }
})
export const { addData, deleteData, editData } = sliceFile.actions
export default sliceFile.reducer