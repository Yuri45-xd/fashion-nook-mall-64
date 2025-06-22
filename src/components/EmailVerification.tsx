
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleEmailVerification = async () => {
      console.log('Email verification started');
      console.log('URL params:', window.location.href);
      console.log('Search params:', Object.fromEntries(searchParams.entries()));
      
      const token = searchParams.get('token');
      const type = searchParams.get('type');
      const tokenHash = searchParams.get('token_hash');
      
      console.log('Verification params:', { token, type, tokenHash });
      
      // Check for token_hash first (new Supabase format)
      const verificationToken = tokenHash || token;
      
      if (!verificationToken || !type) {
        console.error('Missing verification parameters');
        setVerificationStatus('error');
        setMessage('Invalid verification link. Please check your email for the correct link.');
        return;
      }

      try {
        console.log('Attempting verification with:', { token: verificationToken, type });
        
        const { data, error } = await supabase.auth.verifyOtp({
          token_hash: verificationToken,
          type: type as any
        });

        console.log('Verification response:', { data, error });

        if (error) {
          console.error('Verification error:', error);
          setVerificationStatus('error');
          
          if (error.message.includes('expired')) {
            setMessage('This verification link has expired. Please request a new verification email.');
          } else if (error.message.includes('invalid')) {
            setMessage('This verification link is invalid. Please check your email for the correct link.');
          } else {
            setMessage('Email verification failed. Please try again or contact support.');
          }
        } else if (data.user) {
          console.log('Verification successful for user:', data.user.email);
          setVerificationStatus('success');
          setMessage('Email verified successfully! Welcome to Fashion Zone.');
          
          toast({
            title: "Email Verified",
            description: "Your account has been verified successfully!",
          });

          // Redirect to home page after 3 seconds
          setTimeout(() => {
            navigate('/');
          }, 3000);
        }
      } catch (error: any) {
        console.error('Verification catch error:', error);
        setVerificationStatus('error');
        setMessage('An unexpected error occurred during verification. Please try again.');
      }
    };

    handleEmailVerification();
  }, [searchParams, navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-8 text-center">
          {verificationStatus === 'loading' && (
            <div className="space-y-4">
              <Loader2 className="w-16 h-16 animate-spin mx-auto text-flipkart-blue" />
              <h2 className="text-xl font-semibold text-gray-800">Verifying your email...</h2>
              <p className="text-gray-600">Please wait while we confirm your email address.</p>
            </div>
          )}

          {verificationStatus === 'success' && (
            <div className="space-y-4">
              <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
              <h2 className="text-xl font-semibold text-green-700">Email Verified!</h2>
              <p className="text-gray-600">{message}</p>
              <p className="text-sm text-gray-500">You will be redirected to Fashion Zone shortly...</p>
              <Button 
                onClick={() => navigate('/')} 
                className="w-full bg-flipkart-blue hover:bg-flipkart-blue/90"
              >
                Continue to Fashion Zone
              </Button>
            </div>
          )}

          {verificationStatus === 'error' && (
            <div className="space-y-4">
              <XCircle className="w-16 h-16 mx-auto text-red-500" />
              <h2 className="text-xl font-semibold text-red-700">Verification Failed</h2>
              <p className="text-gray-600">{message}</p>
              <div className="space-y-3">
                <Button 
                  onClick={() => navigate('/auth')} 
                  className="w-full bg-flipkart-blue hover:bg-flipkart-blue/90"
                >
                  Go to Login
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/')} 
                  className="w-full border-gray-300"
                >
                  Continue to Fashion Zone
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailVerification;
