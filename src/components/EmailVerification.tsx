
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleEmailVerification = async () => {
      const token = searchParams.get('token');
      const type = searchParams.get('type');
      
      if (!token || !type) {
        setVerificationStatus('error');
        setMessage('Invalid verification link');
        return;
      }

      try {
        const { data, error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: type as any
        });

        if (error) {
          console.error('Verification error:', error);
          setVerificationStatus('error');
          setMessage(error.message || 'Email verification failed');
        } else if (data.user) {
          setVerificationStatus('success');
          setMessage('Email verified successfully!');
          
          toast({
            title: "Email Verified",
            description: "Your account has been verified successfully!",
          });

          // Redirect to home page after 2 seconds
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }
      } catch (error: any) {
        console.error('Verification error:', error);
        setVerificationStatus('error');
        setMessage('An unexpected error occurred during verification');
      }
    };

    handleEmailVerification();
  }, [searchParams, navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-flipkart-bg-light p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          {verificationStatus === 'loading' && (
            <div className="space-y-4">
              <Loader2 className="w-12 h-12 animate-spin mx-auto text-flipkart-blue" />
              <h2 className="text-xl font-semibold">Verifying your email...</h2>
              <p className="text-gray-600">Please wait while we confirm your email address.</p>
            </div>
          )}

          {verificationStatus === 'success' && (
            <div className="space-y-4">
              <CheckCircle className="w-12 h-12 mx-auto text-green-500" />
              <h2 className="text-xl font-semibold text-green-700">Email Verified!</h2>
              <p className="text-gray-600">{message}</p>
              <p className="text-sm text-gray-500">You will be redirected to the home page shortly...</p>
            </div>
          )}

          {verificationStatus === 'error' && (
            <div className="space-y-4">
              <XCircle className="w-12 h-12 mx-auto text-red-500" />
              <h2 className="text-xl font-semibold text-red-700">Verification Failed</h2>
              <p className="text-gray-600">{message}</p>
              <div className="space-y-2">
                <Button 
                  onClick={() => navigate('/auth')} 
                  className="w-full bg-flipkart-blue hover:bg-flipkart-blue/90"
                >
                  Go to Login
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/')} 
                  className="w-full"
                >
                  Go to Home
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
