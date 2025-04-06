
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { BarChart3, Settings, Users, LogOut, FileDigit, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminLayout = () => {
  const { isAuthenticated, userRole, userName, logout } = useAuth();
  const location = useLocation();
  
  // If not authenticated or not admin, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (userRole !== 'admin') {
    return <Navigate to="/login" replace state={{ message: 'You must be an admin to access this page.' }} />;
  }
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/admin" className="text-sortify-600 font-bold text-xl flex items-center gap-2">
              <span className="text-sortify-600 text-2xl">*</span> Sortify Admin
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm text-gray-600">{userName?.charAt(0) || 'A'}</span>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-white">
          <nav className="py-4 px-3 flex flex-col gap-1">
            <Link 
              to="/admin" 
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${isActive('/admin') ? 'bg-sortify-50 text-sortify-600' : 'hover:bg-gray-100'}`}
            >
              <LayoutDashboard size={18} />
              <span>System Overview</span>
            </Link>
            <Link 
              to="/admin/analytics" 
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${isActive('/admin/analytics') ? 'bg-sortify-50 text-sortify-600' : 'hover:bg-gray-100'}`}
            >
              <BarChart3 size={18} />
              <span>Analytics</span>
            </Link>
            <Link 
              to="/admin/logs" 
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${isActive('/admin/logs') ? 'bg-sortify-50 text-sortify-600' : 'hover:bg-gray-100'}`}
            >
              <FileDigit size={18} />
              <span>Logs & Reports</span>
            </Link>
            <Link 
              to="/admin/users" 
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${isActive('/admin/users') ? 'bg-sortify-50 text-sortify-600' : 'hover:bg-gray-100'}`}
            >
              <Users size={18} />
              <span>User Management</span>
            </Link>
            <Link 
              to="/admin/settings" 
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${isActive('/admin/settings') ? 'bg-sortify-50 text-sortify-600' : 'hover:bg-gray-100'}`}
            >
              <Settings size={18} />
              <span>System Settings</span>
            </Link>
            
            <div className="mt-auto pt-4">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-gray-600" 
                onClick={logout}
              >
                <LogOut size={18} className="mr-2" />
                <span>Log Out</span>
              </Button>
            </div>
          </nav>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      
      {/* Footer */}
      <footer className="border-t py-4 bg-white">
        <div className="container flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center">
            <Link to="/" className="text-sortify-600 font-bold text-lg flex items-center gap-1">
              <span className="text-sortify-600 text-xl">*</span> Sortify
            </Link>
          </div>
          
          <div className="flex gap-8 text-sm">
            <div>
              <h4 className="font-medium mb-2">Company</h4>
              <ul className="space-y-1">
                <li><Link to="#" className="text-gray-600 hover:text-gray-900">About Us</Link></li>
                <li><Link to="#" className="text-gray-600 hover:text-gray-900">Careers</Link></li>
                <li><Link to="#" className="text-gray-600 hover:text-gray-900">Press</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Support</h4>
              <ul className="space-y-1">
                <li><Link to="#" className="text-gray-600 hover:text-gray-900">Help Center</Link></li>
                <li><Link to="#" className="text-gray-600 hover:text-gray-900">Contact Us</Link></li>
                <li><Link to="#" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Legal</h4>
              <ul className="space-y-1">
                <li><Link to="#" className="text-gray-600 hover:text-gray-900">Terms of Service</Link></li>
                <li><Link to="#" className="text-gray-600 hover:text-gray-900">Cookie Policy</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Connect</h4>
              <ul className="space-y-1">
                <li><Link to="#" className="text-gray-600 hover:text-gray-900">Facebook</Link></li>
                <li><Link to="#" className="text-gray-600 hover:text-gray-900">Twitter</Link></li>
                <li><Link to="#" className="text-gray-600 hover:text-gray-900">LinkedIn</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Link to="#" className="text-gray-600 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </Link>
            <Link to="#" className="text-gray-600 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </Link>
            <Link to="#" className="text-gray-600 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;
