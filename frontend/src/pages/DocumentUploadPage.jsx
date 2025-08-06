

// // import React, { useState, useEffect, useRef } from 'react';

// // const DocumentUploadPage = () => {
// //   const [folders, setFolders] = useState([]);
// //   const [selectedFolder, setSelectedFolder] = useState(null);
// //   const [folderContents, setFolderContents] = useState([]);
// //   const [uploading, setUploading] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const [success, setSuccess] = useState('');
// //   const [dragActive, setDragActive] = useState(false);
// //   const [newFolderName, setNewFolderName] = useState('');
// //   const [showNewFolderInput, setShowNewFolderInput] = useState(false);
// //   const [creatingFolder, setCreatingFolder] = useState(false);
  
// //   const fileInputRef = useRef(null);
// //   const folderInputRef = useRef(null);

// //   // Base API URL
// //   const API_BASE = 'https://drive-1-n7u7.onrender.com/api';

// //   // Get auth token (adjust based on your auth implementation)
// //   const getAuthToken = () => {
// //     return localStorage.getItem('token') || sessionStorage.getItem('token');
// //   };

// //   // API headers with auth
// //   const getHeaders = () => ({
// //     'Authorization': `Bearer ${getAuthToken()}`,
// //   });

// //   // Load user files/folders on component mount
// //   useEffect(() => {
// //     loadUserFiles();
// //   }, []);

// //   const loadUserFiles = async () => {
// //     setLoading(true);
// //     setError('');
// //     try {
// //       const response = await fetch(`${API_BASE}/files`, {
// //         headers: getHeaders(),
// //       });
      
// //       if (!response.ok) {
// //         throw new Error(`Failed to load files: ${response.status}`);
// //       }
      
// //       const data = await response.json();
// //       setFolders(data);
// //     } catch (err) {
// //       setError(`Error loading files: ${err.message}`);
// //       console.error('Error loading files:', err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Load folder contents
// //   const loadFolderContents = async (folderPath = '') => {
// //     setLoading(true);
// //     setError('');
// //     try {
// //       const response = await fetch(`${API_BASE}/files/list?path=${encodeURIComponent(folderPath)}`, {
// //         headers: getHeaders(),
// //       });
      
// //       if (!response.ok) {
// //         throw new Error(`Failed to load folder contents: ${response.status}`);
// //       }
      
// //       const data = await response.json();
// //       setFolderContents(data.items || []);
// //     } catch (err) {
// //       setError(`Error loading folder contents: ${err.message}`);
// //       console.error('Error loading folder contents:', err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Create new folder
// //   const createFolder = async () => {
// //     if (!newFolderName.trim()) {
// //       setError('Please enter a folder name');
// //       return;
// //     }

// //     setCreatingFolder(true);
// //     setError('');
// //     try {
// //       const response = await fetch(`${API_BASE}/files/create-folder`, {
// //         method: 'POST',
// //         headers: {
// //           ...getHeaders(),
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           folderName: newFolderName,
// //           parentPath: selectedFolder?.path || '',
// //         }),
// //       });

// //       if (!response.ok) {
// //         throw new Error(`Failed to create folder: ${response.status}`);
// //       }

// //       setSuccess('Folder created successfully');
// //       setNewFolderName('');
// //       setShowNewFolderInput(false);
// //       await loadUserFiles();
// //       if (selectedFolder) {
// //         await loadFolderContents(selectedFolder.path);
// //       }
// //     } catch (err) {
// //       setError(`Error creating folder: ${err.message}`);
// //       console.error('Error creating folder:', err);
// //     } finally {
// //       setCreatingFolder(false);
// //     }
// //   };

// //   // Upload files
// //   const uploadFiles = async (files, targetFolder = '') => {
// //     if (!files || files.length === 0) {
// //       setError('Please select files to upload');
// //       return;
// //     }

// //     setUploading(true);
// //     setError('');
// //     setSuccess('');

// //     try {
// //       let formData;
// //       let endpoint;
      
// //       // Choose endpoint and prepare form data based on number of files
// //       if (files.length === 1) {
// //         // Single file upload
// //         formData = new FormData();
// //         formData.append('files', files[0]); // Note: your backend expects 'files' field
// //         if (targetFolder) {
// //           formData.append('folderPath', targetFolder);
// //         }
// //         endpoint = '/files/upload';
// //       } else {
// //         // Multiple files upload
// //         formData = new FormData();
// //         Array.from(files).forEach(file => {
// //           formData.append('files', file);
// //         });
// //         if (targetFolder) {
// //           formData.append('folderPath', targetFolder);
// //         }
// //         endpoint = '/files/upload-folder';
// //       }

// //       const response = await fetch(`${API_BASE}${endpoint}`, {
// //         method: 'POST',
// //         headers: getHeaders(),
// //         body: formData,
// //       });

// //       if (!response.ok) {
// //         const errorData = await response.json().catch(() => ({}));
// //         throw new Error(errorData.message || `Upload failed: ${response.status}`);
// //       }

// //       const result = await response.json();
// //       setSuccess(`Successfully uploaded ${files.length} file(s)`);
      
// //       // Refresh the file list
// //       await loadUserFiles();
// //       if (selectedFolder) {
// //         await loadFolderContents(selectedFolder.path);
// //       }

// //       // Clear file input
// //       if (fileInputRef.current) {
// //         fileInputRef.current.value = '';
// //       }
// //       if (folderInputRef.current) {
// //         folderInputRef.current.value = '';
// //       }

// //     } catch (err) {
// //       setError(`Upload error: ${err.message}`);
// //       console.error('Upload error:', err);
// //     } finally {
// //       setUploading(false);
// //     }
// //   };

// //   // Delete file
// //   const deleteFile = async (fileId) => {
// //     if (!confirm('Are you sure you want to delete this file?')) {
// //       return;
// //     }

// //     try {
// //       const response = await fetch(`${API_BASE}/files/${fileId}`, {
// //         method: 'DELETE',
// //         headers: getHeaders(),
// //       });

// //       if (!response.ok) {
// //         throw new Error(`Failed to delete file: ${response.status}`);
// //       }

// //       setSuccess('File deleted successfully');
// //       await loadUserFiles();
// //       if (selectedFolder) {
// //         await loadFolderContents(selectedFolder.path);
// //       }
// //     } catch (err) {
// //       setError(`Error deleting file: ${err.message}`);
// //       console.error('Error deleting file:', err);
// //     }
// //   };

// //   // Handle drag and drop
// //   const handleDrag = (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     if (e.type === 'dragenter' || e.type === 'dragover') {
// //       setDragActive(true);
// //     } else if (e.type === 'dragleave') {
// //       setDragActive(false);
// //     }
// //   };

// //   const handleDrop = (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     setDragActive(false);
    
// //     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
// //       uploadFiles(e.dataTransfer.files, selectedFolder?.path || '');
// //     }
// //   };

// //   // Handle file input change
// //   const handleFileChange = (e) => {
// //     if (e.target.files && e.target.files[0]) {
// //       uploadFiles(e.target.files, selectedFolder?.path || '');
// //     }
// //   };

// //   // Handle folder input change (for folder upload)
// //   const handleFolderChange = (e) => {
// //     if (e.target.files && e.target.files[0]) {
// //       uploadFiles(e.target.files, selectedFolder?.path || '');
// //     }
// //   };

// //   // Render folder tree recursively
// //   const renderFolderTree = (items, level = 0) => {
// //     return items.map((item, index) => (
// //       <div key={index} style={{ marginLeft: `${level * 20}px` }}>
// //         <div
// //           className={`flex items-center py-2 px-3 rounded cursor-pointer hover:bg-gray-100 ${
// //             selectedFolder?.name === item.name ? 'bg-blue-50 text-blue-600' : ''
// //           }`}
// //           onClick={() => {
// //             if (item.type === 'folder') {
// //               setSelectedFolder(item);
// //               loadFolderContents(item.path || '');
// //             }
// //           }}
// //         >
// //           <span className="mr-2">
// //             {item.type === 'folder' ? '📁' : '📄'}
// //           </span>
// //           <span className="text-sm truncate">{item.name}</span>
// //         </div>
// //         {item.children && renderFolderTree(item.children, level + 1)}
// //       </div>
// //     ));
// //   };

// //   // Format file size
// //   const formatFileSize = (bytes) => {
// //     if (bytes === 0) return '0 Bytes';
// //     const k = 1024;
// //     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
// //     const i = Math.floor(Math.log(bytes) / Math.log(k));
// //     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
// //   };

// //   return (
// //     <div className="p-6">
// //       {/* Error/Success Messages */}
// //       {error && (
// //         <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
// //           {error}
// //         </div>
// //       )}
// //       {success && (
// //         <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
// //           {success}
// //         </div>
// //       )}

// //       <div className="grid md:grid-cols-3 gap-6 mb-6">
// //         {/* Folder Tree */}
// //         <div className="md:col-span-1 bg-white p-6 rounded-xl border border-gray-200">
// //           <div className="flex justify-between items-center mb-4">
// //             <h4 className="font-semibold text-gray-800">Case Folders</h4>
// //             <button
// //               onClick={() => setShowNewFolderInput(!showNewFolderInput)}
// //               className="bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-blue-700"
// //               disabled={creatingFolder}
// //             >
// //               + New Folder
// //             </button>
// //           </div>

// //           {/* New Folder Input */}
// //           {showNewFolderInput && (
// //             <div className="mb-4 p-3 bg-gray-50 rounded-lg">
// //               <input
// //                 type="text"
// //                 placeholder="Folder name"
// //                 value={newFolderName}
// //                 onChange={(e) => setNewFolderName(e.target.value)}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm mb-2"
// //                 onKeyPress={(e) => e.key === 'Enter' && createFolder()}
// //               />
// //               <div className="flex gap-2">
// //                 <button
// //                   onClick={createFolder}
// //                   disabled={creatingFolder}
// //                   className="flex-1 bg-green-600 text-white text-xs py-1.5 rounded hover:bg-green-700 disabled:opacity-50"
// //                 >
// //                   {creatingFolder ? 'Creating...' : 'Create'}
// //                 </button>
// //                 <button
// //                   onClick={() => {
// //                     setShowNewFolderInput(false);
// //                     setNewFolderName('');
// //                   }}
// //                   className="flex-1 bg-gray-500 text-white text-xs py-1.5 rounded hover:bg-gray-600"
// //                 >
// //                   Cancel
// //                 </button>
// //               </div>
// //             </div>
// //           )}

// //           <div className="space-y-1 max-h-96 overflow-y-auto">
// //             {loading ? (
// //               <div className="text-center py-4 text-gray-500">Loading...</div>
// //             ) : folders.length > 0 ? (
// //               renderFolderTree(folders)
// //             ) : (
// //               <div className="text-center py-4 text-gray-500">No folders found</div>
// //             )}
// //           </div>
// //         </div>

