"use client";

import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { fetchMovies } from "@/lib/tmdbApi";
import Image from "next/image";

interface Movie {
	id: number;
	title: string;
	overview: string;
	poster_path: string;
	release_date: string;
}

const MoviesPage = () => {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const getMovies = async () => {
			try {
				const data = await fetchMovies("movie/popular");
				setMovies(data.results);
			} catch (error) {
				console.error("Error fetching movies:", error);
			} finally {
				setLoading(false);
			}
		};

		getMovies();
	}, []);

	if (loading) return <div>Loading...</div>;

	return (
		<div>
			<h1 className="text-4xl text-center">Popular Movies</h1>
			<div className="flex flex-wrap justify-center gap-8 mt-8">
				{movies.map((movie) => (
					<div key={movie.id} className="w-64">
						<Image
							src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
							alt={movie.title}
							width={300}
							height={450}
							className="rounded-lg"
						/>
						<h2 className="text-lg text-center mt-2">
							{movie.title}
						</h2>
						<p className="text-sm text-gray-600 text-center">
							{movie.release_date}
						</p>
					</div>
				))}
			</div>
			<div className="flex justify-center mt-8">
				<button
					onClick={() => signOut({ callbackUrl: "/" })}
					className="p-6 bg-red-500 text-lg text-white"
				>
					Sign out
				</button>
			</div>
		</div>
	);
};

export default MoviesPage;
