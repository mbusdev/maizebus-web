import { Mail, Instagram, Github, Youtube } from "lucide-react";
import { motion } from "motion/react";

const Footer = () => {
	return (
		<footer className="relative bg-gradient-to-br from-[#003366] to-[#00274C] text-white overflow-hidden">
			<div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<motion.div
						className="col-span-1 md:col-span-2"
						viewport={{ once: true }}
					>
						<div className="flex items-center space-x-3 mb-6">
							<div>
								<span className="text-2xl bg-[#f1c232] bg-clip-text font-extrabold text-transparent">
									maize
								</span>
								<span className="text-2xl font-extrabold">
									bus
								</span>
							</div>
						</div>
						<p className="text-gray-300 mb-6 max-w-md leading-relaxed text-lg">
							The last campus navigation tool you'll need. Track
							buses in real-time, find any building, and get the
							fastest routes across the University of Michigan
							campus.
						</p>
						<div className="flex space-x-6">
							<motion.a
								href="#"
								whileHover={{ scale: 1.2, y: -3 }}
								whileTap={{ scale: 0.9 }}
								className="text-gray-300 hover:text-[#FFCB05] transition-all duration-300 p-2 rounded-lg hover:bg-white/10 backdrop-blur-sm"
							>
								<Instagram className="h-6 w-6" />
							</motion.a>
							<motion.a
								href="#"
								whileHover={{ scale: 1.2, y: -3 }}
								whileTap={{ scale: 0.9 }}
								className="text-gray-300 hover:text-[#FFCB05] transition-all duration-300 p-2 rounded-lg hover:bg-white/10 backdrop-blur-sm"
							>
								<Youtube className="h-6 w-6" />
							</motion.a>
							<motion.a
								href="#"
								whileHover={{ scale: 1.2, y: -3 }}
								whileTap={{ scale: 0.9 }}
								className="text-gray-300 hover:text-[#FFCB05] transition-all duration-300 p-2 rounded-lg hover:bg-white/10 backdrop-blur-sm"
							>
								<Github className="h-6 w-6" />
							</motion.a>
						</div>
					</motion.div>

					<motion.div
						viewport={{ once: true }}
					>
						<h3 className="font-bold text-xl bg-[#f1c232] bg-clip-text text-transparent mb-6">
							Quick Links
						</h3>
						<ul className="space-y-4">
							{[
								{ label: "Download App", href: "/" },
								{ label: "Team", href: "/team" },
								{ label: "Join", href: "/join" },
								{ label: "Contact", href: "/contact" },
							].map(({ label, href }) => (
								<motion.li key={label}>
									<motion.a
										href={href}
										className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block"
										whileHover={{ x: 5 }}
									>
										{label}
									</motion.a>
								</motion.li>
							))}
						</ul>
					</motion.div>

					<motion.div
						viewport={{ once: true }}
					>
						<h3 className="font-bold text-xl bg-[#f1c232] bg-clip-text text-transparent mb-6">
							Contact
						</h3>
						<div className="space-y-4">
							<div
								className="flex items-center space-x-3 group"
							>
								<div className="p-2 bg-[#f1c232]/20 rounded-lg">
									<Mail className="h-5 w-5 text-[#f1c232]" />
								</div>
								<span className="text-gray-300 group-hover:text-white transition-colors duration-300">
									contact@maizebus.org
								</span>
							</div>
							<p className="text-gray-300 hover:text-gray-200 transition-colors duration-300">
								University of Michigan
							</p>
							<p className="text-gray-300 hover:text-gray-200 transition-colors duration-300">
								Ann Arbor, MI 48109
							</p>
						</div>
					</motion.div>
				</div>

				<motion.div
					className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center"
					viewport={{ once: true }}
				>
					<p className="text-gray-400 mb-4 sm:mb-0 font-medium">
						© 2025 MaizeBus. All rights reserved.
					</p>
					<div className="flex space-x-8">
						<motion.a
							href="#"
							className="text-gray-400 hover:text-[#FFCB05] transition-all duration-300 font-medium"
							whileHover={{ y: -2 }}
						>
							Privacy Policy
						</motion.a>
						<motion.a
							href="#"
							className="text-gray-400 hover:text-[#FFCB05] transition-all duration-300 font-medium"
							whileHover={{ y: -2 }}
						>
							Terms of Service
						</motion.a>
					</div>
				</motion.div>
			</div>
		</footer>
	);
};

export default Footer;
