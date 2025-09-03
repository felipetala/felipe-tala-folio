import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Github, Image, FileText, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WorkProjects = () => {
  const navigate = useNavigate();

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution built with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
      status: "Completed",
      image: "/placeholder.svg",
      githubUrl: "https://github.com/felipetala/ecommerce-platform",
      liveUrl: "https://ecommerce-demo.com",
      files: ["Technical Documentation.pdf", "API Specification.json"]
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, team collaboration features, and advanced analytics.",
      technologies: ["React", "TypeScript", "Firebase", "Material-UI"],
      status: "In Progress",
      image: "/placeholder.svg",
      githubUrl: "https://github.com/felipetala/task-manager",
      liveUrl: null,
      files: ["User Stories.docx", "Design Mockups.fig"]
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A responsive weather dashboard that displays current conditions and forecasts with beautiful data visualizations.",
      technologies: ["Vue.js", "Chart.js", "OpenWeather API", "Tailwind CSS"],
      status: "Completed",
      image: "/placeholder.svg",
      githubUrl: "https://github.com/felipetala/weather-dashboard",
      liveUrl: "https://weather-dash-demo.com",
      files: ["Performance Report.pdf"]
    }
  ];

  return (
    <div className="min-h-screen bg-portfolio-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Button variant="outline" onClick={() => navigate("/")} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Menu
            </Button>
            <Button variant="default" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New Project
            </Button>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-portfolio-gradient bg-clip-text text-transparent mb-4">
              Work & Projects
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A collection of my professional work and personal projects, showcasing various technologies and problem-solving approaches.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="shadow-elegant hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="aspect-video bg-secondary rounded-lg mb-4 flex items-center justify-center">
                    <Image className="w-16 h-16 text-muted-foreground" />
                  </div>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <Badge variant={project.status === "Completed" ? "default" : "secondary"}>
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {project.files.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-muted-foreground">Project Files:</h4>
                      <div className="space-y-1">
                        {project.files.map((file, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <FileText className="w-4 h-4" />
                            <span>{file}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Github className="w-4 h-4" />
                      Code
                    </Button>
                    {project.liveUrl && (
                      <Button variant="default" size="sm" className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add Project Section */}
          <Card className="shadow-elegant mt-8 border-dashed border-2">
            <CardContent className="py-12 text-center">
              <Plus className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Add New Project</h3>
              <p className="text-muted-foreground mb-6">
                Upload project files, add descriptions, and showcase your latest work.
              </p>
              <Button variant="default">Create Project</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WorkProjects;