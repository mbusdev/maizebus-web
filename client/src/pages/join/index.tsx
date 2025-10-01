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
  Upload,
  FileText,
  X,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
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

  const [resumeFile, setResumeFile] = useState<File | null>(null);
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

    const formDataWithFile = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      formDataWithFile.append(key, value);
    });

    if (resumeFile) {
      formDataWithFile.append("resume", resumeFile);
    }

    try {
      const response = await fetch('http://localhost:3001/api/join', {
        method: 'POST',
        body: formDataWithFile,
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
        setResumeFile(null);
        const fileInput = document.getElementById("resume") as HTMLInputElement;
        if (fileInput) {
          fileInput.value = "";
        }
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

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert("Please upload a PDF or Word document");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      setResumeFile(file);
    }
  };

  const removeResume = () => {
    setResumeFile(null);
    const fileInput = document.getElementById("resume") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
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
                    placeholder="Describe your relevant experience, skills, and projects. Include technologies you've worked with."
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

                <div>
                  <Label htmlFor="resume" className="form-label">
                    Resume Upload (Optional)
                  </Label>
                  <div className="space-y-2">
                    {!resumeFile ? (
                      <div className="relative">
                        <input
                          id="resume"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleResumeUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="resume-upload">
                          <Upload className="h-6 w-6 text-gray-400 mb-1" />
                          <p className="text-gray-600 text-sm">
                            Click to upload resume (PDF/Word, max 5MB)
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="resume-uploaded">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-green-600" />
                            <span className="text-green-800 text-sm">
                              {resumeFile.name}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={removeResume}
                            className="text-green-600 hover:text-green-800"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
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
