// // import React, { useState, useEffect } from 'react';
// // import {
// //   Search,
// //   Send,
// //   FileText,
// //   Edit3,
// //   Layers,
// //   Minus,
// //   Plus,
// //   Trash2,
// //   RotateCcw,
// //   ArrowRight,
// //   ChevronRight,
// //   AlertTriangle,
// //   Clock,
// //   Scale,
// //   Loader2,
// //   Upload,
// //   Eye,
// //   Download,
// //   Menu,
// //   X
// // } from 'lucide-react';

// // const AnalysisPage = () => {
// //   // State Management
// //   const [activeTab, setActiveTab] = useState('Summary');
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);
// //   const [showDocumentCanvas, setShowDocumentCanvas] = useState(true); // State to toggle between document and analysis on mobile
  
// //   // Document and Analysis Data
// //   const [documentData, setDocumentData] = useState(null);
// //   const [analysisResults, setAnalysisResults] = useState(null);
// //   const [caseSummary, setCaseSummary] = useState(null);
// //   const [legalGrounds, setLegalGrounds] = useState([]);
// //   const [citations, setCitations] = useState([]);
// //   const [keyIssues, setKeyIssues] = useState([]);
// //   const [timeline, setTimeline] = useState([]);

// //   // API Configuration
// //   const API_BASE_URL = 'http://localhost:3001/api';
  
// //   // Mock data (replace with API calls)
// //   const mockDocumentData = {
// //     id: 'case_001',
// //     title: 'Sharma v. State Maharashtra',
// //     court: 'HIGH COURT OF BOMBAY',
// //     jurisdiction: 'CIVIL APPELLATE JURISDICTION',
// //     caseNumber: 'Civil Appeal No. 1234 of 2024',
// //     parties: {
// //       appellant: {
// //         name: 'RAJESH SHARMA',
// //         details: 'S/o Late Ramesh Sharma\nAge: 45 years, Occ: Business\nR/o: 123, MG Road, Mumbai - 400001'
// //       }
// //     },
// //     status: 'active',
// //     uploadedAt: new Date().toISOString()
// //   };

// //   const mockAnalysisData = {
// //     caseSummary: {
// //       summary: 'This civil appeal challenges land acquisition proceedings under the RFCTLARR Act, 2013 for Mumbai Metro Line 3. The appellant contests the acquisition of his property at MG Road, Mumbai.',
// //       confidence: 0.95
// //     },
// //     legalGrounds: [
// //       { id: 1, ground: 'Inadequate compensation determination', relevance: 'high' },
// //       { id: 2, ground: 'Procedural irregularities in notification', relevance: 'medium' },
// //       { id: 3, ground: 'Violation of natural justice principles', relevance: 'high' }
// //     ],
// //     citations: [
// //       { id: 1, page: 1, para: 3, text: 'Challenge to land acquisition proceedings', type: 'issue' },
// //       { id: 2, page: 1, para: 4, text: 'RFCTLARR Act, 2013', type: 'statute' }
// //     ],
// //     keyIssues: [
// //       { 
// //         id: 1, 
// //         title: 'Compensation Adequacy', 
// //         description: 'Market value assessment appears contested', 
// //         severity: 'high',
// //         color: 'red' 
// //       },
// //       { 
// //         id: 2, 
// //         title: 'Procedural Compliance', 
// //         description: 'Notification process timeline needs review', 
// //         severity: 'medium',
// //         color: 'orange' 
// //       },
// //       { 
// //         id: 3, 
// //         title: 'Public Purpose', 
// //         description: 'Metro project justification established', 
// //         severity: 'low',
// //         color: 'blue' 
// //       }
// //     ]
// //   };

// //   // API Functions
// //   const fetchDocumentData = async (documentId) => {
// //     try {
// //       setIsLoading(true);
// //       // Replace with actual API call
// //       // const response = await fetch(`${API_BASE_URL}/documents/${documentId}`);
// //       // const data = await response.json();
      
// //       // Mock API delay
// //       await new Promise(resolve => setTimeout(resolve, 1000));
// //       setDocumentData(mockDocumentData);
// //     } catch (error) {
// //       console.error('Error fetching document:', error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const fetchAnalysisResults = async (documentId) => {
// //     try {
// //       setIsLoading(true);
// //       // Replace with actual API call
// //       // const response = await fetch(`${API_BASE_URL}/analysis/${documentId}`);
// //       // const data = await response.json();
      
// //       // Mock API delay
// //       await new Promise(resolve => setTimeout(resolve, 1500));
// //       const data = mockAnalysisData;
      
// //       setAnalysisResults(data);
// //       setCaseSummary(data.caseSummary);
// //       setLegalGrounds(data.legalGrounds);
// //       setCitations(data.citations);
// //       setKeyIssues(data.keyIssues);
// //     } catch (error) {
// //       console.error('Error fetching analysis:', error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const generateAIInsights = async () => {
// //     try {
// //       setIsGeneratingInsights(true);
// //       // Replace with actual API call
// //       // const response = await fetch(`${API_BASE_URL}/insights/generate`, {
// //       //   method: 'POST',
// //       //   headers: { 'Content-Type': 'application/json' },
// //       //   body: JSON.stringify({ documentId: documentData?.id, query: searchQuery })
// //       // });
      
// //       // Mock API delay
// //       await new Promise(resolve => setTimeout(resolve, 2000));
      
// //       // Refresh analysis results
// //       await fetchAnalysisResults(documentData?.id);
// //     } catch (error) {
// //       console.error('Error generating insights:', error);
// //     } finally {
// //       setIsGeneratingInsights(false);
// //     }
// //   };

// //   const handleSearch = async (e) => {
// //     e.preventDefault();
// //     if (!searchQuery.trim()) return;
    
// //     try {
// //       setIsLoading(true);
// //       // Replace with actual API call
// //       // const response = await fetch(`${API_BASE_URL}/search`, {
// //       //   method: 'POST',
// //       //   headers: { 'Content-Type': 'application/json' },
// //       //   body: JSON.stringify({ query: searchQuery, documentId: documentData?.id })
// //       // });
      
// //       console.log('Searching for:', searchQuery);
// //       // Mock search delay
// //       await new Promise(resolve => setTimeout(resolve, 1000));
// //     } catch (error) {
// //       console.error('Search error:', error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   // Load initial data
// //   useEffect(() => {
// //     fetchDocumentData('case_001');
// //     fetchAnalysisResults('case_001');
// //   }, []);

// //   const tabs = ['Summary', 'Key Issues', 'Timeline'];

// //   const toolbarItems = [
// //     { icon: Edit3, label: 'Edit', color: 'text-blue-600', action: () => console.log('Edit clicked') },
// //     { icon: Layers, label: 'Layer', color: 'text-slate-600', action: () => console.log('Layer clicked') },
// //     { icon: Minus, label: 'Remove', color: 'text-slate-600', action: () => console.log('Remove clicked') },
// //     { icon: Plus, label: 'Add', color: 'text-slate-600', action: () => console.log('Add clicked') },
// //     { icon: RotateCcw, label: 'Refresh', color: 'text-slate-600', action: () => fetchAnalysisResults(documentData?.id) },
// //     { icon: ArrowRight, label: 'Next', color: 'text-slate-600', action: () => console.log('Next clicked') },
// //     { icon: Trash2, label: 'Delete', color: 'text-red-600', action: () => console.log('Delete clicked') }
// //   ];

// //   const getSeverityColor = (severity) => {
// //     switch (severity) {
// //       case 'high': return 'border-red-500 bg-red-50';
// //       case 'medium': return 'border-orange-500 bg-orange-50';
// //       case 'low': return 'border-blue-500 bg-blue-50';
// //       default: return 'border-gray-500 bg-gray-50';
// //     }
// //   };

// //   const getSeverityTextColor = (severity) => {
// //     switch (severity) {
// //       case 'high': return 'text-red-800';
// //       case 'medium': return 'text-orange-800';
// //       case 'low': return 'text-blue-800';
// //       default: return 'text-gray-800';
// //     }
// //   };

// //   const getSeverityDescColor = (severity) => {
// //     switch (severity) {
// //       case 'high': return 'text-red-700';
// //       case 'medium': return 'text-orange-700';
// //       case 'low': return 'text-blue-700';
// //       default: return 'text-gray-700';
// //     }
// //   };

// //   if (isLoading && !documentData) {
// //     return (
// //       <div className="flex min-h-screen bg-slate-50 items-center justify-center">
// //         <div className="flex items-center space-x-2 text-slate-600">
// //           <Loader2 className="h-6 w-6 animate-spin" />
// //           <span>Loading document analysis...</span>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="flex flex-col lg:flex-row h-screen bg-slate-50 p-2 sm:p-4 overflow-hidden">
// //       <div className="flex flex-1 flex-col lg:flex-row gap-3 lg:gap-4 max-w-7xl mx-auto h-full">
// //         {/* Left Panel - Document Canvas */}
// //         <div className={`flex-1 flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-full w-full lg:w-auto ${!showDocumentCanvas ? 'hidden' : 'flex'} lg:flex`}>
// //           {/* Document Header with rounded top corners */}
// //           <div className="flex items-center justify-between p-3 sm:p-4 border-b border-slate-200 bg-white rounded-t-2xl">
// //             <div className="flex items-center space-x-2 sm:space-x-4">
// //               <h2 className="text-base sm:text-lg font-semibold text-slate-800">Document Analysis Canvas</h2>
// //               {documentData && (
// //                 <div className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
// //                   {documentData.title}
// //                 </div>
// //               )}
// //               {isLoading && (
// //                 <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
// //               )}
// //             </div>
            
// //             {/* Toolbar */}
// //             <div className="hidden md:flex items-center space-x-2 bg-slate-100 rounded-xl p-1">
// //               {toolbarItems.map((item, index) => (
// //                 <button
// //                   key={index}
// //                   onClick={item.action}
// //                   className={`p-2 rounded-md hover:bg-white transition-all duration-200 ${item.color} hover:shadow-sm`}
// //                   title={item.label}
// //                   disabled={isLoading}
// //                 >
// //                   <item.icon className="h-4 w-4" />
// //                 </button>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Document Content Area */}
// //           <div className="flex-1 px-3 sm:px-6 py-4 overflow-y-auto bg-slate-50 h-full">
// //             <div className="bg-white rounded-xl shadow-sm border border-slate-200 px-4 sm:px-6 md:px-12 py-6 sm:py-8 min-h-full">
// //               {documentData ? (
// //                 <>
// //                   {/* Document Header */}
// //                   <div className="text-center mb-6 sm:mb-10">
// //                     <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 mb-2 sm:mb-3">{documentData.court}</h1>
// //                     <h2 className="text-base sm:text-lg md:text-xl font-semibold text-slate-700 mb-4 sm:mb-6">{documentData.jurisdiction}</h2>
// //                     <p className="text-slate-600 text-sm sm:text-base md:text-lg">{documentData.caseNumber}</p>
// //                   </div>

