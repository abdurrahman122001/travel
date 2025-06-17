
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface Package {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  location: string;
  rating: number;
  reviews: number;
}

interface PackageCardProps {
  package: Package;
}

const PackageCard = ({ package: pkg }: PackageCardProps) => {
  return (
    <Card className="overflow-hidden hover-scale group">
      <div className="relative overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-semibold">
          ${pkg.price}
        </div>
      </div>
      
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{pkg.rating}</span>
            <span className="text-sm text-muted-foreground">({pkg.reviews})</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            {pkg.duration}
          </div>
        </div>
        
        <CardTitle className="text-xl">{pkg.title}</CardTitle>
        <div className="flex items-center gap-1 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{pkg.location}</span>
        </div>
      </CardHeader>
      
      <CardContent>
        <CardDescription className="mb-4">{pkg.description}</CardDescription>
        <Button asChild className="w-full">
          <Link to={`/packages/${pkg.id}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default PackageCard;
