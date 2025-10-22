import React from 'react';
import PrestationCategoryPage from '../../components/prestations/PrestationCategoryPage';
import ProfessionnelDescriptionSection from '../../components/prestations/ProfessionnelDescriptionSection';
import { professionnelPackagesData } from '../../data/prestationsData';
import { professionnelFaqData } from '../../data/faqData';

const ProfessionnelPage: React.FC = () => {
  return (
    <PrestationCategoryPage
      title="PROFESSIONNEL"
      color="bg-[#fdf6b8]"
      textColor="text-[#f1bb45]"
      data={professionnelPackagesData}
      showDescription={true}
      descriptionComponent={<ProfessionnelDescriptionSection />}
      faqData={professionnelFaqData}
    />
  );
};

export default ProfessionnelPage;