// //         {/* Folder Contents */}
// //         <div className="md:col-span-2 bg-white p-6 rounded-xl border border-gray-200">
// //           {selectedFolder ? (
// //             <div>
// //               <h4 className="font-semibold text-gray-800 mb-4">
// //                 Contents of: {selectedFolder.name}
// //               </h4>
// //               <div className="space-y-2 max-h-96 overflow-y-auto">
// //                 {folderContents.length > 0 ? (
// //                   folderContents.map((item, index) => (
// //                     <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
// //                       <div className="flex items-center">
// //                         <span className="mr-3">
// //                           {item.isFolder ? '📁' : '📄'}
// //                         </span>
// //                         <div>
// //                           <div className="font-medium text-sm">{item.name}</div>
// //                           {!item.isFolder && (
// //                             <div className="text-xs text-gray-500">
// //                               {formatFileSize(parseInt(item.size || 0))} • {item.type}
// //                             </div>
// //                           )}
// //                         </div>
// //                       </div>
// //                       <div className="flex gap-2">
// //                         {!item.isFolder && item.url && (
// //                           <a
// //                             href={item.url}
// //                             target="_blank"
// //                             rel="noopener noreferrer"
// //                             className="text-blue-600 hover:text-blue-800 text-sm"
// //                           >
// //                             View
// //                           </a>
// //                         )}
// //                         {!item.isFolder && (
// //                           <button
// //                             onClick={() => deleteFile(item.id)}
// //                             className="text-red-600 hover:text-red-800 text-sm"
// //                           >
// //                             Delete
// //                           </button>
// //                         )}
// //                       </div>
// //                     </div>
// //                   ))
// //                 ) : (
// //                   <div className="text-center py-8 text-gray-500">
// //                     This folder is empty
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           ) : (
// //             <div className="flex items-center justify-center h-full text-center text-gray-500">
// //               <div>
// //                 <div className="text-3xl mb-2">📂</div>
// //                 <div>Select a folder from the left to view contents</div>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Upload Area */}
// //       <div
// //         className={`bg-white border-2 border-dashed rounded-xl p-12 text-center transition-all ${
// //           dragActive
// //             ? 'border-blue-500 bg-blue-50'
// //             : 'border-gray-300 hover:border-blue-500'
// //         }`}
// //         onDragEnter={handleDrag}
// //         onDragLeave={handleDrag}
// //         onDragOver={handleDrag}
// //         onDrop={handleDrop}
// //       >
// //         <div className="bg-blue-100 h-12 w-12 rounded-lg inline-flex items-center justify-center mb-4">
// //           <span className="text-2xl">📁</span>
// //         </div>
// //         <h3 className="font-semibold text-gray-800 mb-2">Upload Case Documents</h3>
// //         <p className="text-sm text-gray-600 mb-4">
// //           Drag and drop your PDF, TIFF, PNG, or JPG files here, or click to browse
// //           {selectedFolder && (
// //             <span className="block mt-1 text-blue-600">
// //               Uploading to: {selectedFolder.name}
// //             </span>
// //           )}
// //         </p>
        
// //         <div className="flex gap-4 justify-center">
// //           <button
// //             onClick={() => fileInputRef.current?.click()}
// //             disabled={uploading}
// //             className="bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50"
// //           >
// //             {uploading ? 'Uploading...' : 'Choose Files'}
// //           </button>
          
// //           <button
// //             onClick={() => folderInputRef.current?.click()}
// //             disabled={uploading}
// //             className="bg-green-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-green-700 disabled:opacity-50"
// //           >
// //             Upload Folder
// //           </button>
// //         </div>

// //         {/* Hidden file inputs */}
// //         <input
// //           ref={fileInputRef}
// //           type="file"
// //           multiple
// //           onChange={handleFileChange}
// //           className="hidden"
// //           accept=".pdf,.tiff,.png,.jpg,.jpeg"
// //         />
// //         <input
// //           ref={folderInputRef}
// //           type="file"
// //           multiple
// //           onChange={handleFolderChange}
// //           className="hidden"
// //           webkitdirectory=""
// //           directory=""
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // export default DocumentUploadPage;

// // import React, { useState, useEffect, useRef } from 'react';

// // const DocumentUploadPage = () => {
// //   const [folders, setFolders] = useState([]);
// //   const [selectedFolder, setSelectedFolder] = useState(null);
// //   const [folderContents, setFolderContents] = useState([]);
// //   const [uploading, setUploading] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const [success, setSuccess] = useState('');
// //   const [dragActive, setDragActive] = useState(false);
// //   const [newFolderName, setNewFolderName] = useState('');
// //   const [showNewFolderInput, setShowNewFolderInput] = useState(false);
// //   const [creatingFolder, setCreatingFolder] = useState(false);
// //   const [expandedFolders, setExpandedFolders] = useState(new Set());
  
// //   const fileInputRef = useRef(null);
// //   const folderInputRef = useRef(null);

// //   // Base API URL
// //   const API_BASE = 'http://localhost:3000/api';

// //   // Get auth token (adjust based on your auth implementation)
// //   const getAuthToken = () => {
// //     return localStorage.getItem('token') || sessionStorage.getItem('token');
// //   };

// //   // API headers with auth
// //   const getHeaders = () => ({
// //     'Authorization': `Bearer ${getAuthToken()}`,
// //   });

// //   // Load user files/folders on component mount
// //   useEffect(() => {
// //     loadUserFiles();
// //   }, []);

// //   const loadUserFiles = async () => {
// //     setLoading(true);
// //     setError('');
// //     try {
// //       const response = await fetch(`${API_BASE}/files`, {
// //         headers: getHeaders(),
// //       });
      
// //       if (!response.ok) {
// //         throw new Error(`Failed to load files: ${response.status}`);
// //       }
      
// //       const data = await response.json();
// //       setFolders(processFileStructure(data));
// //     } catch (err) {
// //       setError(`Error loading files: ${err.message}`);
// //       console.error('Error loading files:', err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Process the file structure to include document counts
// //   const processFileStructure = (data) => {
// //     const processNode = (node) => {
// //       if (node.type === 'folder') {
// //         const children = node.children ? node.children.map(processNode) : [];
// //         const documentCount = countDocuments(children);
// //         return {
// //           ...node,
// //           children,
// //           documentCount,
// //           isFolder: true
// //         };
// //       } else {
// //         return {
// //           ...node,
// //           isFolder: false
// //         };
// //       }
// //     };

// //     return Array.isArray(data) ? data.map(processNode) : [];
// //   };

// //   // Count documents in a folder (including subfolders)
// //   const countDocuments = (children) => {
// //     let count = 0;
// //     children.forEach(child => {
// //       if (child.type === 'file') {
// //         count++;
// //       } else if (child.type === 'folder' && child.children) {
// //         count += countDocuments(child.children);
// //       }
// //     });
// //     return count;
// //   };

// //   // Load folder contents
// //   const loadFolderContents = async (folderPath = '') => {
// //     setLoading(true);
// //     setError('');
// //     try {
// //       const response = await fetch(`${API_BASE}/files/list?path=${encodeURIComponent(folderPath)}`, {
// //         headers: getHeaders(),
// //       });
      
// //       if (!response.ok) {
// //         throw new Error(`Failed to load folder contents: ${response.status}`);
// //       }
      
// //       const data = await response.json();
// //       setFolderContents(data.items || []);
// //     } catch (err) {
// //       setError(`Error loading folder contents: ${err.message}`);
// //       console.error('Error loading folder contents:', err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Create new folder
// //   const createFolder = async () => {
// //     if (!newFolderName.trim()) {
// //       setError('Please enter a folder name');
// //       return;
// //     }

// //     setCreatingFolder(true);
// //     setError('');
// //     try {
// //       const parentPath = selectedFolder ? 
// //         (selectedFolder.folder_path ? `${selectedFolder.folder_path}/` : '') : '';
      
// //       const response = await fetch(`${API_BASE}/files/create-folder`, {
// //         method: 'POST',
// //         headers: {
// //           ...getHeaders(),
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           folderName: newFolderName,
// //           parentPath: parentPath,
// //         }),
// //       });

// //       if (!response.ok) {
// //         throw new Error(`Failed to create folder: ${response.status}`);
// //       }

// //       setSuccess('Folder created successfully');
// //       setNewFolderName('');
// //       setShowNewFolderInput(false);
// //       await loadUserFiles();
// //       if (selectedFolder) {
// //         await loadFolderContents(selectedFolder.folder_path || selectedFolder.path || '');
// //       }
// //     } catch (err) {
// //       setError(`Error creating folder: ${err.message}`);
// //       console.error('Error creating folder:', err);
// //     } finally {
// //       setCreatingFolder(false);
// //     }
// //   };

// //   // Upload files
// //   const uploadFiles = async (files, targetFolder = '') => {
// //     if (!files || files.length === 0) {
// //       setError('Please select files to upload');
// //       return;
// //     }

// //     setUploading(true);
// //     setError('');
// //     setSuccess('');

// //     try {
// //       let formData;
// //       let endpoint;
      
// //       // Choose endpoint and prepare form data based on number of files
// //       if (files.length === 1) {
// //         // Single file upload
// //         formData = new FormData();
// //         formData.append('files', files[0]);
// //         if (targetFolder) {
// //           formData.append('folderPath', targetFolder);
// //         }
// //         endpoint = '/files/upload';
// //       } else {
// //         // Multiple files upload
// //         formData = new FormData();
// //         Array.from(files).forEach(file => {
// //           formData.append('files', file);
// //         });
// //         if (targetFolder) {
// //           formData.append('folderPath', targetFolder);
// //         }
// //         endpoint = '/files/upload-folder';
// //       }

// //       const response = await fetch(`${API_BASE}${endpoint}`, {
// //         method: 'POST',
// //         headers: getHeaders(),
// //         body: formData,
// //       });

// //       if (!response.ok) {
// //         const errorData = await response.json().catch(() => ({}));
// //         throw new Error(errorData.message || `Upload failed: ${response.status}`);
// //       }

// //       const result = await response.json();
// //       setSuccess(`Successfully uploaded ${files.length} file(s)`);
      
// //       // Refresh the file list and folder contents
// //       await loadUserFiles();
// //       if (selectedFolder) {
// //         await loadFolderContents(selectedFolder.folder_path || selectedFolder.path || '');
// //       }

// //       // Clear file input
// //       if (fileInputRef.current) {
// //         fileInputRef.current.value = '';
// //       }
// //       if (folderInputRef.current) {
// //         folderInputRef.current.value = '';
// //       }

// //     } catch (err) {
// //       setError(`Upload error: ${err.message}`);
// //       console.error('Upload error:', err);
// //     } finally {
// //       setUploading(false);
// //     }
// //   };

// //   // Delete file
// //   const deleteFile = async (fileId) => {
// //     if (!confirm('Are you sure you want to delete this file?')) {
// //       return;
// //     }

// //     try {
// //       const response = await fetch(`${API_BASE}/files/${fileId}`, {
// //         method: 'DELETE',
// //         headers: getHeaders(),
// //       });

// //       if (!response.ok) {
// //         throw new Error(`Failed to delete file: ${response.status}`);
// //       }

// //       setSuccess('File deleted successfully');
// //       await loadUserFiles();
// //       if (selectedFolder) {
// //         await loadFolderContents(selectedFolder.folder_path || selectedFolder.path || '');
// //       }
// //     } catch (err) {
// //       setError(`Error deleting file: ${err.message}`);
// //       console.error('Error deleting file:', err);
// //     }
// //   };

// //   // Toggle folder expansion
// //   const toggleFolder = (folderPath) => {
// //     const newExpanded = new Set(expandedFolders);
// //     if (newExpanded.has(folderPath)) {
// //       newExpanded.delete(folderPath);
// //     } else {
// //       newExpanded.add(folderPath);
// //     }
// //     setExpandedFolders(newExpanded);
// //   };

// //   // Select folder and load its contents
// //   const selectFolder = (folder) => {
// //     setSelectedFolder(folder);
// //     const folderPath = folder.folder_path || folder.path || '';
// //     loadFolderContents(folderPath);
    
// //     // Auto-expand parent folders
// //     if (folderPath) {
// //       const pathParts = folderPath.split('/').filter(p => p);
// //       const newExpanded = new Set(expandedFolders);
// //       let currentPath = '';
// //       pathParts.forEach(part => {
// //         currentPath = currentPath ? `${currentPath}/${part}` : part;
// //         newExpanded.add(currentPath);
// //       });
// //       setExpandedFolders(newExpanded);
// //     }
// //   };

// //   // Handle drag and drop
// //   const handleDrag = (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     if (e.type === 'dragenter' || e.type === 'dragover') {
// //       setDragActive(true);
// //     } else if (e.type === 'dragleave') {
// //       setDragActive(false);
// //     }
// //   };

// //   const handleDrop = (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     setDragActive(false);
    
// //     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
// //       const targetPath = selectedFolder ? (selectedFolder.folder_path || selectedFolder.path || '') : '';
// //       uploadFiles(e.dataTransfer.files, targetPath);
// //     }
// //   };

// //   // Handle file input change
// //   const handleFileChange = (e) => {
// //     if (e.target.files && e.target.files[0]) {
// //       const targetPath = selectedFolder ? (selectedFolder.folder_path || selectedFolder.path || '') : '';
// //       uploadFiles(e.target.files, targetPath);
// //     }
// //   };

// //   // Handle folder input change (for folder upload)
// //   const handleFolderChange = (e) => {
// //     if (e.target.files && e.target.files[0]) {
// //       const targetPath = selectedFolder ? (selectedFolder.folder_path || selectedFolder.path || '') : '';
// //       uploadFiles(e.target.files, targetPath);
// //     }
// //   };

// //   // Render folder tree recursively
// //   const renderFolderTree = (items, level = 0, parentPath = '') => {
// //     return items.map((item, index) => {
// //       const itemPath = parentPath ? `${parentPath}/${item.name}` : item.name;
// //       const isExpanded = expandedFolders.has(itemPath);
// //       const hasChildren = item.children && item.children.length > 0;
      
// //       if (item.type === 'folder' || item.isFolder) {
// //         return (
// //           <div key={`${itemPath}-${index}`}>
// //             <div
// //               className={`flex items-center py-2 px-3 rounded cursor-pointer hover:bg-gray-100 ${
// //                 selectedFolder?.name === item.name && selectedFolder?.folder_path === item.folder_path 
// //                   ? 'bg-blue-50 text-blue-600' 
// //                   : ''
// //               }`}
// //               style={{ marginLeft: `${level * 20}px` }}
// //             >
// //               {hasChildren && (
// //                 <button
// //                   onClick={(e) => {
// //                     e.stopPropagation();
// //                     toggleFolder(itemPath);
// //                   }}
// //                   className="mr-1 text-gray-500 hover:text-gray-700"
// //                 >
// //                   {isExpanded ? '▼' : '▶'}
// //                 </button>
// //               )}
// //               <div
// //                 className="flex items-center flex-1"
// //                 onClick={() => selectFolder(item)}
// //               >
// //                 <span className="mr-2">📁</span>
// //                 <span className="text-sm truncate flex-1">{item.name}</span>
// //                 <span className="text-xs text-gray-500 ml-2">
// //                   ({item.documentCount || 0})
// //                 </span>
// //               </div>
// //             </div>
            
// //             {hasChildren && isExpanded && (
// //               <div>
// //                 {renderFolderTree(item.children, level + 1, itemPath)}
// //               </div>
// //             )}
// //           </div>
// //         );
// //       }
// //       return null;
// //     });
// //   };

// //   // Format file size
// //   const formatFileSize = (bytes) => {
// //     if (!bytes || bytes === 0) return '0 Bytes';
// //     const k = 1024;
// //     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
// //     const i = Math.floor(Math.log(bytes) / Math.log(k));
// //     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
// //   };

// //   // Open document in new tab
// //   const openDocument = (url) => {
// //     if (url) {
// //       window.open(url, '_blank', 'noopener,noreferrer');
// //     }
// //   };

// //   return (
// //     <div className="p-6">
// //       {/* Error/Success Messages */}
// //       {error && (
// //         <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
// //           <div className="flex justify-between items-center">
// //             <span>{error}</span>
// //             <button onClick={() => setError('')} className="text-red-600 hover:text-red-800">×</button>
// //           </div>
// //         </div>
// //       )}
// //       {success && (
// //         <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
// //           <div className="flex justify-between items-center">
// //             <span>{success}</span>
// //             <button onClick={() => setSuccess('')} className="text-green-600 hover:text-green-800">×</button>
// //           </div>
// //         </div>
// //       )}

// //       <div className="grid md:grid-cols-3 gap-6 mb-6">
// //         {/* Folder Tree */}
// //         <div className="md:col-span-1 bg-white p-6 rounded-xl border border-gray-200">
// //           <div className="flex justify-between items-center mb-4">
// //             <h4 className="font-semibold text-gray-800">Case Folders</h4>
// //             <button
// //               onClick={() => setShowNewFolderInput(!showNewFolderInput)}
// //               className="bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-blue-700"
// //               disabled={creatingFolder}
// //             >
// //               + New Folder
// //             </button>
// //           </div>

// //           {/* New Folder Input */}
// //           {showNewFolderInput && (
// //             <div className="mb-4 p-3 bg-gray-50 rounded-lg">
// //               <input
// //                 type="text"
// //                 placeholder="Folder name"
// //                 value={newFolderName}
// //                 onChange={(e) => setNewFolderName(e.target.value)}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm mb-2"
// //                 onKeyPress={(e) => e.key === 'Enter' && createFolder()}
// //               />
// //               <div className="flex gap-2">
// //                 <button
// //                   onClick={createFolder}
// //                   disabled={creatingFolder}
// //                   className="flex-1 bg-green-600 text-white text-xs py-1.5 rounded hover:bg-green-700 disabled:opacity-50"
// //                 >
// //                   {creatingFolder ? 'Creating...' : 'Create'}
// //                 </button>
// //                 <button
// //                   onClick={() => {
// //                     setShowNewFolderInput(false);
// //                     setNewFolderName('');
// //                   }}
// //                   className="flex-1 bg-gray-500 text-white text-xs py-1.5 rounded hover:bg-gray-600"
// //                 >
// //                   Cancel
// //                 </button>
// //               </div>
// //             </div>
// //           )}

// //           <div className="space-y-1 max-h-96 overflow-y-auto">
// //             {loading ? (
// //               <div className="text-center py-4 text-gray-500">Loading folders...</div>
// //             ) : folders.length > 0 ? (
// //               renderFolderTree(folders)
// //             ) : (
// //               <div className="text-center py-4 text-gray-500">
// //                 <div className="mb-2">📁</div>
// //                 <div>No folders found</div>
// //                 <div className="text-xs mt-1">Create your first folder above</div>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* Folder Contents */}
// //         <div className="md:col-span-2 bg-white p-6 rounded-xl border border-gray-200">
// //           {selectedFolder ? (
// //             <div>
// //               <div className="flex justify-between items-center mb-4">
// //                 <div>
// //                   <h4 className="font-semibold text-gray-800">
// //                     📁 {selectedFolder.name}
// //                   </h4>
// //                   <p className="text-sm text-gray-500">
// //                     {folderContents.length} items
// //                   </p>
// //                 </div>
// //                 <button
// //                   onClick={() => setShowNewFolderInput(!showNewFolderInput)}
// //                   className="bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-green-700"
// //                   disabled={creatingFolder}
// //                 >
// //                   + New Subfolder
// //                 </button>
// //               </div>
              
// //               <div className="space-y-2 max-h-96 overflow-y-auto">
// //                 {loading ? (
// //                   <div className="text-center py-8 text-gray-500">Loading contents...</div>
// //                 ) : folderContents.length > 0 ? (
// //                   folderContents.map((item, index) => (
// //                     <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
// //                       <div className="flex items-center flex-1">
// //                         <span className="mr-3 text-lg">
// //                           {item.isFolder ? '📁' : getFileIcon(item.type)}
// //                         </span>
// //                         <div className="flex-1">
// //                           <div className="font-medium text-sm">{item.name}</div>
// //                           {!item.isFolder && (
// //                             <div className="text-xs text-gray-500">
// //                               {formatFileSize(parseInt(item.size || 0))} • {item.type}
// //                             </div>
// //                           )}
// //                         </div>
// //                       </div>
// //                       <div className="flex gap-2">
// //                         {item.isFolder && (
// //                           <button
// //                             onClick={() => selectFolder({
// //                               name: item.name,
// //                               folder_path: item.path,
// //                               type: 'folder'
// //                             })}
// //                             className="text-blue-600 hover:text-blue-800 text-sm px-2 py-1 rounded"
// //                           >
// //                             Open
// //                           </button>
// //                         )}
// //                         {!item.isFolder && item.url && (
// //                           <button
// //                             onClick={() => openDocument(item.url)}
// //                             className="text-blue-600 hover:text-blue-800 text-sm px-2 py-1 rounded"
// //                           >
// //                             Open
// //                           </button>
// //                         )}
// //                         {!item.isFolder && (
// //                           <button
// //                             onClick={() => deleteFile(item.id)}
// //                             className="text-red-600 hover:text-red-800 text-sm px-2 py-1 rounded"
// //                           >
// //                             Delete
// //                           </button>
// //                         )}
// //                       </div>
// //                     </div>
// //                   ))
// //                 ) : (
// //                   <div className="text-center py-12 text-gray-500">
// //                     <div className="text-4xl mb-4">📄</div>
// //                     <div className="text-lg font-medium mb-2">This folder is empty</div>
// //                     <div className="text-sm">Upload documents using the area below</div>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           ) : (
// //             <div className="flex items-center justify-center h-full text-center text-gray-500">
// //               <div>
// //                 <div className="text-4xl mb-4">📂</div>
// //                 <div className="text-lg font-medium mb-2">Select a folder to view contents</div>
// //                 <div className="text-sm">Choose a folder from the left sidebar to see its documents</div>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Upload Area */}
// //       <div
// //         className={`bg-white border-2 border-dashed rounded-xl p-12 text-center transition-all ${
// //           dragActive
// //             ? 'border-blue-500 bg-blue-50'
// //             : 'border-gray-300 hover:border-blue-500'
// //         }`}
// //         onDragEnter={handleDrag}
// //         onDragLeave={handleDrag}
// //         onDragOver={handleDrag}
// //         onDrop={handleDrop}
// //       >
// //         <div className="bg-blue-100 h-12 w-12 rounded-lg inline-flex items-center justify-center mb-4">
// //           <span className="text-2xl">📁</span>
// //         </div>
// //         <h3 className="font-semibold text-gray-800 mb-2">Upload Case Documents</h3>
// //         <p className="text-sm text-gray-600 mb-4">
// //           Drag and drop your PDF, TIFF, PNG, or JPG files here, or click to browse
// //           {selectedFolder && (
// //             <span className="block mt-1 text-blue-600 font-medium">
// //               📁 Uploading to: {selectedFolder.name}
// //             </span>
// //           )}
// //         </p>
        
// //         <div className="flex gap-4 justify-center">
// //           <button
// //             onClick={() => fileInputRef.current?.click()}
// //             disabled={uploading}
// //             className="bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50"
// //           >
// //             {uploading ? 'Uploading...' : 'Choose Files'}
// //           </button>
          
// //           <button
// //             onClick={() => folderInputRef.current?.click()}
// //             disabled={uploading}
// //             className="bg-green-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-green-700 disabled:opacity-50"
// //           >
// //             Upload Folder
// //           </button>
// //         </div>

// //         {/* Hidden file inputs */}
// //         <input
// //           ref={fileInputRef}
// //           type="file"
// //           multiple
// //           onChange={handleFileChange}
// //           className="hidden"
// //           accept=".pdf,.tiff,.png,.jpg,.jpeg,.doc,.docx"
// //         />
// //         <input
// //           ref={folderInputRef}
// //           type="file"
// //           multiple
// //           onChange={handleFolderChange}
// //           className="hidden"
// //           webkitdirectory=""
// //           directory=""
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // // Helper function to get file icons
// // const getFileIcon = (mimeType) => {
// //   if (!mimeType) return '📄';
  
// //   if (mimeType.includes('pdf')) return '📕';
// //   if (mimeType.includes('image')) return '🖼️';
// //   if (mimeType.includes('word') || mimeType.includes('document')) return '📘';
// //   if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return '📊';
// //   if (mimeType.includes('powerpoint') || mimeType.includes('presentation')) return '📋';
// //   if (mimeType.includes('text')) return '📝';
// //   if (mimeType.includes('video')) return '🎥';
// //   if (mimeType.includes('audio')) return '🎵';
  
// //   return '📄';
// // };

// // export default DocumentUploadPage;

import React, { useState, useEffect, useRef } from 'react';

const DocumentUploadPage = () => {
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [folderContents, setFolderContents] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [showNewFolderInput, setShowNewFolderInput] = useState(false);
  const [creatingFolder, setCreatingFolder] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState(new Set());
  
  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);

  // Base API URL
  const API_BASE = 'https://drive-1-n7u7.onrender.com/api';

  // Get auth token (adjust based on your auth implementation)
  const getAuthToken = () => {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  };

  // API headers with auth
  const getHeaders = () => ({
    'Authorization': `Bearer ${getAuthToken()}`,
  });

  // Load user files/folders on component mount
  useEffect(() => {
    loadUserFiles();
  }, []);

  const loadUserFiles = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE}/files/structure`, {
        headers: getHeaders(),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to load files: ${response.status}`);
      }
      
      const data = await response.json();
      setFolders(processFileStructure(data));
    } catch (err) {
      setError(`Error loading files: ${err.message}`);
      console.error('Error loading files:', err);
    } finally {
      setLoading(false);
    }
  };

  // Process the file structure to include document counts
  const processFileStructure = (data) => {
    const processNode = (node) => {
      if (node.type === 'folder') {
        const children = node.children ? node.children.map(processNode) : [];
        const documentCount = countDocuments(children);
        return {
          ...node,
          children,
          documentCount,
          isFolder: true
        };
      } else {
        return {
          ...node,
          isFolder: false
        };
      }
    };

    return Array.isArray(data) ? data.map(processNode) : [];
  };

  // Count documents in a folder (including subfolders)
  const countDocuments = (children) => {
    let count = 0;
    children.forEach(child => {
      if (child.type === 'file') {
        count++;
      } else if (child.type === 'folder' && child.children) {
        count += countDocuments(child.children);
      }
    });
    return count;
  };

  // Load folder contents
  const loadFolderContents = async (folderPath = '') => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE}/files/list?path=${encodeURIComponent(folderPath)}`, {
        headers: getHeaders(),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to load folder contents: ${response.status}`);
      }
      
      const data = await response.json();
      setFolderContents(data.items || []);
    } catch (err) {
      setError(`Error loading folder contents: ${err.message}`);
      console.error('Error loading folder contents:', err);
    } finally {
      setLoading(false);
    }
  };

  // Create new folder
  const createFolder = async () => {
    if (!newFolderName.trim()) {
      setError('Please enter a folder name');
      return;
    }

    setCreatingFolder(true);
    setError('');
    try {
      const parentPath = selectedFolder ? 
        (selectedFolder.folder_path ? `${selectedFolder.folder_path}/` : '') : '';
      
      const response = await fetch(`${API_BASE}/files/create-folder`, {
        method: 'POST',
        headers: {
          ...getHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          folderName: newFolderName,
          parentPath: parentPath,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create folder: ${response.status}`);
      }

      setSuccess('Folder created successfully');
      setNewFolderName('');
      setShowNewFolderInput(false);
      await loadUserFiles();
      if (selectedFolder) {
        await loadFolderContents(selectedFolder.folder_path || selectedFolder.path || '');
      }
    } catch (err) {
      setError(`Error creating folder: ${err.message}`);
      console.error('Error creating folder:', err);
    } finally {
      setCreatingFolder(false);
    }
  };

  // Upload files
  const uploadFiles = async (files, targetFolder = '') => {
    if (!files || files.length === 0) {
      setError('Please select files to upload');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      let formData;
      let endpoint;
      
      // Choose endpoint and prepare form data based on number of files
      if (files.length === 1) {
        // Single file upload
        formData = new FormData();
        formData.append('files', files[0]);
        if (targetFolder) {
          formData.append('folderPath', targetFolder);
        }
        endpoint = '/files/upload';
      } else {
        // Multiple files upload
        formData = new FormData();
        Array.from(files).forEach(file => {
          formData.append('files', file);
        });
        if (targetFolder) {
          formData.append('folderPath', targetFolder);
        }
        endpoint = '/files/upload-folder';
      }

      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: getHeaders(),
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Upload failed: ${response.status}`);
      }

      const result = await response.json();
      setSuccess(`Successfully uploaded ${files.length} file(s)`);
      
      // Refresh the file list and folder contents
      await loadUserFiles();
      if (selectedFolder) {
        await loadFolderContents(selectedFolder.folder_path || selectedFolder.path || '');
      }

      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      if (folderInputRef.current) {
        folderInputRef.current.value = '';
      }

    } catch (err) {
      setError(`Upload error: ${err.message}`);
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  // Delete file
  const deleteFile = async (fileId) => {
    if (!confirm('Are you sure you want to delete this file?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/files/${fileId}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete file: ${response.status}`);
      }

      setSuccess('File deleted successfully');
      await loadUserFiles();
      if (selectedFolder) {
        await loadFolderContents(selectedFolder.folder_path || selectedFolder.path || '');
      }
    } catch (err) {
      setError(`Error deleting file: ${err.message}`);
      console.error('Error deleting file:', err);
    }
  };

  // Toggle folder expansion
  const toggleFolder = (folderPath) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderPath)) {
      newExpanded.delete(folderPath);
    } else {
      newExpanded.add(folderPath);
    }
    setExpandedFolders(newExpanded);
  };

  // Select folder and load its contents
  const selectFolder = (folder) => {
    setSelectedFolder(folder);
    const folderPath = folder.folder_path || folder.path || '';
    loadFolderContents(folderPath);
    
    // Auto-expand parent folders
    if (folderPath) {
      const pathParts = folderPath.split('/').filter(p => p);
      const newExpanded = new Set(expandedFolders);
      let currentPath = '';
      pathParts.forEach(part => {
        currentPath = currentPath ? `${currentPath}/${part}` : part;
        newExpanded.add(currentPath);
      });
      setExpandedFolders(newExpanded);
    }
  };

  // Handle drag and drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const targetPath = selectedFolder ? (selectedFolder.folder_path || selectedFolder.path || '') : '';
      uploadFiles(e.dataTransfer.files, targetPath);
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const targetPath = selectedFolder ? (selectedFolder.folder_path || selectedFolder.path || '') : '';
      uploadFiles(e.target.files, targetPath);
    }
  };

  // Handle folder input change (for folder upload)
  const handleFolderChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const targetPath = selectedFolder ? (selectedFolder.folder_path || selectedFolder.path || '') : '';
      uploadFiles(e.target.files, targetPath);
    }
  };

  // Render folder tree recursively
  const renderFolderTree = (items, level = 0, parentPath = '') => {
    return items.map((item, index) => {
      const itemPath = parentPath ? `${parentPath}/${item.name}` : item.name;
      const isExpanded = expandedFolders.has(itemPath);
      const hasChildren = item.children && item.children.length > 0;
      
      if (item.type === 'folder' || item.isFolder) {
        return (
          <div key={`${itemPath}-${index}`}>
            <div
              className={`flex items-center py-2 px-3 rounded cursor-pointer hover:bg-gray-100 ${
                selectedFolder?.name === item.name && selectedFolder?.folder_path === item.folder_path 
                  ? 'bg-blue-50 text-blue-600' 
                  : ''
              }`}
              style={{ marginLeft: `${level * 20}px` }}
            >
              {hasChildren && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFolder(itemPath);
                  }}
                  className="mr-1 text-gray-500 hover:text-gray-700"
                >
                  {isExpanded ? '▼' : '▶'}
                </button>
              )}
              <div
                className="flex items-center flex-1"
                onClick={() => selectFolder(item)}
              >
                <span className="mr-2">📁</span>
                <span className="text-sm truncate flex-1">{item.name}</span>
                <span className="text-xs text-gray-500 ml-2">
                  ({item.documentCount || 0})
                </span>
              </div>
            </div>
            
            {hasChildren && isExpanded && (
              <div>
                {renderFolderTree(item.children, level + 1, itemPath)}
              </div>
            )}
          </div>
        );
      }
      return null;
    });
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Open document in new tab
  const openDocument = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="p-6">
      {/* Error/Success Messages */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          <div className="flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError('')} className="text-red-600 hover:text-red-800">×</button>
          </div>
        </div>
      )}
      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          <div className="flex justify-between items-center">
            <span>{success}</span>
            <button onClick={() => setSuccess('')} className="text-green-600 hover:text-green-800">×</button>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {/* Folder Tree */}
        <div className="md:col-span-1 bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold text-gray-800">Case Folders</h4>
            <button
              onClick={() => setShowNewFolderInput(!showNewFolderInput)}
              className="bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-blue-700"
              disabled={creatingFolder}
            >
              + New Folder
            </button>
          </div>

          {/* New Folder Input */}
          {showNewFolderInput && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <input
                type="text"
                placeholder="Folder name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm mb-2"
                onKeyPress={(e) => e.key === 'Enter' && createFolder()}
              />
              <div className="flex gap-2">
                <button
                  onClick={createFolder}
                  disabled={creatingFolder}
                  className="flex-1 bg-green-600 text-white text-xs py-1.5 rounded hover:bg-green-700 disabled:opacity-50"
                >
                  {creatingFolder ? 'Creating...' : 'Create'}
                </button>
                <button
                  onClick={() => {
                    setShowNewFolderInput(false);
                    setNewFolderName('');
                  }}
                  className="flex-1 bg-gray-500 text-white text-xs py-1.5 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="space-y-1 max-h-96 overflow-y-auto">
            {loading ? (
              <div className="text-center py-4 text-gray-500">Loading folders...</div>
            ) : folders.length > 0 ? (
              renderFolderTree(folders)
            ) : (
              <div className="text-center py-4 text-gray-500">
                <div className="mb-2">📁</div>
                <div>No folders found</div>
                <div className="text-xs mt-1">Create your first folder above</div>
              </div>
            )}
          </div>
        </div>

        {/* Folder Contents */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl border border-gray-200">
          {selectedFolder ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="font-semibold text-gray-800">
                    📁 {selectedFolder.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {folderContents.length} items
                  </p>
                </div>
                <button
                  onClick={() => setShowNewFolderInput(!showNewFolderInput)}
                  className="bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-green-700"
                  disabled={creatingFolder}
                >
                  + New Subfolder
                </button>
              </div>
              
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {loading ? (
                  <div className="text-center py-8 text-gray-500">Loading contents...</div>
                ) : folderContents.length > 0 ? (
                  folderContents.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center flex-1">
                        <span className="mr-3 text-lg">
                          {item.isFolder ? '📁' : getFileIcon(item.type)}
                        </span>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{item.name}</div>
                          {!item.isFolder && (
                            <div className="text-xs text-gray-500">
                              {formatFileSize(parseInt(item.size || 0))} • {item.type}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {item.isFolder && (
                          <button
                            onClick={() => selectFolder({
                              name: item.name,
                              folder_path: item.path,
                              type: 'folder'
                            })}
                            className="text-blue-600 hover:text-blue-800 text-sm px-2 py-1 rounded"
                          >
                            Open
                          </button>
                        )}
                        {!item.isFolder && item.url && (
                          <button
                            onClick={() => openDocument(item.url)}
                            className="text-blue-600 hover:text-blue-800 text-sm px-2 py-1 rounded"
                          >
                            Open
                          </button>
                        )}
                        {!item.isFolder && (
                          <button
                            onClick={() => deleteFile(item.id)}
                            className="text-red-600 hover:text-red-800 text-sm px-2 py-1 rounded"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <div className="text-4xl mb-4">📄</div>
                    <div className="text-lg font-medium mb-2">This folder is empty</div>
                    <div className="text-sm">Upload documents using the area below</div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-center text-gray-500">
              <div>
                <div className="text-4xl mb-4">📂</div>
                <div className="text-lg font-medium mb-2">Select a folder to view contents</div>
                <div className="text-sm">Choose a folder from the left sidebar to see its documents</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upload Area */}
      <div
        className={`bg-white border-2 border-dashed rounded-xl p-12 text-center transition-all ${
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-blue-500'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="bg-blue-100 h-12 w-12 rounded-lg inline-flex items-center justify-center mb-4">
          <span className="text-2xl">📁</span>
        </div>
        <h3 className="font-semibold text-gray-800 mb-2">Upload Case Documents</h3>
        <p className="text-sm text-gray-600 mb-4">
          Drag and drop your PDF, TIFF, PNG, or JPG files here, or click to browse
          {selectedFolder && (
            <span className="block mt-1 text-blue-600 font-medium">
              📁 Uploading to: {selectedFolder.name}
            </span>
          )}
        </p>
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Choose Files'}
          </button>
          
          <button
            onClick={() => folderInputRef.current?.click()}
            disabled={uploading}
            className="bg-green-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            Upload Folder
          </button>
        </div>

        {/* Hidden file inputs */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.tiff,.png,.jpg,.jpeg,.doc,.docx"
        />
        <input
          ref={folderInputRef}
          type="file"
          multiple
          onChange={handleFolderChange}
          className="hidden"
          webkitdirectory=""
          directory=""
        />
      </div>
    </div>
  );
};

// Helper function to get file icons
const getFileIcon = (mimeType) => {
  if (!mimeType) return '📄';
  
  if (mimeType.includes('pdf')) return '📕';
  if (mimeType.includes('image')) return '🖼️';
  if (mimeType.includes('word') || mimeType.includes('document')) return '📘';
  if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return '📊';
  if (mimeType.includes('powerpoint') || mimeType.includes('presentation')) return '📋';
  if (mimeType.includes('text')) return '📝';
  if (mimeType.includes('video')) return '🎥';
  if (mimeType.includes('audio')) return '🎵';
  
  return '📄';
};

export default DocumentUploadPage;


// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   FolderIcon, 
//   DocumentIcon, 
//   PlusIcon, 
//   TrashIcon, 
//   EyeIcon,
//   ChevronRightIcon,
//   ChevronDownIcon,
//   CloudArrowUpIcon,
//   MagnifyingGlassIcon,
//   XMarkIcon,
//   CheckCircleIcon,
//   ExclamationTriangleIcon,
//   DocumentArrowUpIcon,
//   FolderPlusIcon
// } from 'lucide-react';

// const DocumentUploadPage = () => {
//   const [folders, setFolders] = useState([]);
//   const [selectedFolder, setSelectedFolder] = useState(null);
//   const [folderContents, setFolderContents] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [dragActive, setDragActive] = useState(false);
//   const [newFolderName, setNewFolderName] = useState('');
//   const [showNewFolderInput, setShowNewFolderInput] = useState(false);
//   const [creatingFolder, setCreatingFolder] = useState(false);
//   const [expandedFolders, setExpandedFolders] = useState(new Set());
//   const [searchQuery, setSearchQuery] = useState('');
//   const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
//   const [uploadProgress, setUploadProgress] = useState(0);
  
//   const fileInputRef = useRef(null);
//   const folderInputRef = useRef(null);

//   // Base API URL
//   const API_BASE = 'https://drive-1-n7u7.onrender.com/api';

//   // Get auth token (using state instead of localStorage for Claude.ai compatibility)
//   const [authToken, setAuthToken] = useState('demo-token');

//   // API headers with auth
//   const getHeaders = () => ({
//     'Authorization': `Bearer ${authToken}`,
//   });

//   // Mock data for demonstration
//   useEffect(() => {
//     // Simulate loading user files
//     const mockFolders = [
//       {
//         id: '1',
//         name: 'Legal Documents',
//         type: 'folder',
//         folder_path: 'legal',
//         documentCount: 12,
//         children: [
//           {
//             id: '2',
//             name: 'Contracts',
//             type: 'folder',
//             folder_path: 'legal/contracts',
//             documentCount: 8,
//             children: []
//           },
//           {
//             id: '3',
//             name: 'Court Filings',
//             type: 'folder',
//             folder_path: 'legal/court',
//             documentCount: 4,
//             children: []
//           }
//         ]
//       },
//       {
//         id: '4',
//         name: 'Client Files',
//         type: 'folder',
//         folder_path: 'clients',
//         documentCount: 23,
//         children: [
//           {
//             id: '5',
//             name: 'Active Cases',
//             type: 'folder',
//             folder_path: 'clients/active',
//             documentCount: 15,
//             children: []
//           },
//           {
//             id: '6',
//             name: 'Archived',
//             type: 'folder',
//             folder_path: 'clients/archived',
//             documentCount: 8,
//             children: []
//           }
//         ]
//       },
//       {
//         id: '7',
//         name: 'Research',
//         type: 'folder',
//         folder_path: 'research',
//         documentCount: 7,
//         children: []
//       }
//     ];
    
//     setFolders(mockFolders);
    
//     // Mock folder contents
//     const mockContents = [
//       {
//         id: '101',
//         name: 'Motion_to_Dismiss.pdf',
//         type: 'application/pdf',
//         size: '2456789',
//         url: '#',
//         created_at: '2024-08-01T10:30:00Z',
//         isFolder: false
//       },
//       {
//         id: '102',
//         name: 'Client_Agreement.docx',
//         type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//         size: '1234567',
//         url: '#',
//         created_at: '2024-08-02T14:15:00Z',
//         isFolder: false
//       },
//       {
//         id: '103',
//         name: 'Evidence_Photos.zip',
//         type: 'application/zip',
//         size: '15678901',
//         url: '#',
//         created_at: '2024-08-03T09:45:00Z',
//         isFolder: false
//       }
//     ];
    
//     if (selectedFolder) {
//       setFolderContents(mockContents);
//     }
//   }, [selectedFolder]);

//   // Create new folder
//   const createFolder = async () => {
//     if (!newFolderName.trim()) {
//       setError('Please enter a folder name');
//       return;
//     }

//     setCreatingFolder(true);
//     setError('');
    
//     // Simulate API call
//     setTimeout(() => {
//       setSuccess('Folder created successfully');
//       setNewFolderName('');
//       setShowNewFolderInput(false);
//       setCreatingFolder(false);
//     }, 1000);
//   };

//   // Upload files with progress simulation
//   const uploadFiles = async (files, targetFolder = '') => {
//     if (!files || files.length === 0) {
//       setError('Please select files to upload');
//       return;
//     }

//     setUploading(true);
//     setError('');
//     setSuccess('');
//     setUploadProgress(0);

//     // Simulate upload progress
//     const progressInterval = setInterval(() => {
//       setUploadProgress(prev => {
//         if (prev >= 90) {
//           clearInterval(progressInterval);
//           return prev;
//         }
//         return prev + Math.random() * 15;
//       });
//     }, 200);

//     // Simulate API call
//     setTimeout(() => {
//       clearInterval(progressInterval);
//       setUploadProgress(100);
//       setTimeout(() => {
//         setUploading(false);
//         setUploadProgress(0);
//         setSuccess(`Successfully uploaded ${files.length} file(s)`);
        
//         if (fileInputRef.current) fileInputRef.current.value = '';
//         if (folderInputRef.current) folderInputRef.current.value = '';
//       }, 500);
//     }, 3000);
//   };

//   // Delete file
//   const deleteFile = async (fileId) => {
//     if (!confirm('Are you sure you want to delete this file?')) {
//       return;
//     }

//     // Simulate API call
//     setTimeout(() => {
//       setSuccess('File deleted successfully');
//       setFolderContents(prev => prev.filter(item => item.id !== fileId));
//     }, 500);
//   };

//   // Toggle folder expansion
//   const toggleFolder = (folderPath) => {
//     const newExpanded = new Set(expandedFolders);
//     if (newExpanded.has(folderPath)) {
//       newExpanded.delete(folderPath);
//     } else {
//       newExpanded.add(folderPath);
//     }
//     setExpandedFolders(newExpanded);
//   };

//   // Select folder and load its contents
//   const selectFolder = (folder) => {
//     setSelectedFolder(folder);
    
//     // Auto-expand parent folders
//     if (folder.folder_path) {
//       const pathParts = folder.folder_path.split('/').filter(p => p);
//       const newExpanded = new Set(expandedFolders);
//       let currentPath = '';
//       pathParts.forEach(part => {
//         currentPath = currentPath ? `${currentPath}/${part}` : part;
//         newExpanded.add(currentPath);
//       });
//       setExpandedFolders(newExpanded);
//     }
//   };

//   // Handle drag and drop
//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === 'dragenter' || e.type === 'dragover') {
//       setDragActive(true);
//     } else if (e.type === 'dragleave') {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
    
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       const targetPath = selectedFolder ? (selectedFolder.folder_path || '') : '';
//       uploadFiles(e.dataTransfer.files, targetPath);
//     }
//   };

//   // Handle file input change
//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       const targetPath = selectedFolder ? (selectedFolder.folder_path || '') : '';
//       uploadFiles(e.target.files, targetPath);
//     }
//   };

//   // Handle folder input change
//   const handleFolderChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       const targetPath = selectedFolder ? (selectedFolder.folder_path || '') : '';
//       uploadFiles(e.target.files, targetPath);
//     }
//   };

//   // Render folder tree recursively
//   const renderFolderTree = (items, level = 0, parentPath = '') => {
//     return items
//       .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
//       .map((item, index) => {
//         const itemPath = parentPath ? `${parentPath}/${item.name}` : item.name;
//         const isExpanded = expandedFolders.has(itemPath);
//         const hasChildren = item.children && item.children.length > 0;
//         const isSelected = selectedFolder?.id === item.id;
        
//         if (item.type === 'folder' || item.isFolder) {
//           return (
//             <div key={`${itemPath}-${index}`} className="select-none">
//               <div
//                 className={`group flex items-center py-2.5 px-3 mx-1 rounded-lg cursor-pointer transition-all duration-200 ${
//                   isSelected
//                     ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm' 
//                     : 'hover:bg-gray-50 hover:shadow-sm'
//                 }`}
//                 style={{ marginLeft: `${level * 16}px` }}
//               >
//                 {hasChildren && (
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleFolder(itemPath);
//                     }}
//                     className="mr-2 p-0.5 rounded hover:bg-gray-200 transition-colors"
//                   >
//                     {isExpanded ? (
//                       <ChevronDownIcon className="w-4 h-4 text-gray-500" />
//                     ) : (
//                       <ChevronRightIcon className="w-4 h-4 text-gray-500" />
//                     )}
//                   </button>
//                 )}
//                 <div
//                   className="flex items-center flex-1 min-w-0"
//                   onClick={() => selectFolder(item)}
//                 >
//                   <FolderIcon className={`w-5 h-5 mr-3 flex-shrink-0 ${
//                     isSelected ? 'text-blue-600' : 'text-gray-400'
//                   }`} />
//                   <span className="text-sm font-medium truncate flex-1">{item.name}</span>
//                   <span className={`text-xs px-2 py-0.5 rounded-full ml-2 ${
//                     isSelected 
//                       ? 'bg-blue-100 text-blue-600' 
//                       : 'bg-gray-100 text-gray-500'
//                   }`}>
//                     {item.documentCount || 0}
//                   </span>
//                 </div>
//               </div>
              
//               {hasChildren && isExpanded && (
//                 <div className="mt-1">
//                   {renderFolderTree(item.children, level + 1, itemPath)}
//                 </div>
//               )}
//             </div>
//           );
//         }
//         return null;
//       });
//   };

//   // Format file size
//   const formatFileSize = (bytes) => {
//     if (!bytes || bytes === 0) return '0 B';
//     const sizes = ['B', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(1024));
//     return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${sizes[i]}`;
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   // Get file icon
//   const getFileIcon = (mimeType) => {
//     if (!mimeType) return <DocumentIcon className="w-5 h-5 text-gray-400" />;
    
//     if (mimeType.includes('pdf')) 
//       return <div className="w-5 h-5 bg-red-100 text-red-600 rounded text-xs font-bold flex items-center justify-center">PDF</div>;
//     if (mimeType.includes('image')) 
//       return <div className="w-5 h-5 bg-green-100 text-green-600 rounded text-xs font-bold flex items-center justify-center">IMG</div>;
//     if (mimeType.includes('word') || mimeType.includes('document')) 
//       return <div className="w-5 h-5 bg-blue-100 text-blue-600 rounded text-xs font-bold flex items-center justify-center">DOC</div>;
//     if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) 
//       return <div className="w-5 h-5 bg-green-100 text-green-600 rounded text-xs font-bold flex items-center justify-center">XLS</div>;
//     if (mimeType.includes('zip') || mimeType.includes('archive')) 
//       return <div className="w-5 h-5 bg-purple-100 text-purple-600 rounded text-xs font-bold flex items-center justify-center">ZIP</div>;
    
//     return <DocumentIcon className="w-5 h-5 text-gray-400" />;
//   };

//   // Open document
//   const openDocument = (url) => {
//     if (url && url !== '#') {
//       window.open(url, '_blank', 'noopener,noreferrer');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 px-6 py-4">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-semibold text-gray-900">Document Manager</h1>
//             <p className="text-sm text-gray-500 mt-1">Organize and manage your case documents</p>
//           </div>
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => folderInputRef.current?.click()}
//               disabled={uploading}
//               className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors"
//             >
//               <FolderPlusIcon className="w-4 h-4 mr-2" />
//               Upload Folder
//             </button>
//             <button
//               onClick={() => fileInputRef.current?.click()}
//               disabled={uploading}
//               className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm"
//             >
//               <DocumentArrowUpIcon className="w-4 h-4 mr-2" />
//               Upload Files
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Alert Messages */}
//       {error && (
//         <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
//           <div className="flex items-center">
//             <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mr-2" />
//             <span className="text-red-800 text-sm font-medium">{error}</span>
//             <button onClick={() => setError('')} className="ml-auto text-red-600 hover:text-red-800">
//               <XMarkIcon className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       )}
      
//       {success && (
//         <div className="mx-6 mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
//           <div className="flex items-center">
//             <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
//             <span className="text-green-800 text-sm font-medium">{success}</span>
//             <button onClick={() => setSuccess('')} className="ml-auto text-green-600 hover:text-green-800">
//               <XMarkIcon className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Upload Progress */}
//       {uploading && (
//         <div className="mx-6 mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//           <div className="flex items-center mb-2">
//             <CloudArrowUpIcon className="w-5 h-5 text-blue-600 mr-2" />
//             <span className="text-blue-800 text-sm font-medium">Uploading files...</span>
//             <span className="ml-auto text-blue-600 text-sm">{Math.round(uploadProgress)}%</span>
//           </div>
//           <div className="w-full bg-blue-200 rounded-full h-2">
//             <div 
//               className="bg-blue-600 h-2 rounded-full transition-all duration-300"
//               style={{ width: `${uploadProgress}%` }}
//             ></div>
//           </div>
//         </div>
//       )}

//       <div className="flex h-[calc(100vh-120px)]">
//         {/* Sidebar */}
//         <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
//           {/* Sidebar Header */}
//           <div className="p-4 border-b border-gray-200">
//             <div className="flex items-center justify-between mb-3">
//               <h3 className="font-semibold text-gray-900">Folders</h3>
//               <button
//                 onClick={() => setShowNewFolderInput(!showNewFolderInput)}
//                 className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
//                 title="Create new folder"
//               >
//                 <PlusIcon className="w-4 h-4" />
//               </button>
//             </div>
            
//             {/* Search */}
//             <div className="relative">
//               <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search folders..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//               />
//             </div>
//           </div>

//           {/* New Folder Input */}
//           {showNewFolderInput && (
//             <div className="p-4 bg-gray-50 border-b border-gray-200">
//               <input
//                 type="text"
//                 placeholder="Enter folder name..."
//                 value={newFolderName}
//                 onChange={(e) => setNewFolderName(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 onKeyPress={(e) => e.key === 'Enter' && createFolder()}
//                 autoFocus
//               />
//               <div className="flex gap-2">
//                 <button
//                   onClick={createFolder}
//                   disabled={creatingFolder}
//                   className="flex-1 bg-blue-600 text-white text-sm py-2 px-3 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
//                 >
//                   {creatingFolder ? 'Creating...' : 'Create'}
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowNewFolderInput(false);
//                     setNewFolderName('');
//                   }}
//                   className="flex-1 bg-gray-300 text-gray-700 text-sm py-2 px-3 rounded-md hover:bg-gray-400 transition-colors"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Folder Tree */}
//           <div className="flex-1 overflow-y-auto p-2">
//             {loading ? (
//               <div className="flex items-center justify-center h-32 text-gray-500">
//                 <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
//                 <span className="ml-2 text-sm">Loading...</span>
//               </div>
//             ) : folders.length > 0 ? (
//               renderFolderTree(folders)
//             ) : (
//               <div className="flex flex-col items-center justify-center h-32 text-gray-500">
//                 <FolderIcon className="w-8 h-8 mb-2" />
//                 <p className="text-sm font-medium">No folders found</p>
//                 <p className="text-xs mt-1">Create your first folder above</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 flex flex-col">
//           {selectedFolder ? (
//             <>
//               {/* Content Header */}
//               <div className="bg-white border-b border-gray-200 px-6 py-4">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <FolderIcon className="w-6 h-6 text-blue-600 mr-3" />
//                     <div>
//                       <h2 className="text-lg font-semibold text-gray-900">{selectedFolder.name}</h2>
//                       <p className="text-sm text-gray-500">{folderContents.length} items</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
//                       className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
//                       title={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
//                     >
//                       <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                         {viewMode === 'grid' ? (
//                           <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
//                         ) : (
//                           <path fillRule="evenodd" d="M3 3a1 1 0 000 2h4a1 1 0 100-2H3zM3 7a1 1 0 000 2h4a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM11 3a1 1 0 000 2h4a1 1 0 100-2h-4zM11 7a1 1 0 000 2h4a1 1 0 100-2h-4zM11 11a1 1 0 100 2h4a1 1 0 100-2h-4z"/>
//                         )}
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Content Area */}
//               <div className="flex-1 overflow-y-auto p-6">
//                 {loading ? (
//                   <div className="flex items-center justify-center h-64 text-gray-500">
//                     <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
//                     <span className="ml-2">Loading contents...</span>
//                   </div>
//                 ) : folderContents.length > 0 ? (
//                   <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-2'}>
//                     {folderContents.map((item, index) => (
//                       <div
//                         key={index}
//                         className={`bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 ${
//                           viewMode === 'grid' ? 'p-4' : 'p-3 flex items-center'
//                         }`}
//                       >
//                         <div className={`flex items-center ${viewMode === 'grid' ? 'mb-3' : 'flex-1'}`}>
//                           {getFileIcon(item.type)}
//                           <div className={`ml-3 ${viewMode === 'grid' ? '' : 'flex-1 min-w-0'}`}>
//                             <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
//                             <div className="flex items-center text-xs text-gray-500 mt-1">
//                               <span>{formatFileSize(parseInt(item.size || 0))}</span>
//                               <span className="mx-1">•</span>
//                               <span>{formatDate(item.created_at)}</span>
//                             </div>
//                           </div>
//                         </div>
                        
//                         <div className={`flex gap-2 ${viewMode === 'grid' ? 'justify-end' : ''}`}>
//                           <button
//                             onClick={() => openDocument(item.url)}
//                             className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
//                             title="Open document"
//                           >
//                             <EyeIcon className="w-4 h-4" />
//                           </button>
//                           <button
//                             onClick={() => deleteFile(item.id)}
//                             className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
//                             title="Delete file"
//                           >
//                             <TrashIcon className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="flex flex-col items-center justify-center h-64 text-gray-500">
//                     <DocumentIcon className="w-12 h-12 mb-4" />
//                     <h3 className="text-lg font-medium mb-2">This folder is empty</h3>
//                     <p className="text-sm text-center">Drag and drop files here or use the upload button</p>
//                   </div>
//                 )}
//               </div>
//             </>
//           ) : (
//             <div className="flex-1 flex items-center justify-center text-gray-500">
//               <div className="text-center">
//                 <FolderIcon className="w-16 h-16 mx-auto mb-4" />
//                 <h3 className="text-xl font-medium mb-2">Select a folder</h3>
//                 <p className="text-sm">Choose a folder from the sidebar to view its contents</p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Upload Drop Zone Overlay */}
//       {dragActive && (
//         <div 
//           className="fixed inset-0 bg-blue-600 bg-opacity-20 flex items-center justify-center z-50"
//           onDragEnter={handleDrag}
//           onDragLeave={handleDrag}
//           onDragOver={handleDrag}
//           onDrop={handleDrop}
//         >
//           <div className="bg-white rounded-xl p-8 shadow-xl border-2 border-blue-300 border-dashed">
//             <CloudArrowUpIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
//             <p className="text-lg font-semibold text-gray-900 text-center">Drop files to upload</p>
//             {selectedFolder && (
//               <p className="text-sm text-gray-500 text-center mt-2">
//                 Uploading to: {selectedFolder.name}
//               </p>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Hidden file inputs */}
//       <input
//         ref={fileInputRef}
//         type="file"
//         multiple
//         onChange={handleFileChange}
//         className="hidden"
//         accept=".pdf,.tiff,.png,.jpg,.jpeg,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip"
//       />
//       <input
//         ref={folderInputRef}
//         type="file"
//         multiple
//         onChange={handleFolderChange}
//         className="hidden"
//         webkitdirectory=""
//         directory=""
//       />

//       {/* Global drag and drop handlers */}
//       <div
//         className="fixed inset-0 pointer-events-none"
//         onDragEnter={handleDrag}
//         onDragLeave={handleDrag}
//         onDragOver={handleDrag}
//         onDrop={handleDrop}
//       />
//     </div>
//   );
// };

// export default DocumentUploadPage;
// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   Folder, 
//   FileText, 
//   Plus, 
//   Trash2, 
//   Eye,
//   ChevronRight,
//   ChevronDown,
//   Upload,
//   Search,
//   X,
//   CheckCircle,
//   AlertTriangle,
//   FileUp,
//   FolderPlus
// } from 'lucide-react';

// const DocumentUploadPage = () => {
//   const [folders, setFolders] = useState([]);
//   const [selectedFolder, setSelectedFolder] = useState(null);
//   const [folderContents, setFolderContents] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [dragActive, setDragActive] = useState(false);
//   const [newFolderName, setNewFolderName] = useState('');
//   const [showNewFolderInput, setShowNewFolderInput] = useState(false);
//   const [creatingFolder, setCreatingFolder] = useState(false);
//   const [expandedFolders, setExpandedFolders] = useState(new Set());
//   const [searchQuery, setSearchQuery] = useState('');
//   const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
//   const [uploadProgress, setUploadProgress] = useState(0);
  
//   const fileInputRef = useRef(null);
//   const folderInputRef = useRef(null);

//   // Base API URL
//   const API_BASE = 'http://localhost:3000/api';

//   // Get auth token (using state instead of localStorage for Claude.ai compatibility)
//   const [authToken, setAuthToken] = useState('demo-token');

//   // API headers with auth
//   const getHeaders = () => ({
//     'Authorization': `Bearer ${authToken}`,
//   });

//   // Mock data for demonstration
//   useEffect(() => {
//     // Simulate loading user files
//     const mockFolders = [
//       {
//         id: '1',
//         name: 'Legal Documents',
//         type: 'folder',
//         folder_path: 'legal',
//         documentCount: 12,
//         children: [
//           {
//             id: '2',
//             name: 'Contracts',
//             type: 'folder',
//             folder_path: 'legal/contracts',
//             documentCount: 8,
//             children: []
//           },
//           {
//             id: '3',
//             name: 'Court Filings',
//             type: 'folder',
//             folder_path: 'legal/court',
//             documentCount: 4,
//             children: []
//           }
//         ]
//       },
//       {
//         id: '4',
//         name: 'Client Files',
//         type: 'folder',
//         folder_path: 'clients',
//         documentCount: 23,
//         children: [
//           {
//             id: '5',
//             name: 'Active Cases',
//             type: 'folder',
//             folder_path: 'clients/active',
//             documentCount: 15,
//             children: []
//           },
//           {
//             id: '6',
//             name: 'Archived',
//             type: 'folder',
//             folder_path: 'clients/archived',
//             documentCount: 8,
//             children: []
//           }
//         ]
//       },
//       {
//         id: '7',
//         name: 'Research',
//         type: 'folder',
//         folder_path: 'research',
//         documentCount: 7,
//         children: []
//       }
//     ];
    
//     setFolders(mockFolders);
    
//     // Mock folder contents
//     const mockContents = [
//       {
//         id: '101',
//         name: 'Motion_to_Dismiss.pdf',
//         type: 'application/pdf',
//         size: '2456789',
//         url: '#',
//         created_at: '2024-08-01T10:30:00Z',
//         isFolder: false
//       },
//       {
//         id: '102',
//         name: 'Client_Agreement.docx',
//         type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//         size: '1234567',
//         url: '#',
//         created_at: '2024-08-02T14:15:00Z',
//         isFolder: false
//       },
//       {
//         id: '103',
//         name: 'Evidence_Photos.zip',
//         type: 'application/zip',
//         size: '15678901',
//         url: '#',
//         created_at: '2024-08-03T09:45:00Z',
//         isFolder: false
//       }
//     ];
    
//     if (selectedFolder) {
//       setFolderContents(mockContents);
//     }
//   }, [selectedFolder]);

//   // Create new folder
//   const createFolder = async () => {
//     if (!newFolderName.trim()) {
//       setError('Please enter a folder name');
//       return;
//     }

//     setCreatingFolder(true);
//     setError('');
    
//     // Simulate API call
//     setTimeout(() => {
//       setSuccess('Folder created successfully');
//       setNewFolderName('');
//       setShowNewFolderInput(false);
//       setCreatingFolder(false);
//     }, 1000);
//   };

//   // Upload files with progress simulation
//   const uploadFiles = async (files, targetFolder = '') => {
//     if (!files || files.length === 0) {
//       setError('Please select files to upload');
//       return;
//     }

//     setUploading(true);
//     setError('');
//     setSuccess('');
//     setUploadProgress(0);

//     // Simulate upload progress
//     const progressInterval = setInterval(() => {
//       setUploadProgress(prev => {
//         if (prev >= 90) {
//           clearInterval(progressInterval);
//           return prev;
//         }
//         return prev + Math.random() * 15;
//       });
//     }, 200);

//     // Simulate API call
//     setTimeout(() => {
//       clearInterval(progressInterval);
//       setUploadProgress(100);
//       setTimeout(() => {
//         setUploading(false);
//         setUploadProgress(0);
//         setSuccess(`Successfully uploaded ${files.length} file(s)`);
        
//         if (fileInputRef.current) fileInputRef.current.value = '';
//         if (folderInputRef.current) folderInputRef.current.value = '';
//       }, 500);
//     }, 3000);
//   };

//   // Delete file
//   const deleteFile = async (fileId) => {
//     if (!confirm('Are you sure you want to delete this file?')) {
//       return;
//     }

//     // Simulate API call
//     setTimeout(() => {
//       setSuccess('File deleted successfully');
//       setFolderContents(prev => prev.filter(item => item.id !== fileId));
//     }, 500);
//   };

//   // Toggle folder expansion
//   const toggleFolder = (folderPath) => {
//     const newExpanded = new Set(expandedFolders);
//     if (newExpanded.has(folderPath)) {
//       newExpanded.delete(folderPath);
//     } else {
//       newExpanded.add(folderPath);
//     }
//     setExpandedFolders(newExpanded);
//   };

//   // Select folder and load its contents
//   const selectFolder = (folder) => {
//     setSelectedFolder(folder);
    
//     // Auto-expand parent folders
//     if (folder.folder_path) {
//       const pathParts = folder.folder_path.split('/').filter(p => p);
//       const newExpanded = new Set(expandedFolders);
//       let currentPath = '';
//       pathParts.forEach(part => {
//         currentPath = currentPath ? `${currentPath}/${part}` : part;
//         newExpanded.add(currentPath);
//       });
//       setExpandedFolders(newExpanded);
//     }
//   };

//   // Handle drag and drop
//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === 'dragenter' || e.type === 'dragover') {
//       setDragActive(true);
//     } else if (e.type === 'dragleave') {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
    
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       const targetPath = selectedFolder ? (selectedFolder.folder_path || '') : '';
//       uploadFiles(e.dataTransfer.files, targetPath);
//     }
//   };

//   // Handle file input change
//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       const targetPath = selectedFolder ? (selectedFolder.folder_path || '') : '';
//       uploadFiles(e.target.files, targetPath);
//     }
//   };

//   // Handle folder input change
//   const handleFolderChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       const targetPath = selectedFolder ? (selectedFolder.folder_path || '') : '';
//       uploadFiles(e.target.files, targetPath);
//     }
//   };

//   // Render folder tree recursively
//   const renderFolderTree = (items, level = 0, parentPath = '') => {
//     return items
//       .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
//       .map((item, index) => {
//         const itemPath = parentPath ? `${parentPath}/${item.name}` : item.name;
//         const isExpanded = expandedFolders.has(itemPath);
//         const hasChildren = item.children && item.children.length > 0;
//         const isSelected = selectedFolder?.id === item.id;
        
//         if (item.type === 'folder' || item.isFolder) {
//           return (
//             <div key={`${itemPath}-${index}`} className="select-none">
//               <div
//                 className={`group flex items-center py-2.5 px-3 mx-1 rounded-lg cursor-pointer transition-all duration-200 ${
//                   isSelected
//                     ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm' 
//                     : 'hover:bg-gray-50 hover:shadow-sm'
//                 }`}
//                 style={{ marginLeft: `${level * 16}px` }}
//               >
//                 {hasChildren && (
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleFolder(itemPath);
//                     }}
//                     className="mr-2 p-0.5 rounded hover:bg-gray-200 transition-colors"
//                   >
//                     {isExpanded ? (
//                       <ChevronDown className="w-4 h-4 text-gray-500" />
//                     ) : (
//                       <ChevronRight className="w-4 h-4 text-gray-500" />
//                     )}
//                   </button>
//                 )}
//                 <div
//                   className="flex items-center flex-1 min-w-0"
//                   onClick={() => selectFolder(item)}
//                 >
//                   <Folder className={`w-5 h-5 mr-3 flex-shrink-0 ${
//                     isSelected ? 'text-blue-600' : 'text-gray-400'
//                   }`} />
//                   <span className="text-sm font-medium truncate flex-1">{item.name}</span>
//                   <span className={`text-xs px-2 py-0.5 rounded-full ml-2 ${
//                     isSelected 
//                       ? 'bg-blue-100 text-blue-600' 
//                       : 'bg-gray-100 text-gray-500'
//                   }`}>
//                     {item.documentCount || 0}
//                   </span>
//                 </div>
//               </div>
              
//               {hasChildren && isExpanded && (
//                 <div className="mt-1">
//                   {renderFolderTree(item.children, level + 1, itemPath)}
//                 </div>
//               )}
//             </div>
//           );
//         }
//         return null;
//       });
//   };

//   // Format file size
//   const formatFileSize = (bytes) => {
//     if (!bytes || bytes === 0) return '0 B';
//     const sizes = ['B', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(1024));
//     return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${sizes[i]}`;
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   // Get file icon
//   const getFileIcon = (mimeType) => {
//     if (!mimeType) return <FileText className="w-5 h-5 text-gray-400" />;
    
//     if (mimeType.includes('pdf')) 
//       return <div className="w-5 h-5 bg-red-100 text-red-600 rounded text-xs font-bold flex items-center justify-center">PDF</div>;
//     if (mimeType.includes('image')) 
//       return <div className="w-5 h-5 bg-green-100 text-green-600 rounded text-xs font-bold flex items-center justify-center">IMG</div>;
//     if (mimeType.includes('word') || mimeType.includes('document')) 
//       return <div className="w-5 h-5 bg-blue-100 text-blue-600 rounded text-xs font-bold flex items-center justify-center">DOC</div>;
//     if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) 
//       return <div className="w-5 h-5 bg-green-100 text-green-600 rounded text-xs font-bold flex items-center justify-center">XLS</div>;
//     if (mimeType.includes('zip') || mimeType.includes('archive')) 
//       return <div className="w-5 h-5 bg-purple-100 text-purple-600 rounded text-xs font-bold flex items-center justify-center">ZIP</div>;
    
//     return <FileText className="w-5 h-5 text-gray-400" />;
//   };

//   // Open document
//   const openDocument = (url) => {
//     if (url && url !== '#') {
//       window.open(url, '_blank', 'noopener,noreferrer');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 px-6 py-4">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-semibold text-gray-900">Document Manager</h1>
//             <p className="text-sm text-gray-500 mt-1">Organize and manage your case documents</p>
//           </div>
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => folderInputRef.current?.click()}
//               disabled={uploading}
//               className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors"
//             >
//               <FolderPlus className="w-4 h-4 mr-2" />
//               Upload Folder
//             </button>
//             <button
//               onClick={() => fileInputRef.current?.click()}
//               disabled={uploading}
//               className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm"
//             >
//               <FileUp className="w-4 h-4 mr-2" />
//               Upload Files
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Alert Messages */}
//       {error && (
//         <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
//           <div className="flex items-center">
//             <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
//             <span className="text-red-800 text-sm font-medium">{error}</span>
//             <button onClick={() => setError('')} className="ml-auto text-red-600 hover:text-red-800">
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       )}
      
//       {success && (
//         <div className="mx-6 mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
//           <div className="flex items-center">
//             <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
//             <span className="text-green-800 text-sm font-medium">{success}</span>
//             <button onClick={() => setSuccess('')} className="ml-auto text-green-600 hover:text-green-800">
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Upload Progress */}
//       {uploading && (
//         <div className="mx-6 mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//           <div className="flex items-center mb-2">
//             <Upload className="w-5 h-5 text-blue-600 mr-2" />
//             <span className="text-blue-800 text-sm font-medium">Uploading files...</span>
//             <span className="ml-auto text-blue-600 text-sm">{Math.round(uploadProgress)}%</span>
//           </div>
//           <div className="w-full bg-blue-200 rounded-full h-2">
//             <div 
//               className="bg-blue-600 h-2 rounded-full transition-all duration-300"
//               style={{ width: `${uploadProgress}%` }}
//             ></div>
//           </div>
//         </div>
//       )}

//       <div className="flex h-[calc(100vh-120px)]">
//         {/* Sidebar */}
//         <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
//           {/* Sidebar Header */}
//           <div className="p-4 border-b border-gray-200">
//             <div className="flex items-center justify-between mb-3">
//               <h3 className="font-semibold text-gray-900">Folders</h3>
//               <button
//                 onClick={() => setShowNewFolderInput(!showNewFolderInput)}
//                 className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
//                 title="Create new folder"
//               >
//                 <Plus className="w-4 h-4" />
//               </button>
//             </div>
            
//             {/* Search */}
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search folders..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//               />
//             </div>
//           </div>

//           {/* New Folder Input */}
//           {showNewFolderInput && (
//             <div className="p-4 bg-gray-50 border-b border-gray-200">
//               <input
//                 type="text"
//                 placeholder="Enter folder name..."
//                 value={newFolderName}
//                 onChange={(e) => setNewFolderName(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 onKeyPress={(e) => e.key === 'Enter' && createFolder()}
//                 autoFocus
//               />
//               <div className="flex gap-2">
//                 <button
//                   onClick={createFolder}
//                   disabled={creatingFolder}
//                   className="flex-1 bg-blue-600 text-white text-sm py-2 px-3 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
//                 >
//                   {creatingFolder ? 'Creating...' : 'Create'}
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowNewFolderInput(false);
//                     setNewFolderName('');
//                   }}
//                   className="flex-1 bg-gray-300 text-gray-700 text-sm py-2 px-3 rounded-md hover:bg-gray-400 transition-colors"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Folder Tree */}
//           <div className="flex-1 overflow-y-auto p-2">
//             {loading ? (
//               <div className="flex items-center justify-center h-32 text-gray-500">
//                 <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
//                 <span className="ml-2 text-sm">Loading...</span>
//               </div>
//             ) : folders.length > 0 ? (
//               renderFolderTree(folders)
//             ) : (
//               <div className="flex flex-col items-center justify-center h-32 text-gray-500">
//                 <Folder className="w-8 h-8 mb-2" />
//                 <p className="text-sm font-medium">No folders found</p>
//                 <p className="text-xs mt-1">Create your first folder above</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 flex flex-col">
//           {selectedFolder ? (
//             <>
//               {/* Content Header */}
//               <div className="bg-white border-b border-gray-200 px-6 py-4">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <Folder className="w-6 h-6 text-blue-600 mr-3" />
//                     <div>
//                       <h2 className="text-lg font-semibold text-gray-900">{selectedFolder.name}</h2>
//                       <p className="text-sm text-gray-500">{folderContents.length} items</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
//                       className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
//                       title={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
//                     >
//                       <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                         {viewMode === 'grid' ? (
//                           <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
//                         ) : (
//                           <path fillRule="evenodd" d="M3 3a1 1 0 000 2h4a1 1 0 100-2H3zM3 7a1 1 0 000 2h4a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM11 3a1 1 0 000 2h4a1 1 0 100-2h-4zM11 7a1 1 0 000 2h4a1 1 0 100-2h-4zM11 11a1 1 0 100 2h4a1 1 0 100-2h-4z"/>
//                         )}
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Content Area */}
//               <div className="flex-1 overflow-y-auto p-6">
//                 {loading ? (
//                   <div className="flex items-center justify-center h-64 text-gray-500">
//                     <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
//                     <span className="ml-2">Loading contents...</span>
//                   </div>
//                 ) : folderContents.length > 0 ? (
//                   <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-2'}>
//                     {folderContents.map((item, index) => (
//                       <div
//                         key={index}
//                         className={`bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 ${
//                           viewMode === 'grid' ? 'p-4' : 'p-3 flex items-center'
//                         }`}
//                       >
//                         <div className={`flex items-center ${viewMode === 'grid' ? 'mb-3' : 'flex-1'}`}>
//                           {getFileIcon(item.type)}
//                           <div className={`ml-3 ${viewMode === 'grid' ? '' : 'flex-1 min-w-0'}`}>
//                             <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
//                             <div className="flex items-center text-xs text-gray-500 mt-1">
//                               <span>{formatFileSize(parseInt(item.size || 0))}</span>
//                               <span className="mx-1">•</span>
//                               <span>{formatDate(item.created_at)}</span>
//                             </div>
//                           </div>
//                         </div>
                        
//                         <div className={`flex gap-2 ${viewMode === 'grid' ? 'justify-end' : ''}`}>
//                           <button
//                             onClick={() => openDocument(item.url)}
//                             className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
//                             title="Open document"
//                           >
//                             <Eye className="w-4 h-4" />
//                           </button>
//                           <button
//                             onClick={() => deleteFile(item.id)}
//                             className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
//                             title="Delete file"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="flex flex-col items-center justify-center h-64 text-gray-500">
//                     <FileText className="w-12 h-12 mb-4" />
//                     <h3 className="text-lg font-medium mb-2">This folder is empty</h3>
//                     <p className="text-sm text-center">Drag and drop files here or use the upload button</p>
//                   </div>
//                 )}
//               </div>
//             </>
//           ) : (
//             <div className="flex-1 flex items-center justify-center text-gray-500">
//               <div className="text-center">
//                 <Folder className="w-16 h-16 mx-auto mb-4" />
//                 <h3 className="text-xl font-medium mb-2">Select a folder</h3>
//                 <p className="text-sm">Choose a folder from the sidebar to view its contents</p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Upload Drop Zone Overlay */}
//       {dragActive && (
//         <div 
//           className="fixed inset-0 bg-blue-600 bg-opacity-20 flex items-center justify-center z-50"
//           onDragEnter={handleDrag}
//           onDragLeave={handleDrag}
//           onDragOver={handleDrag}
//           onDrop={handleDrop}
//         >
//           <div className="bg-white rounded-xl p-8 shadow-xl border-2 border-blue-300 border-dashed">
//             <Upload className="w-12 h-12 text-blue-600 mx-auto mb-4" />
//             <p className="text-lg font-semibold text-gray-900 text-center">Drop files to upload</p>
//             {selectedFolder && (
//               <p className="text-sm text-gray-500 text-center mt-2">
//                 Uploading to: {selectedFolder.name}
//               </p>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Hidden file inputs */}
//       <input
//         ref={fileInputRef}
//         type="file"
//         multiple
//         onChange={handleFileChange}
//         className="hidden"
//         accept=".pdf,.tiff,.png,.jpg,.jpeg,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip"
//       />
//       <input
//         ref={folderInputRef}
//         type="file"
//         multiple
//         onChange={handleFolderChange}
//         className="hidden"
//         webkitdirectory=""
//         directory=""
//       />

//       {/* Global drag and drop handlers */}
//       <div
//         className="fixed inset-0 pointer-events-none"
//         onDragEnter={handleDrag}
//         onDragLeave={handleDrag}
//         onDragOver={handleDrag}
//         onDrop={handleDrop}
//       />
//     </div>
//   );
// };

// export default DocumentUploadPage;

// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   Folder, 
//   FileText, 
//   Plus, 
//   Trash2, 
//   Eye,
//   ChevronRight,
//   ChevronDown,
//   Upload,
//   Search,
//   X,
//   CheckCircle,
//   AlertTriangle,
//   FileUp,
//   FolderPlus,
//   Grid3X3,
//   List,
//   Calendar,
//   Download,
//   Star,
//   MoreVertical,
//   Filter,
//   SortAsc,
//   RefreshCw,
//   BookOpen,
//   Zap,
//   TrendingUp
// } from 'lucide-react';

// const DocumentManager = () => {
//   const [folders, setFolders] = useState([]);
//   const [selectedFolder, setSelectedFolder] = useState(null);
//   const [folderContents, setFolderContents] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [dragActive, setDragActive] = useState(false);
//   const [newFolderName, setNewFolderName] = useState('');
//   const [showNewFolderInput, setShowNewFolderInput] = useState(false);
//   const [creatingFolder, setCreatingFolder] = useState(false);
//   const [expandedFolders, setExpandedFolders] = useState(new Set());
//   const [searchQuery, setSearchQuery] = useState('');
//   const [viewMode, setViewMode] = useState('grid');
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [selectedDocument, setSelectedDocument] = useState(null);
//   const [showDocumentPreview, setShowDocumentPreview] = useState(false);
//   const [stats, setStats] = useState({
//     totalFiles: 0,
//     totalSize: 0,
//     recentUploads: 0,
//     favorites: 0
//   });

//   const fileInputRef = useRef(null);
//   const folderInputRef = useRef(null);

//   // Base API URL
//   const API_BASE = 'https://localhost:3000/api';

//   // Get auth token (using state for demo, replace with your auth system)
//   const [authToken, setAuthToken] = useState('demo-token');

//   // API headers with auth
//   const getHeaders = () => ({
//     'Authorization': `Bearer ${authToken}`,
//   });

//   // Load user files/folders on component mount
//   useEffect(() => {
//     loadUserFiles();
//   }, []);

//   // Load user files from backend
//   const loadUserFiles = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await fetch(`${API_BASE}/files/structure`, {
//         headers: getHeaders(),
//       });
      
//       if (!response.ok) {
//         throw new Error(`Failed to load files: ${response.status}`);
//       }
      
//       const data = await response.json();
//       setFolders(processFileStructure(data));
      
//       // Load all files for stats calculation
//       await loadAllFiles();
//     } catch (err) {
//       setError(`Error loading files: ${err.message}`);
//       console.error('Error loading files:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Process the file structure to include document counts
//   const processFileStructure = (data) => {
//     const processNode = (node) => {
//       if (node.type === 'folder') {
//         const children = node.children ? node.children.map(processNode) : [];
//         const documentCount = countDocuments(children);
//         return {
//           ...node,
//           children,
//           documentCount,
//           isFolder: true
//         };
//       } else {
//         return {
//           ...node,
//           isFolder: false
//         };
//       }
//     };

//     return Array.isArray(data) ? data.map(processNode) : [];
//   };

//   // Count documents in a folder (including subfolders)
//   const countDocuments = (children) => {
//     let count = 0;
//     children.forEach(child => {
//       if (child.type === 'file') {
//         count++;
//       } else if (child.type === 'folder' && child.children) {
//         count += countDocuments(child.children);
//       }
//     });
//     return count;
//   };

//   // Load all files for stats calculation
//   const loadAllFiles = async () => {
//     try {
//       const response = await fetch(`${API_BASE}/files/list?path=`, {
//         headers: getHeaders(),
//       });
      
//       if (!response.ok) {
//         throw new Error(`Failed to load files: ${response.status}`);
//       }
      
//       const data = await response.json();
//       const files = data.items || [];
//       setFolderContents(files);
      
//       // Calculate stats from real data
//       const totalFiles = files.filter(item => !item.isFolder).length;
//       const totalSize = files.reduce((acc, file) => acc + parseInt(file.size || 0), 0);
//       const recentUploads = files.filter(file => 
//         new Date(file.created_at || file.uploadDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
//       ).length;
//       const favorites = files.filter(file => file.isFavorite).length;
      
//       setStats({ totalFiles, totalSize, recentUploads, favorites });
//     } catch (err) {
//       console.error('Error loading files for stats:', err);
//     }
//   };

//   // Load folder contents from backend
//   const loadFolderContents = async (folderPath = '') => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await fetch(`${API_BASE}/files/list?path=${encodeURIComponent(folderPath)}`, {
//         headers: getHeaders(),
//       });
      
//       if (!response.ok) {
//         throw new Error(`Failed to load folder contents: ${response.status}`);
//       }
      
//       const data = await response.json();
//       setFolderContents(data.items || []);
//     } catch (err) {
//       setError(`Error loading folder contents: ${err.message}`);
//       console.error('Error loading folder contents:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Create new folder
//   const createFolder = async () => {
//     if (!newFolderName.trim()) {
//       setError('Please enter a folder name');
//       return;
//     }

//     setCreatingFolder(true);
//     setError('');
//     try {
//       const parentPath = selectedFolder ? 
//         (selectedFolder.folder_path ? `${selectedFolder.folder_path}/` : '') : '';
      
//       const response = await fetch(`${API_BASE}/files/create-folder`, {
//         method: 'POST',
//         headers: {
//           ...getHeaders(),
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           folderName: newFolderName,
//           parentPath: parentPath,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to create folder: ${response.status}`);
//       }

//       setSuccess('Folder created successfully');
//       setNewFolderName('');
//       setShowNewFolderInput(false);
      
//       // Reload the folder structure
//       await loadUserFiles();
//       if (selectedFolder) {
//         await loadFolderContents(selectedFolder.folder_path || selectedFolder.path || '');
//       }
//     } catch (err) {
//       setError(`Error creating folder: ${err.message}`);
//       console.error('Error creating folder:', err);
//     } finally {
//       setCreatingFolder(false);
//     }
//   };

//   // Upload files
//   const uploadFiles = async (files, targetFolder = '') => {
//     if (!files || files.length === 0) {
//       setError('Please select files to upload');
//       return;
//     }

//     setUploading(true);
//     setError('');
//     setSuccess('');
//     setUploadProgress(0);

//     try {
//       let formData;
//       let endpoint;
      
//       // Choose endpoint and prepare form data based on number of files
//       if (files.length === 1) {
//         // Single file upload
//         formData = new FormData();
//         formData.append('files', files[0]);
//         if (targetFolder) {
//           formData.append('folderPath', targetFolder);
//         }
//         endpoint = '/files/upload';
//       } else {
//         // Multiple files upload
//         formData = new FormData();
//         Array.from(files).forEach(file => {
//           formData.append('files', file);
//         });
//         if (targetFolder) {
//           formData.append('folderPath', targetFolder);
//         }
//         endpoint = '/files/upload-folder';
//       }

//       // Simulate progress for better UX
//       const progressInterval = setInterval(() => {
//         setUploadProgress(prev => {
//           if (prev >= 90) {
//             clearInterval(progressInterval);
//             return prev;
//           }
//           return prev + Math.random() * 10;
//         });
//       }, 200);

//       const response = await fetch(`${API_BASE}${endpoint}`, {
//         method: 'POST',
//         headers: getHeaders(),
//         body: formData,
//       });

//       clearInterval(progressInterval);
//       setUploadProgress(100);

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.message || `Upload failed: ${response.status}`);
//       }

//       const result = await response.json();
      
//       setTimeout(async () => {
//         setUploading(false);
//         setUploadProgress(0);
//         setSuccess(`Successfully uploaded ${files.length} file(s)`);
        
//         // Refresh the file list and folder contents
//         await loadUserFiles();
//         if (selectedFolder) {
//           await loadFolderContents(selectedFolder.folder_path || selectedFolder.path || '');
//         }

//         // Clear file input
//         if (fileInputRef.current) {
//           fileInputRef.current.value = '';
//         }
//         if (folderInputRef.current) {
//           folderInputRef.current.value = '';
//         }
//       }, 500);

//     } catch (err) {
//       setError(`Upload error: ${err.message}`);
//       console.error('Upload error:', err);
//       setUploading(false);
//       setUploadProgress(0);
//     }
//   };

//   // Delete file
//   const deleteFile = async (fileId) => {
//     if (!confirm('Are you sure you want to delete this file?')) {
//       return;
//     }

//     try {
//       const response = await fetch(`${API_BASE}/files/${fileId}`, {
//         method: 'DELETE',
//         headers: getHeaders(),
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to delete file: ${response.status}`);
//       }

//       setSuccess('File deleted successfully');
      
//       // Refresh the file list and folder structure
//       await loadUserFiles();
//       if (selectedFolder) {
//         await loadFolderContents(selectedFolder.folder_path || selectedFolder.path || '');
//       }
//     } catch (err) {
//       setError(`Error deleting file: ${err.message}`);
//       console.error('Error deleting file:', err);
//     }
//   };

//   // Toggle favorite (you may need to implement this endpoint in your backend)
//   const toggleFavorite = async (fileId) => {
//     try {
//       const response = await fetch(`${API_BASE}/files/${fileId}/favorite`, {
//         method: 'PATCH',
//         headers: {
//           ...getHeaders(),
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         // Update local state optimistically
//         setFolderContents(prev => prev.map(item => 
//           item.id === fileId ? { ...item, isFavorite: !item.isFavorite } : item
//         ));
        
//         // Refresh stats
//         await loadAllFiles();
//       } else {
//         console.warn('Favorite toggle not implemented on backend');
//         // Still update locally for better UX
//         setFolderContents(prev => prev.map(item => 
//           item.id === fileId ? { ...item, isFavorite: !item.isFavorite } : item
//         ));
//       }
//     } catch (err) {
//       console.warn('Error toggling favorite:', err);
//       // Update locally as fallback
//       setFolderContents(prev => prev.map(item => 
//         item.id === fileId ? { ...item, isFavorite: !item.isFavorite } : item
//       ));
//     }
//   };

//   // Select document for preview
//   const selectDocument = (document) => {
//     setSelectedDocument(document);
//     setShowDocumentPreview(true);
//   };

//   // Toggle folder expansion
//   const toggleFolder = (folderPath) => {
//     const newExpanded = new Set(expandedFolders);
//     if (newExpanded.has(folderPath)) {
//       newExpanded.delete(folderPath);
//     } else {
//       newExpanded.add(folderPath);
//     }
//     setExpandedFolders(newExpanded);
//   };

//   // Select folder and load its contents
//   const selectFolder = (folder) => {
//     setSelectedFolder(folder);
//     const folderPath = folder.folder_path || folder.path || '';
//     loadFolderContents(folderPath);
    
//     // Auto-expand parent folders
//     if (folderPath) {
//       const pathParts = folderPath.split('/').filter(p => p);
//       const newExpanded = new Set(expandedFolders);
//       let currentPath = '';
//       pathParts.forEach(part => {
//         currentPath = currentPath ? `${currentPath}/${part}` : part;
//         newExpanded.add(currentPath);
//       });
//       setExpandedFolders(newExpanded);
//     }
//   };

//   // Handle drag and drop
//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === 'dragenter' || e.type === 'dragover') {
//       setDragActive(true);
//     } else if (e.type === 'dragleave') {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
    
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       const targetPath = selectedFolder ? (selectedFolder.folder_path || selectedFolder.path || '') : '';
//       uploadFiles(e.dataTransfer.files, targetPath);
//     }
//   };

//   // Handle file input changes
//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       const targetPath = selectedFolder ? (selectedFolder.folder_path || selectedFolder.path || '') : '';
//       uploadFiles(e.target.files, targetPath);
//     }
//   };

//   const handleFolderChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       const targetPath = selectedFolder ? (selectedFolder.folder_path || selectedFolder.path || '') : '';
//       uploadFiles(e.target.files, targetPath);
//     }
//   };

//   // Render folder tree
//   const renderFolderTree = (items, level = 0, parentPath = '') => {
//     return items
//       .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
//       .map((item, index) => {
//         const itemPath = parentPath ? `${parentPath}/${item.name}` : item.name;
//         const isExpanded = expandedFolders.has(itemPath);
//         const hasChildren = item.children && item.children.length > 0;
//         const isSelected = selectedFolder?.id === item.id;
        
//         return (
//           <div key={`${itemPath}-${index}`} className="select-none">
//             <div
//               className={`group flex items-center py-3 px-4 mx-2 rounded-xl cursor-pointer transition-all duration-300 ${
//                 isSelected
//                   ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 shadow-lg transform scale-[1.02]' 
//                   : 'hover:bg-gray-50 hover:shadow-md hover:transform hover:scale-[1.01]'
//               }`}
//               style={{ marginLeft: `${level * 20}px` }}
//             >
//               {hasChildren && (
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     toggleFolder(itemPath);
//                   }}
//                   className="mr-3 p-1 rounded-lg hover:bg-gray-200 transition-colors"
//                 >
//                   {isExpanded ? (
//                     <ChevronDown className="w-4 h-4 text-gray-500" />
//                   ) : (
//                     <ChevronRight className="w-4 h-4 text-gray-500" />
//                   )}
//                 </button>
//               )}
//               <div
//                 className="flex items-center flex-1 min-w-0"
//                 onClick={() => selectFolder(item)}
//               >
//                 <Folder className={`w-6 h-6 mr-3 flex-shrink-0 transition-colors ${
//                   isSelected ? 'text-blue-600' : 'text-amber-500'
//                 }`} />
//                 <div className="flex-1 min-w-0">
//                   <span className="text-sm font-semibold truncate block">{item.name}</span>
//                   <span className="text-xs text-gray-500">
//                     {new Date(item.created_at).toLocaleDateString()}
//                   </span>
//                 </div>
//                 <span className={`text-xs px-2 py-1 rounded-full ml-2 font-medium ${
//                   isSelected 
//                     ? 'bg-blue-100 text-blue-700' 
//                     : 'bg-gray-100 text-gray-600'
//                 }`}>
//                   {item.documentCount || 0}
//                 </span>
//               </div>
//             </div>
            
//             {hasChildren && isExpanded && (
//               <div className="mt-1">
//                 {renderFolderTree(item.children, level + 1, itemPath)}
//               </div>
//             )}
//           </div>
//         );
//       });
//   };

//   // Format file size
//   const formatFileSize = (bytes) => {
//     if (!bytes || bytes === 0) return '0 B';
//     const sizes = ['B', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(1024));
//     return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${sizes[i]}`;
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   // Get file icon
//   const getFileIcon = (mimeType) => {
//     if (!mimeType) return <FileText className="w-6 h-6 text-gray-400" />;
    
//     if (mimeType.includes('pdf')) 
//       return <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-red-600 text-white rounded-lg text-xs font-bold flex items-center justify-center shadow-md">PDF</div>;
//     if (mimeType.includes('image')) 
//       return <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-lg text-xs font-bold flex items-center justify-center shadow-md">IMG</div>;
//     if (mimeType.includes('word') || mimeType.includes('document')) 
//       return <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-lg text-xs font-bold flex items-center justify-center shadow-md">DOC</div>;
//     if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) 
//       return <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 text-white rounded-lg text-xs font-bold flex items-center justify-center shadow-md">XLS</div>;
//     if (mimeType.includes('text')) 
//       return <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 text-white rounded-lg text-xs font-bold flex items-center justify-center shadow-md">TXT</div>;
    
//     return <FileText className="w-6 h-6 text-gray-400" />;
//   };

//   // Filter and search files
//   const filteredFiles = folderContents.filter(item => 
//     item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     (item.summary && item.summary.toLowerCase().includes(searchQuery.toLowerCase())) ||
//     (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
//       {/* Modern Header */}
//       <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 px-8 py-6 sticky top-0 z-40">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
//               <Folder className="w-8 h-8 text-white" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
//                 Document Manager
//               </h1>
//               <p className="text-gray-500 text-sm mt-1">AI-powered document organization and analysis</p>
//             </div>
//           </div>
          
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={() => folderInputRef.current?.click()}
//               disabled={uploading}
//               className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white/70 hover:bg-white hover:shadow-lg disabled:opacity-50 transition-all duration-300 hover:scale-105"
//             >
//               <FolderPlus className="w-5 h-5 mr-2" />
//               Upload Folder
//             </button>
//             <button
//               onClick={() => fileInputRef.current?.click()}
//               disabled={uploading}
//               className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
//             >
//               <FileUp className="w-5 h-5 mr-2" />
//               Upload Files
//             </button>
//           </div>
//         </div>

//         {/* Stats Dashboard */}
//         <div className="grid grid-cols-4 gap-6 mt-6">
//           <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50 hover:shadow-lg transition-all duration-300">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Total Files</p>
//                 <p className="text-2xl font-bold text-gray-900">{stats.totalFiles}</p>
//               </div>
//               <FileText className="w-8 h-8 text-blue-500" />
//             </div>
//           </div>
//           <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50 hover:shadow-lg transition-all duration-300">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Storage Used</p>
//                 <p className="text-2xl font-bold text-gray-900">{formatFileSize(stats.totalSize)}</p>
//               </div>
//               <TrendingUp className="w-8 h-8 text-green-500" />
//             </div>
//           </div>
//           <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50 hover:shadow-lg transition-all duration-300">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Recent Uploads</p>
//                 <p className="text-2xl font-bold text-gray-900">{stats.recentUploads}</p>
//               </div>
//               <Zap className="w-8 h-8 text-yellow-500" />
//             </div>
//           </div>
//           <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50 hover:shadow-lg transition-all duration-300">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Favorites</p>
//                 <p className="text-2xl font-bold text-gray-900">{stats.favorites}</p>
//               </div>
//               <Star className="w-8 h-8 text-amber-500" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Alert Messages */}
//       {error && (
//         <div className="mx-8 mt-6 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-2xl shadow-lg">
//           <div className="flex items-center">
//             <AlertTriangle className="w-5 h-5 text-red-600 mr-3" />
//             <span className="text-red-800 text-sm font-medium flex-1">{error}</span>
//             <button onClick={() => setError('')} className="text-red-600 hover:text-red-800 p-1">
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       )}
      
