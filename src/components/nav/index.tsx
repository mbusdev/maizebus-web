import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Button } from "@/components/button";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetHeader,
	SheetTitle,
} from "@/components/sheet";
import { Menu, User } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import "./index.css";

interface User {
	id: string;
	email: string;
	name: string;
	isDeveloper: boolean;
	favoriteStops: string[];
	joinedDate: string;
}

interface NavbarProps {
	user: User | null;
	onLogout: () => void;
}

export function Navbar({ user }: NavbarProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const location = useLocation();
	const { scrollY } = useScroll();
	const navbarBackground = useTransform(
		scrollY,
		[0, 100],
		["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 1)"]
	);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navItems = [
		{ name: "Home", path: "/" },
		{ name: "Team", path: "/team" },
		{ name: "Contact", path: "/contact" },
	];



	const isCurrentPath = (path: string) => {
		return location.pathname === path;
	};

	return (
		<motion.nav
			style={{
				backgroundColor: navbarBackground,
			}}
			className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<Link to="/">
						<div className="logo-text">
							<span className="logo-maize">maize</span>
							<span className="logo-bus">bus</span>
						</div>
					</Link>

					<div className="hidden md:flex items-center space-x-2">
						{navItems.map((item) => (
							<Link key={item.path} to={item.path}>
								<motion.button
									className={`nav-item ${
										isCurrentPath(item.path)
											? "nav-item-active"
											: "nav-item-inactive"
									}`}
								>
									<motion.div
										className="nav-item-background"
										initial={false}
									/>
									<span className="relative z-10">
										{item.name}
									</span>
								</motion.button>
							</Link>
						))}
						<div className="ml-4">
							<Link to="/join">
								<motion.div>
									<Button className="join-nav-button">
										Join the Team
									</Button>
								</motion.div>
							</Link>
						</div>

						{/* {user ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<motion.div
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className="ml-4"
									>
										<Avatar className="user-avatar">
											<AvatarFallback className="user-avatar-fallback">
												{getInitials(user.name)}
											</AvatarFallback>
										</Avatar>
									</motion.div>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									align="end"
									className="dropdown-menu"
								>
									<div className="px-3 py-2">
										<p className="text-sm font-medium text-[#00274C]">
											{user.name}
										</p>
										<p className="text-xs text-gray-500">
											{user.email}
										</p>
										{user.isDeveloper && (
											<p className="text-xs font-bold text-[#FFCB05] mt-1">
												Developer
											</p>
										)}
									</div>
									<DropdownMenuSeparator />
									<Link to="/dashboard">
										<DropdownMenuItem className="cursor-pointer">
											<User className="mr-2 h-4 w-4" />
											Dashboard
										</DropdownMenuItem>
									</Link>
									{user.isDeveloper && (
										<Link to="/dashboard">
											<DropdownMenuItem className="cursor-pointer">
												<BarChart3 className="mr-2 h-4 w-4" />
												Analytics
											</DropdownMenuItem>
										</Link>
									)}
									<DropdownMenuItem className="cursor-pointer">
										<Settings className="mr-2 h-4 w-4" />
										Settings
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem
										onClick={handleLogout}
										className="cursor-pointer text-red-600"
									>
										<LogOut className="mr-2 h-4 w-4" />
										Log out
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<div className="flex items-center space-x-3 ml-4">
								<Link to="/login">
									<motion.div
										whileHover={{ scale: 1.05, y: -2 }}
										whileTap={{ scale: 0.95 }}
									>
										<Button
											variant="ghost"
											className="auth-button auth-button-login"
										>
											Login
										</Button>
									</motion.div>
								</Link>
								<Link to="/signup">
									<motion.div
										whileHover={{ scale: 1.05, y: -2 }}
										whileTap={{ scale: 0.95 }}
									>
										<Button className="auth-button auth-button-signup">
											Sign Up
										</Button>
									</motion.div>
								</Link>
							</div>
						)} */}
					</div>

					<div className="md:hidden">
						<Sheet open={isOpen} onOpenChange={setIsOpen}>
							<SheetTrigger asChild>
								<motion.div
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
								>
									<Button
										variant="ghost"
										size="sm"
										className="mobile-menu-button"
									>
										<Menu className="h-6 w-6 text-[#00274C]" />
									</Button>
								</motion.div>
							</SheetTrigger>
							<SheetContent side="right" className="mobile-sheet">
								<SheetHeader>
									<SheetTitle className="flex items-center justify-center ">
										<Link to="/">
											<div className="logo-text">
												<span className="logo-maize">
													maize
												</span>
												<span className="logo-bus">
													bus
												</span>
											</div>
										</Link>
									</SheetTitle>
								</SheetHeader>
								<div className="flex flex-col space-y-6">
									{user && (
										<div className="mobile-user-info">
											<p className="font-medium text-[#00274C]">
												{user.name}
											</p>
											<p className="text-sm text-gray-500">
												{user.email}
											</p>
											{user.isDeveloper && (
												<p className="text-sm font-bold text-[#FFCB05] mt-1">
													Developer
												</p>
											)}
										</div>
									)}

									{navItems.map((item) => (
										<Link
											key={item.path}
											to={item.path}
											onClick={() => setIsOpen(false)}
										>
											<motion.button
												className={`mobile-nav-item ${
													isCurrentPath(item.path)
														? "mobile-nav-item-active"
														: "mobile-nav-item-inactive"
												}`}
											>
												{item.name}
											</motion.button>
										</Link>
									))}

									<Link
										to="/join"
										onClick={() => setIsOpen(false)}
									>
										<motion.button
											className="mobile-join-button"
										>
											Join the Team
										</motion.button>
									</Link>

									{/* {user ? (
										<>
											<Link
												to="/dashboard"
												onClick={() => setIsOpen(false)}
											>
												<motion.button
													className="mobile-auth-button"
													whileHover={{ x: 5 }}
													whileTap={{ scale: 0.95 }}
												>
													Dashboard
												</motion.button>
											</Link>
											<motion.button
												onClick={handleLogout}
												className="mobile-logout-button"
												whileHover={{ x: 5 }}
												whileTap={{ scale: 0.95 }}
											>
												Log out
											</motion.button>
										</>
									) : (
										<div className="space-y-3">
											<Link
												to="/login"
												onClick={() => setIsOpen(false)}
											>
												<motion.button
													className="mobile-auth-button-full mobile-login-button"
													whileTap={{ scale: 0.95 }}
												>
													Login
												</motion.button>
											</Link>
											<Link
												to="/signup"
												onClick={() => setIsOpen(false)}
											>
												<motion.button
													className="mobile-auth-button-full mobile-signup-button"
													whileTap={{ scale: 0.95 }}
												>
													Sign Up
												</motion.button>
											</Link>
										</div>
									)} */}
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</motion.nav>
	);
}
