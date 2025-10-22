import React from 'react';
import PrestationCategoryPage from '../../components/prestations/PrestationCategoryPage';
import MariageDescriptionSection from '../../components/prestations/MariageDescriptionSection';
import { mariagePackagesData } from '../../data/prestationsData';
import { mariageFaqData } from '../../data/faqData';

const MariagePage: React.FC = () => {
  return (
    <PrestationCategoryPage
      title="MARIAGE"
      color="bg-[#f86d6d]"
      textColor="text-[#fdd7e0]"
      data={mariagePackagesData}
      showDescription={true}
      descriptionComponent={<MariageDescriptionSection />}
      faqData={mariageFaqData}
    />
  );
};

export default MariagePage;