//       {success && (
//         <div className="mx-8 mt-6 p-4 bg-green-50/80 backdrop-blur-sm border border-green-200 rounded-2xl shadow-lg">
//           <div className="flex items-center">
//             <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
//             <span className="text-green-800 text-sm font-medium flex-1">{success}</span>
//             <button onClick={() => setSuccess('')} className="text-green-600 hover:text-green-800 p-1">
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Upload Progress */}
//       {uploading && (
//         <div className="mx-8 mt-6 p-4 bg-blue-50/80 backdrop-blur-sm border border-blue-200 rounded-2xl shadow-lg">
//           <div className="flex items-center mb-3">
//             <Upload className="w-5 h-5 text-blue-600 mr-3 animate-pulse" />
//             <span className="text-blue-800 text-sm font-medium flex-1">
//               Processing files and generating AI summaries...
//             </span>
//             <span className="text-blue-600 text-sm font-bold">{Math.round(uploadProgress)}%</span>
//           </div>
//           <div className="w-full bg-blue-200 rounded-full h-3 shadow-inner">
//             <div 
//               className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-300 shadow-sm"
//               style={{ width: `${uploadProgress}%` }}
//             ></div>
//           </div>
//         </div>
//       )}

//       <div className="flex h-[calc(100vh-280px)] mt-6 mx-8 gap-6">
//         {/* Enhanced Sidebar */}
//         <div className="w-96 bg-white/70 backdrop-blur-lg border border-gray-200/50 rounded-3xl shadow-xl flex flex-col">
//           {/* Sidebar Header */}
//           <div className="p-6 border-b border-gray-200/50">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="font-bold text-lg text-gray-900">Folders</h3>
//               <button
//                 onClick={() => setShowNewFolderInput(!showNewFolderInput)}
//                 className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 hover:scale-110"
//                 title="Create new folder"
//               >
//                 <Plus className="w-5 h-5" />
//               </button>
//             </div>
            
