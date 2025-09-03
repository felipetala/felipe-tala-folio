import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Github, Image, FileText, Plus, Download } from "lucide-react";
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
              My engineering project documentation and technical work.
            </p>
          </div>

          {/* Project PDFs Display */}
          <div className="space-y-8">
            {/* Optical Transceiver Project */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Optical Transceiver Project</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-[600px] border rounded-lg overflow-hidden mb-4 bg-muted">
                  <object
                    data={`https://qvryaynijbfizvsghwko.supabase.co/storage/v1/object/public/project-pdfs/Optical_Transceiver_Project.pdf`}
                    type="application/pdf"
                    className="w-full h-full"
                    title="Optical Transceiver Project Documentation"
                  >
                    <embed
                      src={`https://qvryaynijbfizvsghwko.supabase.co/storage/v1/object/public/project-pdfs/Optical_Transceiver_Project.pdf`}
                      type="application/pdf"
                      className="w-full h-full"
                    />
                    <p className="p-4 text-center">
                      Your browser doesn't support PDF viewing. 
                      <a 
                        href={`https://qvryaynijbfizvsghwko.supabase.co/storage/v1/object/public/project-pdfs/Optical_Transceiver_Project.pdf`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline ml-1"
                      >
                        Click here to view the PDF
                      </a>
                    </p>
                  </object>
                </div>
                <div className="flex justify-center gap-4">
                  <Button asChild variant="outline">
                    <a 
                      href={`https://qvryaynijbfizvsghwko.supabase.co/storage/v1/object/public/project-pdfs/Optical_Transceiver_Project.pdf`}
                      download="Optical_Transceiver_Project.pdf"
                      className="flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <a 
                      href={`https://qvryaynijbfizvsghwko.supabase.co/storage/v1/object/public/project-pdfs/Optical_Transceiver_Project.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open in New Tab
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Power Supply & Rectifier Project */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Power Supply & Rectifier Project</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-[600px] border rounded-lg overflow-hidden mb-4 bg-muted">
                  <object
                    data={`https://qvryaynijbfizvsghwko.supabase.co/storage/v1/object/public/project-pdfs/Power_Supply_&_Rectifier_Project.pdf`}
                    type="application/pdf"
                    className="w-full h-full"
                    title="Power Supply & Rectifier Project Documentation"
                  >
                    <embed
                      src={`https://qvryaynijbfizvsghwko.supabase.co/storage/v1/object/public/project-pdfs/Power_Supply_&_Rectifier_Project.pdf`}
                      type="application/pdf"
                      className="w-full h-full"
                    />
                    <p className="p-4 text-center">
                      Your browser doesn't support PDF viewing. 
                      <a 
                        href={`https://qvryaynijbfizvsghwko.supabase.co/storage/v1/object/public/project-pdfs/Power_Supply_&_Rectifier_Project.pdf`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline ml-1"
                      >
                        Click here to view the PDF
                      </a>
                    </p>
                  </object>
                </div>
                <div className="flex justify-center gap-4">
                  <Button asChild variant="outline">
                    <a 
                      href={`https://qvryaynijbfizvsghwko.supabase.co/storage/v1/object/public/project-pdfs/Power_Supply_&_Rectifier_Project.pdf`}
                      download="Power_Supply_&_Rectifier_Project.pdf"
                      className="flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <a 
                      href={`https://qvryaynijbfizvsghwko.supabase.co/storage/v1/object/public/project-pdfs/Power_Supply_&_Rectifier_Project.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open in New Tab
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkProjects;