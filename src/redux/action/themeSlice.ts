import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
    name: 'counter',
    initialState: {
        currentMode:'Light',
      },
    reducers: {
   
      setCurrentMode: (state, action) => {
        state.currentMode = action.payload

      },
      setMode: (state, action) => {
        state.currentMode = action.payload.target.value
        localStorage.setItem('themeMode', action.payload.target.value);
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setMode, setCurrentMode } = themeSlice.actions
  
  export default themeSlice.reducer