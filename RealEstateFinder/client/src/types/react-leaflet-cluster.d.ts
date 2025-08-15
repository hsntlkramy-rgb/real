declare module 'react-leaflet-cluster' {
  import { FC } from 'react';
  import { MarkerClusterGroupOptions } from 'leaflet.markercluster';
  
  interface MarkerClusterGroupProps extends MarkerClusterGroupOptions {
    children: React.ReactNode;
    chunkedLoading?: boolean;
    spiderfyOnMaxZoom?: boolean;
    showCoverageOnHover?: boolean;
    maxClusterRadius?: number;
  }

  const MarkerClusterGroup: FC<MarkerClusterGroupProps>;
  export default MarkerClusterGroup;
} 