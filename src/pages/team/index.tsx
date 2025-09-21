import { Card, CardContent } from "@/components/CardContent";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import {
	Github,
	Linkedin,
	Link,
	Instagram,
    MapPin,
} from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "@/components/imageWithFallback";
import teamData from "@/assets/team.json";
import "./index.css";

export function Team() {
	const leadership = teamData.lead;
	const members = teamData.members;

	const getSocialIcon = (platform: string) => {
		switch (platform) {
			case "github":
				return <Github className="h-4 w-4" />;
			case "linkedin":
				return <Linkedin className="h-4 w-4" />;
			case "instagram":
				return <Instagram className="h-4 w-4" />;
			case "website":
				return <Link className="h-4 w-4" />;
			default:
				return null;
		}
	};

	const renderSocialLinks = (member: any) => {
		const socials = [];
        if (member.web)
			socials.push({ platform: "website", url: member.web });
		if (member.github)
			socials.push({ platform: "github", url: member.github });
		if (member.linkedin)
			socials.push({ platform: "linkedin", url: member.linkedin });
		if (member.instagram)
			socials.push({ platform: "instagram", url: member.instagram });

		return socials.map((social) => (
			<motion.a
				key={social.platform}
				href={social.url}
				target={social.platform === "email" ? "_self" : "_blank"}
				rel="noopener noreferrer"
				className={`social-link social-link-${social.platform}`}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
			>
				{getSocialIcon(social.platform)}
			</motion.a>
		));
	};

	const renderMemberCard = (
		member: any,
		index: number,
		isLeadership: boolean = false
	) => (
		<motion.div
			key={member.name}
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: index * 0.05 }}
			whileHover={{ y: -8 }}
			className={`member-card ${
				isLeadership ? "member-card-leadership" : "member-card-regular"
			}`}
		>
			<Card className="member-card-inner">
				<CardContent className="member-card-content">
					<div className="member-photo-container">
						<ImageWithFallback
							src={member.image}
							alt={member.name}
							className="member-photo"
						/>
					</div>

					<div className="member-info">
						<h3 className="member-name">{member.name}</h3>
						<p className="member-role">{member.role}</p>

						<div className="member-badges">
							<Badge className="member-badge member-badge-major">
								{member.major}
							</Badge>
							<Badge className="member-badge member-badge-year">
								{member.year}
							</Badge>
						</div>

						<div className="member-socials">
							{renderSocialLinks(member)}
						</div>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);

	return (
		<div className="about-page">
			<div className="about-background">
				<motion.div
					className="bg-element bg-element-1"
					animate={{
						scale: [1, 1.2, 1],
						opacity: [0.3, 0.5, 0.3],
					}}
					transition={{ duration: 8, repeat: Infinity }}
				/>
				<motion.div
					className="bg-element bg-element-2"
					animate={{
						scale: [1, 1.1, 1],
						opacity: [0.2, 0.4, 0.2],
					}}
					transition={{ duration: 10, repeat: Infinity, delay: 4 }}
				/>
			</div>

			<div className="about-container">
				<motion.div
					initial={{ opacity: 0, y: 60 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
					className="about-hero"
				>
					<div className="about-hero-icon">
						<motion.div
							className="about-logo-icon"
							whileHover={{ scale: 1.05, rotate: 5 }}
						>
							<MapPin className="h-8 w-8 text-[#00274C]" />
						</motion.div>
						<div className="about-logo-text">
							<span className="about-logo-maize">Maize</span>
							<span className="about-logo-bus">Bus</span>
						</div>
					</div>

					<h1 className="about-title">Our Team</h1>
					<p className="about-subtitle">
						Meet the passionate students revolutionizing campus
						transportation at the University of Michigan.
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 60 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 0.3 }}
					className="team-section"
				>
					<h2 className="team-section-title">Leads</h2>
					<div className="team-grid team-grid-leadership">
						{leadership.map((member, index) =>
							renderMemberCard(member, index, true)
						)}
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 60 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 0.5 }}
					className="team-section"
				>
					<h2 className="team-section-title">Team Members</h2>
					<div className="team-grid team-grid-members">
						{members.map((member, index) =>
							renderMemberCard(member, index, false)
						)}
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 60 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 0.7 }}
					className="about-cta"
				>
					<Card className="about-cta-card">
						<CardContent className="about-cta-content">
							<h3 className="about-cta-title">
								Want to Join Our Team?
							</h3>
							<p className="about-cta-subtitle">
								We're always looking for passionate students to
								help lead the future of campus transportation.
							</p>
							<div className="about-cta-buttons">
								<motion.a
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									href="/apply"
								>
									<Button className="cta-button cta-button-primary">
										Apply Now
									</Button>
								</motion.a>
							</div>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</div>
	);
}
