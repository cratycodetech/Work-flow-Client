import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
    department: string | null;
    employeeID: string | null;
    singleDate: string | null; // For single date selection
    dateRange: { startDate: string | null; endDate: string | null }; // For date range selection
}

const initialState: FilterState = {
    department: null,
    employeeID: null,
    singleDate: null,
    dateRange: { startDate: null, endDate: null },
};

const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setDepartment: (state, action: PayloadAction<string | null>) => {
            state.department = action.payload;
        },
        setEmployeeID: (state, action: PayloadAction<string | null>) => {
            state.employeeID = action.payload;
        },
        setSingleDate: (state, action: PayloadAction<string | null>) => {
            state.singleDate = action.payload;
        },
        setDateRange: (state, action: PayloadAction<{ startDate: string | null; endDate: string | null }>) => {
            state.dateRange = action.payload;
        },
        resetFilters: (state) => {
            state.department = null;
            state.employeeID = null;
            state.singleDate = null;
            state.dateRange = { startDate: null, endDate: null };
        },
    },
});

export const { setDepartment, setEmployeeID, setSingleDate, setDateRange, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
