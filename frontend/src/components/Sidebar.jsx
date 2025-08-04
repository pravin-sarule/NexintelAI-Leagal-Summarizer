

import React, { useState, useEffect } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  ChartBarIcon,
  DocumentTextIcon,
  MagnifyingGlassCircleIcon,
  PencilSquareIcon,
  ScaleIcon,
  BookOpenIcon,
  ClockIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';
import RoleSelection from './RoleSelection';
import LegalIntelligence from './LegalIntelligence';
import QuickTools from './QuickTools';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Check if device is mobile/tablet
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
      if (window.innerWidth < 1024) {
        setIsMobileMenuOpen(false); // Close mobile menu on resize
      }
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navigationItems = [
    { name: 'Dashboard', path: '/', icon: ChartBarIcon },
    { name: 'Document Upload', path: '/upload', icon: DocumentTextIcon },
    { name: 'AI Analysis', path: '/analysis', icon: MagnifyingGlassCircleIcon },
    { name: 'Document Drafting', path: '/drafting', icon: PencilSquareIcon },
    // { name: 'Case Management', path: '/cases', icon: ScaleIcon },
    // { name: 'Legal Research', path: '/research', icon: BookOpenIcon },
    // { name: 'Client Portal', path: '/clients', icon: UserGroupIcon },
  ];

  const recentCases = [
    {
      title: 'Sharma v. State of Maharashtra',
      type: 'Civil Appeal',
      time: '2 hours ago',
      status: 'active'
    },
    {
      title: 'Tech Solutions Ltd. Contract Dispute',
      type: 'Commercial',
      time: 'Yesterday',
      status: 'pending'
    },
    {
      title: 'Property Rights Case - Pune',
      type: 'Property Law',
      time: '3 days ago',
      status: 'completed'
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Mobile Header Component
  const MobileHeader = () => (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
          <ScaleIcon className="h-5 w-5 text-white" />
        </div>
        <div>
          <div className="text-lg font-bold text-slate-800">Nexintel AI</div>
          <div className="text-xs text-slate-500 font-medium">Legal Intelligence Suite</div>
        </div>
      </div>
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
      >
        <Bars3Icon className="h-6 w-6 text-slate-600" />
      </button>
    </div>
  );

  // Sidebar Content Component
  const SidebarContent = ({ isMobileView = false }) => (
    <div className="flex flex-col h-full">
      {/* Header for Desktop or Mobile Drawer Header */}
      <div className={`px-4 py-3 border-b border-slate-200 relative bg-white ${isMobileView ? '' : 'hidden lg:block'}`}>
        {!isMobileView && (
          <button
            onClick={toggleSidebar}
            className="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-white border border-slate-300 rounded-full p-1.5 shadow-sm hover:shadow-md hover:bg-slate-50 transition-all duration-200 z-10"
          >
            {isCollapsed ? (
              <ChevronRightIcon className="h-4 w-4 text-slate-600" />
            ) : (
              <ChevronLeftIcon className="h-4 w-4 text-slate-600" />
            )}
          </button>
        )}

        {isMobileView && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
                <ScaleIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold text-slate-800">Nexintel AI</div>
                <div className="text-xs text-slate-500 font-medium">Legal Intelligence Suite</div>
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
            >
              <XMarkIcon className="h-6 w-6 text-slate-600" />
            </button>
          </div>
        )}
        
        <div className={`transition-all duration-300 ${isCollapsed && !isMobileView ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          {(!isCollapsed || isMobileView) && !isMobileView && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
                <ScaleIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold text-slate-800">Nexintel AI</div>
                <div className="text-xs text-slate-500 font-medium">Legal Intelligence Suite</div>
              </div>
            </div>
          )}
        </div>
        
        {isCollapsed && !isMobileView && (
          <div className="flex justify-center">
            <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
              <ScaleIcon className="h-5 w-5 text-white" />
            </div>
          </div>
        )}
      </div>

      {/* New Case Button */}
      <div className="p-4">
        <button className="w-full bg-slate-800 text-white rounded-lg py-2.5 text-sm font-semibold flex items-center justify-center hover:bg-slate-700 transition-all duration-200 shadow-sm hover:shadow-md">
          <PlusIcon className="h-5 w-5" />
          <span className={`${isCollapsed && !isMobileView ? 'hidden' : 'inline ml-2'}`}>
            New Case Analysis
          </span>
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-2 pb-4">
        <div className="mb-6">
          {(!isCollapsed || isMobileView) && (
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-3 mb-3">
              Navigation
            </div>
          )}
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group flex items-center ${isCollapsed && !isMobileView ? 'justify-center px-2' : 'px-3'} py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    active
                      ? 'bg-slate-100 text-slate-900 border border-slate-200'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                  title={isCollapsed && !isMobileView ? item.name : undefined}
                >
                  <Icon 
                    className={`h-5 w-5 ${isCollapsed && !isMobileView ? '' : 'mr-3'} transition-colors duration-200 ${
                      active 
                        ? 'text-slate-700' 
                        : 'text-slate-500 group-hover:text-slate-700'
                    }`} 
                  />
                  <span className={`${isCollapsed && !isMobileView ? 'hidden' : 'inline'} transition-all duration-200`}>
                    {item.name}
                  </span>
                  {active && (!isCollapsed || isMobileView) && (
                    <div className="ml-auto w-2 h-2 bg-slate-600 rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Role Selection */}
        <RoleSelection isCollapsed={isCollapsed && !isMobileView} />
        
        {/* Legal Intelligence */}
        <LegalIntelligence isCollapsed={isCollapsed && !isMobileView} />

        {/* Recent Cases - Only show when expanded */}
        {(!isCollapsed || isMobileView) && (
          <div className="mb-6">
            <div className="flex items-center justify-between px-3 mb-3">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Recent Cases
              </div>
              <ClockIcon className="h-4 w-4 text-slate-400" />
            </div>
            <div className="space-y-2">
              {recentCases.map((case_, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-all duration-200 border border-transparent hover:border-slate-200 group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-slate-800 truncate group-hover:text-slate-900 transition-colors duration-200">
                        {case_.title}
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(case_.status)}`}>
                          {case_.type}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1 flex items-center">
                        <ClockIcon className="h-3 w-3 mr-1" />
                        {case_.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full text-xs text-slate-600 hover:text-slate-800 font-medium mt-3 py-2 hover:bg-slate-50 rounded-lg transition-all duration-200">
              View All Cases →
            </button>
          </div>
        )}

        {/* Quick Tools */}
        <QuickTools isCollapsed={isCollapsed && !isMobileView} />
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200 bg-white">
        {(!isCollapsed || isMobileView) && (
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg py-2.5 text-sm font-medium transition-all duration-200">
              <span>🌐</span>
              <span>English | हिंदी | मराठी</span>
            </button>
            <button className="w-full flex items-center justify-center space-x-2 text-slate-500 hover:text-slate-700 text-xs font-medium transition-all duration-200">
              <Cog6ToothIcon className="h-4 w-4" />
              <span>Settings & Preferences</span>
            </button>
          </div>
        )}
        
        {isCollapsed && !isMobileView && (
          <div className="flex flex-col space-y-2">
            <button className="w-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg py-2 text-sm transition-all duration-200">
              <span>🌐</span>
            </button>
            <button className="w-full flex items-center justify-center text-slate-500 hover:text-slate-700 transition-all duration-200">
              <Cog6ToothIcon className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Header */}
      <MobileHeader />

      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:flex bg-white border-r border-slate-200 flex-col transition-all duration-300 ease-in-out shadow-sm ${
          isCollapsed ? 'w-20' : 'w-80'
        } relative h-screen`}
      >
        <SidebarContent />
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Sidebar Drawer */}
          <div className="relative flex flex-col w-80 max-w-xs bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            <SidebarContent isMobileView={true} />
          </div>
        </div>
      )}

      {/* Spacer for mobile header */}
      <div className="lg:hidden h-16" />
    </>
  );
};

export default Sidebar;