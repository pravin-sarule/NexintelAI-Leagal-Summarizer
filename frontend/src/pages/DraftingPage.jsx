// import React, { useState } from 'react';
// import { ChevronDown, FileText, Gavel, BookOpen } from 'lucide-react';

// const DraftingPage = () => {
//   const [selectedDocType, setSelectedDocType] = useState('Contract Agreement');

//   return (
//     <div className="min-h-screen bg-gray-100 flex">
//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <div className="bg-white border-b border-gray-300 px-6 py-3 flex items-center justify-between shadow-sm">
//           <div className="flex items-center space-x-4">
//             <h1 className="text-lg font-medium text-gray-900">Document Drafting</h1>
//             <div className="relative">
//               <select 
//                 value={selectedDocType}
//                 onChange={(e) => setSelectedDocType(e.target.value)}
//                 className="appearance-none bg-white border border-gray-400 rounded px-3 py-1.5 pr-8 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
//               >
//                 <option>Contract Agreement</option>
//                 <option>Civil Appeal</option>
//                 <option>Writ Petition</option>
//                 <option>Bail Application</option>
//               </select>
//               <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
//             </div>
//           </div>
//           <div className="flex space-x-2">
//             <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded text-sm font-medium">
//               Save
//             </button>
//             <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-1.5 rounded text-sm font-medium">
//               Export PDF
//             </button>
//           </div>
//         </div>

//         {/* Document Content */}
//         <div className="flex-1 p-4 overflow-y-auto">
//           <div className="bg-white rounded border border-gray-300 p-12 max-w-5xl mx-auto shadow-sm">
//             <div className="text-center mb-12">
//               <h2 className="text-base font-bold text-black mb-3">IN THE HIGH COURT OF BOMBAY</h2>
//               <h3 className="text-base font-bold text-black mb-6">CIVIL APPELLATE JURISDICTION</h3>
//               <p className="text-sm text-black">Civil Appeal No. _____ of 2024</p>
//             </div>

//             <div className="border-t-2 border-black mb-8"></div>

//             <div className="space-y-8 text-sm">
//               <div>
//                 <p className="font-bold text-black mb-3">IN THE MATTER OF:</p>
//                 <div className="text-amber-700 bg-amber-50 border border-amber-300 p-1 rounded text-xs">
//                   [ DESCRIBE THE SUBJECT MATTER ]
//                 </div>
//               </div>

//               <div>
//                 <p className="font-bold text-black mb-3">AND IN THE MATTER OF:</p>
//                 <div className="text-amber-700 bg-amber-50 border border-amber-300 p-1 rounded text-xs">
//                   [ LEGAL PROVISIONS/ACTS INVOLVED ]
//                 </div>
//               </div>

//               <div>
//                 <p className="font-bold text-black mb-3">BETWEEN:</p>
//                 <div className="ml-12 space-y-3">
//                   <div className="text-blue-800 bg-blue-50 border border-blue-300 p-1 rounded text-xs">
//                     [ APPELLANT NAME ]
//                   </div>
//                   <div className="text-amber-700 bg-amber-50 border border-amber-300 p-1 rounded text-xs">
//                     [ DETAILS ]
//                   </div>
//                   <p className="text-right text-black text-sm mt-4">... Appellant</p>
//                 </div>
//               </div>

//               <div className="text-center py-4">
//                 <p className="font-bold text-black">VERSUS</p>
//               </div>

//               <div>
//                 <p className="font-bold text-black mb-4">1. BRIEF FACTS:</p>
//                 <div className="text-blue-800 bg-blue-50 border border-blue-300 p-1 rounded text-xs mb-8">
//                   [ INSERT BRIEF FACTS OF THE CASE ]
//                 </div>
//               </div>

//               <div className="text-center mb-6">
//                 <h3 className="font-bold text-black">PRAYER</h3>
//               </div>

//               <div className="mb-8">
//                 <p className="mb-4 text-black">In the circumstances, it is most respectfully prayed that this Hon'ble Court may be pleased to:</p>
//                 <div className="space-y-2 text-black">
//                   <p>1. Allow the present appeal;</p>
//                   <p>2. Set aside the impugned order dated [DATE];</p>
//                   <p>3. Pass such other and further orders as this Hon'ble Court may deem fit and proper in the circumstances of the case;</p>
//                   <p>4. Award costs of this appeal to the Appellant.</p>
//                 </div>
//               </div>

