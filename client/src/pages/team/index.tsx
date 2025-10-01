import { Card, CardContent } from "@/components/CardContent";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import {
	Github,
	Linkedin,
	Link,
	Instagram,
} from "lucide-react";
import { useEffect } from "react";
import { ImageWithFallback } from "@/components/imageWithFallback";
import teamData from "@/assets/team.json";
import "./index.css";


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

export function Team() {
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
			<a
				key={social.platform}
				href={social.url}
				target={social.platform === "email" ? "_self" : "_blank"}
				rel="noopener noreferrer"
				className={`social-link social-link-${social.platform}`}
			>
				{getSocialIcon(social.platform)}
			</a>
		));
	};

	const renderMemberCard = (
		member: any,
		index: number,
		isLeadership: boolean = false
	) => (
		<div
			key={member.name}
			className={`member-card fade-in-on-scroll ${
				isLeadership ? "member-card-leadership" : "member-card-regular"
			}`}
			style={{ animationDelay: `${index * 0.1}s` }}
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
		</div>
	);

	return (
		<div className="about-page">
			<div className="about-background">
				<div className="bg-element bg-element-1" />
				<div className="bg-element bg-element-2" />
			</div>

			<div className="about-container">
				<div className="about-hero animate-fade-in-up">
					<div className="about-hero-icon">
						<div className="about-logo-text">
							<span className="about-logo-maize">maize</span>
							<span className="about-logo-bus">bus</span>
						</div>
					</div>

					<h1 className="about-title">Our Team</h1>
					<p className="about-subtitle">
						Meet the passionate students revolutionizing campus
						transportation at the University of Michigan.
					</p>
				</div>

				<div className="team-section fade-in-on-scroll">
					<h2 className="team-section-title">Leads</h2>
					<div className="team-grid team-grid-leadership">
						{leadership.map((member, index) =>
							renderMemberCard(member, index, true)
						)}
					</div>
				</div>

				<div className="team-section fade-in-on-scroll">
					<h2 className="team-section-title">Team Members</h2>
					<div className="team-grid team-grid-members">
						{members.map((member, index) =>
							renderMemberCard(member, index, false)
						)}
					</div>
				</div>

				<div className="about-cta fade-in-on-scroll">
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
								<a href="/join">
									<Button className="cta-button cta-button-primary">
										Apply Now
									</Button>
								</a>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
