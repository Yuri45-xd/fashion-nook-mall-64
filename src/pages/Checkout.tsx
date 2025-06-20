
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "../store/CartStore";
import { useAuthStore } from "../store/AuthStore";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Truck, MapPin } from "lucide-react";

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { user, isLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const handlePlaceOrder = () => {
    if (!shippingInfo.fullName || !shippingInfo.address || !shippingInfo.city) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required shipping details",
        variant: "destructive",
      });
      return;
    }

    // Simulate order placement
    toast({
      title: "Order Placed Successfully!",
      description: `Your order of ₹${getTotalPrice().toFixed(2)} has been placed.`,
    });

    clearCart();
    navigate("/orders");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Button onClick={() => navigate("/")}>Continue Shopping</Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping & Payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center gap-2 mb-4">
                <Truck className="h-5 w-5 text-flipkart-blue" />
                <h2 className="text-lg font-semibold">Shipping Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Full Name *"
                  value={shippingInfo.fullName}
                  onChange={(e) => setShippingInfo({...shippingInfo, fullName: e.target.value})}
                />
                <Input
                  placeholder="Email *"
                  type="email"
                  value={shippingInfo.email}
                  onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                />
                <Input
                  placeholder="Phone Number *"
                  value={shippingInfo.phone}
                  onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                />
                <Input
                  placeholder="Pincode *"
                  value={shippingInfo.pincode}
                  onChange={(e) => setShippingInfo({...shippingInfo, pincode: e.target.value})}
                />
                <Input
                  placeholder="Address *"
                  className="md:col-span-2"
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                />
                <Input
                  placeholder="City *"
                  value={shippingInfo.city}
                  onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                />
                <Input
                  placeholder="State *"
                  value={shippingInfo.state}
                  onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="h-5 w-5 text-flipkart-blue" />
                <h2 className="text-lg font-semibold">Payment Method</h2>
              </div>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-flipkart-blue"
                  />
                  <span>Cash on Delivery</span>
                </label>
                <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-flipkart-blue"
                  />
                  <span>Credit/Debit Card</span>
                </label>
                <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-flipkart-blue"
                  />
                  <span>UPI</span>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm border p-6 h-fit">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.selectedSize}`} className="flex justify-between text-sm">
                  <span>{item.product.title} x {item.quantity}</span>
                  <span>₹{(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Total</span>
                <span>₹{getTotalPrice().toFixed(2)}</span>
              </div>
            </div>
            
            <Button 
              className="w-full mt-6 bg-flipkart-orange hover:bg-flipkart-orange/90"
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
