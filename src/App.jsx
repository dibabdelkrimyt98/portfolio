import React, { useState } from 'react';
import Layout from './components/layout/Layout';
import Collaborators from './components/sections/Collaborators';
import ContactForm from './components/sections/ContactForm';
import Experience from './components/sections/Experience';
import Hero from './components/sections/Hero';
import QuoteModal from './components/sections/QuoteModal';
import WorksTimeline from './components/sections/WorksTimeline';
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Layout onOpenDevis={() => setIsModalOpen(true)}>
      <Hero />
      <WorksTimeline />
      <Collaborators />
      <Experience />
      <ContactForm />
      {/* <Experience /> and <ContactForm /> go here */}
      
      <QuoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Layout>
  );
}

export default App;