import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardPage from './pages/DashboardPage';
import DocumentUploadPage from './pages/DocumentUploadPage';
import EvidenceMatrixPage from './pages/EvidenceMatrixPage';
import TimelinePage from './pages/TimelinePage';
import GroundSummaryPage from './pages/GroundSummaryPage';
import AnalysisPage from './pages/AnalysisPage';
import DraftingPage from './pages/DraftingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <DashboardPage />
            </MainLayout>
          }
        />
        <Route
          path="/upload"
          element={
            <MainLayout>
              <DocumentUploadPage />
            </MainLayout>
          }
        />
        <Route
          path="/evidence-matrix"
          element={
            <MainLayout>
              <EvidenceMatrixPage />
            </MainLayout>
          }
        />
        <Route
          path="/timeline"
          element={
            <MainLayout>
              <TimelinePage />
            </MainLayout>
          }
        />
        <Route
          path="/ground-summary"
          element={
            <MainLayout>
              <GroundSummaryPage />
            </MainLayout>
          }
        />
        <Route
          path="/analysis"
          element={
            <MainLayout>
              <AnalysisPage />
            </MainLayout>
          }
        />
        <Route
          path="/drafting"
          element={
            <MainLayout>
              <DraftingPage />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
