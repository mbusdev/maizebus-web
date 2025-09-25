import SpotlightCard from "@/components/SpotlightCard";
import { CardContent } from "@/components/CardContent";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/accordion";
import { Badge } from "@/components/badge";
import {
	MapPin,
	Clock,
	Users,
	Route,
	Building,
} from "lucide-react";
import { motion } from "motion/react";
import headerImage from "@/assets/header.jpg";
import appleDownload from "@/assets/apple_download.svg";
import androidDownload from "@/assets/android_download.png";

export function Home() {

	const features = [
		{
			icon: <MapPin className="h-8 w-8" />,
			title: "Real-Time Tracking",
			description:
				"See live bus locations and arrival times with pinpoint accuracy. Never wonder when your bus will arrive again.",
			highlight: "Live GPS tracking",
		},
		{
			icon: <Building className="h-8 w-8" />,
			title: "Campus Navigation",
			description:
				"Find any building instantly with our comprehensive campus directory and smart search functionality.",
			highlight: "250+ locations",
		},
		{
			icon: <Route className="h-8 w-8" />,
			title: "Smart Routes",
			description:
				"Get optimal route suggestions with multiple options and real-time adjustments for delays.",
			highlight: "Accurate routing",
		},
		{
			icon: <Clock className="h-8 w-8" />,
			title: "Arrival Predictions",
			description:
				"Precise arrival times for every stop and bus based on real-time data.",
			highlight: "95% accuracy",
		},
	];

	const stats = [
		{
			number: "600+",
			label: "Active Users",
			sublabel: "and growing daily",
		},
		{ number: "12", label: "Bus Routes", sublabel: "fully covered" },
		{
			number: "100+",
			label: "Bus Stops",
			sublabel: "tracked in real-time",
		},
		{ number: "5★", label: "App Rating", sublabel: "on both platforms" },
	];

	const faqs = [
		{
			question: "How accurate is the real-time tracking?",
			answer: "Our app uses official UofM GPS data from the actual buses to provide real-time updates with 95% accuracy. Location data is updated every 5 seconds for the most current information.",
		},
		{
			question: "Does the app work offline?",
			answer: "The app currently works only with an internet connection or service to fetch real-time data. However, we are currently working on implementing offline features with stored bus and building data in a future update.",
		},
		{
			question: "Is MaizeBus free to use?",
			answer: "Yes! MaizeBus is completely free for all University of Michigan students, faculty, and staff. There are no premium features or subscriptions.",
		},
		{
			question: "How do I report issues or suggest features?",
			answer: "You can contact us through the app's feedback feature or email us at contact@maizebus.org. We actively respond to all user feedback within 24 hours.",
		},
	];

	return (
		<div
			className="min-h-screen bg-white"
			style={{ fontFamily: "Urbanist, system-ui, sans-serif" }}
		>
			<section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden pt-24">
				<div className="absolute inset-0 bg-white" />

				<div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16 z-10">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1 }}
						className="max-w-6xl mx-auto"
					>
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8}}
							className="mb-8"
						>
							<h1
								className="text-6xl lg:text-7xl font-bold mb-6 leading-tight text-[#0b5394]"
								style={{ fontWeight: 700 }}
							>
								never miss a bus again
							</h1>
							<p
								className="text-xl lg:text-2xl text-gray-500 max-w-4xl mx-auto leading-relaxed mb-8"
								style={{ fontWeight: 400 }}
							>
								Real-time buses, buildings, directions, bus stops - all a search away.
							</p>
						</motion.div>

						<motion.div
							className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8}}
						>
							<motion.div
								className="group"
							>
								<input type="image" src={appleDownload} className="h-20 px-6 pt-6 text-lg font-bold" />
							</motion.div>
							<motion.div
								className="group"
							>
								<input type="image" src={androidDownload} className="h-20 px-6 pt-6 text-lg font-bold" />
							</motion.div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 50, scale: 0.95 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							transition={{ duration: 1}}
							className="flex justify-center relative"
						>
							<motion.div
								className="relative"
								transition={{
									type: "spring",
									stiffness: 300,
									damping: 30,
								}}
							>
								<div className="absolute inset-0 rounded-3xl blur-2xl scale-110" />

								<div className="relative bg-white/80 rounded-3xl p-8 border border-white/30">
									<img
										src={headerImage}
										alt="MaizeBus App Screenshots"
										className="max-w-full h-auto rounded-2xl"
									/>
								</div>
							</motion.div>
						</motion.div>
					</motion.div>
				</div>
			</section>

			<section className="py-32 relative overflow-hidden">
				<div className="absolute inset-0 bg-gray-50" />

				<div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 1 }}
						viewport={{ once: true }}
						className="text-center mb-20"
					>
						<h2
							className="text-5xl lg:text-7xl font-bold text-[#0b5394] mb-6"
							style={{ fontWeight: 700 }}
						>
							By the numbers
						</h2>
						<p
							className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto"
							style={{ fontWeight: 400 }}
						>
							Trusted by thousands of Michigan students every day.
						</p>
					</motion.div>

					<div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
						{stats.map((stat, index) => (
							<motion.div
								key={stat.label}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.8,
									delay: index * 0.15,
								}}
								viewport={{ once: true }}
								className="text-center"
							>
								<div
									className="text-5xl lg:text-6xl font-bold text-[#0b5394] mb-3"
									style={{ fontWeight: 700 }}
								>
									{stat.number}
								</div>
								<div
									className="text-xl font-bold text-gray-700 mb-1"
									style={{ fontWeight: 700 }}
								>
									{stat.label}
								</div>
								<div
									className="text-lg text-gray-500"
									style={{ fontWeight: 400 }}
								>
									{stat.sublabel}
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			<section className="py-32 relative overflow-hidden">
				<div className="absolute inset-0 bg-white" />

				<div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 1 }}
						viewport={{ once: true }}
						className="text-center mb-20"
					>
						<h2
							className="text-5xl lg:text-7xl font-bold text-[#0b5394] mb-6"
							style={{ fontWeight: 700 }}
						>
							Designed for students.
						</h2>
						<p
							className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto"
							style={{ fontWeight: 400 }}
						>
							Every feature is thoughtfully crafted to make your
							campus travel effortless and reliable.
						</p>
					</motion.div>

					<div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
						{features.map((feature, index) => (
							<motion.div
								key={feature.title}
								initial={{ opacity: 0, y: 50 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.8,
									delay: index * 0.15,
								}}
								viewport={{ once: true }}
								className="group"
							>
								<SpotlightCard
									className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-gray-50/80 backdrop-blur-sm rounded-3xl overflow-hidden"
								>
									<CardContent className="p-10">
										<div className="flex items-center mb-6">
											<div className="w-16 h-16 bg-[#f1c232] rounded-2xl flex items-center justify-center text-black shadow-lg mr-4">
												{feature.icon}
											</div>
											<Badge
												className="bg-[#0b5394]/10 text-[#0b5394] px-3 py-1 rounded-full border-0"
												style={{ fontWeight: 700 }}
											>
												{feature.highlight}
											</Badge>
										</div>
										<h3
											className="text-2xl font-bold text-[#0b5394] mb-4"
											style={{ fontWeight: 700 }}
										>
											{feature.title}
										</h3>
										<p
											className="text-lg text-gray-600 leading-relaxed"
											style={{ fontWeight: 400 }}
										>
											{feature.description}
										</p>
									</CardContent>
								</SpotlightCard>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			<section className="py-32 relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-[#0b5394] to-[#003366]" />

				<div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 1 }}
						viewport={{ once: true }}
						className="max-w-5xl mx-auto"
					>
						<h2
							className="text-5xl lg:text-7xl font-bold mb-8"
							style={{ fontWeight: 700 }}
						>
							Built by students,{" "}
							<span className="bg-gradient-to-r from-[#f1c232] via-[#FFD700] to-[#f1c232] bg-clip-text text-transparent">
								for students.
							</span>
						</h2>

						<p
							className="text-xl lg:text-2xl text-gray-200 mb-12 leading-relaxed max-w-4xl mx-auto"
							style={{ fontWeight: 400 }}
						>
							We're a passionate team of University of Michigan
							students who were tired of missing buses and getting
							lost on campus. MaizeBus is our solution to make
							campus navigation effortless for every Wolverine.
						</p>

						<motion.div
							className="flex justify-center items-center space-x-6"
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.3 }}
							viewport={{ once: true }}
						>
							<div className="flex -space-x-3">
								{[1, 2, 3, 4, 5].map((i) => (
									<motion.div
										key={i}
										className="w-14 h-14 bg-gradient-to-br from-[#f1c232] to-[#FFD700] rounded-full border-4 border-white flex items-center justify-center shadow-lg"
										whileHover={{
											scale: 1.1,
											y: -2,
											transition: {
												type: "spring",
												stiffness: 300,
												damping: 20,
											},
										}}
										initial={{ opacity: 0, scale: 0 }}
										whileInView={{ opacity: 1, scale: 1 }}
										transition={{
											duration: 0.5,
											delay: 0.5 + i * 0.1,
										}}
										viewport={{ once: true }}
									>
										<Users className="h-6 w-6 text-[#0b5394]" />
									</motion.div>
								))}
							</div>
							<span
								className="text-lg font-bold"
								style={{ fontWeight: 700 }}
							>
								25+ Student Developers
							</span>
						</motion.div>
					</motion.div>
				</div>
			</section>

			<section className="py-32 relative overflow-hidden">
				<div className="absolute inset-0 bg-gray-50" />

				<div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 1 }}
						viewport={{ once: true }}
						className="text-center mb-20"
					>
						<h2
							className="text-5xl lg:text-7xl font-bold text-[#0b5394] mb-6"
							style={{ fontWeight: 700 }}
						>
							Questions?
						</h2>
						<p
							className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto"
							style={{ fontWeight: 400 }}
						>
							Here are the answers to the most common questions
							about MaizeBus.
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						viewport={{ once: true }}
						className="max-w-4xl mx-auto"
					>
						<Accordion
							type="single"
							collapsible
							className="space-y-6"
						>
							{faqs.map((faq, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{
										duration: 0.6,
										delay: index * 0.1,
									}}
									viewport={{ once: true }}
									className="group"
								>
									<AccordionItem
										value={`item-${index}`}
										className="border-0 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-2 shadow-lg hover:shadow-xl transition-all duration-500"
									>
										<AccordionTrigger
											className="text-[#0b5394] hover:text-[#f1c232] transition-all duration-300 text-left text-xl py-6"
											style={{ fontWeight: 700 }}
										>
											{faq.question}
										</AccordionTrigger>
										<AccordionContent
											className="text-gray-600 leading-relaxed text-lg pb-6"
											style={{ fontWeight: 400 }}
										>
											{faq.answer}
										</AccordionContent>
									</AccordionItem>
								</motion.div>
							))}
						</Accordion>
					</motion.div>
				</div>
			</section>

			<section className="py-32 relative overflow-hidden">
				<div className="absolute inset-0 bg-white" />

				<div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 1 }}
						viewport={{ once: true }}
						className="max-w-5xl mx-auto"
					>
						<h2
							className="text-5xl lg:text-7xl font-bold text-[#0b5394] mb-8"
							style={{ fontWeight: 700 }}
						>
							Ready to revolutionize{" "}
							<span className="bg-gradient-to-r from-[#f1c232] via-[#FFD700] to-[#f1c232] bg-clip-text text-transparent">
								your commute?
							</span>
						</h2>

						<p
							className="text-xl lg:text-2xl text-gray-600 mb-16 max-w-4xl mx-auto"
							style={{ fontWeight: 400 }}
						>
							Join thousands of Michigan students who never miss a
							bus. Download MaizeBus today.
						</p>

						<motion.div
							className="flex flex-col sm:flex-row gap-6 justify-center"
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.3 }}
							viewport={{ once: true }}
						>
							<motion.div
								className="group"
							>
								<input type="image" src={appleDownload} className="h-20 px-6 pt-6 text-lg font-bold" />
							</motion.div>
							<motion.div
								className="group"
							>
								<input type="image" src={androidDownload} className="h-20 px-6 pt-6 text-lg font-bold" />
							</motion.div>
						</motion.div>
					</motion.div>
				</div>
			</section>
		</div>
	);
}
