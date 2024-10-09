"use client";

import { signIn, useSession } from "next-auth/react";
import React from "react";

const Dashboard = () => {
	const { data: session } = useSession();

	return (
		<>
			{session ? (
				<>
					<main className="text-4xl text-black flex items-center justify-center">
						Welcome back!
					</main>
				</>
			) : (
				<>
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
				</>
			)}
		</>
	);
};

export default Dashboard;
