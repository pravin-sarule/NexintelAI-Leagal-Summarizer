// import React, { useState, useEffect } from 'react';
// import {
//   Search,
//   Send,
//   FileText,
//   Edit3,
//   Layers,
//   Minus,
//   Plus,
//   Trash2,
//   RotateCcw,
//   ArrowRight,
//   ChevronRight,
//   AlertTriangle,
//   Clock,
//   Scale,
//   Loader2,
//   Upload,
//   Eye,
//   Download,
//   Menu,
//   X
// } from 'lucide-react';

// const AnalysisPage = () => {
//   // State Management
//   const [activeTab, setActiveTab] = useState('Summary');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);
//   const [showDocumentCanvas, setShowDocumentCanvas] = useState(true); // State to toggle between document and analysis on mobile
  
//   // Document and Analysis Data
//   const [documentData, setDocumentData] = useState(null);
//   const [analysisResults, setAnalysisResults] = useState(null);
//   const [caseSummary, setCaseSummary] = useState(null);
//   const [legalGrounds, setLegalGrounds] = useState([]);
//   const [citations, setCitations] = useState([]);
//   const [keyIssues, setKeyIssues] = useState([]);
//   const [timeline, setTimeline] = useState([]);

//   // API Configuration
//   const API_BASE_URL = 'http://localhost:3001/api';
  
//   // Mock data (replace with API calls)
//   const mockDocumentData = {
//     id: 'case_001',
//     title: 'Sharma v. State Maharashtra',
//     court: 'HIGH COURT OF BOMBAY',
//     jurisdiction: 'CIVIL APPELLATE JURISDICTION',
//     caseNumber: 'Civil Appeal No. 1234 of 2024',
//     parties: {
//       appellant: {
//         name: 'RAJESH SHARMA',
//         details: 'S/o Late Ramesh Sharma\nAge: 45 years, Occ: Business\nR/o: 123, MG Road, Mumbai - 400001'
//       }
//     },
//     status: 'active',
//     uploadedAt: new Date().toISOString()
//   };

//   const mockAnalysisData = {
//     caseSummary: {
//       summary: 'This civil appeal challenges land acquisition proceedings under the RFCTLARR Act, 2013 for Mumbai Metro Line 3. The appellant contests the acquisition of his property at MG Road, Mumbai.',
//       confidence: 0.95
//     },
//     legalGrounds: [
//       { id: 1, ground: 'Inadequate compensation determination', relevance: 'high' },
//       { id: 2, ground: 'Procedural irregularities in notification', relevance: 'medium' },
//       { id: 3, ground: 'Violation of natural justice principles', relevance: 'high' }
//     ],
//     citations: [
//       { id: 1, page: 1, para: 3, text: 'Challenge to land acquisition proceedings', type: 'issue' },
//       { id: 2, page: 1, para: 4, text: 'RFCTLARR Act, 2013', type: 'statute' }
//     ],
//     keyIssues: [
//       { 
//         id: 1, 
//         title: 'Compensation Adequacy', 
//         description: 'Market value assessment appears contested', 
//         severity: 'high',
//         color: 'red' 
//       },
//       { 
//         id: 2, 
//         title: 'Procedural Compliance', 
//         description: 'Notification process timeline needs review', 
//         severity: 'medium',
//         color: 'orange' 
//       },
//       { 
//         id: 3, 
//         title: 'Public Purpose', 
//         description: 'Metro project justification established', 
//         severity: 'low',
//         color: 'blue' 
//       }
//     ]
//   };

//   // API Functions
//   const fetchDocumentData = async (documentId) => {
//     try {
//       setIsLoading(true);
//       // Replace with actual API call
//       // const response = await fetch(`${API_BASE_URL}/documents/${documentId}`);
//       // const data = await response.json();
      
//       // Mock API delay
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       setDocumentData(mockDocumentData);
//     } catch (error) {
//       console.error('Error fetching document:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchAnalysisResults = async (documentId) => {
//     try {
//       setIsLoading(true);
//       // Replace with actual API call
//       // const response = await fetch(`${API_BASE_URL}/analysis/${documentId}`);
//       // const data = await response.json();
      
//       // Mock API delay
//       await new Promise(resolve => setTimeout(resolve, 1500));
//       const data = mockAnalysisData;
      