// //                   <hr className="border-slate-400 mb-6 sm:mb-8" />

// //                   {/* Case Details */}
// //                   <div className="mb-6 sm:mb-10">
// //                     <h3 className="text-sm sm:text-base md:text-lg font-semibold text-slate-800 mb-4 sm:mb-6">BETWEEN:</h3>
                    
// //                     <div className="mb-6 sm:mb-8">
// //                       <h4 className="font-bold text-slate-800 mb-2 sm:mb-3 text-sm sm:text-base md:text-lg">{documentData.parties.appellant.name}</h4>
// //                       <div className="text-slate-600 mb-4 sm:mb-6 text-xs sm:text-sm md:text-base whitespace-pre-line">
// //                         {documentData.parties.appellant.details}
// //                       </div>
// //                       <p className="text-right text-slate-600 italic text-xs sm:text-sm md:text-base">... Appellant</p>
// //                     </div>

// //                     <div className="text-center mb-6 sm:mb-8">
// //                       <h4 className="text-sm sm:text-base md:text-lg font-semibold text-slate-800">VERSUS</h4>
// //                     </div>

// //                     {/* Annotation Tools */}
// //                     <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6 text-xs sm:text-sm md:text-base">
// //                       <span className="text-slate-600 font-medium">Color:</span>
// //                       <div className="w-4 sm:w-5 h-4 sm:h-5 bg-red-500 rounded border border-slate-300"></div>
// //                       <span className="text-slate-600 font-medium">Size:</span>
// //                       <input 
// //                         type="range" 
// //                         min="1" 
// //                         max="5" 
// //                         defaultValue="3" 
// //                         className="w-12 sm:w-16 md:w-20 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
// //                       />
// //                       <span className="text-slate-600 text-xs">3px</span>
// //                       <span className="text-slate-600 font-medium">Opacity:</span>
// //                       <input 
// //                         type="range" 
// //                         min="0" 
// //                         max="100" 
// //                         defaultValue="100" 
// //                         className="w-12 sm:w-16 md:w-20 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
// //                       />
// //                       <span className="text-slate-600 text-xs">100%</span>
// //                     </div>
// //                   </div>
// //                 </>
// //               ) : (
// //                 <div className="flex items-center justify-center h-32 sm:h-64 text-slate-500">
// //                   <div className="text-center">
// //                     <FileText className="h-8 sm:h-12 w-8 sm:w-12 mx-auto mb-4 text-slate-400" />
// //                     <p className="text-sm sm:text-base">No document loaded</p>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Static Search Bar */}
// //           <div className="px-3 sm:px-6 py-3 sm:py-4 bg-white border-t border-slate-200 rounded-b-2xl">
// //             <div className="relative">
// //               <div className="flex items-center space-x-2 sm:space-x-3 bg-slate-50 rounded-2xl border border-slate-200 p-3 sm:p-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200">
// //                 <Search className="h-4 sm:h-5 w-4 sm:w-5 text-slate-400 flex-shrink-0" />
// //                 <input
// //                   type="text"
// //                   value={searchQuery}
// //                   onChange={(e) => setSearchQuery(e.target.value)}
// //                   onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
// //                   placeholder="Ask questions about the document or request analysis..."
// //                   className="flex-1 bg-transparent border-none outline-none text-slate-700 placeholder-slate-400 text-xs sm:text-sm md:text-base"
// //                   disabled={isLoading}
// //                 />
// //                 <button 
// //                   onClick={handleSearch}
// //                   disabled={isLoading || !searchQuery.trim()}
// //                   className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white p-2 sm:p-2.5 rounded-xl transition-colors duration-200 flex-shrink-0"
// //                 >
// //                   {isLoading ? (
// //                     <Loader2 className="h-3 sm:h-4 w-3 sm:w-4 animate-spin" />
// //                   ) : (
// //                     <Send className="h-3 sm:h-4 w-3 sm:w-4" />
// //                   )}
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //           {/* Mobile Toggle Button for Analysis Results */}
// //           <div className="lg:hidden px-3 sm:px-6 py-3 sm:py-4 bg-white border-t border-slate-200 rounded-b-2xl">
// //             <button
// //               onClick={() => setShowDocumentCanvas(false)}
// //               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2 text-xs sm:text-sm md:text-base"
// //             >
// //               <span>Show AI Analysis Results</span>
// //               <ChevronRight className="h-4 w-4" />
// //             </button>
// //           </div>
// //         </div>

// //         {/* Right Panel - AI Analysis Results */}
// //         <div className={`flex w-full sm:w-80 lg:w-96 flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-full lg:flex mt-4 lg:mt-0 ${showDocumentCanvas ? 'hidden' : 'flex'} lg:flex`}>
// //           {/* Analysis Header with rounded top corners */}
// //           <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-slate-200 bg-white rounded-t-2xl">
// //             <div className="flex items-center justify-between mb-3 sm:mb-4">
// //               <h3 className="text-base sm:text-lg font-semibold text-slate-800">AI Analysis Results</h3>
// //             </div>
// //             {/* Mobile Toggle Button for Document Canvas */}
// //             <div className="lg:hidden mb-3 sm:mb-4">
// //               <button
// //                 onClick={() => setShowDocumentCanvas(true)}
// //                 className="w-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2 text-xs sm:text-sm md:text-base"
// //               >
// //                 <ChevronLeft className="h-4 w-4" />
// //                 <span>Show Document Canvas</span>
// //               </button>
// //             </div>
            
// //             {/* Tabs */}
// //             <div className="flex space-x-1 bg-slate-100 rounded-xl p-1">
// //               {tabs.map((tab) => (
// //                 <button
// //                   key={tab}
// //                   onClick={() => setActiveTab(tab)}
// //                   className={`flex-1 py-1.5 sm:py-2 px-2 sm:px-3 text-xs sm:text-sm font-medium rounded-xl transition-all duration-200 ${
// //                     activeTab === tab
// //                       ? 'bg-blue-600 text-white shadow-sm'
// //                       : 'text-slate-600 hover:text-slate-800 hover:bg-slate-200'
// //                   }`}
// //                 >
// //                   {tab}
// //                 </button>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Analysis Content */}
// //           <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-3 sm:py-4">
// //             {activeTab === 'Summary' && (
// //               <div className="space-y-4 sm:space-y-6">
// //                 {/* Case Summary */}
// //                 {caseSummary && (
// //                   <div>
// //                     <h4 className="font-semibold text-slate-800 mb-2 sm:mb-3 flex items-center text-xs sm:text-sm md:text-base">
// //                       <FileText className="h-3 sm:h-4 md:h-5 w-3 sm:w-4 md:w-5 mr-2 text-blue-600" />
// //                       Case Summary
// //                     </h4>
// //                     <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
// //                       {caseSummary.summary}
// //                     </p>
// //                     {caseSummary.confidence && (
// //                       <div className="mt-2 text-xs text-slate-500">
// //                         Confidence: {Math.round(caseSummary.confidence * 100)}%
// //                       </div>
// //                     )}
// //                   </div>
// //                 )}

// //                 {/* Legal Grounds */}
// //                 {legalGrounds.length > 0 && (
// //                   <div>
// //                     <h4 className="font-semibold text-slate-800 mb-2 sm:mb-3 flex items-center text-xs sm:text-sm md:text-base">
// //                       <Scale className="h-3 sm:h-4 md:h-5 w-3 sm:w-4 md:w-5 mr-2 text-purple-600" />
// //                       Legal Grounds
// //                     </h4>
// //                     <ul className="space-y-2">
// //                       {legalGrounds.map((ground) => (
// //                         <li key={ground.id} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-600">
// //                           <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
// //                           <span>{ground.ground}</span>
// //                         </li>
// //                       ))}
// //                     </ul>
// //                   </div>
// //                 )}

// //                 {/* Citations Detected */}
// //                 {citations.length > 0 && (
// //                   <div>
// //                     <h4 className="font-semibold text-slate-800 mb-2 sm:mb-3 flex items-center text-xs sm:text-sm md:text-base">
// //                       <AlertTriangle className="h-3 sm:h-4 md:h-5 w-3 sm:w-4 md:w-5 mr-2 text-orange-600" />
// //                       Citations Detected
// //                     </h4>
// //                     <div className="space-y-2 sm:space-y-3">
// //                       {citations.map((citation) => (
// //                         <div key={citation.id} className="bg-orange-50 border border-orange-200 rounded-lg p-2 sm:p-3">
// //                           <div className="flex items-start space-x-2">
// //                             <div className="text-orange-600 font-medium text-xs">
// //                               📍 Page {citation.page}, Para {citation.para}:
// //                             </div>
// //                           </div>
// //                           <p className="text-xs sm:text-sm text-slate-700 mt-1">"{citation.text}"</p>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             )}

// //             {activeTab === 'Key Issues' && (
// //               <div className="space-y-3 sm:space-y-4">
// //                 <h4 className="font-semibold text-slate-800 mb-3 sm:mb-4 text-xs sm:text-sm md:text-base">Identified Legal Issues</h4>
                
// //                 {keyIssues.length > 0 ? (
// //                   <div className="space-y-3 sm:space-y-4">
// //                     {keyIssues.map((issue) => (
// //                       <div key={issue.id} className={`border-l-4 p-3 sm:p-4 rounded-r-xl ${getSeverityColor(issue.severity)}`}>
// //                         <h5 className={`font-semibold mb-1 text-xs sm:text-sm md:text-base ${getSeverityTextColor(issue.severity)}`}>
// //                           {issue.title}
// //                         </h5>
// //                         <p className={`text-xs sm:text-sm ${getSeverityDescColor(issue.severity)}`}>
// //                           {issue.description}
// //                         </p>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 ) : (
// //                   <div className="text-center text-slate-500 py-6 sm:py-8">
// //                     <AlertTriangle className="h-6 sm:h-8 w-6 sm:w-8 mx-auto mb-2 text-slate-400" />
// //                     <p className="text-xs sm:text-sm">No key issues identified yet</p>
// //                   </div>
// //                 )}
// //               </div>
// //             )}

// //             {activeTab === 'Timeline' && (
// //               <div className="space-y-3 sm:space-y-4">
// //                 <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-600">
// //                   <Clock className="h-4 w-4" />
// //                   <span>Case timeline analysis coming soon...</span>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Loading State */}
// //             {isLoading && (
// //               <div className="flex items-center justify-center py-6 sm:py-8">
// //                 <div className="flex items-center space-x-2 text-slate-600">
// //                   <Loader2 className="h-4 sm:h-5 w-4 sm:w-5 animate-spin" />
// //                   <span className="text-xs sm:text-sm">Analyzing document...</span>
// //                 </div>
// //               </div>
// //             )}
// //           </div>

