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
  MessageSquare,
  Bug,
  Lightbulb,
  Clock,
  Users,
  MessageCircle,
  ExternalLink,
  Send,
  CheckCircle,
  Instagram,
  Twitter,
  Linkedin,
  Github,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
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

export function Contact() {
  useIntersectionObserver();
  const navigate = useNavigate();

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
    inquiryType: "general",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const inquiryTypes = [
    {
      value: "general",
      label: "General Inquiry",
      icon: <MessageSquare className="h-4 w-4" />,
      description: "Questions about MaizeBus or our services"
    },
    {
      value: "bug",
      label: "Bug Report",
      icon: <Bug className="h-4 w-4" />,
      description: "Report a technical issue or bug"
    },
    {
      value: "feature",
      label: "Feature Request",
      icon: <Lightbulb className="h-4 w-4" />,
      description: "Suggest a new feature or improvement"
    }
  ];

  const whyContactPoints = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Quick Response",
      description: "We typically respond within 24 hours"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Student Run",
      description: "You're connecting directly with fellow Michigan students who understand your needs."
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Open Feedback",
      description: "We actively incorporate user feedback into our development roadmap."
    }
  ];


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(API_ENDPOINTS.CONTACT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        alert("Thank you for your message! We'll get back to you soon.");
        setFormData({
          name: "",
          email: "",
          inquiryType: "general",
          subject: "",
          message: "",
        });
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const scrollToFAQ = () => {
    navigate('/');
    setTimeout(() => {
      const faqSection = document.getElementById('faq');
      if (faqSection) {
        faqSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-hero animate-fade-in-up">
          <div className="contact-hero-content">
            <div className="contact-hero-icon">
              <div className="contact-logo-container">
                <span className="contact-logo-maize">maize</span><span className="contact-logo-bus">bus</span>
              </div>
            </div>

            <h1 className="contact-title">Contact Us</h1>
            <p className="contact-subtitle">
                Have a question, found a bug, or want to share some feedback? We'd love to hear from you. Our team is here to help and always excited to connect with the Michigan community.
            </p>
          </div>
        </div>

        <div className="contact-main fade-in-on-scroll">
          <div className="contact-grid">
            <div className="contact-form-section">
              <Card className="contact-form-card">
                <CardHeader>
                  <CardTitle className="contact-form-title">
                    Send us a Message
                  </CardTitle>
                  <CardDescription className="contact-form-description">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="contact-form-fields">
                    <div className="form-row">
                      <div>
                        <Label htmlFor="name" className="form-label">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Your full name"
                          className="form-input"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="form-label">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your.email@umich.edu"
                          className="form-input"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="form-label">
                        Inquiry Type *
                      </Label>
                      <div className="inquiry-type-grid">
                        {inquiryTypes.map((type) => (
                          <div
                            key={type.value}
                            className={`inquiry-type-option ${
                              formData.inquiryType === type.value ? 'selected' : ''
                            }`}
                            onClick={() => handleInputChange("inquiryType", type.value)}
                          >
                            <div className="inquiry-type-icon">{type.icon}</div>
                            <div className="inquiry-type-content">
                              <div className="inquiry-type-label">{type.label}</div>
                              <div className="inquiry-type-description">{type.description}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject" className="form-label">
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        placeholder="Brief description of your message"
                        className="form-input"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="form-label">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Please provide as much detail as possible..."
                        className="form-textarea"
                        rows={6}
                        required
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
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="contact-sidebar">
              <Card className="why-contact-card">
                <CardHeader>
                  <CardTitle className="why-contact-title">
                    Why Contact Us?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="why-contact-points">
                    {whyContactPoints.map((point) => (
                      <div key={point.title} className="why-contact-point">
                        <div className="why-contact-icon">{point.icon}</div>
                        <div className="why-contact-content">
                          <h4 className="why-contact-point-title">{point.title}</h4>
                          <p className="why-contact-point-description">{point.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="follow-us-card">
                <CardHeader>
                  <CardTitle className="follow-us-title">
                    Follow Us
                  </CardTitle>
                  <CardDescription>
                    Stay updated with our latest news and updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="social-links">
                    <a
                      href="https://instagram.com/maizebus"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      <div className="social-icon">
                        <Instagram className="h-6 w-6" />
                      </div>
                      <span className="social-name">Instagram</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    <a
                      href="https://twitter.com/maizebus"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      <div className="social-icon">
                        <Twitter className="h-6 w-6" />
                      </div>
                      <span className="social-name">Twitter</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    <a
                      href="https://linkedin.com/company/maizebus"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      <div className="social-icon">
                        <Linkedin className="h-6 w-6" />
                      </div>
                      <span className="social-name">LinkedIn</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    <a
                      href="https://github.com/maizebus"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      <div className="social-icon">
                        <Github className="h-6 w-6" />
                      </div>
                      <span className="social-name">GitHub</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="quick-answers-section fade-in-on-scroll">
            <Card className="quick-answers-card">
              <CardContent className="quick-answers-content">
                <div className="quick-answers-icon">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <div className="quick-answers-text">
                  <h3 className="quick-answers-title">Quick Answers</h3>
                  <p className="quick-answers-description">
                    Before reaching out, check our FAQ section to see if your question 
                    has already been answered. This helps us respond faster to everyone!
                  </p>
                  <Button 
                    onClick={scrollToFAQ}
                    className="faq-button"
                    variant="outline"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    View FAQ
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
