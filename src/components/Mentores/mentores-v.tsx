import React from 'react';
import AgendarMentor from '../../pages/AgendarMentor/AgendarMentor';
import Footer from '../../pages/Footer/Footer';
import LoggedHeader from '../../pages/LoggedHeader/Header';

const MentoresPage: React.FC = () => {
  return (
    <div className="mentores-page">
      <LoggedHeader />
      <AgendarMentor />
      <Footer />
    </div>
  );
}

export default MentoresPage;