// //           {/* Generate Insights Button */}
// //           <div className="px-4 sm:px-5 py-3 sm:py-4 border-t border-slate-200 bg-white rounded-b-2xl">
// //             <button 
// //               onClick={generateAIInsights}
// //               disabled={isGeneratingInsights || !documentData}
// //               className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2 text-xs sm:text-sm md:text-base"
// //             >
// //               {isGeneratingInsights ? (
// //                 <>
// //                   <Loader2 className="h-3 sm:h-4 w-3 sm:w-4 animate-spin" />
// //                   <span>Generating Insights...</span>
// //                 </>
// //               ) : (
// //                 <>
// //                   <span>🤖</span>
// //                   <span>Generate AI Insights</span>
// //                 </>
// //               )}
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AnalysisPage;

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
//   ChevronLeft,
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
//   const [showDocumentCanvas, setShowDocumentCanvas] = useState(true);
  
//   // Document and Analysis Data
//   const [documentData, setDocumentData] = useState(null);
//   const [analysisResults, setAnalysisResults] = useState(null);
//   const [caseSummary, setCaseSummary] = useState(null);
//   const [legalGrounds, setLegalGrounds] = useState([]);
//   const [citations, setCitations] = useState([]);
//   const [keyIssues, setKeyIssues] = useState([]);
//   const [timeline, setTimeline] = useState([]);

//   // Mock data
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
//       await new Promise(resolve => setTimeout(resolve, 2000));
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
//       console.log('Searching for:', searchQuery);
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
//           {/* Document Header */}
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

//           {/* Search Bar */}
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

//           {/* Mobile Toggle Button */}
//           <div className="lg:hidden px-3 sm:px-6 py-3 sm:py-4 bg-white border-t border-slate-200">
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
//           {/* Analysis Header */}
//           <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-slate-200 bg-white rounded-t-2xl">
//             <div className="flex items-center justify-between mb-3 sm:mb-4">
//               <h3 className="text-base sm:text-lg font-semibold text-slate-800">AI Analysis Results</h3>
//             </div>

//             {/* Mobile Toggle Button */}
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
//   ChevronLeft,
//   AlertTriangle,
//   Clock,
//   Scale,
//   Loader2,
//   Upload,
//   Download,
//   AlertCircle,
//   CheckCircle,
//   X,
//   Save,
//   Eye
// } from 'lucide-react';

// const AnalysisPage = () => {
//   // State Management
//   const [activeTab, setActiveTab] = useState('Summary');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [showDocumentCanvas, setShowDocumentCanvas] = useState(true);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [editedContent, setEditedContent] = useState('');
  
//   // Document and Analysis Data
//   const [documentData, setDocumentData] = useState(null);
//   const [analysisResults, setAnalysisResults] = useState(null);
//   const [caseSummary, setCaseSummary] = useState(null);
//   const [legalGrounds, setLegalGrounds] = useState([]);
//   const [citations, setCitations] = useState([]);
//   const [keyIssues, setKeyIssues] = useState([]);
//   const [chatHistory, setChatHistory] = useState([]);
//   const [documentId, setDocumentId] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   // API Configuration
//   const API_BASE_URL = 'http://localhost:3000/api';
  
//   // Get auth token (implement based on your auth system)
//   const getAuthToken = () => {
//     // Try different possible token keys
//     const token = localStorage.getItem('authToken') || 
//                   localStorage.getItem('token') || 
//                   localStorage.getItem('accessToken') ||
//                   localStorage.getItem('jwt') ||
//                   sessionStorage.getItem('authToken') ||
//                   sessionStorage.getItem('token');
    
//     console.log('Retrieved token:', token ? 'Token found' : 'No token found');
//     return token;
//   };

//   // API request helper with comprehensive error handling
//   const apiRequest = async (url, options = {}) => {
//     try {
//       const token = getAuthToken();
//       const defaultHeaders = {
//         'Authorization': token ? `Bearer ${token}` : '',
//         'Content-Type': 'application/json',
//       };

//       // Don't set Content-Type for FormData
//       const headers = options.body instanceof FormData 
//         ? { 'Authorization': token ? `Bearer ${token}` : '' }
//         : { ...defaultHeaders, ...options.headers };

//       const response = await fetch(`${API_BASE_URL}${url}`, {
//         ...options,
//         headers,
//       });

//       if (!response.ok) {
//         let errorData;
//         try {
//           errorData = await response.json();
//         } catch {
//           errorData = { error: `HTTP error! status: ${response.status}` };
//         }
        
//         if (response.status === 401) {
//           throw new Error('Authentication required. Please log in.');
//         } else if (response.status === 403) {
//           throw new Error('Access denied. You don\'t have permission to perform this action.');
//         } else if (response.status === 404) {
//           throw new Error('Resource not found.');
//         } else if (response.status >= 500) {
//           throw new Error('Server error. Please try again later.');
//         }
        
//         throw new Error(errorData.error || errorData.message || `Request failed with status ${response.status}`);
//       }

//       const contentType = response.headers.get('content-type');
//       if (contentType && contentType.includes('application/json')) {
//         return await response.json();
//       }
//       return response;
//     } catch (error) {
//       console.error('API request failed:', error);
//       throw error;
//     }
//   };

//   // File upload API call with progress tracking
//   const uploadDocument = async (file) => {
//     try {
//       setIsUploading(true);
//       setError(null);
//       setUploadProgress(0);
      
//       const formData = new FormData();
//       // Try different field names that your backend might expect
//       formData.append('file', file);  // Most common
//       // formData.append('document', file);  // Alternative
//       // formData.append('upload', file);    // Alternative

//       // Create XMLHttpRequest for progress tracking
//       return new Promise((resolve, reject) => {
//         const xhr = new XMLHttpRequest();
        
//         xhr.upload.onprogress = (event) => {
//           if (event.lengthComputable) {
//             const progress = Math.round((event.loaded / event.total) * 100);
//             setUploadProgress(progress);
//           }
//         };

//         xhr.onload = () => {
//           console.log('Upload response status:', xhr.status);
//           console.log('Upload response:', xhr.responseText);
          
//           if (xhr.status >= 200 && xhr.status < 300) {
//             try {
//               const data = JSON.parse(xhr.responseText);
//               setDocumentId(data.document_id);
//               setDocumentData({
//                 id: data.document_id,
//                 title: file.name,
//                 content: data.html_content || '',
//                 downloadUrl: data.docx_download_url,
//                 originalName: file.name,
//                 size: file.size,
//                 type: file.type,
//                 uploadedAt: new Date().toISOString()
//               });
//               setEditedContent(data.html_content || '');
//               setSuccess('Document uploaded successfully!');
//               resolve(data);
//             } catch (error) {
//               console.error('Failed to parse server response:', error);
//               reject(new Error('Failed to parse server response'));
//             }
//           } else {
//             try {
//               const errorData = JSON.parse(xhr.responseText);
//               console.error('Upload error response:', errorData);
//               reject(new Error(errorData.error || errorData.message || `Upload failed with status ${xhr.status}`));
//             } catch {
//               reject(new Error(`Upload failed with status ${xhr.status}. Please check your authentication token.`));
//             }
//           }
//         };

//         xhr.onerror = () => {
//           console.error('Network error during upload');
//           reject(new Error('Network error occurred during upload'));
//         };

//         xhr.ontimeout = () => {
//           console.error('Upload timeout');
//           reject(new Error('Upload timeout. Please try again.'));
//         };

//         const token = getAuthToken();
//         console.log('Using API endpoint:', `${API_BASE_URL}/doc/upload`);
//         console.log('Token available:', !!token);
//         console.log('Form data field name: file');
        
//         xhr.open('POST', `${API_BASE_URL}/doc/upload`);
        
//         if (token) {
//           // Try different authorization header formats
//           xhr.setRequestHeader('Authorization', `Bearer ${token}`);
//           // Some APIs might expect just the token
//           xhr.setRequestHeader('x-auth-token', token);
//         } else {
//           console.warn('No authentication token found!');
//         }
        
//         xhr.timeout = 300000; // 5 minute timeout
//         xhr.send(formData);
//       });
//     } catch (error) {
//       console.error('Upload error:', error);
//       setError(`Upload failed: ${error.message}`);
//       throw error;
//     } finally {
//       setIsUploading(false);
//       setUploadProgress(0);
//     }
//   };

//   // Analyze document API call
//   const analyzeDocument = async (docId) => {
//     try {
//       setIsGeneratingInsights(true);
//       setError(null);

//       const data = await apiRequest('/doc/analyze', {
//         method: 'POST',
//         body: JSON.stringify({ document_id: docId }),
//       });

//       // Process the AI analysis response
//       setAnalysisResults(data);
      
//       // Extract different components from the analysis
//       if (data.summary) {
//         setCaseSummary({
//           summary: data.summary,
//           confidence: data.confidence || 0.9
//         });
//       }

//       if (data.legal_grounds) {
//         setLegalGrounds(Array.isArray(data.legal_grounds) 
//           ? data.legal_grounds.map((ground, index) => ({
//               id: index + 1,
//               ground: typeof ground === 'string' ? ground : ground.ground || ground.text,
//               relevance: ground.relevance || 'medium'
//             }))
//           : []
//         );
//       }

//       if (data.key_issues) {
//         setKeyIssues(Array.isArray(data.key_issues) 
//           ? data.key_issues.map((issue, index) => ({
//               id: index + 1,
//               title: issue.title || issue.issue || issue,
//               description: issue.description || 'Analysis pending',
//               severity: issue.severity || issue.priority || 'medium',
//               color: issue.color || getSeverityColor(issue.severity || 'medium')
//             }))
//           : []
//         );
//       }

//       if (data.citations) {
//         setCitations(Array.isArray(data.citations) 
//           ? data.citations.map((citation, index) => ({
//               id: index + 1,
//               page: citation.page || 1,
//               para: citation.paragraph || citation.para || index + 1,
//               text: citation.text || citation.citation || citation,
//               type: citation.type || 'general'
//             }))
//           : []
//         );
//       }

//       setSuccess('Document analysis completed successfully!');
//       return data;
//     } catch (error) {
//       setError(`Analysis failed: ${error.message}`);
//       throw error;
//     } finally {
//       setIsGeneratingInsights(false);
//     }
//   };

//   // Chat with document API call
//   const chatWithDocument = async (docId, question) => {
//     try {
//       setIsLoading(true);
//       setError(null);

//       const data = await apiRequest('/doc/chat', {
//         method: 'POST',
//         body: JSON.stringify({ 
//           document_id: docId, 
//           question: question 
//         }),
//       });

//       // Add to chat history
//       const newChat = {
//         id: Date.now(),
//         question: question,
//         answer: data.answer,
//         timestamp: new Date().toISOString()
//       };

