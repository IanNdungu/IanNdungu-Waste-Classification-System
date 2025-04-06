
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import conveyorMain from "/lovable-uploads/e4a6df7b-4a6e-4923-8397-f9ef869143f7.png";
import aiDetection from "/lovable-uploads/718ee652-d5d6-4898-9873-a0cd4b3684bc.png";
import conveyorSorting from "/lovable-uploads/460f3f17-4902-4908-92ab-a9c09f58ba7e.png";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto py-4 px-6 flex justify-between items-center">
          <Link to="/" className="text-sortify-600 font-bold text-xl flex items-center gap-2">
            <span className="text-sortify-600 text-2xl">*</span> Sortify
          </Link>
          <div>
            <Link to="/login">
              <Button variant="outline" className="mr-3">
                Log In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white">
        <div className="container mx-auto px-6 py-16">
          <div className="overflow-hidden rounded-xl bg-gray-800 relative">
            <img
              src={conveyorSorting}
              alt="AI-Powered Conveyor Belt Sorting"
              className="w-full object-cover h-[400px] opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center px-8 md:px-16">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-xl">
                AI-Powered Conveyor Belt Sorting
              </h1>
              <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-xl">
                Transform your factory's sorting system with real-time AI object detection, instant classification, and full operator control.
              </p>
              <div>
                <Button className="bg-sortify-600 hover:bg-sortify-700 text-white px-6 py-3">
                  Start Sorting Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="mb-4 bg-sortify-50 rounded-full p-4">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 16V4H18V16H16ZM6 12V4H8V12H6ZM11 20V4H13V20H11Z" fill="#0078c6"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Camera Scans Items</h3>
              <p className="text-gray-600">Identifies objects on the conveyor belt in real-time.</p>
              <div className="mt-4 p-1 bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={aiDetection} 
                  alt="AI Camera Scanning" 
                  className="w-full h-32 object-cover rounded"
                />
              </div>
              <Button variant="outline" className="mt-4">Scan</Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="mb-4 bg-sortify-50 rounded-full p-4">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z" fill="#0078c6"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Intelligent Sorting Algorithm</h3>
              <p className="text-gray-600">Classifies plastic and non-plastic instantly.</p>
              <div className="mt-4 p-1 bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={aiDetection} 
                  alt="Sorting Algorithm" 
                  className="w-full h-32 object-cover rounded"
                />
              </div>
              <Button variant="outline" className="mt-4">Classify</Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="mb-4 bg-sortify-50 rounded-full p-4">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6.414L8.586 11H4v2h4.586L4 17.586 5.414 19 12 12.414 5.414 5 4 6.414zM16 5h2v14h-2V5z" fill="#0078c6"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Operator Control Panel</h3>
              <p className="text-gray-600">Allow real-time speed adjustments, reporting, and error logging.</p>
              <div className="mt-4 p-1 bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={conveyorMain} 
                  alt="Control Panel" 
                  className="w-full h-32 object-cover rounded"
                />
              </div>
              <Button variant="outline" className="mt-4">Control</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Key Features</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg">
              <div className="w-10 h-10 rounded-full border-2 border-sortify-600 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 6.5C10.5 6.5 9.5 7.5 9.5 9H11C11 8.4 11.4 8 12 8C12.6 8 13 8.4 13 9C13 9.5 12.6 10 12 10H11V11.5H12C13.5 11.5 14.5 10.5 14.5 9C14.5 7.5 13.5 6.5 12 6.5Z" fill="#0078c6"/>
                  <circle cx="12" cy="13.5" r="1" fill="#0078c6"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M17 3H7C5.34 3 4 4.34 4 6V18C4 19.66 5.34 21 7 21H17C18.66 21 20 19.66 20 18V6C20 4.34 18.66 3 17 3ZM7 5H17C17.55 5 18 5.45 18 6V18C18 18.55 17.55 19 17 19H7C6.45 19 6 18.55 6 18V6C6 5.45 6.45 5 7 5Z" fill="#0078c6"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered Object Detection</h3>
              <p className="text-gray-600">Accurately detects plastic vs. non-plastic items.</p>
            </div>

            <div className="p-6 border rounded-lg">
              <div className="w-10 h-10 rounded-full border-2 border-sortify-600 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="#0078c6"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Live Monitoring Dashboard</h3>
              <p className="text-gray-600">Real-time visual tracking, like airport security systems.</p>
            </div>

            <div className="p-6 border rounded-lg">
              <div className="w-10 h-10 rounded-full border-2 border-sortify-600 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 6V9L16 5L12 1V4C7.58 4 4 7.58 4 12C4 13.57 4.46 15.03 5.24 16.26L6.7 14.8C6.25 13.97 6 13.01 6 12C6 8.69 8.69 6 12 6ZM18.76 7.74L17.3 9.2C17.74 10.04 18 10.99 18 12C18 15.31 15.31 18 12 18V15L8 19L12 23V20C16.42 20 20 16.42 20 12C20 10.43 19.54 8.97 18.76 7.74Z" fill="#0078c6"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Conveyor Speed Control</h3>
              <p className="text-gray-600">Adjust speed dynamically for optimal sorting efficiency.</p>
            </div>

            <div className="p-6 border rounded-lg">
              <div className="w-10 h-10 rounded-full border-2 border-sortify-600 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM11 17H13V13H17V11H13V7H11V11H7V13H11V17Z" fill="#0078c6"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Error Reporting & Audit Logs</h3>
              <p className="text-gray-600">Track all operational actions and generate reports.</p>
            </div>

            <div className="p-6 border rounded-lg">
              <div className="w-10 h-10 rounded-full border-2 border-sortify-600 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM9 6C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V8H9V6ZM18 20H6V10H18V20ZM12 17C13.1 17 14 16.1 14 15C14 13.9 13.1 13 12 13C10.9 13 10 13.9 10 15C10 16.1 10.9 17 12 17Z" fill="#0078c6"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Operator Access</h3>
              <p className="text-gray-600">Role-based management for admins and operators.</p>
            </div>

            <div className="p-6 border rounded-lg">
              <div className="w-10 h-10 rounded-full border-2 border-sortify-600 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.5 10.5H8V5.5H11V4H8C7.17 4 6.5 4.67 6.5 5.5V10.5C6.5 11.33 7.17 12 8 12H9.5C10.33 12 11 11.33 11 10.5V8H9.5V10.5ZM14.5 4H13V10.5H14.5V7.5H16.5V10.5H18V4H16.5V6H14.5V4ZM21 18H3V15H1V18C1 19.1 1.9 20 3 20H21C22.1 20 23 19.1 23 18V15H21V18Z" fill="#0078c6"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Integration</h3>
              <p className="text-gray-600">Works with existing factory conveyor belt systems.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Testimonials & Case Studies</h2>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0"></div>
                <div className="ml-4">
                  <h4 className="font-medium">Luke Thompson</h4>
                  <p className="text-sm text-gray-500">ABC Recycling - CFO</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">"Our accuracy increased to 95% since using this system!"</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0"></div>
                <div className="ml-4">
                  <h4 className="font-medium">Martha Graham</h4>
                  <p className="text-sm text-gray-500">XBC Security - CTO</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">"Integrated well with our airport security control room."</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0"></div>
                <div className="ml-4">
                  <h4 className="font-medium">Alex Patel</h4>
                  <p className="text-sm text-gray-500">Recycle-It - CEO</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">"Improved our logistics and the return was amazing!"</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0"></div>
                <div className="ml-4">
                  <h4 className="font-medium">Tyler Haywood</h4>
                  <p className="text-sm text-gray-500">Green Planet - CIO</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">"Boosted our efficiency and accuracy."</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0"></div>
                <div className="ml-4">
                  <h4 className="font-medium">Sophie Lin</h4>
                  <p className="text-sm text-gray-500">TechEco - COO</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">"Excellent logistics integration capabilities!"</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-sortify-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Revolutionize Your Factory's Sorting System?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Increase efficiency and reduce waste with AI-powered precision.</p>
          <Button className="bg-white text-sortify-600 hover:bg-gray-100 px-8 py-6 text-lg">
            Start Sorting Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <Link to="/" className="text-sortify-600 font-bold text-xl flex items-center gap-2">
                <span className="text-sortify-600 text-2xl">*</span> Sortify
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-sm font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><Link to="#" className="text-gray-500 hover:text-sortify-600">About Us</Link></li>
                  <li><Link to="#" className="text-gray-500 hover:text-sortify-600">Careers</Link></li>
                  <li><Link to="#" className="text-gray-500 hover:text-sortify-600">Press</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold mb-4">Support</h3>
                <ul className="space-y-2">
                  <li><Link to="#" className="text-gray-500 hover:text-sortify-600">Help Center</Link></li>
                  <li><Link to="#" className="text-gray-500 hover:text-sortify-600">Contact Us</Link></li>
                  <li><Link to="#" className="text-gray-500 hover:text-sortify-600">Privacy Policy</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><Link to="#" className="text-gray-500 hover:text-sortify-600">Terms of Service</Link></li>
                  <li><Link to="#" className="text-gray-500 hover:text-sortify-600">Cookie Policy</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold mb-4">Connect</h3>
                <ul className="space-y-2">
                  <li><Link to="#" className="text-gray-500 hover:text-sortify-600">Facebook</Link></li>
                  <li><Link to="#" className="text-gray-500 hover:text-sortify-600">Twitter</Link></li>
                  <li><Link to="#" className="text-gray-500 hover:text-sortify-600">LinkedIn</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© 2023 Sortify. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link to="#" className="text-gray-400 hover:text-sortify-600">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-sortify-600">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-sortify-600">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
