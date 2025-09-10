import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getGalleryImageUrl } from "@/assets/gallery-images";

interface GalleryImage {
  id: string;
  image_url: string;
  alt_text: string;
  order_index: number;
}

export const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data: website } = await supabase
          .from("websites")
          .select("id")
          .eq("is_active", true)
          .single();

        if (website) {
          const { data: galleryData } = await supabase
            .from("website_gallery")
            .select("*")
            .eq("website_id", website.id)
            .order("order_index");

          setImages(galleryData || []);
        }
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (loading) {
    return (
      <section id="gallery" className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">Loading gallery...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Gallery
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our portfolio of custom ironwork projects showcasing exceptional metalwork 
              craftsmanship and artistic design.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <Dialog key={image.id}>
                <DialogTrigger asChild>
                  <div
                    className="relative cursor-pointer group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <img
                      src={getGalleryImageUrl(image.image_url)}
                      alt={image.alt_text}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-full p-0 border-0">
                  <div className="relative">
                    <img
                      src={getGalleryImageUrl(images[selectedImageIndex]?.image_url)}
                      alt={images[selectedImageIndex]?.alt_text}
                      className="w-full h-auto max-h-[80vh] object-contain"
                    />
                    
                    {/* Navigation buttons */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>

                    {/* Image counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {selectedImageIndex + 1} / {images.length}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};