//       setChatHistory(prev => [...prev, newChat]);
//       setSearchQuery(''); // Clear search input
//       setSuccess('Question answered successfully!');
//       return data;
//     } catch (error) {
//       setError(`Chat failed: ${error.message}`);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Save edited document API call
//   const saveEditedDocument = async (docId, editedHtml) => {
//     try {
//       setIsSaving(true);
//       setError(null);

//       const data = await apiRequest('/doc/save', {
//         method: 'POST',
//         body: JSON.stringify({ 
//           document_id: docId, 
//           edited_html: editedHtml 
//         }),
//       });

//       // Update document data with new download URLs
//       setDocumentData(prev => ({
//         ...prev,
//         docxUrl: data.docx_download_url,
//         pdfUrl: data.pdf_download_url,
//         lastEdited: new Date().toISOString()
//       }));

//       setSuccess('Document saved successfully!');
//       setEditMode(false);
//       return data;
//     } catch (error) {
//       setError(`Save failed: ${error.message}`);
//       throw error;
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   // Download document API call
//   const downloadDocument = async (docId, format = 'docx') => {
//     try {
//       setError(null);
//       const token = getAuthToken();
      
//       // Create a temporary link for download
//       const link = document.createElement('a');
//       link.href = `${API_BASE_URL}/doc/download/${docId}/${format}`;
//       if (token) {
//         // For authenticated downloads, we might need to handle this differently
//         // depending on your backend implementation
//         window.open(link.href, '_blank');
//       } else {
//         link.click();
//       }
      
//       setSuccess(`${format.toUpperCase()} download started!`);
//     } catch (error) {
//       setError(`Download failed: ${error.message}`);
//     }
//   };

//   // Get chat history API call
//   const getChatHistory = async (docId) => {
//     try {
//       const data = await apiRequest(`/doc/chat-history/${docId}`);
//       setChatHistory(Array.isArray(data) ? data : []);
//       return data;
//     } catch (error) {
//       setError(`Failed to load chat history: ${error.message}`);
//       throw error;
//     }
//   };

//   // Delete document API call (if you want to add this functionality)
//   const deleteDocument = async (docId) => {
//     try {
//       setIsLoading(true);
//       setError(null);

//       await apiRequest(`/doc/${docId}`, {
//         method: 'DELETE',
//       });

//       // Reset all states
//       setDocumentData(null);
//       setDocumentId(null);
//       setAnalysisResults(null);
//       setCaseSummary(null);
//       setLegalGrounds([]);
//       setCitations([]);
//       setKeyIssues([]);
//       setChatHistory([]);
//       setEditedContent('');
      
//       setSuccess('Document deleted successfully!');
//     } catch (error) {
//       setError(`Delete failed: ${error.message}`);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle file upload
//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     // Validate file type
//     const allowedTypes = [
//       'application/pdf',
//       'application/msword',
//       'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//       'text/plain'
//     ];

//     if (!allowedTypes.includes(file.type)) {
//       setError('Please upload a valid document (PDF, DOC, DOCX, or TXT)');
//       return;
//     }

//     // Validate file size (10MB limit)
//     if (file.size > 10 * 1024 * 1024) {
//       setError('File size must be less than 10MB');
//       return;
//     }

//     try {
//       await uploadDocument(file);
//     } catch (error) {
//       // Error already handled in uploadDocument
//     }

//     // Clear the input
//     event.target.value = '';
//   };

//   // Handle search/chat
//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (!searchQuery.trim() || !documentId) return;
    
//     try {
//       await chatWithDocument(documentId, searchQuery);
//     } catch (error) {
//       // Error already handled in chatWithDocument
//     }
//   };

//   // Generate AI insights
//   const generateAIInsights = async () => {
//     if (!documentId) {
//       setError('Please upload a document first');
//       return;
//     }

//     try {
//       await analyzeDocument(documentId);
//     } catch (error) {
//       // Error already handled in analyzeDocument
//     }
//   };

//   // Handle edit mode
//   const handleEditToggle = () => {
//     if (editMode) {
//       // Save changes
//       if (editedContent !== documentData?.content) {
//         saveEditedDocument(documentId, editedContent);
//       } else {
//         setEditMode(false);
//       }
//     } else {
//       setEditMode(true);
//     }
//   };

//   // Handle content change in edit mode
//   const handleContentChange = (e) => {
//     setEditedContent(e.target.value);
//   };

//   // Load chat history when document changes
//   useEffect(() => {
//     if (documentId) {
//       getChatHistory(documentId).catch(console.error);
//     }
//   }, [documentId]);

//   // Clear messages after 5 seconds
//   useEffect(() => {
//     if (success) {
//       const timer = setTimeout(() => setSuccess(null), 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [success]);

//   useEffect(() => {
//     if (error) {
//       const timer = setTimeout(() => setError(null), 8000);
//       return () => clearTimeout(timer);
//     }
//   }, [error]);

//   // Format file size
//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleString();
//   };

//   const tabs = ['Summary', 'Key Issues', 'Chat History'];

//   const toolbarItems = [
//     { 
//       icon: editMode ? Save : Edit3, 
//       label: editMode ? 'Save' : 'Edit', 
//       color: editMode ? 'text-green-600' : 'text-blue-600', 
//       action: handleEditToggle,
//       disabled: !documentData || isSaving
//     },
//     { 
//       icon: Download, 
//       label: 'Download DOCX', 
//       color: 'text-green-600', 
//       action: () => documentId && downloadDocument(documentId, 'docx'),
//       disabled: !documentId
//     },
//     { 
//       icon: Download, 
//       label: 'Download PDF', 
//       color: 'text-red-600', 
//       action: () => documentId && downloadDocument(documentId, 'pdf'),
//       disabled: !documentId
//     },
//     { 
//       icon: RotateCcw, 
//       label: 'Refresh Analysis', 
//       color: 'text-slate-600', 
//       action: () => documentId && analyzeDocument(documentId),
//       disabled: !documentId || isGeneratingInsights
//     },
//     { 
//       icon: Trash2, 
//       label: 'Delete Document', 
//       color: 'text-red-600', 
//       action: () => documentId && window.confirm('Are you sure you want to delete this document?') && deleteDocument(documentId),
//       disabled: !documentId || isLoading
//     }
//   ];

//   const getSeverityColor = (severity) => {
//     switch (severity?.toLowerCase()) {
//       case 'high': case 'critical': return 'border-red-500 bg-red-50';
//       case 'medium': case 'moderate': return 'border-orange-500 bg-orange-50';
//       case 'low': case 'minor': return 'border-blue-500 bg-blue-50';
//       default: return 'border-gray-500 bg-gray-50';
//     }
//   };

//   const getSeverityTextColor = (severity) => {
//     switch (severity?.toLowerCase()) {
//       case 'high': case 'critical': return 'text-red-800';
//       case 'medium': case 'moderate': return 'text-orange-800';
//       case 'low': case 'minor': return 'text-blue-800';
//       default: return 'text-gray-800';
//     }
//   };

//   const getSeverityDescColor = (severity) => {
//     switch (severity?.toLowerCase()) {
//       case 'high': case 'critical': return 'text-red-700';
//       case 'medium': case 'moderate': return 'text-orange-700';
//       case 'low': case 'minor': return 'text-blue-700';
//       default: return 'text-gray-700';
//     }
//   };

//   return (
//     <div className="flex flex-col lg:flex-row h-screen bg-slate-50 p-2 sm:p-4 overflow-hidden">
//       {/* Debug Token Info - Remove in production */}
//       <div className="fixed bottom-4 left-4 z-50 bg-gray-800 text-white p-2 rounded text-xs max-w-xs">
//         <div>API: {API_BASE_URL}</div>
//         <div>Token: {getAuthToken() ? '✓ Found' : '✗ Missing'}</div>
//         <div>Storage: {Object.keys(localStorage).filter(key => key.toLowerCase().includes('token')).join(', ') || 'No token keys found'}</div>
//       </div>

//       {/* Error/Success Messages */}
//       {error && (
//         <div className="fixed top-4 right-4 z-50 max-w-md">
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg flex items-start space-x-2">
//             <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
//             <div className="flex-1">
//               <p className="text-sm font-medium">Error</p>
//               <p className="text-xs mt-1">{error}</p>
//             </div>
//             <button 
//               onClick={() => setError(null)}
//               className="text-red-500 hover:text-red-700"
//             >
//               <X className="h-4 w-4" />
//             </button>
//           </div>
//         </div>
//       )}

//       {success && (
//         <div className="fixed top-4 right-4 z-50 max-w-md">
//           <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2">
//             <CheckCircle className="h-5 w-5 flex-shrink-0" />
//             <span className="text-sm">{success}</span>
//             <button 
//               onClick={() => setSuccess(null)}
//               className="ml-auto text-green-500 hover:text-green-700"
//             >
//               <X className="h-4 w-4" />
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Upload Progress Modal */}
//       {isUploading && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
//             <div className="text-center">
//               <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
//               <h3 className="text-lg font-semibold mb-2">Uploading Document</h3>
//               <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
//                 <div 
//                   className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
//                   style={{ width: `${uploadProgress}%` }}
//                 ></div>
//               </div>
//               <p className="text-sm text-gray-600">{uploadProgress}% complete</p>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="flex flex-1 flex-col lg:flex-row gap-3 lg:gap-4 max-w-7xl mx-auto h-full">
//         {/* Left Panel - Document Canvas */}
//         <div className={`flex-1 flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-full w-full lg:w-auto ${!showDocumentCanvas ? 'hidden' : 'flex'} lg:flex`}>
//           {/* Document Header */}
//           <div className="flex items-center justify-between p-3 sm:p-4 border-b border-slate-200 bg-white rounded-t-2xl">
//             <div className="flex items-center space-x-2 sm:space-x-4">
//               <h2 className="text-base sm:text-lg font-semibold text-slate-800">Document Analysis Canvas</h2>
//               {documentData && (
//                 <div className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
//                   {documentData.originalName || documentData.title}
//                 </div>
//               )}
//               {(isLoading || isGeneratingInsights || isSaving) && (
//                 <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
//               )}
//             </div>
            
