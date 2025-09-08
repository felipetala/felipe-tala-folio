import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X, Image as ImageIcon, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PhotoUploadProps {
  onUploadComplete?: () => void;
}

const PhotoUpload = ({ onUploadComplete }: PhotoUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [collectionTitle, setCollectionTitle] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");
  const [collectionCategory, setCollectionCategory] = useState("");
  const [collectionDate, setCollectionDate] = useState("");
  const [previews, setPreviews] = useState<string[]>([]);
  const { toast } = useToast();

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Limit to 10 files
    const limitedFiles = files.slice(0, 10);
    setSelectedFiles(limitedFiles);

    // Create preview URLs
    const newPreviews = limitedFiles.map(file => URL.createObjectURL(file));
    setPreviews(prev => {
      // Clean up old preview URLs
      prev.forEach(url => URL.revokeObjectURL(url));
      return newPreviews;
    });
  }, []);

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const uploadToSupabase = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `personal-photos/${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from('photos')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('photos')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleUpload = async () => {
    if (!collectionTitle || selectedFiles.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please provide a title and select at least one photo.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Upload all photos to Supabase Storage
      const uploadPromises = selectedFiles.map(file => uploadToSupabase(file));
      const photoUrls = await Promise.all(uploadPromises);

      // Create the collection in the database
      const { data: collection, error: collectionError } = await supabase
        .from('photo_collections')
        .insert({
          title: collectionTitle,
          description: collectionDescription,
          category: collectionCategory,
          date: collectionDate || null,
          cover_image: photoUrls[0], // Use first photo as cover
        })
        .select()
        .single();

      if (collectionError) throw collectionError;

      // Add photos to the collection
      const photoInserts = photoUrls.map((url, index) => ({
        collection_id: collection.id,
        url,
        caption: `Photo ${index + 1}`,
        order_index: index + 1,
      }));

      const { error: photosError } = await supabase
        .from('photos')
        .insert(photoInserts);

      if (photosError) throw photosError;

      toast({
        title: "Upload Successful",
        description: `${selectedFiles.length} photos uploaded to "${collectionTitle}"`,
      });

      // Reset form
      setSelectedFiles([]);
      setPreviews([]);
      setCollectionTitle("");
      setCollectionDescription("");
      setCollectionCategory("");
      setCollectionDate("");

      if (onUploadComplete) {
        onUploadComplete();
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your photos. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Upload New Photo Collection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Collection Title *</Label>
            <Input
              id="title"
              placeholder="e.g., RV Family Adventure"
              value={collectionTitle}
              onChange={(e) => setCollectionTitle(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={collectionCategory} onValueChange={setCollectionCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="family">Family</SelectItem>
                <SelectItem value="events">Events</SelectItem>
                <SelectItem value="hobbies">Hobbies</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe this collection..."
            value={collectionDescription}
            onChange={(e) => setCollectionDescription(e.target.value)}
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={collectionDate}
            onChange={(e) => setCollectionDate(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="photos">Photos (Max 10)</Label>
          <div className="mt-2">
            <Input
              id="photos"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
            <Label
              htmlFor="photos"
              className="cursor-pointer inline-flex items-center justify-center rounded-md border border-dashed border-gray-300 px-4 py-8 w-full hover:border-gray-400 transition-colors"
            >
              <div className="text-center">
                <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <span className="text-sm text-muted-foreground">
                  Click to select photos or drag and drop
                </span>
              </div>
            </Label>
          </div>
        </div>

        {/* Preview Grid */}
        {previews.length > 0 && (
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
            {previews.map((preview, index) => (
              <div key={index} className="relative group aspect-square">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  onClick={() => removeFile(index)}
                  className="absolute top-1 right-1 rounded-full bg-red-500 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            {previews.length < 10 && (
              <Label
                htmlFor="photos"
                className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
              >
                <Plus className="w-8 h-8 text-muted-foreground" />
              </Label>
            )}
          </div>
        )}

        <Button 
          onClick={handleUpload} 
          disabled={isUploading || selectedFiles.length === 0 || !collectionTitle}
          className="w-full"
        >
          {isUploading ? "Uploading..." : `Upload ${selectedFiles.length} Photo${selectedFiles.length !== 1 ? 's' : ''}`}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PhotoUpload;