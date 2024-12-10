import '../StyleCSS/Home.css';
import { Container } from 'postcss';
import Header from '../layout/header';
import Home from '../components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from '../layout/footer';
import { LanguageProvider } from '../components/LanguageContext';

const Home = () => {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </LanguageProvider>

  );
}

export default Home;