//               <div className="text-center mb-6">
//                 <h3 className="font-bold text-black">VERIFICATION</h3>
//               </div>

//               <div className="mb-12">
//                 <p className="text-black leading-relaxed">
//                   I, <span className="text-blue-800 bg-blue-50 border border-blue-300 px-1 rounded text-xs">[NAME]</span>, the above-named Appellant, do hereby verify that the contents of the above petition are true and correct to the best of my knowledge and belief and that nothing material has been concealed therefrom.
//                 </p>
//               </div>

//               <div className="text-right space-y-2 text-black">
//                 <p className="font-bold">DEPONENT</p>
//                 <p>Place: <span className="text-gray-700 bg-gray-100 border border-gray-400 px-2 py-0.5 rounded text-xs">[PLACE]</span></p>
//                 <p>Date: <span className="text-gray-700 bg-gray-100 border border-gray-400 px-2 py-0.5 rounded text-xs">[DATE]</span></p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Toolbar */}
//         <div className="bg-white border-t border-gray-300 px-6 py-2 flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <label className="flex items-center space-x-2">
//               <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-400 rounded focus:ring-blue-500" />
//               <span className="text-sm text-gray-700">Enable Annotations</span>
//             </label>
//             <div className="flex items-center space-x-2">
//               <span className="text-sm text-gray-700">Font:</span>
//               <select className="border border-gray-400 rounded px-2 py-1 text-sm bg-white">
//                 <option>14px</option>
//                 <option>12px</option>
//                 <option>16px</option>
//                 <option>18px</option>
//               </select>
//             </div>
//             <div className="flex space-x-1">
//               <button className="px-2 py-1 border border-gray-400 rounded hover:bg-gray-100 text-sm font-bold">
//                 B
//               </button>
//               <button className="px-2 py-1 border border-gray-400 rounded hover:bg-gray-100 text-sm italic">
//                 I
//               </button>
//               <button className="px-2 py-1 border border-gray-400 rounded hover:bg-gray-100 text-sm underline">
//                 U
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right Sidebar - AI Drafting Assistant */}
//       <div className="w-80 bg-white border-l border-gray-300 flex flex-col">
//         <div className="p-4 border-b border-gray-300">
//           <h2 className="text-base font-medium text-gray-900 flex items-center mb-3">
//             <FileText className="h-4 w-4 mr-2" />
//             AI Drafting Assistant
//           </h2>
//           <div className="flex space-x-0 border border-gray-300 rounded overflow-hidden">
//             <button className="flex-1 bg-gray-200 text-gray-700 py-2 px-3 text-xs font-medium border-r border-gray-300">
//               Templates
//             </button>
//             <button className="flex-1 bg-gray-200 text-gray-700 py-2 px-3 text-xs font-medium border-r border-gray-300">
//               Clauses
//             </button>
//             <button className="flex-1 bg-blue-600 text-white py-2 px-3 text-xs font-medium">
//               Citations
//             </button>
//           </div>
//         </div>

//         <div className="flex-1 p-4">
//           <div className="mb-6">
//             <h3 className="text-sm font-medium text-gray-800 mb-3">Legal Citations</h3>
//             <div className="space-y-3">
//               <div className="p-3 bg-gray-50 border border-gray-300 rounded">
//                 <p className="text-xs font-medium text-blue-700 mb-1 leading-tight">
//                   State of Haryana v. State of Haryana v. Mukesh Kumar, 2011 (4) SCC 662
//                 </p>
//                 <p className="text-xs text-gray-600 leading-tight">
//                   Mukesh Kumar 2011 (4) SCC 66 State of Haryana v. Mukesh Kumar, 2011 (4) SCC 6622
//                 </p>
//               </div>
//               <div className="p-3 bg-gray-50 border border-gray-300 rounded">
//                 <p className="text-xs font-medium text-blue-700 mb-1 leading-tight">
//                   Maneka Gandhi v.Maneka Gandhi v. Union of India, AIR 1978 SC 597
//                 </p>
//                 <p className="text-xs text-gray-600 leading-tight">
//                   Union of India AIR 1978 SC 597
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="p-4 border-t border-gray-300 space-y-2">
//           <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm font-medium flex items-center justify-center">
//             <Gavel className="h-4 w-4 mr-2" />
//             Generate Content
//           </button>
//           <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded text-sm font-medium flex items-center justify-center">
//             <BookOpen className="h-4 w-4 mr-2" />
//             AI Review
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DraftingPage;


