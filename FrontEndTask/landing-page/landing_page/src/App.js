import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Navbar } from './Navbar/Navbar';
import Masthead from './Masthead/Masthead';
import FeaturesSection from './Features/Features';
import Showcase from './Showcase/showcase';
import Testimonials from './Testimonials/Testimonials';
import Footer from './Footer/Footer';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Masthead></Masthead>
      <FeaturesSection></FeaturesSection>
      <Showcase></Showcase>
      <Testimonials></Testimonials>
      <Masthead></Masthead>
      <Footer></Footer>
    </div>
  );
}

export default App;