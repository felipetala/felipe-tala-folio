import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, Image as ImageIcon, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PersonalLife = () => {
  const navigate = useNavigate();

  const photoGallery = [
    {
      id: 1,
      title: "Mountain Hiking Adventure",
      date: "2024-01-15",
      description: "Joined friends on a 3 day trip a week in advance; ended up climbing a 14k ft mountain",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Family RV Vacation",
      date: "2023-12-20",
      description: "Post graduation family RV trip to Yosemite and Carmel",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Building Ternary Device",
      date: "2023-11-10",
      description: "Speaking at the annual developers conference",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      title: "Venice Beach Sunset",
      date: "2023-10-05",
      description: "Sharing mate with friends in the beach",
      image: "/placeholder.svg"
    },
    {
      id: 5,
      title: "Beach Sunset",
      date: "2023-09-22",
      description: "Perfect sunset captured during a peaceful evening walk",
      image: "/placeholder.svg"
    },
    {
      id: 6,
      title: "Pet Adventures",
      date: "2023-08-18",
      description: "Fun day at the dog park with my furry friend",
      image: "/placeholder.svg"
    }
  ];

  const interests = [
    "Hardware development", "Reading", "Jogging", "Travel", "Jogging", "Martial Arts", "Rock Climbing"
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
              Add Photos
            </Button>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-portfolio-gradient bg-clip-text text-transparent mb-4">
              Personal Life
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A glimpse into my life outside of work - the moments, adventures, and experiences that shape who I am.
            </p>
          </div>

          {/* Interests Section */}
          <Card className="shadow-elegant mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Interests & Hobbies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {interests.map((interest) => (
                  <span key={interest} className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
                    {interest}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Photo Gallery */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">Photo Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photoGallery.map((photo) => (
                <Card key={photo.id} className="shadow-card hover:shadow-elegant transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-0">
                    <div className="aspect-square bg-secondary rounded-t-lg flex items-center justify-center group-hover:bg-secondary/80 transition-colors">
                      <ImageIcon className="w-16 h-16 text-muted-foreground" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">{photo.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{photo.description}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {new Date(photo.date).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Add Photos Section */}
          <Card className="shadow-elegant border-dashed border-2">
            <CardContent className="py-12 text-center">
              <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Add New Photos</h3>
              <p className="text-muted-foreground mb-6">
                Share your latest adventures and memorable moments with a photo upload.
              </p>
              <Button variant="default">Upload Photos</Button>
            </CardContent>
          </Card>

          {/* About Me Section */}
          <Card className="shadow-elegant mt-8">
            <CardHeader>
              <CardTitle className="text-2xl">About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Outside of the lab and office, you'll find me sharing conversations and mate with friends, reading,
                mediating, or jogging. I believe in maintaining a healthy mind to overperform and achieve working
                flow state. I am passionate about continuous learning, whether it's mastering a new 
                development skill or trying a new jogging path. Novelty keeps the mind fresh, creative and active.
                Family and friends are incredibly important to me, and I love being consciouss of when we are
                living a lasting memory with the people I care about most.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PersonalLife;