//       setAnalysisResults(data);
//       setCaseSummary(data.caseSummary);
//       setLegalGrounds(data.legalGrounds);
//       setCitations(data.citations);
//       setKeyIssues(data.keyIssues);
//     } catch (error) {
//       console.error('Error fetching analysis:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const generateAIInsights = async () => {
//     try {
//       setIsGeneratingInsights(true);
//       // Replace with actual API call
//       // const response = await fetch(`${API_BASE_URL}/insights/generate`, {
//       //   method: 'POST',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   body: JSON.stringify({ documentId: documentData?.id, query: searchQuery })
//       // });
      
//       // Mock API delay
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       // Refresh analysis results
//       await fetchAnalysisResults(documentData?.id);
//     } catch (error) {
//       console.error('Error generating insights:', error);
//     } finally {
//       setIsGeneratingInsights(false);
//     }
//   };

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (!searchQuery.trim()) return;
    
//     try {
//       setIsLoading(true);
//       // Replace with actual API call
//       // const response = await fetch(`${API_BASE_URL}/search`, {
//       //   method: 'POST',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   body: JSON.stringify({ query: searchQuery, documentId: documentData?.id })
//       // });
      
//       console.log('Searching for:', searchQuery);
//       // Mock search delay
//       await new Promise(resolve => setTimeout(resolve, 1000));
//     } catch (error) {
//       console.error('Search error:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Load initial data
//   useEffect(() => {
//     fetchDocumentData('case_001');
//     fetchAnalysisResults('case_001');
//   }, []);

//   const tabs = ['Summary', 'Key Issues', 'Timeline'];

//   const toolbarItems = [
//     { icon: Edit3, label: 'Edit', color: 'text-blue-600', action: () => console.log('Edit clicked') },
//     { icon: Layers, label: 'Layer', color: 'text-slate-600', action: () => console.log('Layer clicked') },
//     { icon: Minus, label: 'Remove', color: 'text-slate-600', action: () => console.log('Remove clicked') },
//     { icon: Plus, label: 'Add', color: 'text-slate-600', action: () => console.log('Add clicked') },
//     { icon: RotateCcw, label: 'Refresh', color: 'text-slate-600', action: () => fetchAnalysisResults(documentData?.id) },
//     { icon: ArrowRight, label: 'Next', color: 'text-slate-600', action: () => console.log('Next clicked') },
//     { icon: Trash2, label: 'Delete', color: 'text-red-600', action: () => console.log('Delete clicked') }
//   ];

//   const getSeverityColor = (severity) => {
//     switch (severity) {
//       case 'high': return 'border-red-500 bg-red-50';
//       case 'medium': return 'border-orange-500 bg-orange-50';
//       case 'low': return 'border-blue-500 bg-blue-50';
//       default: return 'border-gray-500 bg-gray-50';
//     }
//   };

//   const getSeverityTextColor = (severity) => {
//     switch (severity) {
//       case 'high': return 'text-red-800';
//       case 'medium': return 'text-orange-800';
//       case 'low': return 'text-blue-800';
//       default: return 'text-gray-800';
//     }
//   };

//   const getSeverityDescColor = (severity) => {
//     switch (severity) {
//       case 'high': return 'text-red-700';
//       case 'medium': return 'text-orange-700';
//       case 'low': return 'text-blue-700';
//       default: return 'text-gray-700';
//     }
//   };

//   if (isLoading && !documentData) {
//     return (
//       <div className="flex min-h-screen bg-slate-50 items-center justify-center">
//         <div className="flex items-center space-x-2 text-slate-600">
//           <Loader2 className="h-6 w-6 animate-spin" />
//           <span>Loading document analysis...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col lg:flex-row h-screen bg-slate-50 p-2 sm:p-4 overflow-hidden">
//       <div className="flex flex-1 flex-col lg:flex-row gap-3 lg:gap-4 max-w-7xl mx-auto h-full">
//         {/* Left Panel - Document Canvas */}
//         <div className={`flex-1 flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-full w-full lg:w-auto ${!showDocumentCanvas ? 'hidden' : 'flex'} lg:flex`}>
//           {/* Document Header with rounded top corners */}
//           <div className="flex items-center justify-between p-3 sm:p-4 border-b border-slate-200 bg-white rounded-t-2xl">
//             <div className="flex items-center space-x-2 sm:space-x-4">
//               <h2 className="text-base sm:text-lg font-semibold text-slate-800">Document Analysis Canvas</h2>
//               {documentData && (
//                 <div className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
//                   {documentData.title}
//                 </div>
//               )}
//               {isLoading && (
//                 <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
//               )}
//             </div>
            
