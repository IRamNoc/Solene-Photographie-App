import React from 'react';
import PrestationCategoryPage from '../../components/prestations/PrestationCategoryPage';
import ShootingDescriptionSection from '../../components/prestations/ShootingDescriptionSection';
import { shootingPackagesData } from '../../data/prestationsData';
import { shootingFaqData } from '../../data/faqData';

const ShootingPage: React.FC = () => {
  return (
    <PrestationCategoryPage
      title="SHOOTING"
      color="bg-[#ffc3e2]"
      textColor="text-[#f86d6d]"
      data={shootingPackagesData}
      showDescription={true}
      descriptionComponent={<ShootingDescriptionSection />}
      faqData={shootingFaqData}
    />
  );
};

export default ShootingPage;