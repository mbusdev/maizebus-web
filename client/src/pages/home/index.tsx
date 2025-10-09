import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/accordion";
import {
	Users,
} from "lucide-react";
import { useEffect } from "react";
import headerImage from "@/assets/header.jpg";
import appleDownload from "@/assets/apple_download.svg";
import androidDownload from "@/assets/android_download.png";
import frame3Image from "@/assets/Frame 3.png";
import frame4Image from "@/assets/Frame 4.png";
import frame5Image from "@/assets/Frame 5.png";
import frame6Image from "@/assets/Frame 6.png";

function useIntersectionObserver() {
	useEffect(() => {
		const timer = setTimeout(() => {
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							entry.target.classList.add('visible');
							observer.unobserve(entry.target);
						}
					});
				},
				{
					threshold: 0.2,
					rootMargin: '0px 0px -100px 0px'
				}
			);

			const elements = document.querySelectorAll('.fade-in-on-scroll');
			elements.forEach((el) => observer.observe(el));

			return () => observer.disconnect();
		}, 100);

		return () => clearTimeout(timer);
	}, []);
}

export function Home() {
	useIntersectionObserver();

	useEffect(() => {
		const timer = setTimeout(() => {
			const elements = document.querySelectorAll('.animate-fade-in-up, .animate-fade-in');
			elements.forEach((el) => {
				el.classList.add('animate');
			});
		}, 50);

		return () => clearTimeout(timer);
	}, []);

	const features = [
		{
			image: frame3Image,
			alt: "Real-Time Tracking Feature"
		},
		{
			image: frame4Image,
			alt: "Campus Navigation Feature"
		},
		{
			image: frame5Image,
			alt: "Smart Routes Feature"
		},
		{
			image: frame6Image,
			alt: "Arrival Predictions Feature"
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
			answer: "You can contact us through the app's feedback feature or email us at contact@maizebus.com. We actively respond to all user feedback within 24 hours.",
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
					<div className="max-w-6xl mx-auto animate-fade-in-up">
						<div className="mb-8 animate-fade-in-up delay-200">
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
						</div>

						<div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up delay-300">
							<div className="group">
								<a 
									href="https://apps.apple.com/us/app/maizebus/id6748656074" 
									target="_blank" 
									rel="noopener noreferrer"
									className="inline-block"
								>
									<img src={appleDownload} className="h-20 px-6 pt-6 text-lg font-bold" alt="Download on the App Store" />
								</a>
							</div>
							<div className="group">
								<a 
									href="https://play.google.com/store/apps/details?id=com.ishankumar.maizebus" 
									target="_blank" 
									rel="noopener noreferrer"
									className="inline-block"
								>
									<img src={androidDownload} className="h-20 px-6 pt-6 text-lg font-bold" alt="Get it on Google Play" />
								</a>
							</div>
						</div>

						<div className="flex justify-center relative animate-fade-in-up delay-400">
							<div className="relative">
								<div className="absolute inset-0 rounded-3xl blur-2xl scale-110" />

								<div className="relative bg-white/80 rounded-3xl p-8 border border-white/30">
									<img
										src={headerImage}
										alt="MaizeBus App Screenshots"
										className="max-w-full h-auto rounded-2xl"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-32 relative overflow-hidden">
				<div className="absolute inset-0 bg-gray-50" />

				<div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-20 fade-in-on-scroll">
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
					</div>

					<div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
						{stats.map((stat, index) => (
							<div
								key={stat.label}
								className="text-center fade-in-on-scroll"
								style={{ animationDelay: `${index * 0.1}s` }}
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
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="py-32 relative overflow-hidden">
				<div className="absolute inset-0 bg-white" />

				<div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-20 fade-in-on-scroll">
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
					</div>

					<div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
						{features.map((feature, index) => (
							<div
								key={feature.alt}
								className="group fade-in-on-scroll"
								style={{ animationDelay: `${index * 0.15}s` }}
							>
								<img
									src={feature.image}
									alt={feature.alt}
									className="w-full h-auto rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500"
								/>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="py-32 relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-[#0b5394] to-[#003366]" />

				<div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
					<div
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

						<div
							className="flex justify-center items-center space-x-6"
						>
							<div className="flex -space-x-3">
								{[1, 2, 3, 4, 5].map((i) => (
									<div
										key={i}
										className="w-14 h-14 bg-gradient-to-br from-[#f1c232] to-[#FFD700] rounded-full border-4 border-white flex items-center justify-center shadow-lg"
									>
										<Users className="h-6 w-6 text-[#0b5394]" />
									</div>
								))}
							</div>
							<span
								className="text-lg font-bold"
								style={{ fontWeight: 700 }}
							>
								25+ Student Developers
							</span>
						</div>
					</div>
				</div>
			</section>

			<section id="faq" className="py-32 relative overflow-hidden">
				<div className="absolute inset-0 bg-gray-50" />

				<div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
					<div
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
					</div>

					<div
						className="max-w-4xl mx-auto"
					>
						<Accordion
							type="single"
							collapsible
							className="space-y-6"
						>
							{faqs.map((faq, index) => (
								<div
									key={index}
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
								</div>
							))}
						</Accordion>
					</div>
				</div>
			</section>

			<section className="py-32 relative overflow-hidden">
				<div className="absolute inset-0 bg-white" />

				<div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<div
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

						<div
							className="flex flex-col sm:flex-row gap-6 justify-center"
						>
							<div
								className="group"
							>
								<a 
									href="https://apps.apple.com/us/app/maizebus/id6748656074" 
									target="_blank" 
									rel="noopener noreferrer"
									className="inline-block"
								>
									<img src={appleDownload} className="h-20 px-6 pt-6 text-lg font-bold" alt="Download on the App Store" />
								</a>
							</div>
							<div
								className="group"
							>
								<a 
									href="https://play.google.com/store/apps/details?id=com.ishankumar.maizebus" 
									target="_blank" 
									rel="noopener noreferrer"
									className="inline-block"
								>
									<img src={androidDownload} className="h-20 px-6 pt-6 text-lg font-bold" alt="Get it on Google Play" />
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