//             {/* Toolbar */}
//             <div className="hidden md:flex items-center space-x-2 bg-slate-100 rounded-xl p-1">
//               {toolbarItems.map((item, index) => (
//                 <button
//                   key={index}
//                   onClick={item.action}
//                   className={`p-2 rounded-md hover:bg-white transition-all duration-200 ${item.color} hover:shadow-sm`}
//                   title={item.label}
//                   disabled={isLoading}
//                 >
//                   <item.icon className="h-4 w-4" />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Document Content Area */}
//           <div className="flex-1 px-3 sm:px-6 py-4 overflow-y-auto bg-slate-50 h-full">
//             <div className="bg-white rounded-xl shadow-sm border border-slate-200 px-4 sm:px-6 md:px-12 py-6 sm:py-8 min-h-full">
//               {documentData ? (
//                 <>
//                   {/* Document Header */}
//                   <div className="text-center mb-6 sm:mb-10">
//                     <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 mb-2 sm:mb-3">{documentData.court}</h1>
//                     <h2 className="text-base sm:text-lg md:text-xl font-semibold text-slate-700 mb-4 sm:mb-6">{documentData.jurisdiction}</h2>
//                     <p className="text-slate-600 text-sm sm:text-base md:text-lg">{documentData.caseNumber}</p>
//                   </div>

//                   <hr className="border-slate-400 mb-6 sm:mb-8" />

//                   {/* Case Details */}
//                   <div className="mb-6 sm:mb-10">
//                     <h3 className="text-sm sm:text-base md:text-lg font-semibold text-slate-800 mb-4 sm:mb-6">BETWEEN:</h3>
                    
//                     <div className="mb-6 sm:mb-8">
//                       <h4 className="font-bold text-slate-800 mb-2 sm:mb-3 text-sm sm:text-base md:text-lg">{documentData.parties.appellant.name}</h4>
//                       <div className="text-slate-600 mb-4 sm:mb-6 text-xs sm:text-sm md:text-base whitespace-pre-line">
//                         {documentData.parties.appellant.details}
//                       </div>
//                       <p className="text-right text-slate-600 italic text-xs sm:text-sm md:text-base">... Appellant</p>
//                     </div>

//                     <div className="text-center mb-6 sm:mb-8">
//                       <h4 className="text-sm sm:text-base md:text-lg font-semibold text-slate-800">VERSUS</h4>
//                     </div>

//                     {/* Annotation Tools */}
//                     <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6 text-xs sm:text-sm md:text-base">
//                       <span className="text-slate-600 font-medium">Color:</span>
//                       <div className="w-4 sm:w-5 h-4 sm:h-5 bg-red-500 rounded border border-slate-300"></div>
//                       <span className="text-slate-600 font-medium">Size:</span>
//                       <input 
//                         type="range" 
//                         min="1" 
//                         max="5" 
//                         defaultValue="3" 
//                         className="w-12 sm:w-16 md:w-20 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
//                       />
//                       <span className="text-slate-600 text-xs">3px</span>
//                       <span className="text-slate-600 font-medium">Opacity:</span>
//                       <input 
//                         type="range" 
//                         min="0" 
//                         max="100" 
//                         defaultValue="100" 
//                         className="w-12 sm:w-16 md:w-20 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
//                       />
//                       <span className="text-slate-600 text-xs">100%</span>
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center h-32 sm:h-64 text-slate-500">
//                   <div className="text-center">
//                     <FileText className="h-8 sm:h-12 w-8 sm:w-12 mx-auto mb-4 text-slate-400" />
//                     <p className="text-sm sm:text-base">No document loaded</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Static Search Bar */}
//           <div className="px-3 sm:px-6 py-3 sm:py-4 bg-white border-t border-slate-200 rounded-b-2xl">
//             <div className="relative">
//               <div className="flex items-center space-x-2 sm:space-x-3 bg-slate-50 rounded-2xl border border-slate-200 p-3 sm:p-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200">
//                 <Search className="h-4 sm:h-5 w-4 sm:w-5 text-slate-400 flex-shrink-0" />
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
//                   placeholder="Ask questions about the document or request analysis..."
//                   className="flex-1 bg-transparent border-none outline-none text-slate-700 placeholder-slate-400 text-xs sm:text-sm md:text-base"
//                   disabled={isLoading}
//                 />
//                 <button 
//                   onClick={handleSearch}
//                   disabled={isLoading || !searchQuery.trim()}
//                   className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white p-2 sm:p-2.5 rounded-xl transition-colors duration-200 flex-shrink-0"
//                 >
//                   {isLoading ? (
//                     <Loader2 className="h-3 sm:h-4 w-3 sm:w-4 animate-spin" />
//                   ) : (
//                     <Send className="h-3 sm:h-4 w-3 sm:w-4" />
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//           {/* Mobile Toggle Button for Analysis Results */}
//           <div className="lg:hidden px-3 sm:px-6 py-3 sm:py-4 bg-white border-t border-slate-200 rounded-b-2xl">
//             <button
//               onClick={() => setShowDocumentCanvas(false)}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2 text-xs sm:text-sm md:text-base"
//             >
//               <span>Show AI Analysis Results</span>
//               <ChevronRight className="h-4 w-4" />
//             </button>
//           </div>
//         </div>

