

// import React, { useState, useEffect, useRef } from 'react';

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
  
//   const fileInputRef = useRef(null);
//   const folderInputRef = useRef(null);

//   // Base API URL
//   const API_BASE = 'https://drive-1-n7u7.onrender.com/api';

//   // Get auth token (adjust based on your auth implementation)
//   const getAuthToken = () => {
//     return localStorage.getItem('token') || sessionStorage.getItem('token');
//   };

//   // API headers with auth
//   const getHeaders = () => ({
//     'Authorization': `Bearer ${getAuthToken()}`,
//   });

//   // Load user files/folders on component mount
//   useEffect(() => {
//     loadUserFiles();
//   }, []);

//   const loadUserFiles = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await fetch(`${API_BASE}/files`, {
//         headers: getHeaders(),
//       });
      
//       if (!response.ok) {
//         throw new Error(`Failed to load files: ${response.status}`);
//       }
      
//       const data = await response.json();
//       setFolders(data);
//     } catch (err) {
//       setError(`Error loading files: ${err.message}`);
//       console.error('Error loading files:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Load folder contents
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
//       const response = await fetch(`${API_BASE}/files/create-folder`, {
//         method: 'POST',
//         headers: {
//           ...getHeaders(),
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           folderName: newFolderName,
//           parentPath: selectedFolder?.path || '',
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to create folder: ${response.status}`);
//       }

//       setSuccess('Folder created successfully');
//       setNewFolderName('');
//       setShowNewFolderInput(false);
//       await loadUserFiles();
//       if (selectedFolder) {
//         await loadFolderContents(selectedFolder.path);
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

//     try {
//       let formData;
//       let endpoint;
      
//       // Choose endpoint and prepare form data based on number of files
//       if (files.length === 1) {
//         // Single file upload
//         formData = new FormData();
//         formData.append('files', files[0]); // Note: your backend expects 'files' field
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

//       const response = await fetch(`${API_BASE}${endpoint}`, {
//         method: 'POST',
//         headers: getHeaders(),
//         body: formData,
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.message || `Upload failed: ${response.status}`);
//       }

//       const result = await response.json();
//       setSuccess(`Successfully uploaded ${files.length} file(s)`);
      
//       // Refresh the file list
//       await loadUserFiles();
//       if (selectedFolder) {
//         await loadFolderContents(selectedFolder.path);
//       }

//       // Clear file input
//       if (fileInputRef.current) {
//         fileInputRef.current.value = '';
//       }
//       if (folderInputRef.current) {
//         folderInputRef.current.value = '';
//       }

//     } catch (err) {
//       setError(`Upload error: ${err.message}`);
//       console.error('Upload error:', err);
//     } finally {
//       setUploading(false);
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
//       await loadUserFiles();
//       if (selectedFolder) {
//         await loadFolderContents(selectedFolder.path);
//       }
//     } catch (err) {
//       setError(`Error deleting file: ${err.message}`);
//       console.error('Error deleting file:', err);
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
//       uploadFiles(e.dataTransfer.files, selectedFolder?.path || '');
//     }
//   };

//   // Handle file input change
//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       uploadFiles(e.target.files, selectedFolder?.path || '');
//     }
//   };

//   // Handle folder input change (for folder upload)
//   const handleFolderChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       uploadFiles(e.target.files, selectedFolder?.path || '');
//     }
//   };

//   // Render folder tree recursively
//   const renderFolderTree = (items, level = 0) => {
//     return items.map((item, index) => (
//       <div key={index} style={{ marginLeft: `${level * 20}px` }}>
//         <div
//           className={`flex items-center py-2 px-3 rounded cursor-pointer hover:bg-gray-100 ${
//             selectedFolder?.name === item.name ? 'bg-blue-50 text-blue-600' : ''
//           }`}
//           onClick={() => {
//             if (item.type === 'folder') {
//               setSelectedFolder(item);
//               loadFolderContents(item.path || '');
//             }
//           }}
//         >
//           <span className="mr-2">
//             {item.type === 'folder' ? '📁' : '📄'}
//           </span>
//           <span className="text-sm truncate">{item.name}</span>
//         </div>
//         {item.children && renderFolderTree(item.children, level + 1)}
//       </div>
//     ));
//   };

//   // Format file size
//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   return (
//     <div className="p-6">
//       {/* Error/Success Messages */}
//       {error && (
//         <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
//           {error}
//         </div>
//       )}
//       {success && (
//         <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
//           {success}
//         </div>
//       )}

//       <div className="grid md:grid-cols-3 gap-6 mb-6">
//         {/* Folder Tree */}
//         <div className="md:col-span-1 bg-white p-6 rounded-xl border border-gray-200">
//           <div className="flex justify-between items-center mb-4">
//             <h4 className="font-semibold text-gray-800">Case Folders</h4>
//             <button
//               onClick={() => setShowNewFolderInput(!showNewFolderInput)}
//               className="bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-blue-700"
//               disabled={creatingFolder}
//             >
//               + New Folder
//             </button>
//           </div>

//           {/* New Folder Input */}
//           {showNewFolderInput && (
//             <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//               <input
//                 type="text"
//                 placeholder="Folder name"
//                 value={newFolderName}
//                 onChange={(e) => setNewFolderName(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm mb-2"
//                 onKeyPress={(e) => e.key === 'Enter' && createFolder()}
//               />
//               <div className="flex gap-2">
//                 <button
//                   onClick={createFolder}
//                   disabled={creatingFolder}
//                   className="flex-1 bg-green-600 text-white text-xs py-1.5 rounded hover:bg-green-700 disabled:opacity-50"
//                 >
//                   {creatingFolder ? 'Creating...' : 'Create'}
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowNewFolderInput(false);
//                     setNewFolderName('');
//                   }}
//                   className="flex-1 bg-gray-500 text-white text-xs py-1.5 rounded hover:bg-gray-600"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           )}

//           <div className="space-y-1 max-h-96 overflow-y-auto">
//             {loading ? (
//               <div className="text-center py-4 text-gray-500">Loading...</div>
//             ) : folders.length > 0 ? (
//               renderFolderTree(folders)
//             ) : (
//               <div className="text-center py-4 text-gray-500">No folders found</div>
//             )}
//           </div>
//         </div>

//         {/* Folder Contents */}
//         <div className="md:col-span-2 bg-white p-6 rounded-xl border border-gray-200">
//           {selectedFolder ? (
//             <div>
//               <h4 className="font-semibold text-gray-800 mb-4">
//                 Contents of: {selectedFolder.name}
//               </h4>
//               <div className="space-y-2 max-h-96 overflow-y-auto">
//                 {folderContents.length > 0 ? (
//                   folderContents.map((item, index) => (
//                     <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
//                       <div className="flex items-center">
//                         <span className="mr-3">
//                           {item.isFolder ? '📁' : '📄'}
//                         </span>
//                         <div>
//                           <div className="font-medium text-sm">{item.name}</div>
//                           {!item.isFolder && (
//                             <div className="text-xs text-gray-500">
//                               {formatFileSize(parseInt(item.size || 0))} • {item.type}
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                       <div className="flex gap-2">
//                         {!item.isFolder && item.url && (
//                           <a
//                             href={item.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 hover:text-blue-800 text-sm"
//                           >
//                             View
//                           </a>
//                         )}
//                         {!item.isFolder && (
//                           <button
//                             onClick={() => deleteFile(item.id)}
//                             className="text-red-600 hover:text-red-800 text-sm"
//                           >
//                             Delete
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="text-center py-8 text-gray-500">
//                     This folder is empty
//                   </div>
//                 )}
//               </div>
//             </div>
//           ) : (
//             <div className="flex items-center justify-center h-full text-center text-gray-500">
//               <div>
//                 <div className="text-3xl mb-2">📂</div>
//                 <div>Select a folder from the left to view contents</div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Upload Area */}
//       <div
//         className={`bg-white border-2 border-dashed rounded-xl p-12 text-center transition-all ${
//           dragActive
//             ? 'border-blue-500 bg-blue-50'
//             : 'border-gray-300 hover:border-blue-500'
//         }`}
//         onDragEnter={handleDrag}
//         onDragLeave={handleDrag}
//         onDragOver={handleDrag}
//         onDrop={handleDrop}
//       >
//         <div className="bg-blue-100 h-12 w-12 rounded-lg inline-flex items-center justify-center mb-4">
//           <span className="text-2xl">📁</span>
//         </div>
//         <h3 className="font-semibold text-gray-800 mb-2">Upload Case Documents</h3>
//         <p className="text-sm text-gray-600 mb-4">
//           Drag and drop your PDF, TIFF, PNG, or JPG files here, or click to browse
//           {selectedFolder && (
//             <span className="block mt-1 text-blue-600">
//               Uploading to: {selectedFolder.name}
//             </span>
//           )}
//         </p>
        
//         <div className="flex gap-4 justify-center">
//           <button
//             onClick={() => fileInputRef.current?.click()}
//             disabled={uploading}
//             className="bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50"
//           >
//             {uploading ? 'Uploading...' : 'Choose Files'}
//           </button>
          
//           <button
//             onClick={() => folderInputRef.current?.click()}
//             disabled={uploading}
//             className="bg-green-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-green-700 disabled:opacity-50"
//           >
//             Upload Folder
//           </button>
//         </div>

//         {/* Hidden file inputs */}
//         <input
//           ref={fileInputRef}
//           type="file"
//           multiple
//           onChange={handleFileChange}
//           className="hidden"
//           accept=".pdf,.tiff,.png,.jpg,.jpeg"
//         />
//         <input
//           ref={folderInputRef}
//           type="file"
//           multiple
//           onChange={handleFolderChange}
//           className="hidden"
//           webkitdirectory=""
//           directory=""
//         />
//       </div>
//     </div>
//   );
// };

// export default DocumentUploadPage;

// import React, { useState, useEffect, useRef } from 'react';

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
  
//   const fileInputRef = useRef(null);
//   const folderInputRef = useRef(null);

//   // Base API URL
//   const API_BASE = 'http://localhost:3000/api';

//   // Get auth token (adjust based on your auth implementation)
//   const getAuthToken = () => {
//     return localStorage.getItem('token') || sessionStorage.getItem('token');
//   };

//   // API headers with auth
//   const getHeaders = () => ({
//     'Authorization': `Bearer ${getAuthToken()}`,
//   });

//   // Load user files/folders on component mount
//   useEffect(() => {
//     loadUserFiles();
//   }, []);

//   const loadUserFiles = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await fetch(`${API_BASE}/files`, {
//         headers: getHeaders(),
//       });
      
//       if (!response.ok) {
//         throw new Error(`Failed to load files: ${response.status}`);
//       }
      
//       const data = await response.json();
//       setFolders(processFileStructure(data));
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

//   // Load folder contents
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

//       const response = await fetch(`${API_BASE}${endpoint}`, {
//         method: 'POST',
//         headers: getHeaders(),
//         body: formData,
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.message || `Upload failed: ${response.status}`);
//       }

