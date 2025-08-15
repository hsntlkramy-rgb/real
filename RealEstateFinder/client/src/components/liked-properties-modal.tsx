import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { PropertyWithScore } from '@/lib/types';
import { X, MapPin } from 'lucide-react';

interface LikedPropertiesModalProps {
  properties: PropertyWithScore[];
  isOpen: boolean;
  onClose: () => void;
  onPropertySelect: (property: PropertyWithScore) => void;
}

export function LikedPropertiesModal({ 
  properties, 
  isOpen, 
  onClose, 
  onPropertySelect 
}: LikedPropertiesModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <DialogTitle className="text-2xl font-bold text-gray-800">Liked Properties</DialogTitle>
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-12">
            <i className="fas fa-heart text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-600">No liked properties yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => {
                  onPropertySelect(property);
                  onClose();
                }}
              >
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-1">{property.title}</h3>
                  <p className="text-gray-600 text-sm mb-2 flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {property.location}
                  </p>
                  <p className="text-primary font-bold">{property.price}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {property.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
