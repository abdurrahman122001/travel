
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  image: string;
  rating: number;
  text: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <Card className="h-full bg-white border-blue-200 hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        
        <p className="text-blue-700 mb-6 italic">
          "{testimonial.text}"
        </p>
        
        <div className="flex items-center gap-3">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-blue-900">{testimonial.name}</p>
            <p className="text-sm text-blue-600">Verified Traveler</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