//       const result = await response.json();
//       setSuccess(`Successfully uploaded ${files.length} file(s)`);
      
//       // Refresh the file list and folder contents
//       await loadUserFiles();
//       if (selectedFolder) {
//         await loadFolderContents(selectedFolder.folder_path || selectedFolder.path || '');
//       }

//       // Clear file input
//       if (fileInputRef.current) {
//         fileInputRef.current.value = '';
//       }
//       if (folderInputRef.current) {
//         folderInputRef.current.value = '';
//       }

//     } catch (err) {
//       setError(`Upload error: ${err.message}`);
//       console.error('Upload error:', err);
//     } finally {
//       setUploading(false);
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
//       await loadUserFiles();
//       if (selectedFolder) {
//         await loadFolderContents(selectedFolder.folder_path || selectedFolder.path || '');
//       }
//     } catch (err) {
//       setError(`Error deleting file: ${err.message}`);
//       console.error('Error deleting file:', err);
//     }
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

//   // Handle file input change
//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       const targetPath = selectedFolder ? (selectedFolder.folder_path || selectedFolder.path || '') : '';
//       uploadFiles(e.target.files, targetPath);
//     }
//   };

//   // Handle folder input change (for folder upload)
//   const handleFolderChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       const targetPath = selectedFolder ? (selectedFolder.folder_path || selectedFolder.path || '') : '';
//       uploadFiles(e.target.files, targetPath);
//     }
//   };

