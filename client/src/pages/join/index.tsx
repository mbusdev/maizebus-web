import { Button } from "@/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/CardContent";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { Textarea } from "@/components/textarea";
import {
  Users,
  Lightbulb,
  Award,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { API_ENDPOINTS } from "@/config";
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
					threshold: 0.1,
					rootMargin: '0px 0px -50px 0px'
				}
			);

			const elements = document.querySelectorAll('.fade-in-on-scroll');
			elements.forEach((el) => observer.observe(el));

			return () => observer.disconnect();
		}, 100);

		return () => clearTimeout(timer);
	}, []);
}

export function Join() {
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    experience: "",
    motivation: "",
    portfolio: "",
    otherClubs: "",
    relevantClasses: "",
    problemSolving: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const roles = [
    {
      title: "Frontend Developer",
      description:
        "Build responsive user interfaces with Flutter and Dart",
      skills: [
        "Flutter",
        "Dart",
      ],
      commitment: "8+ hours/week",
      color: "blue-500",
    },
    {
      title: "Backend Developer",
      description:
        "Build scalable systems, path-finding algorithms, real-time data processing",
      skills: [
        "JavaScript",
        "Node.js",
        "Database Design",
      ],
      commitment: "8+ hours/week",
      color: "green-500",
    },
    {
      title: "UI/UX Designer",
      description:
        "Lead design strategy, conduct user research, and create exceptional user experiences",
      skills: ["Figma", "User Research", "Design Systems", "Prototyping"],
      commitment: "5+ hours/week",
      color: "purple-500",
    },
    {
      title: "Marketing & Audience Growth",
      description:
        "Drive user acquisition, engagement campaigns, and brand awareness across campus",
      skills: [
        "Growth Marketing",
        "Analytics",
        "Content Strategy",
        "A/B Testing",
      ],
      commitment: "5+ hours/week",
      color: "red-500",
    },
  ];

  const benefits = [
    {
      icon: <Award className="h-6 w-6" />,
      title: "Real Impact",
      description: "Build solutions used by 600+ students daily",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team Learning",
      description: "Collaborate with talented students across disciplines",
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Skill Growth",
      description: "Learn cutting-edge technologies and best practices",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return; // Prevent double submission
    
    setIsSubmitting(true);

    try {
      const response = await fetch(API_ENDPOINTS.JOIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        alert("Thank you for your interest! We'll be in touch soon.");
        setFormData({
          name: "",
          email: "",
          role: "",
          experience: "",
          motivation: "",
          portfolio: "",
          otherClubs: "",
          relevantClasses: "",
          problemSolving: "",
        });
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit application. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };


  return (
    <div className="join-page">

      <div className="join-container">
        <div className="join-hero animate-fade-in-up">
          <div className="join-hero-content">
            <div className="join-hero-icon">
              <div className="join-logo-container">
                <span className="join-logo-maize">maize</span><span className="join-logo-bus">bus</span>
              </div>
            </div>

            <h1 className="join-title">Join Our Team</h1>
            <p className="join-subtitle">
              Help us build the future of campus transportation. Join a
              prestigious team of students creating real solutions for the
              University of Michigan community.
            </p>

            <div className="join-stats">
              <div className="join-stat">
                <span className="join-stat-number">25+</span>
                <span className="join-stat-label">Members</span>
              </div>
              <div className="join-stat">
                <span className="join-stat-number">600+</span>
                <span className="join-stat-label">Users</span>
              </div>
              <div className="join-stat">
                <span className="join-stat-number">4</span>
                <span className="join-stat-label">Open Roles</span>
              </div>
            </div>
          </div>
        </div>

        <div className="join-section fade-in-on-scroll">
          <h2 className="join-section-title">Why Join MaizeBus?</h2>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="benefit-card-wrapper"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="benefit-card">
                  <CardContent className="benefit-card-content">
                    <div className="benefit-icon-container">
                      <div className="benefit-icon">{benefit.icon}</div>
                    </div>
                    <div className="benefit-text">
                      <h3 className="benefit-title">{benefit.title}</h3>
                      <p className="benefit-description">{benefit.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="join-section fade-in-on-scroll">
          <h2 className="join-section-title">Open Roles</h2>
          <div className="roles-grid">
            {roles.map((role, index) => (
              <div
                key={role.title}
                className="role-card-wrapper"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="role-card">
                  <CardHeader className="role-card-header">
                    <div className="role-title-container">
                      <div className={`role-color-indicator bg-${role.color}`}></div>
                      <CardTitle className="role-title">{role.title}</CardTitle>
                    </div>
                    <CardDescription className="role-description">
                      {role.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="role-card-content">
                    <div className="role-details">
                      <div className="role-skills-section">
                        <h4 className="role-detail-label">Skills</h4>
                        <div className="role-skills-tags">
                          {role.skills.map((skill, skillIndex) => (
                            <span key={skillIndex} className="role-skill-tag">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="role-commitment-section">
                        <h4 className="role-detail-label">Time Commitment</h4>
                        <span className="role-commitment-badge">
                          {role.commitment}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="application-form fade-in-on-scroll">
          <Card className="application-card">
            <CardHeader className="text-center">
              <CardTitle className="application-title">
                Application Form
              </CardTitle>
              <CardDescription className="application-description">
                We welcome students at all experience levels. Complete the form below to apply.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="application-form-fields">
                <div className="form-row">
                  <div>
                    <Label htmlFor="name" className="form-label">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder="Your full name"
                      className="form-input"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="form-label">
                      University Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="your.email@umich.edu"
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="role" className="form-label">
                    Preferred Role *
                  </Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                    placeholder="e.g., Frontend Developer, UI/UX Designer"
                    className="form-input"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="experience" className="form-label">
                    Experience & Skills *
                  </Label>
                  <Textarea
                    id="experience"
                    value={formData.experience}
                    onChange={(e) =>
                      handleInputChange("experience", e.target.value)
                    }
                    placeholder="List your relevant experience, skills, and technologies (one per line or bullet points):
• React, TypeScript, Node.js
• 2 years web development
• Built e-commerce website"
                    className="form-textarea"
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="motivation" className="form-label">
                    Why MaizeBus? *
                  </Label>
                  <Textarea
                    id="motivation"
                    value={formData.motivation}
                    onChange={(e) =>
                      handleInputChange("motivation", e.target.value)
                    }
                    placeholder="What motivates you to join MaizeBus? What do you hope to learn and contribute? How does this align with your goals and interests?"
                    className="form-textarea"
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="portfolio" className="form-label">
                    Portfolio/GitHub (Optional)
                  </Label>
                  <Input
                    id="portfolio"
                    value={formData.portfolio}
                    onChange={(e) =>
                      handleInputChange("portfolio", e.target.value)
                    }
                    placeholder="Links to your work or GitHub profile"
                    className="form-input"
                  />
                </div>


                <div className="pt-6">
                  <Button 
                    type="submit" 
                    className="submit-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Submit Application
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
