import { createContext, useContext, useState } from 'react';

const SiteContext = createContext();

export function SiteProvider({ children, data = {} }) {
	return (
		<SiteContext.Provider value={data}>
			{children}
		</SiteContext.Provider>
	);
}

export function useSiteContext() {
	return useContext(SiteContext);
}
