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

          {/* Resume PDF Display */}
          <Card className="shadow-elegant mb-8">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-3xl font-bold bg-portfolio-gradient bg-clip-text text-transparent">
                Felipe Tala - Resume
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="w-full h-[800px] border rounded-lg overflow-hidden">
                <iframe
                  src={`https://qvryaynijbfizvsghwko.supabase.co/storage/v1/object/public/resume-pdfs/Resume_Felipe_Tala.pdf`}
                  className="w-full h-full"
                  title="Felipe Tala Resume"
                />
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Can't see the PDF? 
                </p>
                <Button asChild variant="outline">
                  <a 
                    href={`https://qvryaynijbfizvsghwko.supabase.co/storage/v1/object/public/resume-pdfs/Resume_Felipe_Tala.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Open PDF in New Tab
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Resume;