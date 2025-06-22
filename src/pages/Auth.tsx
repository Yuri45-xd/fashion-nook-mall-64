
import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Lock, X, Store, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Form validation schemas
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username must not exceed 20 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParams.get('mode') !== 'signup');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Login form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Signup form
  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Handle login
  const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    console.log('Login attempt with:', values.email);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      console.log('Login response:', { data, error });

      if (error) {
        console.error('Login error:', error);
        
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: "Login Failed",
            description: "Invalid email or password. Please check your credentials and try again.",
            variant: "destructive",
          });
        } else if (error.message.includes('Email not confirmed')) {
          toast({
            title: "Email Not Verified",
            description: "Please check your email and click the verification link before logging in.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Login Failed",
            description: error.message,
            variant: "destructive",
          });
        }
        return;
      }

      if (data.user) {
        console.log('Login successful for user:', data.user.email);
        toast({
          title: "Login Successful",
          description: "Welcome back to Fashion Zone!",
        });
        navigate("/");
      }
    } catch (error: any) {
      console.error('Login catch error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle signup
  const onSignupSubmit = async (values: z.infer<typeof signupSchema>) => {
    setIsLoading(true);
    console.log('Signup attempt with:', values.email, values.username);
    
    try {
      // Use the current window location for the redirect URL
      const redirectUrl = `${window.location.origin}/verify`;
      console.log('Using redirect URL:', redirectUrl);
      
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            username: values.username,
          }
        }
      });

      console.log('Signup response:', { data, error });

      if (error) {
        console.error('Signup error:', error);
        
        if (error.message.includes('User already registered')) {
          toast({
            title: "Email Already Registered",
            description: "This email is already registered. Please try logging in instead.",
            variant: "destructive",
          });
          setIsLogin(true);
        } else {
          toast({
            title: "Signup Failed",
            description: error.message,
            variant: "destructive",
          });
        }
        return;
      }

      if (data.user) {
        console.log('Signup successful for user:', data.user.email);
        toast({
          title: "Account Created Successfully",
          description: "Please check your email to verify your account before logging in.",
        });
        
        // Clear the form
        signupForm.reset();
        
        // Switch to login mode after successful signup
        setTimeout(() => {
          setIsLogin(true);
        }, 2000);
      }
    } catch (error: any) {
      console.error('Signup catch error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
          {/* Header */}
          <div className="bg-flipkart-blue p-6 text-white relative">
            <Link 
              to="/" 
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <X className="h-5 w-5" />
            </Link>
            
            <div className="flex items-center gap-2 mb-4">
              <Store className="h-6 w-6" />
              <span className="text-lg font-semibold">Fashion Zone</span>
            </div>
            
            <h1 className="text-2xl font-bold mb-2">
              {isLogin ? "Login" : "Sign up"}
            </h1>
            <p className="text-sm opacity-90">
              {isLogin 
                ? "Get access to your Orders, Wishlist and Recommendations" 
                : "Create your Fashion Zone account"
              }
            </p>
          </div>
          
          <div className="p-6">
            {isLogin ? (
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Email Address</FormLabel>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <FormControl>
                            <Input 
                              placeholder="Enter your email" 
                              className="pl-10 h-12 border-gray-300 focus:border-flipkart-blue focus:ring-flipkart-blue" 
                              {...field} 
                              type="email"
                              autoComplete="email"
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <FormControl>
                            <Input 
                              placeholder="Enter your password" 
                              className="pl-10 pr-10 h-12 border-gray-300 focus:border-flipkart-blue focus:ring-flipkart-blue" 
                              {...field} 
                              type={showPassword ? "text" : "password"}
                              autoComplete="current-password"
                            />
                          </FormControl>
                          <button
                            type="button"
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-flipkart-orange hover:bg-flipkart-orange/90 font-medium text-base" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </Form>
            ) : (
              <Form {...signupForm}>
                <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                  <FormField
                    control={signupForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Email Address</FormLabel>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <FormControl>
                            <Input 
                              placeholder="Enter your email" 
                              className="pl-10 h-12 border-gray-300 focus:border-flipkart-blue focus:ring-flipkart-blue" 
                              {...field} 
                              type="email"
                              autoComplete="email"
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={signupForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Username</FormLabel>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <FormControl>
                            <Input 
                              placeholder="Choose a username" 
                              className="pl-10 h-12 border-gray-300 focus:border-flipkart-blue focus:ring-flipkart-blue" 
                              {...field}
                              autoComplete="username"
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={signupForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <FormControl>
                            <Input 
                              placeholder="Create a password" 
                              className="pl-10 pr-10 h-12 border-gray-300 focus:border-flipkart-blue focus:ring-flipkart-blue" 
                              {...field} 
                              type={showPassword ? "text" : "password"}
                              autoComplete="new-password"
                            />
                          </FormControl>
                          <button
                            type="button"
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={signupForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Confirm Password</FormLabel>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <FormControl>
                            <Input 
                              placeholder="Confirm your password" 
                              className="pl-10 h-12 border-gray-300 focus:border-flipkart-blue focus:ring-flipkart-blue" 
                              {...field} 
                              type="password"
                              autoComplete="new-password"
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-flipkart-orange hover:bg-flipkart-orange/90 font-medium text-base" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </Form>
            )}
            
            <div className="mt-6 text-center">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    {isLogin ? "New to Fashion Zone?" : "Existing Customer?"}
                  </span>
                </div>
              </div>
              
              <button 
                type="button" 
                className="mt-4 w-full h-12 border border-gray-300 text-flipkart-blue font-medium hover:bg-gray-50 transition-colors rounded-md"
                onClick={() => {
                  setIsLogin(!isLogin);
                  // Reset forms when switching
                  loginForm.reset();
                  signupForm.reset();
                }}
              >
                {isLogin ? "Create your account" : "Login to your account"}
              </button>
            </div>
            
            {isLogin && (
              <div className="mt-4 text-center">
                <Link to="/" className="text-sm text-flipkart-blue hover:underline">
                  Continue as Guest
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
