
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { MapPin, Calendar, DollarSign, Users } from "lucide-react";

interface PackageFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedDestination: string;
  setSelectedDestination: (value: string) => void;
  selectedDuration: string;
  setSelectedDuration: (value: string) => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  selectedRating: string;
  setSelectedRating: (value: string) => void;
  onClearFilters: () => void;
}

const PackageFilters = ({
  searchTerm,
  setSearchTerm,
  selectedDestination,
  setSelectedDestination,
  selectedDuration,
  setSelectedDuration,
  priceRange,
  setPriceRange,
  selectedRating,
  setSelectedRating,
  onClearFilters
}: PackageFiltersProps) => {
  const destinations = [
    "All Destinations",
    "Bali, Indonesia",
    "Switzerland",
    "Kenya & Tanzania", 
    "Argentina & Chile"
  ];

  const durations = [
    "Any Duration",
    "1-7 Days",
    "8-14 Days",
    "15+ Days"
  ];

  const ratings = [
    "Any Rating",
    "4.0+",
    "4.5+",
    "4.8+"
  ];

  return (
    <Card className="bg-white border-blue-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-blue-900 flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Filter Packages
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div>
          <Label htmlFor="search" className="text-blue-900 font-medium">Search</Label>
          <Input
            id="search"
            placeholder="Search packages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-blue-200 focus:border-blue-500"
          />
        </div>

        {/* Destination Filter */}
        <div>
          <Label className="text-blue-900 font-medium flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4" />
            Destination
          </Label>
          <Select value={selectedDestination} onValueChange={setSelectedDestination}>
            <SelectTrigger className="border-blue-200 focus:border-blue-500">
              <SelectValue placeholder="Select destination" />
            </SelectTrigger>
            <SelectContent>
              {destinations.map((destination) => (
                <SelectItem key={destination} value={destination}>
                  {destination}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Duration Filter */}
        <div>
          <Label className="text-blue-900 font-medium flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4" />
            Duration
          </Label>
          <Select value={selectedDuration} onValueChange={setSelectedDuration}>
            <SelectTrigger className="border-blue-200 focus:border-blue-500">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              {durations.map((duration) => (
                <SelectItem key={duration} value={duration}>
                  {duration}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div>
          <Label className="text-blue-900 font-medium flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4" />
            Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
          </Label>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={3000}
            min={500}
            step={100}
            className="mt-2"
          />
        </div>

        {/* Rating Filter */}
        <div>
          <Label className="text-blue-900 font-medium flex items-center gap-2 mb-2">
            <Users className="w-4 h-4" />
            Minimum Rating
          </Label>
          <Select value={selectedRating} onValueChange={setSelectedRating}>
            <SelectTrigger className="border-blue-200 focus:border-blue-500">
              <SelectValue placeholder="Select rating" />
            </SelectTrigger>
            <SelectContent>
              {ratings.map((rating) => (
                <SelectItem key={rating} value={rating}>
                  {rating}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters */}
        <Button 
          onClick={onClearFilters} 
          variant="outline" 
          className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
        >
          Clear All Filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default PackageFilters;
