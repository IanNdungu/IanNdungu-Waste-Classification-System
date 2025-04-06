import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { ArrowRight, UserPlus, LogIn, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signUpUser, loginUser } from "@/lib/supabase";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import loginSideBg from "/lovable-uploads/287c6977-8e57-43d0-8c96-6209ffece2ee.png";

interface LocationState {
  message?: string;
}

const LoginPage = () => {
  // Login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  
  // Signup state
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  
  const { login, isAuthenticated, userRole } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      console.log('User is authenticated, redirecting based on role:', userRole);
      if (userRole === 'admin') {
        navigate('/admin', { replace: true });
      } else if (userRole === 'operator') {
        navigate('/operator', { replace: true });
      }
    }
  }, [isAuthenticated, userRole, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsSubmitting(true);
    
    if (!email) {
      setLoginError("Email is required");
      toast({
        title: "Error",
        description: "Email is required",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    if (!password) {
      setLoginError("Password is required");
      toast({
        title: "Error",
        description: "Password is required",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    try {
      console.log('Attempting login with:', email);
      const success = await login(email, password);
      
      if (!success) {
        console.log('Login failed');
        setLoginError("Invalid email or password, or your account is not approved");
      }
    } catch (error: any) {
      console.error('Error during login:', error);
      setLoginError(error?.message || "An unexpected error occurred");
      toast({
        title: "Error",
        description: error?.message || "An error occurred during login",
        variant: "destructive",
      });
    }
    
    setIsSubmitting(false);
  };
  
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSigningUp(true);
    setSignupSuccess(false);
    
    // Validate inputs
    if (!signupEmail || !signupPassword || !confirmPassword || !fullName || !username) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive",
      });
      setIsSigningUp(false);
      return;
    }
    
    if (signupPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      setIsSigningUp(false);
      return;
    }
    
    if (signupPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      setIsSigningUp(false);
      return;
    }
    
    try {
      console.log('Attempting signup for:', signupEmail);
      const result = await signUpUser(signupEmail, signupPassword, {
        username,
        role: 'operator', // Default role for self-signup
        full_name: fullName,
      });
      
      if (result.success) {
        console.log('Signup successful');
        setSignupSuccess(true);
        toast({
          title: "Registration Submitted",
          description: "Your account has been created and is pending admin approval. You'll be notified when approved.",
        });
        
        // Clear the form and switch to login tab
        setSignupEmail("");
        setSignupPassword("");
        setConfirmPassword("");
        setFullName("");
        setUsername("");
      } else {
        console.error('Signup failed:', result.error);
        toast({
          title: "Error",
          description: result.error?.message || "Failed to sign up. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error('Error during signup:', error);
      toast({
        title: "Error",
        description: error?.message || "An error occurred during sign up",
        variant: "destructive",
      });
    }
    
    setIsSigningUp(false);
  };
  
  useEffect(() => {
    if (state?.message) {
      toast({
        title: "Access Denied",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);
  
  return (
    <div className="flex w-full min-h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <Link to="/" className="text-sortify-600 font-bold text-2xl inline-flex items-center">
              <span className="text-sortify-600 text-3xl mr-1">*</span> Sortify
            </Link>
            <h1 className="text-2xl font-medium mt-8">Welcome</h1>
          </div>
          
          {state?.message && (
            <div className="mb-6 bg-red-50 text-red-700 p-3 rounded-md">
              {state.message}
            </div>
          )}
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="flex items-center gap-2">
                <LogIn className="w-4 h-4" /> Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" /> Sign Up
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleSubmit} className="space-y-6">
                {loginError && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{loginError}</AlertDescription>
                  </Alert>
                )}
              
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm text-gray-700">Email Address *</label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm text-gray-700">Password *</label>
                    <Link to="#" className="text-sm text-sortify-600 hover:underline">
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "LOGIN"}
                  {!isSubmitting && <ArrowRight className="ml-2" size={18} />}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              {signupSuccess ? (
                <Alert className="mb-6 bg-green-50 border-green-200">
                  <AlertCircle className="h-5 w-5 text-green-600" />
                  <AlertTitle className="text-green-800">Registration Submitted</AlertTitle>
                  <AlertDescription className="text-green-700">
                    Your account has been created and is pending admin approval. 
                    You'll be notified when your account is approved.
                  </AlertDescription>
                </Alert>
              ) : (
                <>
                  <Alert className="mb-6 bg-blue-50 border-blue-200">
                    <AlertCircle className="h-5 w-5 text-blue-600" />
                    <AlertTitle>Admin Approval Required</AlertTitle>
                    <AlertDescription>
                      New accounts require administrator approval before they can access the system.
                    </AlertDescription>
                  </Alert>
                
                  <form onSubmit={handleSignUp} className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="text-sm text-gray-700">Full Name *</label>
                      <Input 
                        id="fullName" 
                        type="text" 
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="border border-gray-300"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="username" className="text-sm text-gray-700">Username *</label>
                      <Input 
                        id="username" 
                        type="text" 
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border border-gray-300"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="signupEmail" className="text-sm text-gray-700">Email Address *</label>
                      <Input 
                        id="signupEmail" 
                        type="email" 
                        placeholder="Email Address"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        className="border border-gray-300"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="signupPassword" className="text-sm text-gray-700">Password *</label>
                      <Input
                        id="signupPassword"
                        type="password"
                        placeholder="Password (min 6 characters)"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        className="border border-gray-300"
                        required
                        minLength={6}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="confirmPassword" className="text-sm text-gray-700">Confirm Password *</label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border border-gray-300"
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
                      disabled={isSigningUp}
                    >
                      {isSigningUp ? "Signing up..." : "SIGN UP"}
                      {!isSigningUp && <UserPlus className="ml-2" size={18} />}
                    </Button>
                  </form>
                </>
              )}
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 text-center text-sm text-gray-600 flex items-center justify-center gap-3">
            <Link to="#" className="text-sm text-gray-600 hover:text-sortify-600">
              Terms and conditions
            </Link>
            <span className="text-gray-400">•</span>
            <Link to="#" className="text-sm text-gray-600 hover:text-sortify-600">
              Privacy policy
            </Link>
          </div>
        </div>
      </div>
      
      <div className="hidden md:block md:w-1/2 relative bg-blue-50">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
          <div className="w-full max-w-md relative">
            <div className="absolute -top-10 right-0">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-blue-500">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-4">AI-Powered</h2>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Conveyor Belt</h2>
            <h2 className="text-4xl font-bold text-gray-900">Sorting</h2>
            
            <div className="absolute -right-10 -top-24">
              <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="text-blue-500">
                <path fill="none" stroke="currentColor" strokeWidth="1" d="M10,50 Q25,25 50,50 T90,50" />
              </svg>
            </div>
            
            <div className="absolute right-0 bottom-0 border-2 border-blue-500 w-64 h-64"></div>
            
            <div className="absolute -bottom-16 left-0">
              <svg width="20" height="20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect x="0" y="0" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