//             {/* Toolbar */}
//             <div className="hidden md:flex items-center space-x-2 bg-slate-100 rounded-xl p-1">
//               {toolbarItems.map((item, index) => (
//                 <button
//                   key={index}
//                   onClick={item.action}
//                   disabled={item.disabled || isLoading || isGeneratingInsights}
//                   className={`p-2 rounded-md hover:bg-white transition-all duration-200 ${item.color} hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed`}
//                   title={item.label}
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
//                 <div className="prose max-w-none">
//                   {/* Document Info */}
//                   <div className="bg-slate-50 rounded-lg p-4 mb-6">
//                     <h3 className="font-semibold text-slate-800 mb-2">Document Information</h3>
//                     <div className="grid grid-cols-2 gap-4 text-sm">
//                       <div>
//                         <span className="font-medium text-slate-600">Name:</span>
//                         <p className="text-slate-800">{documentData.originalName}</p>
//                       </div>
//                       <div>
//                         <span className="font-medium text-slate-600">Size:</span>
//                         <p className="text-slate-800">{formatFileSize(documentData.size)}</p>
//                       </div>
//                       <div>
//                         <span className="font-medium text-slate-600">Type:</span>
//                         <p className="text-slate-800">{documentData.type}</p>
//                       </div>
//                       <div>
//                         <span className="font-medium text-slate-600">Uploaded:</span>
//                         <p className="text-slate-800">{formatDate(documentData.uploadedAt)}</p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Document Content */}
//                   <div className="border-t pt-6">
//                     <div className="flex items-center justify-between mb-4">
//                       <h3 className="font-semibold text-slate-800">Document Content</h3>
//                       {editMode && (
//                         <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
//                           Edit Mode Active
//                         </span>
//                       )}
//                     </div>
                    
//                     {editMode ? (
//                       <textarea
//                         value={editedContent}
//                         onChange={handleContentChange}
//                         className="w-full h-96 p-4 border border-slate-300 rounded-lg text-sm font-mono resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="Edit document content..."
//                       />
//                     ) : (
//                       <div className="text-slate-600 whitespace-pre-wrap text-sm sm:text-base leading-relaxed">
//                         {documentData.content || 'Document content will appear here...'}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center justify-center h-64 text-slate-500">
//                   <FileText className="h-16 w-16 mx-auto mb-6 text-slate-400" />
//                   <h3 className="text-lg font-medium mb-4">Upload a Document</h3>
//                   <p className="text-sm text-center mb-6 max-w-md">
//                     Upload a legal document (PDF, DOC, DOCX, TXT) to start analysis. Maximum file size: 10MB.
//                   </p>
                  
//                   <label className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl cursor-pointer transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed">
//                     <Upload className="h-4 w-4" />
//                     <span>Choose File</span>
//                     <input
//                       type="file"
//                       className="hidden"
//                       accept=".pdf,.doc,.docx,.txt"
//                       onChange={handleFileUpload}
//                       disabled={isUploading}
//                     />
//                   </label>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Search Bar */}
//           <div className="px-3 sm:px-6 py-3 sm:py-4 bg-white border-t border-slate-200">
//             <form onSubmit={handleSearch} className="relative">
//               <div className="flex items-center space-x-2 sm:space-x-3 bg-slate-50 rounded-2xl border border-slate-200 p-3 sm:p-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200">
//                 <Search className="h-4 sm:h-5 w-4 sm:w-5 text-slate-400 flex-shrink-0" />
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder={documentData ? "Ask questions about the document..." : "Upload a document first"}
//                   className="flex-1 bg-transparent border-none outline-none text-slate-700 placeholder-slate-400 text-xs sm:text-sm md:text-base"
//                   disabled={isLoading || !documentData}
//                 />
//                 <button 
//                   type="submit"
//                   disabled={isLoading || !searchQuery.trim() || !documentData}
//                   className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white p-2 sm:p-2.5 rounded-xl transition-colors duration-200 flex-shrink-0"
//                 >
//                   {isLoading ? (
//                     <Loader2 className="h-3 sm:h-4 w-3 sm:w-4 animate-spin" />
//                   ) : (
//                     <Send className="h-3 sm:h-4 w-3 sm:w-4" />
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>

//           {/* Mobile Toggle Button */}
//           <div className="lg:hidden px-3 sm:px-6 py-3 sm:py-4 bg-white border-t border-slate-200">
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
//           {/* Analysis Header */}
//           <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-slate-200 bg-white rounded-t-2xl">
//             <div className="flex items-center justify-between mb-3 sm:mb-4">
//               <h3 className="text-base sm:text-lg font-semibold text-slate-800">AI Analysis Results</h3>
//               {documentData && (
//                 <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
//                   ID: {documentData.id}
//                 </div>
//               )}
//             </div>

//             {/* Mobile Toggle Button */}
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
//                 {/* Analysis Status */}
//                 {analysisResults && (
//                   <div className="bg-green-50 border border-green-200 rounded-lg p-3">
//                     <div className="flex items-center space-x-2">
//                       <CheckCircle className="h-4 w-4 text-green-600" />
//                       <span className="text-sm font-medium text-green-800">Analysis Complete</span>
//                     </div>
//                     <p className="text-xs text-green-700 mt-1">
//                       Document analyzed at {formatDate(new Date().toISOString())}
//                     </p>
//                   </div>
//                 )}

//                 {/* Case Summary */}
//                 {caseSummary && (
//                   <div>
//                     <h4 className="font-semibold text-slate-800 mb-2 sm:mb-3 flex items-center text-xs sm:text-sm md:text-base">
//                       <FileText className="h-3 sm:h-4 md:h-5 w-3 sm:w-4 md:w-5 mr-2 text-blue-600" />
//                       Document Summary
//                     </h4>
//                     <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
//                       <p className="text-xs sm:text-sm text-blue-900 leading-relaxed">
//                         {caseSummary.summary}
//                       </p>
//                       {caseSummary.confidence && (
//                         <div className="mt-3 flex items-center space-x-2">
//                           <div className="flex-1 bg-blue-200 rounded-full h-1.5">
//                             <div 
//                               className="bg-blue-600 h-1.5 rounded-full" 
//                               style={{ width: `${caseSummary.confidence * 100}%` }}
//                             ></div>
//                           </div>
//                           <span className="text-xs text-blue-700 font-medium">
//                             {Math.round(caseSummary.confidence * 100)}% confidence
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* Legal Grounds */}
//                 {legalGrounds.length > 0 && (
//                   <div>
//                     <h4 className="font-semibold text-slate-800 mb-2 sm:mb-3 flex items-center text-xs sm:text-sm md:text-base">
//                       <Scale className="h-3 sm:h-4 md:h-5 w-3 sm:w-4 md:w-5 mr-2 text-purple-600" />
//                       Legal Grounds ({legalGrounds.length})
//                     </h4>
//                     <div className="space-y-2">
//                       {legalGrounds.map((ground) => (
//                         <div key={ground.id} className="bg-purple-50 border border-purple-200 rounded-lg p-3">
//                           <div className="flex items-start space-x-2">
//                             <div className="w-2 h-2 bg-purple-600 rounded-full mt-1.5 flex-shrink-0" />
//                             <div className="flex-1">
//                               <p className="text-xs sm:text-sm text-purple-900">{ground.ground}</p>
//                               <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${
//                                 ground.relevance === 'high' 
//                                   ? 'bg-red-100 text-red-800' 
//                                   : ground.relevance === 'medium'
//                                   ? 'bg-yellow-100 text-yellow-800'
//                                   : 'bg-blue-100 text-blue-800'
//                               }`}>
//                                 {ground.relevance} relevance
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Citations Detected */}
//                 {citations.length > 0 && (
//                   <div>
//                     <h4 className="font-semibold text-slate-800 mb-2 sm:mb-3 flex items-center text-xs sm:text-sm md:text-base">
//                       <AlertTriangle className="h-3 sm:h-4 md:h-5 w-3 sm:w-4 md:w-5 mr-2 text-orange-600" />
//                       Citations Detected ({citations.length})
//                     </h4>
//                     <div className="space-y-2 sm:space-y-3">
//                       {citations.map((citation) => (
//                         <div key={citation.id} className="bg-orange-50 border border-orange-200 rounded-lg p-3">
//                           <div className="flex items-start space-x-2 mb-2">
//                             <div className="text-orange-600 font-medium text-xs bg-orange-100 px-2 py-1 rounded">
//                               Page {citation.page}, Para {citation.para}
//                             </div>
//                             <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
//                               {citation.type}
//                             </span>
//                           </div>
//                           <p className="text-xs sm:text-sm text-orange-900 italic">
//                             "{citation.text}"
//                           </p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {!caseSummary && !legalGrounds.length && !citations.length && !analysisResults && (
//                   <div className="text-center text-slate-500 py-8 sm:py-12">
//                     <FileText className="h-12 w-12 mx-auto mb-4 text-slate-400" />
//                     <h4 className="font-medium text-slate-600 mb-2">No Analysis Results</h4>
//                     <p className="text-sm mb-4">
//                       Upload a document and click "Generate AI Insights" to see the analysis.
//                     </p>
//                   </div>
//                 )}
//               </div>
//             )}

//             {activeTab === 'Key Issues' && (
//               <div className="space-y-3 sm:space-y-4">
//                 <div className="flex items-center justify-between">
//                   <h4 className="font-semibold text-slate-800 text-xs sm:text-sm md:text-base">
//                     Identified Legal Issues
//                   </h4>
//                   {keyIssues.length > 0 && (
//                     <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs">
//                       {keyIssues.length} issues
//                     </span>
//                   )}
//                 </div>
                
//                 {keyIssues.length > 0 ? (
//                   <div className="space-y-3 sm:space-y-4">
//                     {keyIssues.map((issue) => (
//                       <div key={issue.id} className={`border-l-4 p-3 sm:p-4 rounded-r-xl ${getSeverityColor(issue.severity)} hover:shadow-md transition-shadow`}>
//                         <div className="flex items-start justify-between mb-2">
//                           <h5 className={`font-semibold text-xs sm:text-sm md:text-base ${getSeverityTextColor(issue.severity)}`}>
//                             {issue.title}
//                           </h5>
//                           <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                             issue.severity === 'high' 
//                               ? 'bg-red-200 text-red-800' 
//                               : issue.severity === 'medium'
//                               ? 'bg-orange-200 text-orange-800'
//                               : 'bg-blue-200 text-blue-800'
//                           }`}>
//                             {issue.severity}
//                           </span>
//                         </div>
//                         <p className={`text-xs sm:text-sm ${getSeverityDescColor(issue.severity)}`}>
//                           {issue.description}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center text-slate-500 py-8 sm:py-12">
//                     <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-slate-400" />
//                     <h4 className="font-medium text-slate-600 mb-2">No Issues Identified</h4>
//                     <p className="text-sm">
//                       Generate AI insights to identify potential legal issues in the document.
//                     </p>
//                   </div>
//                 )}
//               </div>
//             )}

//             {activeTab === 'Chat History' && (
//               <div className="space-y-3 sm:space-y-4">
//                 <div className="flex items-center justify-between">
//                   <h4 className="font-semibold text-slate-800 text-xs sm:text-sm md:text-base">
//                     Chat History
//                   </h4>
//                   {chatHistory.length > 0 && (
//                     <button
//                       onClick={() => setChatHistory([])}
//                       className="text-xs text-red-600 hover:text-red-800 px-2 py-1 hover:bg-red-50 rounded"
//                     >
//                       Clear History
//                     </button>
//                   )}
//                 </div>
                