//             {/* Enhanced Search */}
//             <div className="relative">
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search folders and files..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
//               />
//             </div>
//           </div>

//           {/* New Folder Input */}
//           {showNewFolderInput && (
//             <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200/50">
//               <input
//                 type="text"
//                 placeholder="Enter folder name..."
//                 value={newFolderName}
//                 onChange={(e) => setNewFolderName(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
//                 onKeyPress={(e) => e.key === 'Enter' && createFolder()}
//                 autoFocus
//               />
//               <div className="flex gap-3">
//                 <button
//                   onClick={createFolder}
//                   disabled={creatingFolder}
//                   className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm py-3 px-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
//                 >
//                   {creatingFolder ? 'Creating...' : 'Create Folder'}
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowNewFolderInput(false);
//                     setNewFolderName('');
//                   }}
//                   className="flex-1 bg-gray-200 text-gray-700 text-sm py-3 px-4 rounded-xl hover:bg-gray-300 transition-all duration-300 font-medium"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Folder Tree */}
//           <div className="flex-1 overflow-y-auto p-4">
//             {loading ? (
//               <div className="flex items-center justify-center h-32 text-gray-500">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                 <span className="ml-3 text-sm">Loading folders...</span>
//               </div>
//             ) : folders.length > 0 ? (
//               <div className="space-y-2">
//                 {renderFolderTree(folders)}
//               </div>
//             ) : (
//               <div className="flex flex-col items-center justify-center h-32 text-gray-500">
//                 <Folder className="w-12 h-12 mb-3 text-gray-400" />
//                 <p className="text-sm font-medium">No folders found</p>
//                 <p className="text-xs mt-1 text-center">Create your first folder to get started</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Main Content Area */}
//         <div className="flex-1 flex flex-col">
//           {/* Content Header */}
//           <div className="bg-white/70 backdrop-blur-lg border border-gray-200/50 rounded-3xl shadow-xl p-6 mb-6">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 {selectedFolder ? (
//                   <>
//                     <Folder className="w-8 h-8 text-blue-600 mr-4" />
//                     <div>
//                       <h2 className="text-2xl font-bold text-gray-900">{selectedFolder.name}</h2>
//                       <p className="text-gray-500 text-sm">{filteredFiles.length} items • Updated {formatDate(selectedFolder.created_at || new Date().toISOString())}</p>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <FileText className="w-8 h-8 text-gray-600 mr-4" />
//                     <div>
//                       <h2 className="text-2xl font-bold text-gray-900">All Documents</h2>
//                       <p className="text-gray-500 text-sm">{filteredFiles.length} items total</p>
//                     </div>
//                   </>
//                 )}
//               </div>
              
