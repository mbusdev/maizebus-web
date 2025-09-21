import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { AnimatePresence } from "motion/react";

import { Home } from "@/pages/home";
import { Team } from "@/pages/team";
import Contact from "@/pages/contact";
import { Navbar } from "@/components/nav";
import Dashboard from "@/pages/dashboard";
import Join from "@/pages/join";
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

	// const handleLogin = (userData: User) => {
	// 	setUser(userData);
	// };

	// const handleSignup = (userData: User) => {
	// 	setUser(userData);
	// };

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
						{/* <Route path="/login" element={<Login onLogin={handleLogin} />} /> */}
						<Route path="/login" element={<Login />} />
						{/* <Route path="/signup" element={<SignUp onSignup={handleSignup}/>} /> */}
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
	return (
		<BrowserRouter>
			<AppContent />
		</BrowserRouter>
	);
}