//         {/* Right Panel - AI Analysis Results */}
//         <div className={`flex w-full sm:w-80 lg:w-96 flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-full lg:flex mt-4 lg:mt-0 ${showDocumentCanvas ? 'hidden' : 'flex'} lg:flex`}>
//           {/* Analysis Header with rounded top corners */}
//           <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-slate-200 bg-white rounded-t-2xl">
//             <div className="flex items-center justify-between mb-3 sm:mb-4">
//               <h3 className="text-base sm:text-lg font-semibold text-slate-800">AI Analysis Results</h3>
//             </div>
//             {/* Mobile Toggle Button for Document Canvas */}
//             <div className="lg:hidden mb-3 sm:mb-4">
//               <button
//                 onClick={() => setShowDocumentCanvas(true)}
//                 className="w-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2 text-xs sm:text-sm md:text-base"
//               >
//                 <ChevronLeft className="h-4 w-4" />
//                 <span>Show Document Canvas</span>
//               </button>
//             </div>
            
//             {/* Tabs */}
//             <div className="flex space-x-1 bg-slate-100 rounded-xl p-1">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`flex-1 py-1.5 sm:py-2 px-2 sm:px-3 text-xs sm:text-sm font-medium rounded-xl transition-all duration-200 ${
//                     activeTab === tab
//                       ? 'bg-blue-600 text-white shadow-sm'
//                       : 'text-slate-600 hover:text-slate-800 hover:bg-slate-200'
//                   }`}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Analysis Content */}
//           <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-3 sm:py-4">
//             {activeTab === 'Summary' && (
//               <div className="space-y-4 sm:space-y-6">
//                 {/* Case Summary */}
//                 {caseSummary && (
//                   <div>
//                     <h4 className="font-semibold text-slate-800 mb-2 sm:mb-3 flex items-center text-xs sm:text-sm md:text-base">
//                       <FileText className="h-3 sm:h-4 md:h-5 w-3 sm:w-4 md:w-5 mr-2 text-blue-600" />
//                       Case Summary
//                     </h4>
//                     <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
//                       {caseSummary.summary}
//                     </p>
//                     {caseSummary.confidence && (
//                       <div className="mt-2 text-xs text-slate-500">
//                         Confidence: {Math.round(caseSummary.confidence * 100)}%
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 {/* Legal Grounds */}
//                 {legalGrounds.length > 0 && (
//                   <div>
//                     <h4 className="font-semibold text-slate-800 mb-2 sm:mb-3 flex items-center text-xs sm:text-sm md:text-base">
//                       <Scale className="h-3 sm:h-4 md:h-5 w-3 sm:w-4 md:w-5 mr-2 text-purple-600" />
//                       Legal Grounds
//                     </h4>
//                     <ul className="space-y-2">
//                       {legalGrounds.map((ground) => (
//                         <li key={ground.id} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-600">
//                           <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
//                           <span>{ground.ground}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}

//                 {/* Citations Detected */}
//                 {citations.length > 0 && (
//                   <div>
//                     <h4 className="font-semibold text-slate-800 mb-2 sm:mb-3 flex items-center text-xs sm:text-sm md:text-base">
//                       <AlertTriangle className="h-3 sm:h-4 md:h-5 w-3 sm:w-4 md:w-5 mr-2 text-orange-600" />
//                       Citations Detected
//                     </h4>
//                     <div className="space-y-2 sm:space-y-3">
//                       {citations.map((citation) => (
//                         <div key={citation.id} className="bg-orange-50 border border-orange-200 rounded-lg p-2 sm:p-3">
//                           <div className="flex items-start space-x-2">
//                             <div className="text-orange-600 font-medium text-xs">
//                               📍 Page {citation.page}, Para {citation.para}:
//                             </div>
//                           </div>
//                           <p className="text-xs sm:text-sm text-slate-700 mt-1">"{citation.text}"</p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}