//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
//                   className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-300 hover:scale-110"
//                   title={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
//                 >
//                   {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid3X3 className="w-5 h-5" />}
//                 </button>
//                 <button
//                   onClick={() => loadUserFiles()}
//                   className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-300 hover:scale-110"
//                   title="Refresh"
//                 >
//                   <RefreshCw className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Content Grid/List */}
//           <div className="flex-1 overflow-y-auto">
//             {loading ? (
//               <div className="flex items-center justify-center h-64 text-gray-500">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                 <span className="ml-3">Loading documents...</span>
//               </div>
//             ) : filteredFiles.length > 0 ? (
//               <div className={viewMode === 'grid' ? 
//                 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 
//                 'space-y-4'
//               }>
//                 {filteredFiles.map((item, index) => (
//                   <div
//                     key={index}
//                     className={`group bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/90 ${
//                       viewMode === 'grid' ? 'p-6' : 'p-4 flex items-center'
//                     }`}
//                   >
//                     <div className={`flex items-start ${viewMode === 'grid' ? 'mb-4' : 'flex-1'}`}>
//                       <div className="mr-4 flex-shrink-0">
//                         {getFileIcon(item.type)}
//                       </div>
//                       <div className={`${viewMode === 'grid' ? '' : 'flex-1 min-w-0'}`}>
//                         <div className="flex items-start justify-between mb-2">
//                           <h3 className="text-sm font-semibold text-gray-900 truncate pr-2 group-hover:text-blue-600 transition-colors">
//                             {item.name}
//                           </h3>
//                           <button
//                             onClick={() => toggleFavorite(item.id)}
//                             className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
//                           >
//                             <Star className={`w-4 h-4 ${item.isFavorite ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
//                           </button>
//                         </div>
                        
