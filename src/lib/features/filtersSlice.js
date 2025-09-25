import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchQuery: "",
  location: "",
  selectedCuisines: [],
  selectedRating: 0,
  selectedPrice: "",
  selectedTime: "",
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    // Reducer for search input in Banner
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    // Reducer for location dropdown in Banner
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    // Reducer for cuisine checkboxes in Sidebar
    toggleCuisine: (state, action) => {
      const cuisine = action.payload;
      if (state.selectedCuisines.includes(cuisine)) {
        state.selectedCuisines = state.selectedCuisines.filter(c => c !== cuisine);
      } else {
        state.selectedCuisines.push(cuisine);
      }
    },
    // Reducer for rating radio buttons in Sidebar
    setRating: (state, action) => {
      state.selectedRating = action.payload;
    },
    // Reducer for price radio buttons in Sidebar
    setPrice: (state, action) => {
      state.selectedPrice = action.payload;
    },
     // Reducer for delivery time radio buttons in Sidebar
    setTime: (state, action) => {
        state.selectedTime = action.payload;
    },
    // Optional: A reducer to clear all filters
    clearFilters: (state) => {
        state.searchQuery = "";
        state.location = "";
        state.selectedCuisines = [];
        state.selectedRating = 0;
        state.selectedPrice = "";
        state.selectedTime = "";
    }
  },
});

// Export actions to be used in components
export const { 
    setSearchQuery, 
    setLocation, 
    toggleCuisine, 
    setRating, 
    setPrice,
    setTime,
    clearFilters
} = filtersSlice.actions;

// Export the reducer to be added to the store
export default filtersSlice.reducer;