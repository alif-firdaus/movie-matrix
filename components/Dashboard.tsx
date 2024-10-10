"use client";

import React, { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
	const { data: session } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (session) {
			router.push("/movies");
		}
	}, [session, router]);

	return (
		<>
			{!session ? (
				<main className="text-4xl text-black flex flex-col gap-10 items-center justify-center">
					Log in
					<button
						onClick={() => signIn("google")}
						className="p-6 bg-red-500 text-lg"
					>
						Sign in with Google
					</button>
					<button
						onClick={() => signIn("github")}
						className="p-6 bg-red-500 text-lg"
					>
						Sign in with Github
					</button>
				</main>
			) : (
				<></>
			)}
		</>
	);
};

export default Dashboard;
