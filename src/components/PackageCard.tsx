
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
    <Card className="overflow-hidden hover-scale group border-0 shadow-xl rounded-2xl h-[400px] relative">
      {/* Full Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundImage: `url(${pkg.image})` }}
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-4">
        {/* Top Section - Price and Badges */}
        <div className="flex justify-between items-start">
          <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            ₹{pkg.price.toLocaleString()}/-
            <span className="text-xs ml-1">onwards</span>
          </div>
          
          <div className="flex flex-col gap-2">
            <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-2 py-1 rounded-md border-0">
              Recommended
            </Badge>
            <Badge className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded-md border-0">
              Family Friendly
            </Badge>
          </div>
        </div>
        
        {/* Bottom Section - Package Info */}
        <div className="space-y-3">
          <div>
            <h3 className="text-white text-xl font-bold mb-2">{pkg.title}</h3>
            <div className="flex items-center gap-4 text-white text-sm mb-3">
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
          
          {/* Rating and Info */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-white text-sm font-medium">{pkg.rating}</span>
              </div>
              <div className="flex items-center gap-1 text-cyan-400">
                <Users className="w-4 h-4" />
                <span className="text-sm">{pkg.reviews}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-emerald-400">
              <Plane className="w-4 h-4" />
              <span className="text-sm">Flights Included</span>
            </div>
          </div>
          
          {/* Dates */}
          <div className="text-sm text-white/80 mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Multiple departure dates available</span>
            </div>
          </div>
          
          <Button asChild className="w-full bg-orange-600 hover:bg-orange-700 text-white border-0 rounded-xl py-2 font-semibold">
            <Link to={`/packages/${pkg.id}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PackageCard;