//                         <div className="flex items-center text-xs text-gray-500 mb-3 space-x-3">
//                           <span>{formatFileSize(parseInt(item.size || 0))}</span>
//                           <span>•</span>
//                           <span>{formatDate(item.created_at)}</span>
//                         </div>

//                         {/* AI-Generated Summary */}
//                         {item.summary && (
//                           <div className="mb-3">
//                             <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
//                               {item.summary}
//                             </p>
//                           </div>
//                         )}

//                         {/* Tags */}
//                         {item.tags && item.tags.length > 0 && (
//                           <div className="flex flex-wrap gap-1 mb-3">
//                             {item.tags.slice(0, 3).map((tag, tagIndex) => (
//                               <span
//                                 key={tagIndex}
//                                 className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg font-medium"
//                               >
//                                 {tag}
//                               </span>
//                             ))}
//                             {item.tags.length > 3 && (
//                               <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg font-medium">
//                                 +{item.tags.length - 3}
//                               </span>
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     </div>
                    
//                     {/* Action Buttons */}
//                     <div className={`flex gap-2 ${viewMode === 'grid' ? 'justify-end' : ''}`}>
//                       <button
//                         onClick={() => selectDocument(item)}
//                         className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 hover:scale-110"
//                         title="Preview document"
//                       >
//                         <BookOpen className="w-4 h-4" />
//                       </button>
//                       <button
//                         onClick={() => window.open(item.url, '_blank')}
//                         className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-300 hover:scale-110"
//                         title="Open document"
//                       >
//                         <Eye className="w-4 h-4" />
//                       </button>
//                       <button
//                         onClick={() => deleteFile(item.id)}
//                         className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 hover:scale-110"
//                         title="Delete file"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="flex flex-col items-center justify-center h-64 text-gray-500">
//                 <FileText className="w-16 h-16 mb-4 text-gray-400" />
//                 <h3 className="text-xl font-medium mb-2">
//                   {searchQuery ? 'No matching documents' : 'No documents found'}
//                 </h3>
//                 <p className="text-sm text-center max-w-md">
//                   {searchQuery 
//                     ? 'Try adjusting your search terms or upload new documents'
//                     : 'Drag and drop files here or use the upload button to get started'
//                   }
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Document Preview Modal */}
//       {showDocumentPreview && selectedDocument && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-8">
//           <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
//             <div className="p-6 border-b border-gray-200 flex items-center justify-between">
//               <div className="flex items-center">
//                 {getFileIcon(selectedDocument.type)}
//                 <div className="ml-4">
//                   <h3 className="text-lg font-semibold text-gray-900">{selectedDocument.name}</h3>
//                   <p className="text-sm text-gray-500">
//                     {formatFileSize(parseInt(selectedDocument.size))} • {formatDate(selectedDocument.created_at)}
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setShowDocumentPreview(false)}
//                 className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
            
