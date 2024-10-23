const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export interface Movie {
	id: number;
	title: string;
	overview: string;
	poster_path: string;
	release_date: string;
}

export interface ApiResponse {
	page: number;
	results: Movie[];
	total_pages: number;
	total_results: number;
}

export const fetchMovies = async (
	endpoint: string,
	page = 1
): Promise<ApiResponse> => {
	const url = `${BASE_URL}/${endpoint}?api_key=${API_KEY}&page=${page}`;

	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Error fetching data: ${response.statusText}`);
	}

	const data: ApiResponse = await response.json();
	return data;
};
