import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Resume = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-portfolio-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Button variant="outline" onClick={() => navigate("/")} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Menu
            </Button>
            <Button variant="default" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </div>

          <Card className="shadow-elegant mb-8">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-4xl font-bold bg-portfolio-gradient bg-clip-text text-transparent">
                Felipe Tala
              </CardTitle>
              <p className="text-xl text-muted-foreground mt-2">Software Developer</p>
              
              <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  felipe.tala@email.com
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +1 (555) 123-4567
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  San Francisco, CA
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Professional Summary */}
              <section>
                <h3 className="text-2xl font-semibold mb-4 text-primary">Professional Summary</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Passionate software developer with expertise in modern web technologies and a strong commitment to creating 
                  exceptional user experiences. Experienced in full-stack development with a focus on React, TypeScript, and 
                  cloud technologies.
                </p>
              </section>

              {/* Experience */}
              <section>
                <h3 className="text-2xl font-semibold mb-6 text-primary">Experience</h3>
                <div className="space-y-6">
                  <div className="border-l-4 border-accent pl-6">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-xl font-semibold">Senior Software Developer</h4>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        2022 - Present
                      </div>
                    </div>
                    <p className="text-accent font-medium mb-2">Tech Solutions Inc.</p>
                    <ul className="text-muted-foreground space-y-1 text-sm">
                      <li>• Led development of customer-facing web applications using React and TypeScript</li>
                      <li>• Improved application performance by 40% through code optimization and caching strategies</li>
                      <li>• Mentored junior developers and conducted code reviews</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-accent pl-6">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-xl font-semibold">Full Stack Developer</h4>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        2020 - 2022
                      </div>
                    </div>
                    <p className="text-accent font-medium mb-2">StartupXYZ</p>
                    <ul className="text-muted-foreground space-y-1 text-sm">
                      <li>• Built responsive web applications from concept to deployment</li>
                      <li>• Collaborated with designers and product managers to deliver user-centered solutions</li>
                      <li>• Implemented automated testing and CI/CD pipelines</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Skills */}
              <section>
                <h3 className="text-2xl font-semibold mb-6 text-primary">Technical Skills</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-accent">Frontend</h4>
                    <div className="flex flex-wrap gap-2">
                      {["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"].map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-accent">Backend & Tools</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Node.js", "Python", "PostgreSQL", "Git", "AWS", "Docker"].map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Education */}
              <section>
                <h3 className="text-2xl font-semibold mb-6 text-primary">Education</h3>
                <div className="border-l-4 border-accent pl-6">
                  <h4 className="text-xl font-semibold">Bachelor of Science in Computer Science</h4>
                  <p className="text-accent font-medium">University of California, Berkeley</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <Calendar className="w-4 h-4" />
                    2016 - 2020
                  </div>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Resume;