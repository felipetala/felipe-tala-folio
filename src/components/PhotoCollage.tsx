import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, Calendar, MapPin } from "lucide-react";

interface Photo {
  id: string;
  url: string;
  caption?: string;
  order_index: number;
}

interface PhotoCollageProps {
  title: string;
  description?: string;
  date?: string;
  location?: string;
  photos: Photo[];
  category?: string;
}

const PhotoCollage = ({ title, description, date, location, photos }: PhotoCollageProps) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(new Set());

  const handleImageError = (photoId: string) => {
    setImageLoadErrors(prev => new Set(prev).add(photoId));
  };

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const navigatePhoto = (direction: 'prev' | 'next') => {
    if (selectedPhotoIndex === null) return;
    
    const newIndex = direction === 'next' 
      ? (selectedPhotoIndex + 1) % photos.length
      : (selectedPhotoIndex - 1 + photos.length) % photos.length;
    
    setSelectedPhotoIndex(newIndex);
  };

  // Different layout patterns based on photo count
  const getLayoutClass = (index: number, total: number) => {
    if (total === 1) return "col-span-2 row-span-2";
    if (total === 2) return "col-span-1 row-span-2";
    if (total === 3) {
      return index === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1";
    }
    if (total === 4) return "col-span-1 row-span-1";
    if (total === 5) {
      return index < 2 ? "col-span-1 row-span-1" : index === 2 ? "col-span-2 row-span-1" : "col-span-1 row-span-1";
    }
    // For 6+ photos, create a mixed layout
    if (index === 0) return "col-span-1 row-span-2";
    if (index === 3) return "col-span-1 row-span-2";
    return "col-span-1 row-span-1";
  };

  // Limit display to first 6 photos in collage
  const displayPhotos = photos.slice(0, 6);
  const remainingCount = photos.length - 6;

  return (
    <>
      <Card className="shadow-elegant hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            {description && (
              <p className="text-muted-foreground mb-3">{description}</p>
            )}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {date && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
              )}
              {location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{location}</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 auto-rows-[150px] md:auto-rows-[200px]">
            {displayPhotos.map((photo, index) => (
              <div
                key={photo.id}
                className={`${getLayoutClass(index, displayPhotos.length)} relative overflow-hidden rounded-lg cursor-pointer group`}
                onClick={() => openLightbox(index)}
              >
                {!imageLoadErrors.has(photo.id) ? (
                  <img
                    src={photo.url}
                    alt={photo.caption || `Photo ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={() => handleImageError(photo.id)}
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-secondary flex items-center justify-center">
                    <span className="text-muted-foreground">Image unavailable</span>
                  </div>
                )}
                
                {/* Overlay for remaining photos count */}
                {index === displayPhotos.length - 1 && remainingCount > 0 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white text-2xl font-semibold">
                      +{remainingCount} more
                    </span>
                  </div>
                )}
                
                {/* Hover overlay with caption */}
                {photo.caption && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <p className="text-white text-sm">{photo.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lightbox Dialog */}
      <Dialog open={selectedPhotoIndex !== null} onOpenChange={() => closeLightbox()}>
        <DialogContent className="max-w-4xl p-0">
          <DialogHeader className="p-4 pb-2">
            <DialogTitle className="flex items-center justify-between">
              <span>{title}</span>
              <button
                onClick={closeLightbox}
                className="rounded-full p-1 hover:bg-secondary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </DialogTitle>
          </DialogHeader>
          
          {selectedPhotoIndex !== null && (
            <div className="relative">
              <img
                src={photos[selectedPhotoIndex].url}
                alt={photos[selectedPhotoIndex].caption || `Photo ${selectedPhotoIndex + 1}`}
                className="w-full max-h-[70vh] object-contain"
              />
              
              {photos[selectedPhotoIndex].caption && (
                <div className="p-4 text-center">
                  <p className="text-muted-foreground">
                    {photos[selectedPhotoIndex].caption}
                  </p>
                </div>
              )}
              
              {/* Navigation buttons */}
              {photos.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigatePhoto('prev');
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white p-2 hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigatePhoto('next');
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white p-2 hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
              
              {/* Photo counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {selectedPhotoIndex + 1} / {photos.length}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PhotoCollage;