//   // Render folder tree recursively
//   const renderFolderTree = (items, level = 0, parentPath = '') => {
//     return items.map((item, index) => {
//       const itemPath = parentPath ? `${parentPath}/${item.name}` : item.name;
//       const isExpanded = expandedFolders.has(itemPath);
//       const hasChildren = item.children && item.children.length > 0;
      
//       if (item.type === 'folder' || item.isFolder) {
//         return (
//           <div key={`${itemPath}-${index}`}>
//             <div
//               className={`flex items-center py-2 px-3 rounded cursor-pointer hover:bg-gray-100 ${
//                 selectedFolder?.name === item.name && selectedFolder?.folder_path === item.folder_path 
//                   ? 'bg-blue-50 text-blue-600' 
//                   : ''
//               }`}
//               style={{ marginLeft: `${level * 20}px` }}
//             >
//               {hasChildren && (
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     toggleFolder(itemPath);
//                   }}
//                   className="mr-1 text-gray-500 hover:text-gray-700"
//                 >
//                   {isExpanded ? '▼' : '▶'}
//                 </button>
//               )}
//               <div
//                 className="flex items-center flex-1"
//                 onClick={() => selectFolder(item)}
//               >
//                 <span className="mr-2">📁</span>
//                 <span className="text-sm truncate flex-1">{item.name}</span>
//                 <span className="text-xs text-gray-500 ml-2">
//                   ({item.documentCount || 0})
//                 </span>
//               </div>
//             </div>
            
