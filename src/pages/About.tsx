import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-portfolio-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Button variant="outline" onClick={() => navigate("/")} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Menu
            </Button>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-portfolio-gradient bg-clip-text text-transparent mb-4">
              About Felipe Tala
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Software developer, problem solver, and lifelong learner passionate about creating meaningful digital experiences.
            </p>
          </div>

          {/* Main About Section */}
          <Card className="shadow-elegant mb-8">
            <CardContent className="py-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <div className="w-48 h-48 bg-secondary rounded-full mx-auto mb-6 flex items-center justify-center">
                    <span className="text-6xl font-bold text-primary">FT</span>
                  </div>
                </div>
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4 text-primary">Hello, I'm Felipe!</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      I'm a passionate software developer with over 4 years of experience in creating web applications 
                      that make a difference. My journey in tech started with a curiosity about how things work and 
                      evolved into a deep love for crafting elegant solutions to complex problems.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      I specialize in modern web technologies including React, TypeScript, and Node.js, but I'm always 
                      eager to learn new tools and frameworks that can help me build better software. I believe in 
                      writing clean, maintainable code and creating user experiences that are both functional and delightful.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Beyond coding, I'm passionate about mentoring other developers, contributing to open source projects, 
                      and staying up-to-date with the latest industry trends and best practices.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Values & Philosophy */}
          <Card className="shadow-elegant mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">My Philosophy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-accent">Continuous Learning</h3>
                  <p className="text-muted-foreground text-sm">
                    Technology evolves rapidly, and I believe in staying curious and continuously expanding my skillset.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-accent">User-Centered Design</h3>
                  <p className="text-muted-foreground text-sm">
                    Every line of code should serve a purpose and contribute to a better user experience.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-accent">Collaboration</h3>
                  <p className="text-muted-foreground text-sm">
                    Great software is built by great teams. I value open communication and shared learning.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-accent">Quality First</h3>
                  <p className="text-muted-foreground text-sm">
                    I believe in doing things right the first time, with clean code and thorough testing.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="text-2xl">Get In Touch</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-accent" />
                    <span>felipe.tala@email.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-accent" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-accent" />
                    <span>San Francisco, CA</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Github className="w-5 h-5 text-accent" />
                    <a href="https://github.com/felipetala" className="hover:text-accent transition-colors">
                      github.com/felipetala
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-5 h-5 text-accent" />
                    <a href="#" className="hover:text-accent transition-colors">
                      linkedin.com/in/felipetala
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Twitter className="w-5 h-5 text-accent" />
                    <a href="#" className="hover:text-accent transition-colors">
                      @felipetala
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t">
                <p className="text-center text-muted-foreground">
                  I'm always open to interesting conversations and collaboration opportunities. 
                  Feel free to reach out!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;