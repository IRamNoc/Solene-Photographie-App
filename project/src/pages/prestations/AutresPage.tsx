import React from 'react';
import PrestationCategoryPage from '../../components/prestations/PrestationCategoryPage';
import { autresPackagesData } from '../../data/prestationsData';

const AutresPage: React.FC = () => {
  return (
    <PrestationCategoryPage
      title="AUTRES"
      color="bg-[#ada133]"
      textColor="text-[#fdf6b8]"
      data={autresPackagesData}
      hideStartingFrom={true}
    />
  );
};

export default AutresPage;