import React, { useState } from 'react';
import { ChevronDown, FileText, Gavel, BookOpen } from 'lucide-react';

const DraftingPage = () => {
  const [selectedDocType, setSelectedDocType] = useState('Contract Agreement');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-300 px-4 lg:px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-sm rounded-t-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <h1 className="text-lg font-medium text-gray-900">Document Drafting</h1>
            <div className="relative w-full sm:w-auto">
              <select 
                value={selectedDocType}
                onChange={(e) => setSelectedDocType(e.target.value)}
                className="appearance-none bg-white border border-gray-400 rounded-lg px-3 py-1.5 pr-8 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 w-full sm:w-auto"
              >
                <option>Contract Agreement</option>
                <option>Civil Appeal</option>
                <option>Writ Petition</option>
                <option>Bail Application</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
          <div className="flex space-x-2 mt-3 sm:mt-0 w-full sm:w-auto">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium flex-1 sm:flex-none">
              Save
            </button>
            <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium flex-1 sm:flex-none">
              Export PDF
            </button>
          </div>
        </div>

        {/* Document Content */}
        <div className="flex-1 p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-8 lg:p-12 max-w-5xl mx-auto shadow-sm">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-sm sm:text-base font-bold text-black mb-3">IN THE HIGH COURT OF BOMBAY</h2>
              <h3 className="text-sm sm:text-base font-bold text-black mb-4 sm:mb-6">CIVIL APPELLATE JURISDICTION</h3>
              <p className="text-xs sm:text-sm text-black">Civil Appeal No. _____ of 2024</p>
            </div>

            <div className="border-t-2 border-black mb-8"></div>

            <div className="space-y-6 sm:space-y-8 text-xs sm:text-sm">
              <div>
                <p className="font-bold text-black mb-2 sm:mb-3">IN THE MATTER OF:</p>
                <div className="text-amber-700 bg-amber-50 border border-amber-300 p-2 rounded-lg text-xs">
                  [ DESCRIBE THE SUBJECT MATTER ]
                </div>
              </div>

              <div>
                <p className="font-bold text-black mb-2 sm:mb-3">AND IN THE MATTER OF:</p>
                <div className="text-amber-700 bg-amber-50 border border-amber-300 p-2 rounded-lg text-xs">
                  [ LEGAL PROVISIONS/ACTS INVOLVED ]
                </div>
              </div>

              <div>
                <p className="font-bold text-black mb-2 sm:mb-3">BETWEEN:</p>
                <div className="ml-4 sm:ml-12 space-y-3">
                  <div className="text-blue-800 bg-blue-50 border border-blue-300 p-2 rounded-lg text-xs">
                    [ APPELLANT NAME ]
                  </div>
                  <div className="text-amber-700 bg-amber-50 border border-amber-300 p-2 rounded-lg text-xs">
                    [ DETAILS ]
                  </div>
                  <p className="text-right text-black text-xs sm:text-sm mt-4">... Appellant</p>
                </div>
              </div>

              <div className="text-center py-4">
                <p className="font-bold text-black">VERSUS</p>
              </div>

              <div>
                <p className="font-bold text-black mb-4">1. BRIEF FACTS:</p>
                <div className="text-blue-800 bg-blue-50 border border-blue-300 p-2 rounded-lg text-xs mb-6 sm:mb-8">
                  [ INSERT BRIEF FACTS OF THE CASE ]
                </div>
              </div>

              <div className="text-center mb-6">
                <h3 className="font-bold text-black">PRAYER</h3>
              </div>

              <div className="mb-8">
                <p className="mb-4 text-black">In the circumstances, it is most respectfully prayed that this Hon'ble Court may be pleased to:</p>
                <div className="space-y-2 text-black">
                  <p>1. Allow the present appeal;</p>
                  <p>2. Set aside the impugned order dated [DATE];</p>
                  <p>3. Pass such other and further orders as this Hon'ble Court may deem fit and proper in the circumstances of the case;</p>
                  <p>4. Award costs of this appeal to the Appellant.</p>
                </div>
              </div>

              <div className="text-center mb-6">
                <h3 className="font-bold text-black">VERIFICATION</h3>
              </div>

              <div className="mb-8 sm:mb-12">
                <p className="text-black leading-relaxed">
                  I, <span className="text-blue-800 bg-blue-50 border border-blue-300 px-2 py-1 rounded-lg text-xs">[NAME]</span>, the above-named Appellant, do hereby verify that the contents of the above petition are true and correct to the best of my knowledge and belief and that nothing material has been concealed therefrom.
                </p>
              </div>

              <div className="text-right space-y-2 text-black">
                <p className="font-bold">DEPONENT</p>
                <p className="flex flex-col sm:flex-row sm:justify-end items-end space-y-1 sm:space-y-0 sm:space-x-2">
                  <span>Place:</span>
                  <span className="text-gray-700 bg-gray-100 border border-gray-400 px-2 py-0.5 rounded-lg text-xs">[PLACE]</span>
                </p>
                <p className="flex flex-col sm:flex-row sm:justify-end items-end space-y-1 sm:space-y-0 sm:space-x-2">
                  <span>Date:</span>
                  <span className="text-gray-700 bg-gray-100 border border-gray-400 px-2 py-0.5 rounded-lg text-xs">[DATE]</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Toolbar */}
        <div className="bg-white border-t border-gray-300 px-4 lg:px-6 py-2 flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 rounded-b-lg lg:rounded-none">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-400 rounded-lg focus:ring-blue-500" />
              <span className="text-sm text-gray-700">Enable Annotations</span>
            </label>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Font:</span>
              <select className="border border-gray-400 rounded-lg px-2 py-1 text-sm bg-white">
                <option>14px</option>
                <option>12px</option>
                <option>16px</option>
                <option>18px</option>
              </select>
            </div>
            <div className="flex space-x-1">
              <button className="px-2 py-1 border border-gray-400 rounded-lg hover:bg-gray-100 text-sm font-bold">
                B
              </button>
              <button className="px-2 py-1 border border-gray-400 rounded-lg hover:bg-gray-100 text-sm italic">
                I
              </button>
              <button className="px-2 py-1 border border-gray-400 rounded-lg hover:bg-gray-100 text-sm underline">
                U
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - AI Drafting Assistant */}
      <div className="w-full lg:w-80 bg-white border-l-0 lg:border-l border-gray-300 flex flex-col rounded-b-lg lg:rounded-l-none lg:rounded-r-lg">
        <div className="p-4 border-b border-gray-300">
          <h2 className="text-base font-medium text-gray-900 flex items-center mb-3">
            <FileText className="h-4 w-4 mr-2" />
            AI Drafting Assistant
          </h2>
          <div className="flex space-x-0 border border-gray-300 rounded-lg overflow-hidden">
            <button className="flex-1 bg-gray-200 text-gray-700 py-2 px-3 text-xs font-medium border-r border-gray-300">
              Templates
            </button>
            <button className="flex-1 bg-gray-200 text-gray-700 py-2 px-3 text-xs font-medium border-r border-gray-300">
              Clauses
            </button>
            <button className="flex-1 bg-blue-600 text-white py-2 px-3 text-xs font-medium">
              Citations
            </button>
          </div>
        </div>

        <div className="flex-1 p-4">
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-800 mb-3">Legal Citations</h3>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 border border-gray-300 rounded-lg">
                <p className="text-xs font-medium text-blue-700 mb-1 leading-tight">
                  State of Haryana v. State of Haryana v. Mukesh Kumar, 2011 (4) SCC 662
                </p>
                <p className="text-xs text-gray-600 leading-tight">
                  Mukesh Kumar 2011 (4) SCC 66 State of Haryana v. Mukesh Kumar, 2011 (4) SCC 6622
                </p>
              </div>
              <div className="p-3 bg-gray-50 border border-gray-300 rounded-lg">
                <p className="text-xs font-medium text-blue-700 mb-1 leading-tight">
                  Maneka Gandhi v.Maneka Gandhi v. Union of India, AIR 1978 SC 597
                </p>
                <p className="text-xs text-gray-600 leading-tight">
                  Union of India AIR 1978 SC 597
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-300 space-y-2">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center">
            <Gavel className="h-4 w-4 mr-2" />
            Generate Content
          </button>
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center">
            <BookOpen className="h-4 w-4 mr-2" />
            AI Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default DraftingPage;