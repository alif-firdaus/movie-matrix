import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMovies } from "@/lib/tmdbApi";

interface MoviesState {
	list: any[];
	loading: boolean;
	error: string | null;
	currentPage: number;
	totalPages: number;
}

const initialState: MoviesState = {
	list: [],
	loading: false,
	error: null,
	currentPage: 1,
	totalPages: 1,
};

export const fetchMoviesData = createAsyncThunk(
	"movies/fetchMoviesData",
	async (
		{ endpoint, page }: { endpoint: string; page: number },
		{ rejectWithValue }
	) => {
		try {
			const response = await fetchMovies(endpoint, page);
			return {
				results: response.results,
				page: response.page,
				totalPages: response.total_pages,
			};
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

		setPage: (state, action) => {
			state.currentPage = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMoviesData.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchMoviesData.fulfilled, (state, action) => {
				state.list = action.payload.results;
				state.loading = false;
				state.currentPage = action.payload.page;
				state.totalPages = action.payload.totalPages;
			})
			.addCase(fetchMoviesData.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const { clearMovies, setPage } = moviesSlice.actions;
export default moviesSlice.reducer;