//             {activeTab === 'Key Issues' && (
//               <div className="space-y-3 sm:space-y-4">
//                 <h4 className="font-semibold text-slate-800 mb-3 sm:mb-4 text-xs sm:text-sm md:text-base">Identified Legal Issues</h4>
                
//                 {keyIssues.length > 0 ? (
//                   <div className="space-y-3 sm:space-y-4">
//                     {keyIssues.map((issue) => (
//                       <div key={issue.id} className={`border-l-4 p-3 sm:p-4 rounded-r-xl ${getSeverityColor(issue.severity)}`}>
//                         <h5 className={`font-semibold mb-1 text-xs sm:text-sm md:text-base ${getSeverityTextColor(issue.severity)}`}>
//                           {issue.title}
//                         </h5>
//                         <p className={`text-xs sm:text-sm ${getSeverityDescColor(issue.severity)}`}>
//                           {issue.description}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center text-slate-500 py-6 sm:py-8">
//                     <AlertTriangle className="h-6 sm:h-8 w-6 sm:w-8 mx-auto mb-2 text-slate-400" />
//                     <p className="text-xs sm:text-sm">No key issues identified yet</p>
//                   </div>
//                 )}
//               </div>
//             )}

//             {activeTab === 'Timeline' && (
//               <div className="space-y-3 sm:space-y-4">
//                 <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-600">
//                   <Clock className="h-4 w-4" />
//                   <span>Case timeline analysis coming soon...</span>
//                 </div>
//               </div>
//             )}

//             {/* Loading State */}
//             {isLoading && (
//               <div className="flex items-center justify-center py-6 sm:py-8">
//                 <div className="flex items-center space-x-2 text-slate-600">
//                   <Loader2 className="h-4 sm:h-5 w-4 sm:w-5 animate-spin" />
//                   <span className="text-xs sm:text-sm">Analyzing document...</span>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Generate Insights Button */}
//           <div className="px-4 sm:px-5 py-3 sm:py-4 border-t border-slate-200 bg-white rounded-b-2xl">
//             <button 
//               onClick={generateAIInsights}
//               disabled={isGeneratingInsights || !documentData}
//               className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2 text-xs sm:text-sm md:text-base"
//             >
//               {isGeneratingInsights ? (
//                 <>
//                   <Loader2 className="h-3 sm:h-4 w-3 sm:w-4 animate-spin" />
//                   <span>Generating Insights...</span>
//                 </>
//               ) : (
//                 <>
//                   <span>🤖</span>
//                   <span>Generate AI Insights</span>
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnalysisPage;

import React, { useState, useEffect } from 'react';
import {
  Search,
  Send,
  FileText,
  Edit3,
  Layers,
  Minus,
  Plus,
  Trash2,
  RotateCcw,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  AlertTriangle,
  Clock,
  Scale,
  Loader2,
  Upload,
  Eye,
  Download,
  Menu,
  X
} from 'lucide-react';

