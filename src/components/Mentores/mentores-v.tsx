import React from 'react';
import AgendarMentor from '../../pages/AgendarMentor/AgendarMentor';
import Footer from '../../pages/Footer/Footer';

const MentoresPage: React.FC = () => {
  return (
    <div className="mentores-page">
      <AgendarMentor />
      <Footer />
    </div>
  );
}

export default MentoresPage;
