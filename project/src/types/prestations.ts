export interface ServicePackage {
  name: string;
  price: string;
  duration?: string;
  features: string[];
}

export interface Service {
  id: string;
  title: string;
  icon: any;
  image: string;
  description: string;
  packages: ServicePackage[];
}

export interface AdditionalOption {
  name: string;
  price: string;
}

export interface ServicesNavigationProps {
  services: Service[];
  activeSection: string;
  onSectionClick: (id: string) => void;
}

export interface ServiceCardProps {
  service: Service;
  key?: string;
}

export interface PackageCardProps {
  packageData: ServicePackage;
  isHighlighted?: boolean;
  key?: string;
}

export interface AdditionalOptionsSectionProps {
  options: AdditionalOption[];
}