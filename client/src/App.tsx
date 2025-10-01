import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { AnimatePresence } from "motion/react";

import { Home } from "@/pages/home";
import { Team } from "@/pages/team";
import { Contact } from "@/pages/contact";
import { Navbar } from "@/components/nav";
import Dashboard from "@/pages/dashboard";
import { Join } from "@/pages/join";
import Tracker from "@/pages/tracker";
import SignUp from "@/pages/signup";
import Login from "@/pages/login";
import Footer from "@/components/footer";

interface User {
	id: string;
	email: string;
	name: string;
	isDeveloper: boolean;
	favoriteStops: string[];
	joinedDate: string;
}

function AppContent() {
	const [user, setUser] = useState<User | null>(null);
	const location = useLocation();



	const handleLogout = () => {
		setUser(null);
	};

	return (
		<div className="min-h-screen flex flex-col">
			<Navbar user={user} onLogout={handleLogout} />

			<main className="flex-1 pt-20">
				<AnimatePresence mode="wait">
					<Routes location={location} key={location.pathname}>
						<Route path="/" element={<Home />} />
						<Route path="/team" element={<Team />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/join" element={<Join />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="/tracker" element={<Tracker />} />
					</Routes>
				</AnimatePresence>
			</main>

			<Footer />
		</div>
	);
}

export default function App() {
	// GitHub Pages routing fix
	useEffect(() => {
		// Single Page Apps for GitHub Pages
		// MIT License
		// https://github.com/rafgraph/spa-github-pages
		// This script checks to see if a redirect is present in the query string,
		// converts it back to the correct url and adds it to the
		// browser's history using window.history.replaceState(...),
		// which won't cause the browser to attempt to load the new url.
		// When the single page app is loaded further down in this file,
		// the correct url will be waiting in the browser's history for
		// the single page app to route accordingly.
		(function(l) {
			if (l.search[1] === '/' ) {
				var decoded = l.search.slice(1).split('&').map(function(s) { 
					return s.replace(/~and~/g, '&')
				}).join('?');
				window.history.replaceState(null, '',
					l.pathname.slice(0, -1) + decoded + l.hash
				);
			}
		}(window.location as Location))
	}, []);

	return (
		<BrowserRouter basename="/maizebus-web">
			<AppContent />
		</BrowserRouter>
	);
}
