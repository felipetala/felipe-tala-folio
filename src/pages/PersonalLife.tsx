import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import PhotoCollage from "@/components/PhotoCollage";
import PhotoUpload from "@/components/PhotoUpload";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PhotoCollection {
  id: string;
  title: string;
  description: string | null;
  date: string | null;
  category: string | null;
  cover_image: string | null;
  photos: Array<{
    id: string;
    url: string;
    caption: string | null;
    order_index: number;
  }>;
}

const PersonalLife = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [collections, setCollections] = useState<PhotoCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  const interests = [
    "Hardware development", "Reading", "Jogging", "Travel", "Martial Arts", "Rock Climbing"
  ];

  const fetchCollections = async () => {
    try {
      setLoading(true);
      
      // Fetch collections with their photos
      const { data: collectionsData, error: collectionsError } = await supabase
        .from('photo_collections')
        .select(`
          *,
          photos (
            id,
            url,
            caption,
            order_index
          )
        `)
        .order('date', { ascending: false });

      if (collectionsError) throw collectionsError;

      setCollections(collectionsData || []);
    } catch (error) {
      console.error('Error fetching collections:', error);
      
      // Use static data as fallback with personalized descriptions
      setCollections([
        {
          id: '1',
          title: 'Family RV Vacation',
          description: 'Post graduation family RV trip to Yosemite and Carmel',
          date: '2023-12-20',
          category: 'family',
          cover_image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800',
          photos: [
            { id: '1', url: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800', caption: 'Starting our journey', order_index: 1 },
            { id: '2', url: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=800', caption: 'Beautiful sunset from the RV', order_index: 2 },
            { id: '3', url: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800', caption: 'Camping by the lake', order_index: 3 },
            { id: '4', url: 'https://images.unsplash.com/photo-1533873984035-25970ab07461?w=800', caption: 'Family dinner in nature', order_index: 4 },
            { id: '5', url: 'https://images.unsplash.com/photo-1568605115459-4b731184f961?w=800', caption: 'Morning coffee with a view', order_index: 5 }
          ]
        },
        {
          id: '2',
          title: 'Mountain Hiking Adventure',
          description: 'Joined friends on a 3 day trip a week in advance; ended up climbing a 14k ft mountain',
          date: '2024-01-15',
          category: 'travel',
          cover_image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
          photos: [
            { id: '6', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', caption: 'Summit view at 14,000 ft', order_index: 1 },
            { id: '7', url: 'https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?w=800', caption: 'Trail through the forest', order_index: 2 },
            { id: '8', url: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800', caption: 'Rest at the peak', order_index: 3 }
          ]
        },
        {
          id: '3',
          title: 'Venice Beach Sunset',
          description: 'Sharing mate with friends in the beach',
          date: '2023-10-05',
          category: 'travel',
          cover_image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
          photos: [
            { id: '9', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', caption: 'Venice Beach at golden hour', order_index: 1 },
            { id: '10', url: 'https://images.unsplash.com/photo-1533760881669-80db4d7b4c15?w=800', caption: 'Sharing mate with friends', order_index: 2 },
            { id: '11', url: 'https://images.unsplash.com/photo-1515726657878-05d8c9025ab9?w=800', caption: 'Beach volleyball game', order_index: 3 }
          ]
        },
        {
          id: '4',
          title: 'Building Ternary Device',
          description: 'Hardware development project exploring ternary computing',
          date: '2023-11-10',
          category: 'hobbies',
          cover_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
          photos: [
            { id: '12', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800', caption: 'Circuit board design', order_index: 1 },
            { id: '13', url: 'https://images.unsplash.com/photo-1553406830-247e03c99a14?w=800', caption: 'Testing the prototype', order_index: 2 },
            { id: '14', url: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=800', caption: 'Programming the device', order_index: 3 }
          ]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleUploadComplete = () => {
    setUploadDialogOpen(false);
    fetchCollections();
    toast({
      title: "Success",
      description: "Your photos have been uploaded successfully!",
    });
  };

  const filteredCollections = activeCategory === "all" 
    ? collections 
    : collections.filter(c => c.category === activeCategory);

  const categories = [
    { value: "all", label: "All Collections" },
    { value: "travel", label: "Travel" },
    { value: "family", label: "Family" },
    { value: "events", label: "Events" },
    { value: "hobbies", label: "Hobbies" },
    { value: "other", label: "Other" }
  ];

  return (
    <div className="min-h-screen bg-portfolio-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Button variant="outline" onClick={() => navigate("/")} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Menu
            </Button>
            
            <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="default" className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Photos
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create Photo Collection</DialogTitle>
                </DialogHeader>
                <PhotoUpload onUploadComplete={handleUploadComplete} />
              </DialogContent>
            </Dialog>
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

          {/* Photo Collections with Categories */}
          <div className="mb-8">
            <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Photo Collections</h2>
                <TabsList>
                  {categories.map(cat => (
                    <TabsTrigger key={cat.value} value={cat.value}>
                      {cat.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <TabsContent value={activeCategory}>
                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                  </div>
                ) : filteredCollections.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredCollections.map((collection) => (
                      <PhotoCollage
                        key={collection.id}
                        title={collection.title}
                        description={collection.description || undefined}
                        date={collection.date || undefined}
                        photos={collection.photos.sort((a, b) => a.order_index - b.order_index)}
                        category={collection.category || undefined}
                      />
                    ))}
                  </div>
                ) : (
                  <Card className="shadow-elegant">
                    <CardContent className="py-12 text-center">
                      <p className="text-muted-foreground mb-4">
                        No photo collections in this category yet.
                      </p>
                      <Button 
                        variant="default" 
                        onClick={() => setUploadDialogOpen(true)}
                      >
                        Add Your First Collection
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* About Me Section */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="text-2xl">About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Outside of the lab and office, you'll find me sharing conversations and mate with friends, reading,
                meditating, or jogging. I believe in maintaining a healthy mind to overperform and achieve working
                flow state. I am passionate about continuous learning, whether it's mastering a new 
                development skill or trying a new jogging path. Novelty keeps the mind fresh, creative and active.
                Family and friends are incredibly important to me, and I love being conscious of when we are
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
