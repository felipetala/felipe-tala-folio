import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mail, MapPin, Github, Linkedin } from "lucide-react";
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
              Welcome!
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hardware developer, problem solver, and lifelong learner passionate about creating devices and programs that facilitate our lives.
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
                      I'm a passionate harware developer graduated in May 2025, with a background in Electronics Engineering and Physics. My journey in tech started with a curiosity about how things work and 
                      evolved into a deep love for crafting elegant solutions to complex problems, applying first principle approach. I am passionate about abosrbing and applying new knowledge, both within and in different fields to mine.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      I specialize in electronics prototyping and bringup, FPGA development, and aim to understand new topics on a deep level.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Beyond electronics, I enjoy jogging, reading in nature, and sharing mates with friends 🧉. I believe random acts of kindness make a better world for us; from high-fiving a stranger, to sharing food with someone in the street, small actions can change people's days.
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
                    Technology evolves rapidly, meaning one should stay curious and with a continuously expanding skillset.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-accent">Nature and Technology</h3>
                  <p className="text-muted-foreground text-sm">
                    Nature is the best teacher for developing groundbreaking technologies with positive impact. Da Vinci's work is the perfect example.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-accent">Collaboration</h3>
                  <p className="text-muted-foreground text-sm">
                    Great electronics are built by great teams. I value open communication, shared learning, and peer encouragement.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-accent">Quality First</h3>
                  <p className="text-muted-foreground text-sm">
                    I believe in doing things right the first time. Be a perfectionist.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="text-2xl">Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-accent" />
                    <span>felipetala@ku.edu</span>
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