//             {hasChildren && isExpanded && (
//               <div>
//                 {renderFolderTree(item.children, level + 1, itemPath)}
//               </div>
//             )}
//           </div>
//         );
//       }
//       return null;
//     });
//   };

//   // Format file size
//   const formatFileSize = (bytes) => {
//     if (!bytes || bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   // Open document in new tab
//   const openDocument = (url) => {
//     if (url) {
//       window.open(url, '_blank', 'noopener,noreferrer');
//     }
//   };

//   return (
//     <div className="p-6">
//       {/* Error/Success Messages */}
//       {error && (
//         <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
//           <div className="flex justify-between items-center">
//             <span>{error}</span>
//             <button onClick={() => setError('')} className="text-red-600 hover:text-red-800">×</button>
//           </div>
//         </div>
//       )}
//       {success && (
//         <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
//           <div className="flex justify-between items-center">
//             <span>{success}</span>
//             <button onClick={() => setSuccess('')} className="text-green-600 hover:text-green-800">×</button>
//           </div>
//         </div>
//       )}

//       <div className="grid md:grid-cols-3 gap-6 mb-6">
//         {/* Folder Tree */}
//         <div className="md:col-span-1 bg-white p-6 rounded-xl border border-gray-200">
//           <div className="flex justify-between items-center mb-4">
//             <h4 className="font-semibold text-gray-800">Case Folders</h4>
//             <button
//               onClick={() => setShowNewFolderInput(!showNewFolderInput)}
//               className="bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-blue-700"
//               disabled={creatingFolder}
//             >
//               + New Folder
//             </button>
//           </div>

//           {/* New Folder Input */}
//           {showNewFolderInput && (
//             <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//               <input
//                 type="text"
//                 placeholder="Folder name"
//                 value={newFolderName}
//                 onChange={(e) => setNewFolderName(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm mb-2"
//                 onKeyPress={(e) => e.key === 'Enter' && createFolder()}
//               />
//               <div className="flex gap-2">
//                 <button
//                   onClick={createFolder}
//                   disabled={creatingFolder}
//                   className="flex-1 bg-green-600 text-white text-xs py-1.5 rounded hover:bg-green-700 disabled:opacity-50"
//                 >
//                   {creatingFolder ? 'Creating...' : 'Create'}
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowNewFolderInput(false);
//                     setNewFolderName('');
//                   }}
//                   className="flex-1 bg-gray-500 text-white text-xs py-1.5 rounded hover:bg-gray-600"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           )}

//           <div className="space-y-1 max-h-96 overflow-y-auto">
//             {loading ? (
//               <div className="text-center py-4 text-gray-500">Loading folders...</div>
//             ) : folders.length > 0 ? (
//               renderFolderTree(folders)
//             ) : (
//               <div className="text-center py-4 text-gray-500">
//                 <div className="mb-2">📁</div>
//                 <div>No folders found</div>
//                 <div className="text-xs mt-1">Create your first folder above</div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Folder Contents */}
//         <div className="md:col-span-2 bg-white p-6 rounded-xl border border-gray-200">
//           {selectedFolder ? (
//             <div>
//               <div className="flex justify-between items-center mb-4">
//                 <div>
//                   <h4 className="font-semibold text-gray-800">
//                     📁 {selectedFolder.name}
//                   </h4>
//                   <p className="text-sm text-gray-500">
//                     {folderContents.length} items
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => setShowNewFolderInput(!showNewFolderInput)}
//                   className="bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-green-700"
//                   disabled={creatingFolder}
//                 >
//                   + New Subfolder
//                 </button>
//               </div>
              
