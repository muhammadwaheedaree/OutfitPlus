"use client"

import type React from "react"
import { useState } from "react"
import { useCart } from "@/context/CartContext"
import { FiArrowLeft, FiArrowRight, FiCreditCard, FiMapPin, FiShoppingBag } from "react-icons/fi"
import Image from "next/image"

const Checkout: React.FC = () => {
  const [step, setStep] = useState(1)
  const { cartItems, getCartTotal } = useCart()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the order to your backend
    console.log("Order submitted:", { formData, cartItems })
    // Reset cart and redirect to a confirmation page
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <FiMapPin className="mr-2" /> Billing and Shipping Address
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Address"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="Country"
                className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              placeholder="Zip Code"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <FiCreditCard className="mr-2" /> Payment Details
            </h2>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="Card Number"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <input
              type="text"
              name="cardName"
              value={formData.cardName}
              onChange={handleInputChange}
              placeholder="Name on Card"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
                className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                placeholder="CVV"
                className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <FiShoppingBag className="mr-2" /> Order Summary
            </h2>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <Image
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="rounded-md mr-4"
                  />
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="text-xl font-bold mt-4 flex justify-between items-center">
              <span>Total:</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {renderStep()}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep((prev) => prev - 1)}
              className="flex items-center text-blue-500 hover:text-blue-600 transition-colors"
            >
              <FiArrowLeft className="mr-2" /> Previous
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep((prev) => prev + 1)}
              className="flex items-center bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Next <FiArrowRight className="ml-2" />
            </button>
          ) : (
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
            >
              Place Order
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default Checkout

