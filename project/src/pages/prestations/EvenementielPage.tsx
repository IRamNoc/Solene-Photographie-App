import React from 'react';
import PrestationCategoryPage from '../../components/prestations/PrestationCategoryPage';
import EvenementielDescriptionSection from '../../components/prestations/EvenementielDescriptionSection';
import { evenementielPackagesData } from '../../data/prestationsData';
import { evenementielFaqData } from '../../data/faqData';

const EvenementielPage: React.FC = () => {
  return (
    <PrestationCategoryPage
      title="ÉVÉNEMENTIEL"
      color="bg-[#f1bb45]"
      textColor="text-[#fdf6b8]"
      data={evenementielPackagesData}
      showDescription={true}
      descriptionComponent={<EvenementielDescriptionSection />}
      faqData={evenementielFaqData}
    />
  );
};

export default EvenementielPage;