import {createSlice } from "@reduxjs/toolkit";


const initialState = {
    sections:[
        {
            sectionName:"",
            sectionNumber:"",
            lessons:[
                {
                    title:"",
                    videoUrl:null,
                    lessonNumber:"",
                    lessonDescription:"",
                },
            ],
            courseId:"",
        }
    ]
};


export const sectionDataSlice = createSlice({
  name:"sectiondataslice",
  initialState,
  reducers:{
    setSectionName:(state,action)=>{
        console.log(action);
        state.sections = action.payload;
    },
    setSectionNumber:(state, action)=> {
        state.sections.sectionNumber = action.payload;
    },
    setLessons:(state, actions) => {
        state.sections.lessons = actions.payload;
    },
    setCourseId: (state, action) => {
        state.sections.courseId = action.payload;
    }
  }
});

//need to write some funcitonalities in store js file
export const {setSectionName, setSectionNumber, setLessons, setCourseId} =
sectionDataSlice.actions;

export default sectionDataSlice.reducer;