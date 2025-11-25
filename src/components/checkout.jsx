import React, { useContext, useState } from "react";
import { ContextData } from "./Context";
import emailjs from "@emailjs/browser";

const Checkout = () => {
  const { cartData, setCartData, currentUser } = useContext(ContextData);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    pincode: "",
    state: "", // Added State
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({
    upiId: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  // --- 💰 COST CALCULATIONS ---
  const subtotal = cartData.reduce((sum, item) => sum + Number(item.price), 0);
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const shipping = subtotal > 500 ? 0 : 40; // Free shipping over 500, else 40
  const grandTotal = subtotal + tax + shipping;

  const handleInputChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!currentUser?.email) {
      setMessage("⚠️ Please login before checkout!");
      setLoading(false);
      return;
    }

    if (!shippingInfo.address || !shippingInfo.city || !shippingInfo.pincode || !shippingInfo.phone) {
      setMessage("⚠️ Please fill in all shipping details.");
      setLoading(false);
      return;
    }

    if (!paymentMethod) {
      setMessage("⚠️ Please select a payment method.");
      setLoading(false);
      return;
    }

    // --- EMAILJS CONFIGURATION ---
    const serviceID = "service_3oq3gkf";
    const templateID = "template_c5pwo9j";
    const publicKey = "PdefnyXgNvy50dffB";

    const orderDetails = cartData
      .map((item) => `${item.name} - ₹${item.price}`)
      .join("\n");

    let paymentInfoString = paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod.toUpperCase();
    if (paymentMethod === "upi") paymentInfoString += ` (ID: ${paymentDetails.upiId})`;
    if (paymentMethod === "card") paymentInfoString += ` (Card ending: ${paymentDetails.cardNumber.slice(-4)})`;

    // --- 📦 SENDING DATA TO EMAILJS ---
    const templateParams = {
      // User Info
      user_name: currentUser.name || "Customer",
      user_email: currentUser.email,
      
      // Address Info
      address: shippingInfo.address,
      city: shippingInfo.city,
      state: shippingInfo.state || "India",
      pincode: shippingInfo.pincode,
      phone: shippingInfo.phone,
      
      // Order Details
      order_items: orderDetails,
      payment_method: paymentInfoString,
      
      // Cost Breakdown
      subtotal: subtotal,
      shipping_cost: shipping === 0 ? "Free" : shipping,
      tax_amount: tax,
      total_amount: grandTotal,
    };

    emailjs
      .send(serviceID, templateID, templateParams, publicKey)
      .then(() => {
        setMessage("🎉 Order placed successfully! Check your email.");
        setCartData([]);
        setShippingInfo({ address: "", city: "", state: "", pincode: "", phone: "" });
        setPaymentMethod("");
      })
      .catch((error) => {
        console.error("FAILED...", error);
        setMessage(`❌ Failed: ${error.text}`);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-xl rounded-xl my-10 border border-slate-200">
      <h1 className="text-3xl font-extrabold text-center mb-6 text-slate-800">Checkout</h1>

      {cartData.length === 0 ? (
        <p className="text-center text-gray-500 font-semibold text-lg">Cart is empty 🛒</p>
      ) : (
        <>
          {/* ORDER SUMMARY */}
          <div className="bg-slate-50 p-4 rounded-lg mb-6 border border-slate-200">
            <h3 className="font-bold text-lg mb-3 border-b pb-2 text-slate-700">Order Summary</h3>
            {cartData.map((item) => (
              <div key={item.id} className="flex justify-between py-1 text-sm text-gray-700">
                <span className="truncate w-48">{item.name}</span>
                <span>₹{item.price}</span>
              </div>
            ))}
            
            {/* Cost Breakdown Display */}
            <div className="mt-4 pt-2 border-t border-slate-300 text-sm">
              <div className="flex justify-between"><span>Subtotal:</span><span>₹{subtotal}</span></div>
              <div className="flex justify-between"><span>Tax (18%):</span><span>₹{tax}</span></div>
              <div className="flex justify-between"><span>Shipping:</span><span>{shipping === 0 ? "Free" : `₹${shipping}`}</span></div>
              <div className="flex justify-between mt-2 pt-2 border-t font-bold text-lg text-green-600">
                <span>Total:</span><span>₹{grandTotal}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handlePaymentSubmit} className="flex flex-col gap-5">
            {/* SHIPPING DETAILS */}
            <div>
              <h3 className="font-bold text-lg text-slate-700 mb-2">📍 Shipping Details</h3>
              <div className="flex flex-col gap-3">
                <input type="text" name="address" placeholder="Address (House No, Street)" value={shippingInfo.address} onChange={handleInputChange} className="border p-3 rounded w-full" />
                <div className="flex gap-3">
                  <input type="text" name="city" placeholder="City" value={shippingInfo.city} onChange={handleInputChange} className="border p-3 rounded w-full" />
                  <input type="text" name="state" placeholder="State" value={shippingInfo.state} onChange={handleInputChange} className="border p-3 rounded w-full" />
                </div>
                <div className="flex gap-3">
                  <input type="text" name="pincode" placeholder="Pincode" value={shippingInfo.pincode} onChange={handleInputChange} className="border p-3 rounded w-full" />
                  <input type="tel" name="phone" placeholder="Phone" value={shippingInfo.phone} onChange={handleInputChange} className="border p-3 rounded w-full" />
                </div>
              </div>
            </div>

            {/* PAYMENT METHOD SELECTION */}
            <div>
              <h3 className="font-bold text-lg text-slate-700 mb-2">💳 Payment</h3>
              <div className="flex gap-2">
                <label className="border p-2 rounded cursor-pointer"><input type="radio" name="payment" value="upi" onChange={(e) => setPaymentMethod(e.target.value)} /> UPI</label>
                <label className="border p-2 rounded cursor-pointer"><input type="radio" name="payment" value="card" onChange={(e) => setPaymentMethod(e.target.value)} /> Card</label>
                <label className="border p-2 rounded cursor-pointer"><input type="radio" name="payment" value="cod" onChange={(e) => setPaymentMethod(e.target.value)} /> COD</label>
              </div>
               {/* Conditional Inputs for UPI/Card would go here (simplified for space) */}
               {paymentMethod === "upi" && <input type="text" name="upiId" placeholder="UPI ID" onChange={handlePaymentChange} className="border p-2 rounded w-full mt-2" />}
               {paymentMethod === "card" && <input type="text" name="cardNumber" placeholder="Card Number" onChange={handlePaymentChange} className="border p-2 rounded w-full mt-2" />}
            </div>

            <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg mt-2" disabled={loading}>
              {loading ? "Processing..." : `Pay ₹${grandTotal}`}
            </button>
          </form>
          {message && <p className="mt-4 text-center font-bold">{message}</p>}
        </>
      )}
    </div>
  );
};

export default Checkout;