import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Briefcase, Heart, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-bg.jpg";

const Index = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Resume",
      description: "View my professional experience, skills, and education",
      icon: User,
      route: "/resume",
      gradient: "from-blue-600 to-blue-400"
    },
    {
      title: "Work & Projects",
      description: "Explore my portfolio of professional work and personal projects",
      icon: Briefcase,
      route: "/work-projects",
      gradient: "from-purple-600 to-purple-400"
    },
    {
      title: "Personal Life",
      description: "Discover my interests, hobbies, and life outside of work",
      icon: Heart,
      route: "/personal-life",
      gradient: "from-pink-600 to-pink-400"
    },
    {
      title: "About & Contact",
      description: "Learn more about me and get in touch",
      icon: Mail,
      route: "/about",
      gradient: "from-green-600 to-green-400"
    }
  ];

  return (
    <div 
      className="min-h-screen flex flex-col relative"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-hero-gradient"></div>
      
      {/* Hero Section */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Welcome to Felipe Tala's personal webpage
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-16 max-w-3xl mx-auto">
            Software Developer • Problem Solver • Lifelong Learner
          </p>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card 
                  key={index} 
                  className="shadow-elegant hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer bg-white/95 backdrop-blur-sm"
                  onClick={() => navigate(item.route)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${item.gradient} flex items-center justify-center mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-primary">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      Explore
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center py-8">
        <p className="text-white/80 text-lg font-medium">
          Thank you for visiting
        </p>
      </div>
    </div>
  );
};

export default Index;
