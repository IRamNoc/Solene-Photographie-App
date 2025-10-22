import React from 'react';
import PrestationCategoryPage from '../../components/prestations/PrestationCategoryPage';
import FamilleDescriptionSection from '../../components/sections/FamilleDescriptionSection';
import { famillePackagesData } from '../../data/prestationsData';
import { familleFaqData } from '../../data/faqData';

const FamillePage: React.FC = () => {
  return (
    <PrestationCategoryPage
      title="FAMILLE"
      color="bg-[#aad8e0]"
      textColor="text-[#ebf3f7]"
      data={famillePackagesData}
      showDescription={true}
      descriptionComponent={<FamilleDescriptionSection />}
      faqData={familleFaqData}
    />
  );
};

export default FamillePage;