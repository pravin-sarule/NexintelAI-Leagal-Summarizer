// import React, { useState, useEffect, useRef } from 'react';
// import { FaFolder, FaFileAlt, FaPlus, FaUpload } from 'react-icons/fa';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import api from '../api'; // Import the axios instance
// // import FileBrowser from '../components/FileBrowser'; // Assuming FileBrowser is in components
// import { jwtDecode } from 'jwt-decode'; // Import jwtDecode

// const DocumentUploadPage = () => {
//   const [newFolderName, setNewFolderName] = useState('');
//   const [showNewFolderModal, setShowNewFolderModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [currentPath, setCurrentPath] = useState(''); // State to manage current path for FileBrowser
//   const [refreshFileBrowser, setRefreshFileBrowser] = useState(false); // State to trigger refresh
//   const [userId, setUserId] = useState(null); // State to store userId

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);
//         setUserId(decodedToken.id);
//       } catch (error) {
//         console.error('Error decoding token:', error);
//         // Handle invalid token, e.g., redirect to login
//       }
//     }
//   }, []);

//   // Function to trigger FileBrowser refresh
//   const handleRefresh = () => {
//     setRefreshFileBrowser((prev) => !prev);
//   };

//   async function handleCreateFolder() {
//     if (!newFolderName.trim()) {
//       toast.error('Folder name cannot be empty.');
//       return;
//     }
//     if (!userId) {
//       toast.error('User not authenticated. Please login.');
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     try {
//       const token = localStorage.getItem('token');
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       // Prepend userId to parentPath for new folder creation
//       const fullParentPath = currentPath ? `${userId}/${currentPath}` : userId;
//       await api.post(
//         '/files/create-folder', // Updated endpoint
//         { folderName: newFolderName, parentPath: fullParentPath },
//         config
//       );
//       toast.success('Folder created successfully!');
//       setShowNewFolderModal(false);
//       setNewFolderName('');
//       handleRefresh(); // Refresh FileBrowser after creating folder
//     } catch (err) {
//       console.error('Error creating folder:', err);
//       toast.error('Failed to create folder.');
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
//       <div className="container mx-auto px-4 py-8 max-w-7xl">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center space-x-3 mb-2">
//             <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
//               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
//               </svg>
//             </div>
//             <h2 className="text-3xl font-bold text-gray-800">Cloud File Manager</h2>
//           </div>
//           <p className="text-gray-600">Manage your files and folders with ease</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//           {/* Create Folder */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
//             <div className="flex items-center space-x-3 mb-4">
//               <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
//                 <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-800">Create New Folder</h3>
//             </div>
//             <div className="space-y-3">
//               <input
//                 type="text"
//                 placeholder="Enter folder name (e.g. docs)"
//                 value={newFolderName}
//                 onChange={(e) => setNewFolderName(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
//               />
//               <button
//                 onClick={handleCreateFolder}
//                 disabled={loading} // Use loading state for create folder button
//                 className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
//               >
//                 {loading ? (
//                   <>
//                     <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     <span>Creating...</span>
//                   </>
//                 ) : (
//                   <>
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                     </svg>
//                     <span>Create Folder</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Upload Folder */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
//             <div className="flex items-center space-x-3 mb-4">
//               <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
//                 <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-800">Upload Folder</h3>
//             </div>
//             <div className="space-y-3">
//               <div className="relative">
//                 <input
//                   type="file"
//                   webkitdirectory="true"
//                   directory="true"
//                   multiple
//                   onChange={(e) => {
//                     const fileList = e.target.files;
//                     if (fileList.length > 0) {
//                       const formData = new FormData();
//                       for (let i = 0; i < fileList.length; i++) {
//                         formData.append('files', fileList[i]);
//                       }
//                       formData.append('folderPath', `${userId}/${currentPath}`); // Prepend userId
//                       setLoading(true);
//                       api.post('/files/upload-to-folder', formData, { // Updated endpoint
//                         headers: { 'Content-Type': 'multipart/form-data' },
//                       })
//                         .then(() => {
//                           toast.success('Folder uploaded successfully!');
//                           handleRefresh();
//                         })
//                         .catch((err) => {
//                           console.error('Upload error:', err);
//                           toast.error('Upload failed.');
//                         })
//                         .finally(() => setLoading(false));
//                     }
//                   }}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                 />
//               </div>
//               <button
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
//               >
//                 {loading ? (
//                   <>
//                     <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     <span>Uploading...</span>
//                   </>
//                 ) : (
//                   <>
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//                     </svg>
//                     <span>Upload Folder</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Upload Files */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
//             <div className="flex items-center space-x-3 mb-4">
//               <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
//                 <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-800">Upload Files</h3>
//             </div>
//             <div className="space-y-3">
//               <input
//                 type="file"
//                 multiple
//                 onChange={(e) => {
//                   const fileList = e.target.files;
//                   if (fileList.length > 0) {
//                     const formData = new FormData();
//                     for (let i = 0; i < fileList.length; i++) {
//                       formData.append('files', fileList[i]);
//                     }
//                     formData.append('folderPath', `${userId}/${currentPath}`); // Prepend userId
//                     setLoading(true);
//                     api.post('/files/upload-to-folder', formData, { // Updated endpoint
//                       headers: { 'Content-Type': 'multipart/form-data' },
//                     })
//                       .then(() => {
//                         toast.success('Files uploaded successfully!');
//                         handleRefresh();
//                       })
//                         .catch((err) => {
//                           console.error('Upload error:', err);
//                           toast.error('Upload failed.');
//                         })
//                         .finally(() => setLoading(false));
//                     }
//                   }}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
//               />
//               <button
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
//               >
//                 {loading ? (
//                   <>
//                     <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     <span>Uploading...</span>
//                   </>
//                 ) : (
//                   <>
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//                     </svg>
//                     <span>Upload Files</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* File & Folder List handled by FileBrowser component */}
//         <FileBrowser currentPath={currentPath} setCurrentPath={setCurrentPath} onRefresh={refreshFileBrowser} />
//       </div>

//       {/* New Folder Modal - Keep this as it's not part of FileBrowser */}
//       {showNewFolderModal && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
//             <h3 className="text-lg font-semibold mb-4">Create New Folder</h3>
//             <input
//               type="text"
//               className="border border-gray-300 p-2 rounded-md w-full mb-4"
//               placeholder="Folder Name"
//               value={newFolderName}
//               onChange={(e) => setNewFolderName(e.target.value)}
//             />
//             <div className="flex justify-end space-x-2">
//               <button
//                 className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
//                 onClick={() => setShowNewFolderModal(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//                 onClick={handleCreateFolder}
//               >
//                 Create
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       <ToastContainer />
//     </div>
//   );
// };

// export default DocumentUploadPage;

import React from 'react';

const DocumentUploadPage = () => {
  return (
    <div>
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-1 bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold text-gray-800">Case Folders</h4>
            <button className="bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-blue-700">
              + New Folder
            </button>
          </div>
          <div className="space-y-1">
            {/* Folder Tree will go here */}
          </div>
        </div>
        <div className="md:col-span-2 bg-white p-6 rounded-xl border border-gray-200 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-3xl mb-2">📂</div>
            <div>Select a folder from the left to view details</div>
          </div>
        </div>
      </div>
      <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-500 transition-all">
        <div className="bg-blue-100 h-12 w-12 rounded-lg inline-flex items-center justify-center mb-4">
          <span className="text-2xl">📁</span>
        </div>
        <h3 className="font-semibold text-gray-800 mb-2">Upload Case Documents</h3>
        <p className="text-sm text-gray-600 mb-4">
          Drag and drop your PDF, TIFF, PNG, or JPG files here, or click to browse
        </p>
        <button className="bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-700">
          Choose Files
        </button>
      </div>
    </div>
  );
};

export default DocumentUploadPage;