import React from 'react';
import { generatedUKProperties } from '../data/properties';

export function UKPropertiesTest() {
  // Force the UK properties to be included in the build
  const ukCount = generatedUKProperties.length;
  const sampleUK = generatedUKProperties[0];
  
  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h3 className="text-lg font-semibold text-blue-800 mb-2">
        🇬🇧 UK Properties Test Component
      </h3>
      <p className="text-blue-700 mb-2">
        Total UK Properties: {ukCount}
      </p>
      {sampleUK && (
        <div className="text-sm text-blue-600">
          <p>Sample: {sampleUK.title}</p>
          <p>Price: {sampleUK.price}</p>
          <p>Location: {sampleUK.location}</p>
          <p>Country: {sampleUK.country}</p>
        </div>
      )}
    </div>
  );
}
