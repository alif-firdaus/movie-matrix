import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMovies } from "@/lib/tmdbApi";

interface MoviesState {
	list: any[];
	loading: boolean;
	error: string | null;
}

const initialState: MoviesState = {
	list: [],
	loading: false,
	error: null,
};

export const fetchMoviesData = createAsyncThunk(
	"movies/fetchMoviesData",
	async (endpoint: string, { rejectWithValue }) => {
		try {
			const response = await fetchMovies(endpoint);
			return response.results;
		} catch (error) {
			return rejectWithValue("Error fetching movies");
		}
	}
);

const moviesSlice = createSlice({
	name: "movies",
	initialState,
	reducers: {
		clearMovies: (state) => {
			state.list = [];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMoviesData.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchMoviesData.fulfilled, (state, action) => {
				state.list = action.payload;
				state.loading = false;
			})
			.addCase(fetchMoviesData.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const { clearMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