//                 {chatHistory.length > 0 ? (
//                   <div className="space-y-4 max-h-96 overflow-y-auto">
//                     {chatHistory.map((chat) => (
//                       <div key={chat.id} className="space-y-2">
//                         {/* Question */}
//                         <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
//                           <div className="flex items-center justify-between mb-1">
//                             <span className="text-xs font-medium text-blue-800">You asked:</span>
//                             <span className="text-xs text-blue-600">
//                               {formatDate(chat.timestamp)}
//                             </span>
//                           </div>
//                           <p className="text-xs sm:text-sm text-blue-900">{chat.question}</p>
//                         </div>
                        
//                         {/* Answer */}
//                         <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
//                           <div className="flex items-center mb-1">
//                             <span className="text-xs font-medium text-slate-800">AI Response:</span>
//                           </div>
//                           <p className="text-xs sm:text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
//                             {chat.answer}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center text-slate-500 py-8 sm:py-12">
//                     <Clock className="h-12 w-12 mx-auto mb-4 text-slate-400" />
//                     <h4 className="font-medium text-slate-600 mb-2">No Conversations Yet</h4>
//                     <p className="text-sm">
//                       Start asking questions about the document using the search bar below.
//                     </p>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Loading State */}
//             {(isLoading || isGeneratingInsights) && (
//               <div className="flex items-center justify-center py-8">
//                 <div className="flex flex-col items-center space-y-2 text-slate-600">
//                   <Loader2 className="h-6 w-6 animate-spin" />
//                   <span className="text-sm">
//                     {isGeneratingInsights ? 'Generating AI insights...' : 'Processing your request...'}
//                   </span>
//                   {isGeneratingInsights && (
//                     <p className="text-xs text-slate-500 text-center">
//                       This may take a few moments depending on document complexity
//                     </p>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Action Buttons */}
//           <div className="px-4 sm:px-5 py-3 sm:py-4 border-t border-slate-200 bg-white rounded-b-2xl space-y-2">
//             {/* Generate Insights Button */}
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

//             {/* Quick Actions */}
//             {documentData && (
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => downloadDocument(documentId, 'docx')}
//                   className="flex-1 bg-green-100 hover:bg-green-200 text-green-800 py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-1 text-xs"
//                 >
//                   <Download className="h-3 w-3" />
//                   <span>DOCX</span>
//                 </button>
//                 <button
//                   onClick={() => downloadDocument(documentId, 'pdf')}
//                   className="flex-1 bg-red-100 hover:bg-red-200 text-red-800 py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-1 text-xs"
//                 >
//                   <Download className="h-3 w-3" />
//                   <span>PDF</span>
//                 </button>
//                 <button
//                   onClick={() => window.confirm('Are you sure you want to delete this document?') && deleteDocument(documentId)}
//                   className="flex-1 bg-red-100 hover:bg-red-200 text-red-800 py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-1 text-xs"
//                   disabled={isLoading}
//                 >
//                   <Trash2 className="h-3 w-3" />
//                   <span>Delete</span>
//                 </button>
//               </div>
//             )}
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
  Download,
  AlertCircle,
  CheckCircle,
  X,
  Save,
  Eye,
  Quote,
  BookOpen,
  Gavel
} from 'lucide-react';

