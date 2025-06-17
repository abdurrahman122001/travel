
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Calendar, Users, Plane } from "lucide-react";
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
    <Card className="overflow-hidden hover-scale group bg-white shadow-lg rounded-xl border-0">
      <div className="relative overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Price Banner */}
        <div className="absolute top-3 left-3 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold shadow-md">
          ₹{pkg.price.toLocaleString()}/-
          <span className="text-xs ml-1">onwards</span>
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <Badge variant="secondary" className="bg-green-600 text-white text-xs px-2 py-1 rounded-md">
            Recommended
          </Badge>
          <Badge variant="secondary" className="bg-blue-600 text-white text-xs px-2 py-1 rounded-md">
            Family Friendly
          </Badge>
        </div>
        
        {/* Bottom overlay with title */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
          <h3 className="text-white text-lg font-bold mb-1">{pkg.title}</h3>
          <div className="flex items-center gap-4 text-white text-sm">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>Multiple Cities</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{pkg.duration}</span>
            </div>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        {/* Rating and Info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{pkg.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-blue-600">
              <Users className="w-4 h-4" />
              <span className="text-sm">{pkg.reviews}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-green-600">
            <Plane className="w-4 h-4" />
            <span className="text-sm">Flights Included</span>
          </div>
        </div>
        
        {/* Dates */}
        <div className="text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Multiple departure dates available</span>
          </div>
        </div>
        
        <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          <Link to={`/packages/${pkg.id}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default PackageCard;
