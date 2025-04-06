
import { Outlet, Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AlertTriangle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OperatorLayout = () => {
  const { isAuthenticated, userRole, userName, logout } = useAuth();
  
  // If not authenticated or not operator, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (userRole !== 'operator') {
    return <Navigate to="/login" replace state={{ message: 'You must be an operator to access this page.' }} />;
  }
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/operator" className="text-sortify-600 font-bold text-xl flex items-center gap-2">
              <span className="text-sortify-600 text-2xl">*</span> Sortify Operator
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm text-gray-600">{userName?.charAt(0) || 'O'}</span>
            </div>
            <span className="text-sm text-gray-600">{userName || 'Operator'}</span>
            <Button variant="outline" size="sm" onClick={logout}>Log Out</Button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </main>
      
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

export default OperatorLayout;
