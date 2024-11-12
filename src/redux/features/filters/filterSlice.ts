import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
    department: string | null;
    employeeID: string | null;
    date: string | null; // For single date selection
}

const initialState: FilterState = {
    department: "",
    employeeID: "",
    date: null,
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<FilterState>) => {
            const { department, employeeID, date } = action.payload;
            state.department = department;
            state.employeeID = employeeID;
            state.date = date; // Store date as string
        },
        resetFilters: (state) => {
            state.department = null;
            state.employeeID = null;
            state.date = null;
        },
    },
});

export const { setFilters, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;

  // Get state from Redux store
  export const selectFilter = (state: RootState) => state.filter;


