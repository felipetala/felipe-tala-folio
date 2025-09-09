import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Loader2, RefreshCw, AlertCircle, CheckCircle2, Bug } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import PhotoCollage from "@/components/PhotoCollage";
import { fetchPhotoCollections, PhotoCollection } from "@/lib/supabase-storage";
import { testSupabaseConnection } from "@/lib/supabase-test";

const PersonalLife = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [collections, setCollections] = useState<PhotoCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'error' | 'loading'>('loading');

  const interests = [
    "Hardware development", "Reading", "Jogging", "Travel", "Martial Arts", "Rock Climbing"
  ];

  const fetchCollections = async () => {
    try {
      setLoading(true);
      setConnectionStatus('loading');
      
      // Fetch collections from Supabase storage bucket
      const fetchedCollections = await fetchPhotoCollections();
      setCollections(fetchedCollections);
      
      if (fetchedCollections.length === 0) {
        setConnectionStatus('error');
        toast({
          title: "No photos found",
          description: "Please check if photos are uploaded to the Supabase bucket.",
          variant: "default",
        });
      } else {
        setConnectionStatus('connected');
        // Show success toast only on refresh, not initial load
        if (!loading) {
          toast({
            title: "Photos refreshed",
            description: `Loaded ${fetchedCollections.length} collection${fetchedCollections.length > 1 ? 's' : ''}`,
          });
        }
      }
    } catch (error) {
      console.error('Error fetching collections:', error);
      setConnectionStatus('error');
      toast({
        title: "Connection error",
        description: "Unable to connect to photo storage. Showing sample galleries.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Run diagnostic test in development
    if (process.env.NODE_ENV === 'development' || window.location.search.includes('debug')) {
      testSupabaseConnection();
    }
    fetchCollections();
  }, []);

  const handleRefresh = () => {
    toast({
      title: "Refreshing",
      description: "Fetching latest photos from storage...",
    });
    fetchCollections();
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
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleRefresh}
                disabled={loading}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh Photos
              </Button>
              
              {/* Debug button - only show in development or with ?debug in URL */}
              {(process.env.NODE_ENV === 'development' || window.location.search.includes('debug')) && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    console.clear();
                    testSupabaseConnection();
                    toast({
                      title: "Running diagnostics",
                      description: "Check browser console for results",
                    });
                  }}
                  className="flex items-center gap-2"
                >
                  <Bug className="w-4 h-4" />
                  Debug
                </Button>
              )}
            </div>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-portfolio-gradient bg-clip-text text-transparent mb-4">
              Personal Life
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A glimpse into my life outside of work - the moments, adventures, and experiences that shape who I am.
            </p>
          </div>

          {/* Connection Status Alert */}
          {connectionStatus === 'error' && (
            <Alert className="mb-6 border-orange-200 bg-orange-50">
              <AlertCircle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                <strong>Supabase bucket not configured.</strong> Currently showing sample photos.
                <a 
                href={`https://qvryaynijbfizvsghwko.supabase.co/storage/v1/object/public/photos/family-rv-trip/family-rv-trip.jpg`}
                download="family-rv-trip.jpg"
                className="flex items-center gap-2"
                >
              </AlertDescription>
            </Alert>
          )}
          
          {connectionStatus === 'connected' && collections.length > 0 && (
            <Alert className="mb-6 border-green-200 bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Connected to Supabase. Displaying {collections.length} photo collection{collections.length > 1 ? 's' : ''}.
              </AlertDescription>
            </Alert>
          )}

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
                        description={collection.description}
                        date={collection.date}
                        photos={collection.photos.sort((a, b) => a.order_index - b.order_index)}
                        category={collection.category}
                      />
                    ))}
                  </div>
                ) : (
                  <Card className="shadow-elegant">
                    <CardContent className="py-12 text-center">
                      <p className="text-muted-foreground mb-4">
                        No photo collections in this category.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Photos are automatically loaded from your Supabase storage bucket.
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={handleRefresh}
                        className="mt-4"
                      >
                        Refresh Collections
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Storage Info Card */}
          <Card className="shadow-elegant mb-8 border-dashed border-2">
            <CardHeader>
              <CardTitle className="text-lg">Photo Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Photos are automatically fetched from your Supabase storage bucket.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>📁 <strong>Bucket:</strong> photos</div>
                <div>🗂️ <strong>Organization:</strong> Create folders in your bucket to organize photos into collections</div>
                <div>🖼️ <strong>Supported:</strong> JPG, PNG, GIF, WebP</div>
                <div>♻️ <strong>Updates:</strong> Click "Refresh Photos" to load new images</div>
              </div>
              <div className="mt-4 p-3 bg-accent/5 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  <strong>Tip:</strong> Name your folders descriptively (e.g., "family-rv-trip", "mountain-hiking") 
                  for automatic categorization.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* About Me Section */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="text-2xl">About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Outside of the lab and office, you'll find me sharing conversations and mate with friends, reading,
                meditating, or jogging. I believe in maintaining a healthy mind to overperform and achieve working
                flow state.
                
                I am passionate about continuous learning, whether it's mastering a new 
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
