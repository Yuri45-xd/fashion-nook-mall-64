
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl font-bold text-center mb-8 text-flipkart-blue">About Fashion Zone</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <p className="mb-4 text-gray-700">
                Fashion Zone was founded in 2015 with a mission to make quality fashion accessible to everyone. 
                What started as a small online store has grown into one of the largest e-commerce platforms for fashion in the country.
              </p>
              <p className="text-gray-700">
                We believe that everyone deserves to look and feel their best without breaking the bank. 
                Our team works directly with manufacturers and designers to bring the latest trends to our customers at affordable prices.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <div className="bg-gray-300 h-80 flex items-center justify-center">
                <span className="text-gray-600">Company Image</span>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-6 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="overflow-hidden">
              <div className="h-2 bg-flipkart-blue"></div>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">Quality</h3>
                <p className="text-gray-700">
                  We believe in providing products that last. Every item on our platform undergoes rigorous quality checks before being listed.
                </p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <div className="h-2 bg-flipkart-yellow"></div>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">Accessibility</h3>
                <p className="text-gray-700">
                  Fashion should be accessible to all. We work hard to offer competitive prices without compromising on quality or ethics.
                </p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <div className="h-2 bg-green-500"></div>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">Sustainability</h3>
                <p className="text-gray-700">
                  We're committed to reducing our environmental impact through sustainable practices and partnerships with eco-conscious brands.
                </p>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-semibold mb-6 text-center">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-48 bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-600">Team Member Photo</span>
                </div>
                <CardContent className="pt-4">
                  <h3 className="text-lg font-medium">Team Member {i}</h3>
                  <p className="text-sm text-gray-500">Position</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
