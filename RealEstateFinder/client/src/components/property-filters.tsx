import { PropertyFilters } from '../lib/nestoria';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select } from './ui/select';

interface PropertyFiltersProps {
  filters: PropertyFilters;
  onFiltersChange: (filters: PropertyFilters) => void;
}

export function PropertyFilters({ filters, onFiltersChange }: PropertyFiltersProps) {
  const handleChange = (key: keyof PropertyFilters, value: string) => {
    const numValue = value === '' ? undefined : Number(value);
    onFiltersChange({
      ...filters,
      [key]: numValue
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="minPrice">Min Price</Label>
          <Input
            id="minPrice"
            type="number"
            placeholder="Min price..."
            value={filters.minPrice || ''}
            onChange={(e) => handleChange('minPrice', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="maxPrice">Max Price</Label>
          <Input
            id="maxPrice"
            type="number"
            placeholder="Max price..."
            value={filters.maxPrice || ''}
            onChange={(e) => handleChange('maxPrice', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="minBedrooms">Min Bedrooms</Label>
          <Input
            id="minBedrooms"
            type="number"
            min="0"
            placeholder="Min bedrooms..."
            value={filters.minBedrooms || ''}
            onChange={(e) => handleChange('minBedrooms', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="maxBedrooms">Max Bedrooms</Label>
          <Input
            id="maxBedrooms"
            type="number"
            min="0"
            placeholder="Max bedrooms..."
            value={filters.maxBedrooms || ''}
            onChange={(e) => handleChange('maxBedrooms', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="propertyType">Property Type</Label>
        <Select
          id="propertyType"
          value={filters.propertyType || ''}
          onValueChange={(value) => 
            onFiltersChange({ ...filters, propertyType: value || undefined })
          }
        >
          <option value="">Any type</option>
          <option value="house">House</option>
          <option value="flat">Flat/Apartment</option>
          <option value="land">Land</option>
        </Select>
      </div>
    </div>
  );
} 