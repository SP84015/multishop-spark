import { Heart, Star, Users, Award } from "lucide-react";
import aboutImage from "@/assets/about-ironwork.jpg";

interface Website {
  about_title?: string;
  about_content?: string;
}

export const About = ({ website }: { website?: Website }) => {
  return (
    <section id="about" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {website?.about_title || "Creating Magical Wedding Moments"}
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {website?.about_content ||
                  `At Veldor, we specialize in creating unforgettable wedding experiences and providing innovative big seed solutions. With years of expertise in the wedding industry, we understand that your special day deserves nothing but perfection. Our dedicated team works closely with couples to bring their dream wedding to life, handling every detail with care and precision.`}
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold text-foreground">500+</h4>
                  <p className="text-sm text-muted-foreground">Happy Couples</p>
                </div>
                <div className="text-center">
                  <Star className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold text-foreground">5.0</h4>
                  <p className="text-sm text-muted-foreground">Rating</p>
                </div>
                <div className="text-center">
                  <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold text-foreground">10+</h4>
                  <p className="text-sm text-muted-foreground">Years Experience</p>
                </div>
                <div className="text-center">
                  <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold text-foreground">100%</h4>
                  <p className="text-sm text-muted-foreground">Satisfaction</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src={aboutImage}
                alt="Skilled ironworkers crafting metalwork"
                className="rounded-lg shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent rounded-full flex items-center justify-center">
                <Heart className="h-12 w-12 text-accent-foreground" />
              </div>
            </div>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-card rounded-lg shadow-md">
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-card-foreground mb-2">Our Mission</h3>
              <p className="text-muted-foreground">
                To create unforgettable wedding experiences that reflect the unique love story of every couple.
              </p>
            </div>
            <div className="text-center p-6 bg-card rounded-lg shadow-md">
              <Star className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-card-foreground mb-2">Our Vision</h3>
              <p className="text-muted-foreground">
                To be the leading wedding service provider known for excellence, creativity, and personalized care.
              </p>
            </div>
            <div className="text-center p-6 bg-card rounded-lg shadow-md">
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-card-foreground mb-2">Our Values</h3>
              <p className="text-muted-foreground">
                Quality, integrity, creativity, and dedication to making your special day absolutely perfect.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};