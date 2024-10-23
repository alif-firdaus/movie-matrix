"use client";

import React, { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchMoviesData, setPage } from "@/redux/slices/movieSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";

const MoviesPage = () => {
	const dispatch = useAppDispatch();
	const movies = useAppSelector((state) => state.movies.list);
	const loading = useAppSelector((state) => state.movies.loading);
	const error = useAppSelector((state) => state.movies.error);
	const currentPage = useAppSelector((state) => state.movies.currentPage);
	const totalPages = useAppSelector((state) => state.movies.totalPages);
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === "loading") return;

		if (!session) {
			router.push("/");
		} else {
			dispatch(
				fetchMoviesData({
					endpoint: "movie/popular",
					page: currentPage,
				})
			);
		}
	}, [session, status, router, dispatch, currentPage]);

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			dispatch(setPage(currentPage + 1));
		}
	};

	const handlePrevPage = () => {
		if (currentPage > 1) {
			dispatch(setPage(currentPage - 1));
		}
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

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

			<div className="flex justify-center mt-8 gap-4">
				<button
					onClick={handlePrevPage}
					className="p-4 bg-blue-500 text-lg text-white disabled:opacity-50"
					disabled={currentPage === 1}
				>
					Previous
				</button>
				<button
					onClick={handleNextPage}
					className="p-4 bg-blue-500 text-lg text-white"
					disabled={currentPage >= totalPages}
				>
					Next
				</button>
			</div>
			<p className="text-center mt-4">
				Page {currentPage} of {totalPages}
			</p>

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