//             <div className="p-6 max-h-96 overflow-y-auto">
//               <div className="mb-6">
//                 <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
//                   <Zap className="w-5 h-5 text-yellow-500 mr-2" />
//                   AI-Generated Summary
//                 </h4>
//                 <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200">
//                   <p className="text-gray-700 leading-relaxed">{selectedDocument.summary}</p>
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <h4 className="text-sm font-semibold text-gray-900 mb-3">Tags</h4>
//                 <div className="flex flex-wrap gap-2">
//                   {selectedDocument.tags && selectedDocument.tags.length > 0 ? (
//                     selectedDocument.tags.map((tag, index) => (
//                       <span
//                         key={index}
//                         className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-xl font-medium"
//                       >
//                         {tag}
//                       </span>
//                     ))
//                   ) : (
//                     <span className="text-gray-500 text-sm">No tags available</span>
//                   )}
//                 </div>
//               </div>

//               <div className="flex gap-3">
//                 <button
//                   onClick={() => window.open(selectedDocument.url, '_blank')}
//                   className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
//                 >
//                   Open Document
//                 </button>
//                 <button
//                   onClick={() => toggleFavorite(selectedDocument.id)}
//                   className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center"
//                 >
//                   <Star className={`w-4 h-4 mr-2 ${selectedDocument.isFavorite ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
//                   {selectedDocument.isFavorite ? 'Unfavorite' : 'Favorite'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Upload Drop Zone Overlay */}
//       {dragActive && (
//         <div 
//           className="fixed inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 backdrop-blur-sm flex items-center justify-center z-50"
//           onDragEnter={handleDrag}
//           onDragLeave={handleDrag}
//           onDragOver={handleDrag}
//           onDrop={handleDrop}
//         >
//           <div className="bg-white rounded-3xl p-12 shadow-2xl border-2 border-blue-300 border-dashed max-w-md text-center">
//             <Upload className="w-16 h-16 text-blue-600 mx-auto mb-6 animate-bounce" />
//             <h3 className="text-2xl font-bold text-gray-900 mb-2">Drop files to upload</h3>
//             <p className="text-gray-500">AI will automatically analyze and summarize your documents</p>
//           </div>
//         </div>
//       )}

//       {/* Hidden file inputs */}
//       <input
//         ref={fileInputRef}
//         type="file"
//         multiple
//         onChange={handleFileChange}
//         className="hidden"
//         accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif"
//       />
//       <input
//         ref={folderInputRef}
//         type="file"
//         multiple
//         onChange={handleFolderChange}
//         className="hidden"
//         webkitdirectory=""
//         directory=""
//       />

//       {/* Global drag and drop handlers */}
//       <div
//         className="fixed inset-0 pointer-events-none"
//         onDragEnter={handleDrag}
//         onDragLeave={handleDrag}
//         onDragOver={handleDrag}
//         onDrop={handleDrop}
//       />
//     </div>
//   );
// };

// export default DocumentManager;