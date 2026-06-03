import Header from "../components/Header"; // adjusted import path
import Hero from "../components/Hero";   // 🔹 Перевір шлях до Hero

interface PageProps {
  onOpenCart: () => void;
}

const Home: React.FC<PageProps> = ({ onOpenCart }) => {
  return (
    <div className="bg-[#f6f6f4] min-h-screen">
    
      <Header onOpenCart={onOpenCart} />
      <Hero />
    </div>
  );
};

export default Home;