const AnalysisPage = () => {
  // State Management
  const [activeTab, setActiveTab] = useState('Summary');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showDocumentCanvas, setShowDocumentCanvas] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  
  // Document and Analysis Data
  const [documentData, setDocumentData] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [caseSummary, setCaseSummary] = useState(null);
  const [legalGrounds, setLegalGrounds] = useState([]);
  const [citations, setCitations] = useState([]);
  const [keyIssues, setKeyIssues] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [documentId, setDocumentId] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // API Configuration
  const API_BASE_URL = 'https://drive-1-n7u7.onrender.com/api';
  
  // Get auth token (implement based on your auth system)
  const getAuthToken = () => {
    // Try different possible token keys
    const token = localStorage.getItem('authToken') || 
                  localStorage.getItem('token') || 
                  localStorage.getItem('accessToken') ||
                  localStorage.getItem('jwt') ||
                  sessionStorage.getItem('authToken') ||
                  sessionStorage.getItem('token');
    
    console.log('Retrieved token:', token ? 'Token found' : 'No token found');
    return token;
  };

  // API request helper with comprehensive error handling
  const apiRequest = async (url, options = {}) => {
    try {
      const token = getAuthToken();
      const defaultHeaders = {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      };

      // Don't set Content-Type for FormData
      const headers = options.body instanceof FormData 
        ? { 'Authorization': token ? `Bearer ${token}` : '' }
        : { ...defaultHeaders, ...options.headers };

      const response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { error: `HTTP error! status: ${response.status}` };
        }
        
        if (response.status === 401) {
          throw new Error('Authentication required. Please log in.');
        } else if (response.status === 403) {
          throw new Error('Access denied. You don\'t have permission to perform this action.');
        } else if (response.status === 404) {
          throw new Error('Resource not found.');
        } else if (response.status >= 500) {
          throw new Error('Server error. Please try again later.');
        }
        
        throw new Error(errorData.error || errorData.message || `Request failed with status ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      return response;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  };

  // File upload API call with progress tracking
  const uploadDocument = async (file) => {
    try {
      setIsUploading(true);
      setError(null);
      setUploadProgress(0);
      
      const formData = new FormData();
      formData.append('file', file);

      // Create XMLHttpRequest for progress tracking
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            setUploadProgress(progress);
          }
        };

        xhr.onload = () => {
          console.log('Upload response status:', xhr.status);
          console.log('Upload response:', xhr.responseText);
          
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const data = JSON.parse(xhr.responseText);
              setDocumentId(data.document_id);
              setDocumentData({
                id: data.document_id,
                title: file.name,
                content: data.html_content || '',
                downloadUrl: data.docx_download_url,
                originalName: file.name,
                size: file.size,
                type: file.type,
                uploadedAt: new Date().toISOString()
              });
              setEditedContent(data.html_content || '');
              setSuccess('Document uploaded successfully!');
              resolve(data);
            } catch (error) {
              console.error('Failed to parse server response:', error);
              reject(new Error('Failed to parse server response'));
            }
          } else {
            try {
              const errorData = JSON.parse(xhr.responseText);
              console.error('Upload error response:', errorData);
              reject(new Error(errorData.error || errorData.message || `Upload failed with status ${xhr.status}`));
            } catch {
              reject(new Error(`Upload failed with status ${xhr.status}. Please check your authentication token.`));
            }
          }
        };

        xhr.onerror = () => {
          console.error('Network error during upload');
          reject(new Error('Network error occurred during upload'));
        };

        xhr.ontimeout = () => {
          console.error('Upload timeout');
          reject(new Error('Upload timeout. Please try again.'));
        };

        const token = getAuthToken();
        console.log('Using API endpoint:', `${API_BASE_URL}/doc/upload`);
        console.log('Token available:', !!token);
        console.log('Form data field name: file');
        
        xhr.open('POST', `${API_BASE_URL}/doc/upload`);
        
        if (token) {
          xhr.setRequestHeader('Authorization', `Bearer ${token}`);
          xhr.setRequestHeader('x-auth-token', token);
        } else {
          console.warn('No authentication token found!');
        }
        
        xhr.timeout = 300000; // 5 minute timeout
        xhr.send(formData);
      });
    } catch (error) {
      console.error('Upload error:', error);
      setError(`Upload failed: ${error.message}`);
      throw error;
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Analyze document API call
  const analyzeDocument = async (docId) => {
    try {
      setIsGeneratingInsights(true);
      setError(null);

      const data = await apiRequest('/doc/analyze', {
        method: 'POST',
        body: JSON.stringify({ document_id: docId }),
      });

      // Process the AI analysis response
      setAnalysisResults(data);
      
      // Extract different components from the analysis
      if (data.summary) {
        setCaseSummary({
          summary: data.summary,
          confidence: data.confidence || 0.9
        });
      }

      if (data.legal_grounds) {
        setLegalGrounds(Array.isArray(data.legal_grounds) 
          ? data.legal_grounds.map((ground, index) => ({
              id: index + 1,
              ground: typeof ground === 'string' ? ground : ground.ground || ground.text,
              relevance: ground.relevance || 'medium'
            }))
          : []
        );
      }

      if (data.key_issues) {
        setKeyIssues(Array.isArray(data.key_issues) 
          ? data.key_issues.map((issue, index) => ({
              id: index + 1,
              title: issue.title || issue.issue || issue,
              description: issue.description || 'Analysis pending',
              severity: issue.severity || issue.priority || 'medium',
              color: issue.color || getSeverityColor(issue.severity || 'medium')
            }))
          : []
        );
      }

      if (data.citations) {
        setCitations(Array.isArray(data.citations) 
          ? data.citations.map((citation, index) => ({
              id: index + 1,
              page: citation.page || 1,
              para: citation.paragraph || citation.para || index + 1,
              text: citation.text || citation.citation || citation,
              type: citation.type || 'general'
            }))
          : []
        );
      }

      setSuccess('Document analysis completed successfully!');
      return data;
    } catch (error) {
      setError(`Analysis failed: ${error.message}`);
      throw error;
    } finally {
      setIsGeneratingInsights(false);
    }
  };

  // Chat with document API call
  const chatWithDocument = async (docId, question) => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await apiRequest('/doc/chat', {
        method: 'POST',
        body: JSON.stringify({ 
          document_id: docId, 
          question: question 
        }),
      });

      // Add to chat history
      const newChat = {
        id: Date.now(),
        question: question,
        answer: data.answer,
        timestamp: new Date().toISOString()
      };

      setChatHistory(prev => [...prev, newChat]);
      setSearchQuery(''); // Clear search input
      setSuccess('Question answered successfully!');
      return data;
    } catch (error) {
      setError(`Chat failed: ${error.message}`);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Save edited document API call
  const saveEditedDocument = async (docId, editedHtml) => {
    try {
      setIsSaving(true);
      setError(null);

      const data = await apiRequest('/doc/save', {
        method: 'POST',
        body: JSON.stringify({ 
          document_id: docId, 
          edited_html: editedHtml 
        }),
      });

      setDocumentData(prev => ({
        ...prev,
        docxUrl: data.docx_download_url,
        pdfUrl: data.pdf_download_url,
        lastEdited: new Date().toISOString()
      }));

      setSuccess('Document saved successfully!');
      setEditMode(false);
      return data;
    } catch (error) {
      setError(`Save failed: ${error.message}`);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  // Download document API call
  const downloadDocument = async (docId, format = 'docx') => {
    try {
      setError(null);
      const token = getAuthToken();
      
      const link = document.createElement('a');
      link.href = `${API_BASE_URL}/doc/download/${docId}/${format}`;
      if (token) {
        window.open(link.href, '_blank');
      } else {
        link.click();
      }
      
      setSuccess(`${format.toUpperCase()} download started!`);
    } catch (error) {
      setError(`Download failed: ${error.message}`);
    }
  };

  // Get chat history API call
  const getChatHistory = async (docId) => {
    try {
      const data = await apiRequest(`/doc/chat-history/${docId}`);
      setChatHistory(Array.isArray(data) ? data : []);
      return data;
    } catch (error) {
      setError(`Failed to load chat history: ${error.message}`);
      throw error;
    }
  };

  // Delete document API call
  const deleteDocument = async (docId) => {
    try {
      setIsLoading(true);
      setError(null);

      await apiRequest(`/doc/${docId}`, {
        method: 'DELETE',
      });

      // Reset all states
      setDocumentData(null);
      setDocumentId(null);
      setAnalysisResults(null);
      setCaseSummary(null);
      setLegalGrounds([]);
      setCitations([]);
      setKeyIssues([]);
      setChatHistory([]);
      setEditedContent('');
      
      setSuccess('Document deleted successfully!');
    } catch (error) {
      setError(`Delete failed: ${error.message}`);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];

    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a valid document (PDF, DOC, DOCX, or TXT)');
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    try {
      await uploadDocument(file);
    } catch (error) {
      // Error already handled in uploadDocument
    }

    // Clear the input
    event.target.value = '';
  };

  // Handle search/chat
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || !documentId) return;
    
    try {
      await chatWithDocument(documentId, searchQuery);
    } catch (error) {
      // Error already handled in chatWithDocument
    }
  };

  // Generate AI insights
  const generateAIInsights = async () => {
    if (!documentId) {
      setError('Please upload a document first');
      return;
    }

    try {
      await analyzeDocument(documentId);
    } catch (error) {
      // Error already handled in analyzeDocument
    }
  };

  // Handle edit mode
  const handleEditToggle = () => {
    if (editMode) {
      // Save changes
      if (editedContent !== documentData?.content) {
        saveEditedDocument(documentId, editedContent);
      } else {
        setEditMode(false);
      }
    } else {
      setEditMode(true);
    }
  };

  // Handle content change in edit mode
  const handleContentChange = (e) => {
    setEditedContent(e.target.value);
  };

  // Load chat history when document changes
  useEffect(() => {
    if (documentId) {
      getChatHistory(documentId).catch(console.error);
    }
  }, [documentId]);

  // Clear messages after 5 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 8000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const tabs = ['Summary', 'Key Issues', 'Chat History'];

  const toolbarItems = [
    { 
      icon: editMode ? Save : Edit3, 
      label: editMode ? 'Save' : 'Edit', 
      color: editMode ? 'text-green-600' : 'text-blue-600', 
      action: handleEditToggle,
      disabled: !documentData || isSaving
    },
    { 
      icon: Download, 
      label: 'Download DOCX', 
      color: 'text-green-600', 
      action: () => documentId && downloadDocument(documentId, 'docx'),
      disabled: !documentId
    },
    { 
      icon: Download, 
      label: 'Download PDF', 
      color: 'text-red-600', 
      action: () => documentId && downloadDocument(documentId, 'pdf'),
      disabled: !documentId
    },
    { 
      icon: RotateCcw, 
      label: 'Refresh Analysis', 
      color: 'text-slate-600', 
      action: () => documentId && analyzeDocument(documentId),
      disabled: !documentId || isGeneratingInsights
    },
    { 
      icon: Trash2, 
      label: 'Delete Document', 
      color: 'text-red-600', 
      action: () => documentId && window.confirm('Are you sure you want to delete this document?') && deleteDocument(documentId),
      disabled: !documentId || isLoading
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high': case 'critical': return 'border-red-500 bg-red-50';
      case 'medium': case 'moderate': return 'border-orange-500 bg-orange-50';
      case 'low': case 'minor': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getSeverityTextColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high': case 'critical': return 'text-red-800';
      case 'medium': case 'moderate': return 'text-orange-800';
      case 'low': case 'minor': return 'text-blue-800';
      default: return 'text-gray-800';
    }
  };

  const getSeverityDescColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high': case 'critical': return 'text-red-700';
      case 'medium': case 'moderate': return 'text-orange-700';
      case 'low': case 'minor': return 'text-blue-700';
      default: return 'text-gray-700';
    }
  };

  // Helper function to format AI response text with professional styling
  const formatAIResponse = (text) => {
    if (!text) return '';
    
    // Split text into paragraphs and format them
    const paragraphs = text.split('\n\n').filter(p => p.trim());
    
    return paragraphs.map((paragraph, index) => {
      // Check if it's a header (starts with numbers, letters, or common legal terms)
      const isHeader = /^(\d+\.|[A-Z]\.|I{1,3}\.|WHEREAS|THEREFORE|IN CONCLUSION|SUMMARY|ANALYSIS|FINDINGS|RECOMMENDATIONS)/i.test(paragraph.trim());
      
      // Check if it contains bold formatting indicators
      const hasBold = /\*\*(.*?)\*\*/.test(paragraph);
      
      if (isHeader) {
        return (
          <h4 key={index} className="font-bold text-slate-900 mb-3 text-base leading-relaxed tracking-wide">
            {paragraph.replace(/\*\*(.*?)\*\*/g, '$1')}
          </h4>
        );
      } else if (hasBold) {
        // Handle bold text within paragraphs
        const parts = paragraph.split(/(\*\*.*?\*\*)/);
        return (
          <p key={index} className="mb-4 text-slate-800 leading-relaxed text-sm tracking-wide">
            {parts.map((part, partIndex) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return (
                  <strong key={partIndex} className="font-semibold text-slate-900">
                    {part.slice(2, -2)}
                  </strong>
                );
              }
              return part;
            })}
          </p>
        );
      } else {
        return (
          <p key={index} className="mb-4 text-slate-800 leading-relaxed text-sm tracking-wide">
            {paragraph}
          </p>
        );
      }
    });
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-slate-50 p-2 sm:p-4 overflow-hidden font-serif">
      {/* Debug Token Info - Remove in production */}
      <div className="fixed bottom-4 left-4 z-50 bg-gray-800 text-white p-2 rounded text-xs max-w-xs font-mono">
        <div>API: {API_BASE_URL}</div>
        <div>Token: {getAuthToken() ? '✓ Found' : '✗ Missing'}</div>
        <div>Storage: {Object.keys(localStorage).filter(key => key.toLowerCase().includes('token')).join(', ') || 'No token keys found'}</div>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="fixed top-4 right-4 z-50 max-w-md">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium">Error</p>
              <p className="text-xs mt-1">{error}</p>
            </div>
            <button 
              onClick={() => setError(null)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {success && (
        <div className="fixed top-4 right-4 z-50 max-w-md">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 flex-shrink-0" />
            <span className="text-sm">{success}</span>
            <button 
              onClick={() => setSuccess(null)}
              className="ml-auto text-green-500 hover:text-green-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Upload Progress Modal */}
      {isUploading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
              <h3 className="text-lg font-semibold mb-2">Uploading Document</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">{uploadProgress}% complete</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col lg:flex-row gap-3 lg:gap-4 max-w-7xl mx-auto h-full">
        {/* Left Panel - Document Canvas */}
        <div className={`flex-1 flex-col bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden h-full w-full lg:w-auto ${!showDocumentCanvas ? 'hidden' : 'flex'} lg:flex`}>
          {/* Document Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-bold text-slate-900 tracking-wide">LEGAL DOCUMENT ANALYSIS</h2>
              {documentData && (
                <div className="bg-blue-100 text-blue-900 px-3 py-1 rounded text-sm font-medium">
                  {documentData.originalName || documentData.title}
                </div>
              )}
              {(isLoading || isGeneratingInsights || isSaving) && (
                <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
              )}
            </div>
            
            {/* Toolbar */}
            <div className="hidden md:flex items-center space-x-2 bg-slate-100 rounded-lg p-1">
              {toolbarItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  disabled={item.disabled || isLoading || isGeneratingInsights}
                  className={`p-2 rounded-md hover:bg-white transition-all duration-200 ${item.color} hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed`}
                  title={item.label}
                >
                  <item.icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Document Content Area */}
          <div className="flex-1 px-6 py-4 overflow-y-auto bg-white h-full">
            <div className="bg-white border border-slate-200 px-12 py-8 min-h-full">
              {documentData ? (
                <div className="max-w-none">
                  {/* Document Header */}
                  <div className="text-center border-b-2 border-slate-300 pb-6 mb-8">
                    <h1 className="text-2xl font-bold text-slate-900 mb-2 tracking-wide uppercase">
                      LEGAL DOCUMENT
                    </h1>
                    <div className="text-sm text-slate-600 space-y-1">
                      <p><strong>Document ID:</strong> {documentData.id}</p>
                      <p><strong>File Name:</strong> {documentData.originalName}</p>
                      <p><strong>Date Uploaded:</strong> {formatDate(documentData.uploadedAt)}</p>
                      <p><strong>File Size:</strong> {formatFileSize(documentData.size)}</p>
                    </div>
                  </div>

                  {/* Document Content */}
                  <div className="space-y-6">
                    {editMode ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold text-slate-900 tracking-wide">EDIT MODE</h3>
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded font-medium">
                            EDITING ACTIVE
                          </span>
                        </div>
                        <textarea
                          value={editedContent}
                          onChange={handleContentChange}
                          className="w-full h-96 p-6 border-2 border-slate-300 rounded-lg text-sm font-serif resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 leading-relaxed"
                          placeholder="Edit document content..."
                        />
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <h3 className="text-lg font-bold text-slate-900 tracking-wide border-b border-slate-300 pb-2">
                          DOCUMENT CONTENT
                        </h3>
                        <div className="text-slate-800 whitespace-pre-wrap text-sm leading-loose tracking-wide font-serif">
                          {documentData.content || 'Document content will appear here...'}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                  <FileText className="h-16 w-16 mx-auto mb-6 text-slate-400" />
                  <h3 className="text-xl font-bold text-slate-700 mb-4 tracking-wide">UPLOAD LEGAL DOCUMENT</h3>
                  <p className="text-sm text-center mb-6 max-w-md leading-relaxed">
                    Upload a legal document (PDF, DOC, DOCX, TXT) to begin comprehensive legal analysis. 
                    Maximum file size: 10MB.
                  </p>
                  
                  <label className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg cursor-pointer transition-colors duration-200 flex items-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed font-medium">
                    <Upload className="h-5 w-5" />
                    <span>CHOOSE FILE</span>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
            <form onSubmit={handleSearch} className="relative">
              <div className="flex items-center space-x-3 bg-white rounded-lg border-2 border-slate-300 p-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200">
                <Search className="h-5 w-5 text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={documentData ? "Ask questions about the legal document..." : "Upload a document first"}
                  className="flex-1 bg-transparent border-none outline-none text-slate-700 placeholder-slate-400 text-sm font-serif"
                  disabled={isLoading || !documentData}
                />
                <button 
                  type="submit"
                  disabled={isLoading || !searchQuery.trim() || !documentData}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white p-3 rounded-lg transition-colors duration-200 flex-shrink-0 font-medium"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Mobile Toggle Button */}
          <div className="lg:hidden px-6 py-4 bg-white border-t border-slate-200">
            <button
              onClick={() => setShowDocumentCanvas(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 text-sm tracking-wide"
            >
              <span>VIEW AI ANALYSIS RESULTS</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Right Panel - AI Analysis Results */}
        <div className={`flex w-full sm:w-80 lg:w-96 flex-col bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden h-full lg:flex mt-4 lg:mt-0 ${showDocumentCanvas ? 'hidden' : 'flex'} lg:flex`}>
          {/* Analysis Header */}
          <div className="px-5 py-4 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900 tracking-wide">AI LEGAL ANALYSIS</h3>
              {documentData && (
                <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-mono">
                  ID: {documentData.id}
                </div>
              )}
            </div>

            {/* Mobile Toggle Button */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setShowDocumentCanvas(true)}
                className="w-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 text-sm tracking-wide"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>VIEW DOCUMENT CANVAS</span>
              </button>
            </div>
            
            {/* Tabs */}
            <div className="flex space-x-1 bg-slate-100 rounded-lg p-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all duration-200 tracking-wide ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Analysis Content */}
          <div className="flex-1 overflow-y-auto px-5 py-4 bg-white">
            {activeTab === 'Summary' && (
              <div className="space-y-6">
                {/* Analysis Status */}
                {analysisResults && (
                  <div className="bg-green-50 border-l-4 border-green-500 rounded-r-lg p-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-bold text-green-800 tracking-wide">ANALYSIS COMPLETED</span>
                    </div>
                    <p className="text-xs text-green-700 mt-2 font-serif">
                      Document analyzed on {formatDate(new Date().toISOString())}
                    </p>
                  </div>
                )}

                {/* Case Summary */}
                {caseSummary && (
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-900 flex items-center text-sm tracking-wide border-b border-slate-300 pb-2">
                      <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
                      EXECUTIVE SUMMARY
                    </h4>
                    <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-4">
                      <div className="text-sm text-blue-900 leading-relaxed font-serif">
                        {formatAIResponse(caseSummary.summary)}
                      </div>
                      {caseSummary.confidence && (
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-blue-700 tracking-wide">CONFIDENCE LEVEL</span>
                            <span className="text-xs text-blue-700 font-bold">
                              {Math.round(caseSummary.confidence * 100)}%
                            </span>
                          </div>
                          <div className="flex-1 bg-blue-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                              style={{ width: `${caseSummary.confidence * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Legal Grounds */}
                {legalGrounds.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-900 flex items-center text-sm tracking-wide border-b border-slate-300 pb-2">
                      <Gavel className="h-4 w-4 mr-2 text-purple-600" />
                      LEGAL GROUNDS ({legalGrounds.length})
                    </h4>
                    <div className="space-y-3">
                      {legalGrounds.map((ground) => (
                        <div key={ground.id} className="bg-purple-50 border-l-4 border-purple-500 rounded-r-lg p-4">
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                              {ground.id}
                            </div>
                            <div className="flex-1">
                              <div className="text-sm text-purple-900 font-serif leading-relaxed">
                                {formatAIResponse(ground.ground)}
                              </div>
                              <span className={`inline-block mt-2 px-3 py-1 text-xs font-bold rounded-full tracking-wide ${
                                ground.relevance === 'high' 
                                  ? 'bg-red-100 text-red-800' 
                                  : ground.relevance === 'medium'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {ground.relevance.toUpperCase()} RELEVANCE
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Citations Detected */}
                {citations.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-900 flex items-center text-sm tracking-wide border-b border-slate-300 pb-2">
                      <Quote className="h-4 w-4 mr-2 text-orange-600" />
                      CITATIONS DETECTED ({citations.length})
                    </h4>
                    <div className="space-y-3">
                      {citations.map((citation) => (
                        <div key={citation.id} className="bg-orange-50 border-l-4 border-orange-500 rounded-r-lg p-4">
                          <div className="flex items-start space-x-2 mb-3">
                            <div className="text-orange-800 font-bold text-xs bg-orange-200 px-3 py-1 rounded tracking-wide">
                              PAGE {citation.page} • PARA {citation.para}
                            </div>
                            <span className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded font-medium">
                              {citation.type.toUpperCase()}
                            </span>
                          </div>
                          <blockquote className="text-sm text-orange-900 italic border-l-2 border-orange-300 pl-4 font-serif leading-relaxed">
                            "{citation.text}"
                          </blockquote>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!caseSummary && !legalGrounds.length && !citations.length && !analysisResults && (
                  <div className="text-center text-slate-500 py-12">
                    <FileText className="h-16 w-16 mx-auto mb-6 text-slate-400" />
                    <h4 className="font-bold text-slate-600 mb-3 tracking-wide">NO ANALYSIS RESULTS</h4>
                    <p className="text-sm mb-6 font-serif leading-relaxed max-w-sm mx-auto">
                      Upload a legal document and generate AI insights to view comprehensive analysis results.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'Key Issues' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-300 pb-3">
                  <h4 className="font-bold text-slate-900 text-sm tracking-wide">
                    IDENTIFIED LEGAL ISSUES
                  </h4>
                  {keyIssues.length > 0 && (
                    <span className="bg-slate-200 text-slate-800 px-3 py-1 rounded text-xs font-bold tracking-wide">
                      {keyIssues.length} ISSUES
                    </span>
                  )}
                </div>
                
                {keyIssues.length > 0 ? (
                  <div className="space-y-4">
                    {keyIssues.map((issue) => (
                      <div key={issue.id} className={`border-l-4 p-4 rounded-r-lg ${getSeverityColor(issue.severity)} hover:shadow-md transition-shadow`}>
                        <div className="flex items-start justify-between mb-3">
                          <h5 className={`font-bold text-sm tracking-wide ${getSeverityTextColor(issue.severity)}`}>
                            {issue.title}
                          </h5>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
                            issue.severity === 'high' 
                              ? 'bg-red-200 text-red-800' 
                              : issue.severity === 'medium'
                              ? 'bg-orange-200 text-orange-800'
                              : 'bg-blue-200 text-blue-800'
                          }`}>
                            {issue.severity.toUpperCase()}
                          </span>
                        </div>
                        <div className={`text-sm font-serif leading-relaxed ${getSeverityDescColor(issue.severity)}`}>
                          {formatAIResponse(issue.description)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-slate-500 py-12">
                    <AlertTriangle className="h-16 w-16 mx-auto mb-6 text-slate-400" />
                    <h4 className="font-bold text-slate-600 mb-3 tracking-wide">NO ISSUES IDENTIFIED</h4>
                    <p className="text-sm font-serif leading-relaxed">
                      Generate AI insights to identify potential legal issues in the document.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'Chat History' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-300 pb-3">
                  <h4 className="font-bold text-slate-900 text-sm tracking-wide">
                    CONSULTATION HISTORY
                  </h4>
                  {chatHistory.length > 0 && (
                    <button
                      onClick={() => setChatHistory([])}
                      className="text-xs text-red-600 hover:text-red-800 px-3 py-1 hover:bg-red-50 rounded font-medium tracking-wide"
                    >
                      CLEAR HISTORY
                    </button>
                  )}
                </div>
                
                {chatHistory.length > 0 ? (
                  <div className="space-y-6 max-h-96 overflow-y-auto">
                    {chatHistory.map((chat) => (
                      <div key={chat.id} className="space-y-3">
                        {/* Question */}
                        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-blue-800 tracking-wide">CLIENT INQUIRY:</span>
                            <span className="text-xs text-blue-600 font-mono">
                              {formatDate(chat.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-blue-900 font-serif leading-relaxed">{chat.question}</p>
                        </div>
                        
                        {/* Answer */}
                        <div className="bg-slate-50 border-l-4 border-slate-400 rounded-r-lg p-4">
                          <div className="flex items-center mb-2">
                            <span className="text-xs font-bold text-slate-800 tracking-wide">AI LEGAL COUNSEL:</span>
                          </div>
                          <div className="text-sm text-slate-700 font-serif leading-relaxed">
                            {formatAIResponse(chat.answer)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-slate-500 py-12">
                    <Clock className="h-16 w-16 mx-auto mb-6 text-slate-400" />
                    <h4 className="font-bold text-slate-600 mb-3 tracking-wide">NO CONSULTATIONS YET</h4>
                    <p className="text-sm font-serif leading-relaxed">
                      Start asking questions about the legal document using the search interface below.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Loading State */}
            {(isLoading || isGeneratingInsights) && (
              <div className="flex items-center justify-center py-8">
                <div className="flex flex-col items-center space-y-3 text-slate-600">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                  <span className="text-sm font-bold tracking-wide">
                    {isGeneratingInsights ? 'GENERATING AI INSIGHTS...' : 'PROCESSING REQUEST...'}
                  </span>
                  {isGeneratingInsights && (
                    <p className="text-xs text-slate-500 text-center font-serif leading-relaxed max-w-xs">
                      Analyzing document complexity and generating comprehensive legal insights
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="px-5 py-4 border-t border-slate-200 bg-slate-50 space-y-3">
            {/* Generate Insights Button */}
            <button 
              onClick={generateAIInsights}
              disabled={isGeneratingInsights || !documentData}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 text-sm tracking-wide"
            >
              {isGeneratingInsights ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>GENERATING INSIGHTS...</span>
                </>
              ) : (
                <>
                  <span>🤖</span>
                  <span>GENERATE AI INSIGHTS</span>
                </>
              )}
            </button>

            {/* Quick Actions */}
            {documentData && (
              <div className="flex space-x-2">
                <button
                  onClick={() => downloadDocument(documentId, 'docx')}
                  className="flex-1 bg-green-100 hover:bg-green-200 text-green-800 py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-1 text-xs font-bold tracking-wide"
                >
                  <Download className="h-3 w-3" />
                  <span>DOCX</span>
                </button>
                <button
                  onClick={() => downloadDocument(documentId, 'pdf')}
                  className="flex-1 bg-red-100 hover:bg-red-200 text-red-800 py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-1 text-xs font-bold tracking-wide"
                >
                  <Download className="h-3 w-3" />
                  <span>PDF</span>
                </button>
                <button
                  onClick={() => window.confirm('Are you sure you want to delete this document?') && deleteDocument(documentId)}
                  className="flex-1 bg-red-100 hover:bg-red-200 text-red-800 py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-1 text-xs font-bold tracking-wide"
                  disabled={isLoading}
                >
                  <Trash2 className="h-3 w-3" />
                  <span>DELETE</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;