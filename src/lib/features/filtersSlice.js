import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchQuery: "",
    location: "",
    selectedCuisines: [],
    selectedRating: 0,
    selectedPrice: "",
    selectedTime: "",
    
    // NEW FILTER STATES ADDED HERE
    isFavoriteSelected: false,
    isFreeDeliverySelected: false,
    isComboSelected: false,
    isSpecialOfferSelected: false,
};

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        // Your existing reducers
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setLocation: (state, action) => {
            state.location = action.payload;
        },
        toggleCuisine: (state, action) => {
            const cuisine = action.payload;
            if (state.selectedCuisines.includes(cuisine)) {
                state.selectedCuisines = state.selectedCuisines.filter(c => c !== cuisine);
            } else {
                state.selectedCuisines.push(cuisine);
            }
        },
        setRating: (state, action) => {
            state.selectedRating = action.payload;
        },
        setPrice: (state, action) => {
            state.selectedPrice = action.payload;
        },
        setTime: (state, action) => {
            state.selectedTime = action.payload;
        },

        // NEW FILTER REDUCERS ADDED HERE
        toggleFavorite: (state) => {
            // Note: This toggles the state, even if the button visually doesn't look like a toggle.
            state.isFavoriteSelected = !state.isFavoriteSelected;
        },
        toggleFreeDelivery: (state) => {
            state.isFreeDeliverySelected = !state.isFreeDeliverySelected;
        },
        toggleCombo: (state) => {
            state.isComboSelected = !state.isComboSelected;
        },
        toggleSpecialOffer: (state) => {
            state.isSpecialOfferSelected = !state.isSpecialOfferSelected;
        },

        // Updated clearFilters
        clearFilters: (state) => {
            state.searchQuery = "";
            state.location = "";
            state.selectedCuisines = [];
            state.selectedRating = 0;
            state.selectedPrice = "";
            state.selectedTime = "";
            
            // Clear the new states as well
            state.isFavoriteSelected = false;
            state.isFreeDeliverySelected = false;
            state.isComboSelected = false;
            state.isSpecialOfferSelected = false;
        }
    },
});

// All actions MUST be explicitly exported from the slice file.
export const { 
    setSearchQuery, 
    setLocation, 
    toggleCuisine, 
    setRating, 
    setPrice,
    setTime,
    clearFilters,
    // NEW EXPORTS ADDED HERE
    toggleFavorite,
    toggleFreeDelivery,
    toggleCombo,
    toggleSpecialOffer
} = filtersSlice.actions;

// Export the reducer
export default filtersSlice.reducer;