"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "@/redux/store";

const SessionWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<SessionProvider>
			<Provider store={store}>{children}</Provider>
		</SessionProvider>
	);
};

export default SessionWrapper;