const AnalysisPage = () => {
  // State Management
  const [activeTab, setActiveTab] = useState('Summary');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);
  const [showDocumentCanvas, setShowDocumentCanvas] = useState(true);
  
  // Document and Analysis Data
  const [documentData, setDocumentData] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [caseSummary, setCaseSummary] = useState(null);
  const [legalGrounds, setLegalGrounds] = useState([]);
  const [citations, setCitations] = useState([]);
  const [keyIssues, setKeyIssues] = useState([]);
  const [timeline, setTimeline] = useState([]);

  // Mock data
  const mockDocumentData = {
    id: 'case_001',
    title: 'Sharma v. State Maharashtra',
    court: 'HIGH COURT OF BOMBAY',
    jurisdiction: 'CIVIL APPELLATE JURISDICTION',
    caseNumber: 'Civil Appeal No. 1234 of 2024',
    parties: {
      appellant: {
        name: 'RAJESH SHARMA',
        details: 'S/o Late Ramesh Sharma\nAge: 45 years, Occ: Business\nR/o: 123, MG Road, Mumbai - 400001'
      }
    },
    status: 'active',
    uploadedAt: new Date().toISOString()
  };

  const mockAnalysisData = {
    caseSummary: {
      summary: 'This civil appeal challenges land acquisition proceedings under the RFCTLARR Act, 2013 for Mumbai Metro Line 3. The appellant contests the acquisition of his property at MG Road, Mumbai.',
      confidence: 0.95
    },
    legalGrounds: [
      { id: 1, ground: 'Inadequate compensation determination', relevance: 'high' },
      { id: 2, ground: 'Procedural irregularities in notification', relevance: 'medium' },
      { id: 3, ground: 'Violation of natural justice principles', relevance: 'high' }
    ],
    citations: [
      { id: 1, page: 1, para: 3, text: 'Challenge to land acquisition proceedings', type: 'issue' },
      { id: 2, page: 1, para: 4, text: 'RFCTLARR Act, 2013', type: 'statute' }
    ],
    keyIssues: [
      { 
        id: 1, 
        title: 'Compensation Adequacy', 
        description: 'Market value assessment appears contested', 
        severity: 'high',
        color: 'red' 
      },
      { 
        id: 2, 
        title: 'Procedural Compliance', 
        description: 'Notification process timeline needs review', 
        severity: 'medium',
        color: 'orange' 
      },
      { 
        id: 3, 
        title: 'Public Purpose', 
        description: 'Metro project justification established', 
        severity: 'low',
        color: 'blue' 
      }
    ]
  };

  // API Functions
  const fetchDocumentData = async (documentId) => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setDocumentData(mockDocumentData);
    } catch (error) {
      console.error('Error fetching document:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAnalysisResults = async (documentId) => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      const data = mockAnalysisData;
      
      setAnalysisResults(data);
      setCaseSummary(data.caseSummary);
      setLegalGrounds(data.legalGrounds);
      setCitations(data.citations);
      setKeyIssues(data.keyIssues);
    } catch (error) {
      console.error('Error fetching analysis:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateAIInsights = async () => {
    try {
      setIsGeneratingInsights(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      await fetchAnalysisResults(documentData?.id);
    } catch (error) {
      console.error('Error generating insights:', error);
    } finally {
      setIsGeneratingInsights(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    try {
      setIsLoading(true);
      console.log('Searching for:', searchQuery);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    fetchDocumentData('case_001');
    fetchAnalysisResults('case_001');
  }, []);

  const tabs = ['Summary', 'Key Issues', 'Timeline'];

  const toolbarItems = [
    { icon: Edit3, label: 'Edit', color: 'text-blue-600', action: () => console.log('Edit clicked') },
    { icon: Layers, label: 'Layer', color: 'text-slate-600', action: () => console.log('Layer clicked') },
    { icon: Minus, label: 'Remove', color: 'text-slate-600', action: () => console.log('Remove clicked') },
    { icon: Plus, label: 'Add', color: 'text-slate-600', action: () => console.log('Add clicked') },
    { icon: RotateCcw, label: 'Refresh', color: 'text-slate-600', action: () => fetchAnalysisResults(documentData?.id) },
    { icon: ArrowRight, label: 'Next', color: 'text-slate-600', action: () => console.log('Next clicked') },
    { icon: Trash2, label: 'Delete', color: 'text-red-600', action: () => console.log('Delete clicked') }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-orange-500 bg-orange-50';
      case 'low': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getSeverityTextColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-800';
      case 'medium': return 'text-orange-800';
      case 'low': return 'text-blue-800';
      default: return 'text-gray-800';
    }
  };

  const getSeverityDescColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-700';
      case 'medium': return 'text-orange-700';
      case 'low': return 'text-blue-700';
      default: return 'text-gray-700';
    }
  };

  if (isLoading && !documentData) {
    return (
      <div className="flex min-h-screen bg-slate-50 items-center justify-center">
        <div className="flex items-center space-x-2 text-slate-600">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading document analysis...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-slate-50 p-2 sm:p-4 overflow-hidden">
      <div className="flex flex-1 flex-col lg:flex-row gap-3 lg:gap-4 max-w-7xl mx-auto h-full">
        {/* Left Panel - Document Canvas */}
        <div className={`flex-1 flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-full w-full lg:w-auto ${!showDocumentCanvas ? 'hidden' : 'flex'} lg:flex`}>
          {/* Document Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-slate-200 bg-white rounded-t-2xl">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <h2 className="text-base sm:text-lg font-semibold text-slate-800">Document Analysis Canvas</h2>
              {documentData && (
                <div className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                  {documentData.title}
                </div>
              )}
              {isLoading && (
                <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
              )}
            </div>
            
            {/* Toolbar */}
            <div className="hidden md:flex items-center space-x-2 bg-slate-100 rounded-xl p-1">
              {toolbarItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className={`p-2 rounded-md hover:bg-white transition-all duration-200 ${item.color} hover:shadow-sm`}
                  title={item.label}
                  disabled={isLoading}
                >
                  <item.icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Document Content Area */}
          <div className="flex-1 px-3 sm:px-6 py-4 overflow-y-auto bg-slate-50 h-full">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 px-4 sm:px-6 md:px-12 py-6 sm:py-8 min-h-full">
              {documentData ? (
                <>
                  {/* Document Header */}
                  <div className="text-center mb-6 sm:mb-10">
                    <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 mb-2 sm:mb-3">{documentData.court}</h1>
                    <h2 className="text-base sm:text-lg md:text-xl font-semibold text-slate-700 mb-4 sm:mb-6">{documentData.jurisdiction}</h2>
                    <p className="text-slate-600 text-sm sm:text-base md:text-lg">{documentData.caseNumber}</p>
                  </div>

                  <hr className="border-slate-400 mb-6 sm:mb-8" />

                  {/* Case Details */}
                  <div className="mb-6 sm:mb-10">
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-slate-800 mb-4 sm:mb-6">BETWEEN:</h3>
                    
                    <div className="mb-6 sm:mb-8">
                      <h4 className="font-bold text-slate-800 mb-2 sm:mb-3 text-sm sm:text-base md:text-lg">{documentData.parties.appellant.name}</h4>
                      <div className="text-slate-600 mb-4 sm:mb-6 text-xs sm:text-sm md:text-base whitespace-pre-line">
                        {documentData.parties.appellant.details}
                      </div>
                      <p className="text-right text-slate-600 italic text-xs sm:text-sm md:text-base">... Appellant</p>
                    </div>

                    <div className="text-center mb-6 sm:mb-8">
                      <h4 className="text-sm sm:text-base md:text-lg font-semibold text-slate-800">VERSUS</h4>
                    </div>

                    {/* Annotation Tools */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6 text-xs sm:text-sm md:text-base">
                      <span className="text-slate-600 font-medium">Color:</span>
                      <div className="w-4 sm:w-5 h-4 sm:h-5 bg-red-500 rounded border border-slate-300"></div>
                      <span className="text-slate-600 font-medium">Size:</span>
                      <input 
                        type="range" 
                        min="1" 
                        max="5" 
                        defaultValue="3" 
                        className="w-12 sm:w-16 md:w-20 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-slate-600 text-xs">3px</span>
                      <span className="text-slate-600 font-medium">Opacity:</span>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        defaultValue="100" 
                        className="w-12 sm:w-16 md:w-20 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-slate-600 text-xs">100%</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-32 sm:h-64 text-slate-500">
                  <div className="text-center">
                    <FileText className="h-8 sm:h-12 w-8 sm:w-12 mx-auto mb-4 text-slate-400" />
                    <p className="text-sm sm:text-base">No document loaded</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="px-3 sm:px-6 py-3 sm:py-4 bg-white border-t border-slate-200 rounded-b-2xl">
            <div className="relative">
              <div className="flex items-center space-x-2 sm:space-x-3 bg-slate-50 rounded-2xl border border-slate-200 p-3 sm:p-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200">
                <Search className="h-4 sm:h-5 w-4 sm:w-5 text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                  placeholder="Ask questions about the document or request analysis..."
                  className="flex-1 bg-transparent border-none outline-none text-slate-700 placeholder-slate-400 text-xs sm:text-sm md:text-base"
                  disabled={isLoading}
                />
                <button 
                  onClick={handleSearch}
                  disabled={isLoading || !searchQuery.trim()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white p-2 sm:p-2.5 rounded-xl transition-colors duration-200 flex-shrink-0"
                >
                  {isLoading ? (
                    <Loader2 className="h-3 sm:h-4 w-3 sm:w-4 animate-spin" />
                  ) : (
                    <Send className="h-3 sm:h-4 w-3 sm:w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Toggle Button */}
          <div className="lg:hidden px-3 sm:px-6 py-3 sm:py-4 bg-white border-t border-slate-200">
            <button
              onClick={() => setShowDocumentCanvas(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2 text-xs sm:text-sm md:text-base"
            >
              <span>Show AI Analysis Results</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Right Panel - AI Analysis Results */}
        <div className={`flex w-full sm:w-80 lg:w-96 flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-full lg:flex mt-4 lg:mt-0 ${showDocumentCanvas ? 'hidden' : 'flex'} lg:flex`}>
          {/* Analysis Header */}
          <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-slate-200 bg-white rounded-t-2xl">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-slate-800">AI Analysis Results</h3>
            </div>

            {/* Mobile Toggle Button */}
            <div className="lg:hidden mb-3 sm:mb-4">
              <button
                onClick={() => setShowDocumentCanvas(true)}
                className="w-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2 text-xs sm:text-sm md:text-base"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Show Document Canvas</span>
              </button>
            </div>
            
            {/* Tabs */}
            <div className="flex space-x-1 bg-slate-100 rounded-xl p-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-1.5 sm:py-2 px-2 sm:px-3 text-xs sm:text-sm font-medium rounded-xl transition-all duration-200 ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Analysis Content */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-3 sm:py-4">
            {activeTab === 'Summary' && (
              <div className="space-y-4 sm:space-y-6">
                {/* Case Summary */}
                {caseSummary && (
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2 sm:mb-3 flex items-center text-xs sm:text-sm md:text-base">
                      <FileText className="h-3 sm:h-4 md:h-5 w-3 sm:w-4 md:w-5 mr-2 text-blue-600" />
                      Case Summary
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {caseSummary.summary}
                    </p>
                    {caseSummary.confidence && (
                      <div className="mt-2 text-xs text-slate-500">
                        Confidence: {Math.round(caseSummary.confidence * 100)}%
                      </div>
                    )}
                  </div>
                )}

                {/* Legal Grounds */}
                {legalGrounds.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2 sm:mb-3 flex items-center text-xs sm:text-sm md:text-base">
                      <Scale className="h-3 sm:h-4 md:h-5 w-3 sm:w-4 md:w-5 mr-2 text-purple-600" />
                      Legal Grounds
                    </h4>
                    <ul className="space-y-2">
                      {legalGrounds.map((ground) => (
                        <li key={ground.id} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                          <span>{ground.ground}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Citations Detected */}
                {citations.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2 sm:mb-3 flex items-center text-xs sm:text-sm md:text-base">
                      <AlertTriangle className="h-3 sm:h-4 md:h-5 w-3 sm:w-4 md:w-5 mr-2 text-orange-600" />
                      Citations Detected
                    </h4>
                    <div className="space-y-2 sm:space-y-3">
                      {citations.map((citation) => (
                        <div key={citation.id} className="bg-orange-50 border border-orange-200 rounded-lg p-2 sm:p-3">
                          <div className="flex items-start space-x-2">
                            <div className="text-orange-600 font-medium text-xs">
                              📍 Page {citation.page}, Para {citation.para}:
                            </div>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-700 mt-1">"{citation.text}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'Key Issues' && (
              <div className="space-y-3 sm:space-y-4">
                <h4 className="font-semibold text-slate-800 mb-3 sm:mb-4 text-xs sm:text-sm md:text-base">Identified Legal Issues</h4>
                
                {keyIssues.length > 0 ? (
                  <div className="space-y-3 sm:space-y-4">
                    {keyIssues.map((issue) => (
                      <div key={issue.id} className={`border-l-4 p-3 sm:p-4 rounded-r-xl ${getSeverityColor(issue.severity)}`}>
                        <h5 className={`font-semibold mb-1 text-xs sm:text-sm md:text-base ${getSeverityTextColor(issue.severity)}`}>
                          {issue.title}
                        </h5>
                        <p className={`text-xs sm:text-sm ${getSeverityDescColor(issue.severity)}`}>
                          {issue.description}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-slate-500 py-6 sm:py-8">
                    <AlertTriangle className="h-6 sm:h-8 w-6 sm:w-8 mx-auto mb-2 text-slate-400" />
                    <p className="text-xs sm:text-sm">No key issues identified yet</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'Timeline' && (
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-600">
                  <Clock className="h-4 w-4" />
                  <span>Case timeline analysis coming soon...</span>
                </div>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-6 sm:py-8">
                <div className="flex items-center space-x-2 text-slate-600">
                  <Loader2 className="h-4 sm:h-5 w-4 sm:w-5 animate-spin" />
                  <span className="text-xs sm:text-sm">Analyzing document...</span>
                </div>
              </div>
            )}
          </div>

          {/* Generate Insights Button */}
          <div className="px-4 sm:px-5 py-3 sm:py-4 border-t border-slate-200 bg-white rounded-b-2xl">
            <button 
              onClick={generateAIInsights}
              disabled={isGeneratingInsights || !documentData}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2 text-xs sm:text-sm md:text-base"
            >
              {isGeneratingInsights ? (
                <>
                  <Loader2 className="h-3 sm:h-4 w-3 sm:w-4 animate-spin" />
                  <span>Generating Insights...</span>
                </>
              ) : (
                <>
                  <span>🤖</span>
                  <span>Generate AI Insights</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;