//               <div className="space-y-2 max-h-96 overflow-y-auto">
//                 {loading ? (
//                   <div className="text-center py-8 text-gray-500">Loading contents...</div>
//                 ) : folderContents.length > 0 ? (
//                   folderContents.map((item, index) => (
//                     <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
//                       <div className="flex items-center flex-1">
//                         <span className="mr-3 text-lg">
//                           {item.isFolder ? '📁' : getFileIcon(item.type)}
//                         </span>
//                         <div className="flex-1">
//                           <div className="font-medium text-sm">{item.name}</div>
//                           {!item.isFolder && (
//                             <div className="text-xs text-gray-500">
//                               {formatFileSize(parseInt(item.size || 0))} • {item.type}
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                       <div className="flex gap-2">
//                         {item.isFolder && (
//                           <button
//                             onClick={() => selectFolder({
//                               name: item.name,
//                               folder_path: item.path,
//                               type: 'folder'
//                             })}
//                             className="text-blue-600 hover:text-blue-800 text-sm px-2 py-1 rounded"
//                           >
//                             Open
//                           </button>
//                         )}
//                         {!item.isFolder && item.url && (
//                           <button
//                             onClick={() => openDocument(item.url)}
//                             className="text-blue-600 hover:text-blue-800 text-sm px-2 py-1 rounded"
//                           >
//                             Open
//                           </button>
//                         )}
//                         {!item.isFolder && (
//                           <button
//                             onClick={() => deleteFile(item.id)}
//                             className="text-red-600 hover:text-red-800 text-sm px-2 py-1 rounded"
//                           >
//                             Delete
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="text-center py-12 text-gray-500">
//                     <div className="text-4xl mb-4">📄</div>
//                     <div className="text-lg font-medium mb-2">This folder is empty</div>
//                     <div className="text-sm">Upload documents using the area below</div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ) : (
//             <div className="flex items-center justify-center h-full text-center text-gray-500">
//               <div>
//                 <div className="text-4xl mb-4">📂</div>
//                 <div className="text-lg font-medium mb-2">Select a folder to view contents</div>
//                 <div className="text-sm">Choose a folder from the left sidebar to see its documents</div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Upload Area */}
//       <div
//         className={`bg-white border-2 border-dashed rounded-xl p-12 text-center transition-all ${
//           dragActive
//             ? 'border-blue-500 bg-blue-50'
//             : 'border-gray-300 hover:border-blue-500'
//         }`}
//         onDragEnter={handleDrag}
//         onDragLeave={handleDrag}
//         onDragOver={handleDrag}
//         onDrop={handleDrop}
//       >
//         <div className="bg-blue-100 h-12 w-12 rounded-lg inline-flex items-center justify-center mb-4">
//           <span className="text-2xl">📁</span>
//         </div>
//         <h3 className="font-semibold text-gray-800 mb-2">Upload Case Documents</h3>
//         <p className="text-sm text-gray-600 mb-4">
//           Drag and drop your PDF, TIFF, PNG, or JPG files here, or click to browse
//           {selectedFolder && (
//             <span className="block mt-1 text-blue-600 font-medium">
//               📁 Uploading to: {selectedFolder.name}
//             </span>
//           )}
//         </p>
        
//         <div className="flex gap-4 justify-center">
//           <button
//             onClick={() => fileInputRef.current?.click()}
//             disabled={uploading}
//             className="bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50"
//           >
//             {uploading ? 'Uploading...' : 'Choose Files'}
//           </button>
          
//           <button
//             onClick={() => folderInputRef.current?.click()}
//             disabled={uploading}
//             className="bg-green-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-green-700 disabled:opacity-50"
//           >
//             Upload Folder
//           </button>
//         </div>

//         {/* Hidden file inputs */}
//         <input
//           ref={fileInputRef}
//           type="file"
//           multiple
//           onChange={handleFileChange}
//           className="hidden"
//           accept=".pdf,.tiff,.png,.jpg,.jpeg,.doc,.docx"
//         />
//         <input
//           ref={folderInputRef}
//           type="file"
//           multiple
//           onChange={handleFolderChange}
//           className="hidden"
//           webkitdirectory=""
//           directory=""
//         />
//       </div>
//     </div>
//   );
// };

// // Helper function to get file icons
// const getFileIcon = (mimeType) => {
//   if (!mimeType) return '📄';
  
//   if (mimeType.includes('pdf')) return '📕';
//   if (mimeType.includes('image')) return '🖼️';
//   if (mimeType.includes('word') || mimeType.includes('document')) return '📘';
//   if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return '📊';
//   if (mimeType.includes('powerpoint') || mimeType.includes('presentation')) return '📋';
//   if (mimeType.includes('text')) return '📝';
//   if (mimeType.includes('video')) return '🎥';
//   if (mimeType.includes('audio')) return '🎵';
  
//   return '📄';
// };

// export default DocumentUploadPage;

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