import HeroSection from '../components/sections/HeroSection/HeroSection';
import GallerySection from '../components/sections/GallerySection/GallerySection';
import AboutSection from '../components/sections/AboutSection/AboutSection';
import GallerySection2 from '../components/sections/GallerySection/GallerySection2';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <GallerySection />
      <AboutSection />
      <GallerySection2 />
    </div>
  );
};

export default Home;