import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from './layouts/MainLayout';
import DashboardPage from './pages/DashboardPage';
import DocumentUploadPage from './pages/DocumentUploadPage';
import EvidenceMatrixPage from './pages/EvidenceMatrixPage';
import TimelinePage from './pages/TimelinePage';
import GroundSummaryPage from './pages/GroundSummaryPage';
import AnalysisPage from './pages/AnalysisPage';
import DraftingPage from './pages/DraftingPage';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<MainLayout><DashboardPage /></MainLayout>} />
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
