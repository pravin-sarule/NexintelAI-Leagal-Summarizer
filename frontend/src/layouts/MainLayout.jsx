import React from 'react';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';

const MainLayout = ({ children }) => {
  const pageTitle = children.type.name.replace('Page', '');
  const pageSubtitle = `This is the ${pageTitle} page.`;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <MainContent pageTitle={pageTitle} pageSubtitle={pageSubtitle}>
        {children}
      </MainContent>
    </div>
  );
};

export default MainLayout;