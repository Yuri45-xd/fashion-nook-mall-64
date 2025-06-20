
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Phone, MapPin, X, Store } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Form validation schemas
const phoneSchema = z.object({
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(10, "Phone number must not exceed 10 digits"),
});

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

const usernameSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
});

const Login = () => {
  const [step, setStep] = useState(1);
  const [isNewUser, setIsNewUser] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userPhone, setUserPhone] = useState("");

  // Phone number form
  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: "",
    },
  });

  // OTP form
  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Username form
  const usernameForm = useForm<z.infer<typeof usernameSchema>>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: "",
    },
  });

  // Handle phone number submission
  const onPhoneSubmit = (values: z.infer<typeof phoneSchema>) => {
    setUserPhone(values.phone);
    
    // Check if the user exists in local storage
    const existingUsers = JSON.parse(localStorage.getItem("users") || "{}");
    const userExists = existingUsers[values.phone];
    
    setIsNewUser(!userExists);
    setStep(2); // Move to OTP step
    
    // In a real app, you would send an OTP to the phone number here
    toast({
      title: "OTP Sent",
      description: `A verification code has been sent to ${values.phone}`,
    });
  };

  // Handle OTP verification
  const onOtpSubmit = (values: z.infer<typeof otpSchema>) => {
    // In a real app, you would verify the OTP with a backend service
    // For this demo, we'll accept any 6-digit OTP
    
    if (isNewUser) {
      setStep(3); // Move to username step for new users
    } else {
      // For existing users, log them in directly
      const existingUsers = JSON.parse(localStorage.getItem("users") || "{}");
      const userData = existingUsers[userPhone];
      
      if (userData) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify({
          phone: userPhone,
          username: userData.username
        }));
        
        toast({
          title: "Login Successful",
          description: `Welcome back, ${userData.username}!`,
        });
        
        navigate("/");
      }
    }
  };

  // Handle username submission for new users
  const onUsernameSubmit = (values: z.infer<typeof usernameSchema>) => {
    // Save the new user to local storage
    const existingUsers = JSON.parse(localStorage.getItem("users") || "{}");
    existingUsers[userPhone] = {
      username: values.username,
      registeredAt: new Date().toISOString()
    };
    
    localStorage.setItem("users", JSON.stringify(existingUsers));
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify({
      phone: userPhone,
      username: values.username
    }));
    
    toast({
      title: "Registration Successful",
      description: `Welcome to Fashion Zone, ${values.username}!`,
    });
    
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-flipkart-bg-light flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md w-full max-w-md overflow-hidden relative">
          <div className="flex justify-between items-center absolute top-4 right-4 left-4 z-10">
            <Link to="/" className="flex items-center gap-1 text-flipkart-blue hover:underline">
              <Store className="h-4 w-4" />
              <span className="text-sm">Back to Store</span>
            </Link>
            <Link 
              to="/" 
              className="p-1.5 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
            >
              <X className="h-5 w-5 text-gray-700" />
            </Link>
          </div>
          
          <div className="bg-flipkart-blue p-6 text-white pt-16">
            <h1 className="text-2xl font-bold">
              {step === 1 ? "Login or Signup" : 
               step === 2 ? "Verify OTP" : 
               "Create Username"}
            </h1>
            <p className="mt-1 text-sm opacity-80">
              {step === 1 ? "Enter your phone number to continue" : 
               step === 2 ? "Enter the 6-digit code sent to your phone" : 
               "Choose a username for your account"}
            </p>
          </div>
          
          <div className="p-6">
            {step === 1 && (
              <Form {...phoneForm}>
                <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-6">
                  <FormField
                    control={phoneForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <FormControl>
                            <Input 
                              placeholder="10-digit mobile number" 
                              className="pl-10" 
                              {...field} 
                              type="tel" 
                              maxLength={10}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-flipkart-orange hover:bg-flipkart-orange/90">
                    Continue
                  </Button>
                </form>
              </Form>
            )}
            
            {step === 2 && (
              <Form {...otpForm}>
                <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-6">
                  <FormField
                    control={otpForm.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel>Enter OTP</FormLabel>
                        <FormControl>
                          <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="text-sm text-center">
                    <span className="text-gray-600">Didn't receive the OTP? </span>
                    <button type="button" className="text-flipkart-blue font-medium">Resend OTP</button>
                  </div>
                  <Button type="submit" className="w-full bg-flipkart-orange hover:bg-flipkart-orange/90">
                    Verify OTP
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => setStep(1)}
                  >
                    Change Phone Number
                  </Button>
                </form>
              </Form>
            )}
            
            {step === 3 && (
              <Form {...usernameForm}>
                <form onSubmit={usernameForm.handleSubmit(onUsernameSubmit)} className="space-y-6">
                  <FormField
                    control={usernameForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <FormControl>
                            <Input 
                              placeholder="Enter a username" 
                              className="pl-10" 
                              {...field} 
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-flipkart-orange hover:bg-flipkart-orange/90">
                    Create Account
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
