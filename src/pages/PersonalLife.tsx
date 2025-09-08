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
    "Photography", "Hiking", "Cooking", "Travel", "Music", "Reading", "Gaming", "Fitness"
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
      
      // Use static data as fallback
      setCollections([
        {
          id: '1',
          title: 'RV Family Adventure',
          description: 'Amazing cross-country trip with the family in our RV',
          date: '2024-07-15',
          category: 'travel',
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
          title: 'Mountain Hiking Trip',
          description: 'Weekend getaway to the Rockies',
          date: '2024-06-20',
          category: 'travel',
          cover_image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
          photos: [
            { id: '6', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', caption: 'Summit view', order_index: 1 },
            { id: '7', url: 'https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?w=800', caption: 'Trail through the forest', order_index: 2 },
            { id: '8', url: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800', caption: 'Rest at the peak', order_index: 3 }
          ]
        },
        {
          id: '3',
          title: 'Tech Conference 2024',
          description: 'Speaking at the annual developers conference',
          date: '2024-03-10',
          category: 'events',
          cover_image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
          photos: [
            { id: '9', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', caption: 'Main stage presentation', order_index: 1 },
            { id: '10', url: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800', caption: 'Networking session', order_index: 2 },
            { id: '11', url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800', caption: 'Workshop time', order_index: 3 },
            { id: '12', url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800', caption: 'Panel discussion', order_index: 4 }
          ]
        },
        {
          id: '4',
          title: 'Cooking Adventures',
          description: 'Experiments in the kitchen',
          date: '2024-02-15',
          category: 'hobbies',
          cover_image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
          photos: [
            { id: '13', url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800', caption: 'Homemade pasta', order_index: 1 },
            { id: '14', url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800', caption: 'Pizza night', order_index: 2 },
            { id: '15', url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800', caption: 'Healthy salad creation', order_index: 3 }
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
                When I'm not coding, you'll find me exploring the great outdoors, experimenting in the kitchen, 
                or capturing life's beautiful moments through photography. I believe in maintaining a healthy 
                work-life balance and am passionate about continuous learning, whether it's mastering a new 
                programming language or trying a new hiking trail. Family and friends are incredibly important 
                to me, and I love creating lasting memories with the people I care about most.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PersonalLife;