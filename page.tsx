'use client';

import React from "react";
import { useState, useEffect } from 'react';
import { 
  FaTrash, 
  FaMinus, 
  FaPlus, 
  FaShoppingCart, 
  FaArrowLeft,
  FaTruck,
  FaShieldAlt,
  FaCreditCard,
  FaTimes,
  FaHeart
} from 'react-icons/fa';

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  category: string;
  brand: string;
  inStock: boolean;
  maxQuantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<number | null>(null);

  // Sample cart data
  const sampleCartItems: CartItem[] = [
    {
      id: 1,
      name: 'Organic Fresh Strawberries - Premium Quality',
      price: 4.99,
      originalPrice: 6.99,
      image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=300&h=300&fit=crop',
      quantity: 2,
      category: 'groceries',
      brand: 'Local Harvest',
      inStock: true,
      maxQuantity: 10
    },
    {
      id: 2,
      name: 'Fresh Whole Milk',
      price: 4.49,
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=300&fit=crop',
      quantity: 1,
      category: 'dairy',
      brand: 'Fresh Farms',
      inStock: true,
      maxQuantity: 5
    },
    {
      id: 3,
      name: 'Whole Grain Bread',
      price: 3.29,
      originalPrice: 4.29,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop',
      quantity: 3,
      category: 'bakery',
      brand: 'Nature\'s Best',
      inStock: true,
      maxQuantity: 8
    },
    {
      id: 4,
      name: 'Organic Eggs (12 pack)',
      price: 5.99,
      originalPrice: 6.99,
      image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&h=300&fit=crop',
      quantity: 1,
      category: 'dairy',
      brand: 'Organic Valley',
      inStock: true,
      maxQuantity: 6
    }
  ];

  useEffect(() => {
    setIsMounted(true);
    setCartItems(sampleCartItems);
  }, []);

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const item = cartItems.find(item => item.id === itemId);
    if (item && newQuantity > item.maxQuantity) return;

    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeItem = (itemId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const moveToWishlist = (itemId: number) => {
    // Move item to wishlist functionality
    console.log(`Moving item ${itemId} to wishlist`);
    removeItem(itemId);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    return subtotal * 0.08; // 8% tax rate
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    if (subtotal >= 25) {
      return 0; // Free shipping over $25
    } else {
      return 4.99; // Standard shipping
    }
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping();
  };

  const calculateSavings = () => {
    return cartItems.reduce((total, item) => {
      if (item.originalPrice) {
        return total + ((item.originalPrice - item.price) * item.quantity);
      }
      return total;
    }, 0);
  };

  const proceedToCheckout = () => {
    console.log('Proceeding to checkout with items:', cartItems);
    // Navigate to checkout page
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <a href="/" className="text-2xl font-bold text-orange-600">Foody App</a>
                <span className="ml-4 text-gray-500">/ Cart</span>
              </div>
            </div>
          </div>
        </header>

        {/* Empty Cart */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="bg-white rounded-lg shadow-sm p-12">
            <div className="text-6xl mb-6">🛒</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet. Start shopping to see some amazing products!
            </p>
            <div className="space-y-4">
              <a
                href="/products"
                className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
              >
                <FaShoppingCart className="w-5 h-5 mr-2" />
                Start Shopping
              </a>
              <div>
                <a
                  href="/"
                  className="inline-flex items-center text-gray-600 hover:text-orange-600 transition-colors"
                >
                  <FaArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="text-2xl font-bold text-orange-600">Foody App</a>
              <span className="ml-4 text-gray-500">/ Cart ({cartItems.length} items)</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <a
                href="/products"
                className="text-gray-700 hover:text-orange-600 transition-colors flex items-center"
              >
                <FaArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
                <p className="text-gray-600 mt-1">{cartItems.length} items</p>
              </div>

              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-800 mb-1">
                              <a href={`/products/${item.id}`} className="hover:text-orange-600 transition-colors">
                                {item.name}
                              </a>
                            </h3>
                            <p className="text-sm text-gray-500 mb-2">{item.brand}</p>
                            
                            {/* Price */}
                            <div className="flex items-center space-x-2 mb-3">
                              <span className="text-lg font-bold text-gray-800">${item.price}</span>
                              {item.originalPrice && item.originalPrice > item.price && (
                                <>
                                  <span className="text-sm text-gray-400 line-through">${item.originalPrice}</span>
                                  <span className="text-sm text-green-600 font-medium">
                                    Save ${((item.originalPrice - item.price) * item.quantity).toFixed(2)}
                                  </span>
                                </>
                              )}
                            </div>

                            {/* Stock Status */}
                            <div className="flex items-center space-x-2 mb-4">
                              {item.inStock ? (
                                <div className="flex items-center text-green-600 text-sm">
                                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                  In Stock
                                </div>
                              ) : (
                                <div className="flex items-center text-red-600 text-sm">
                                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                                  Out of Stock
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col items-end space-y-2">
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() => moveToWishlist(item.id)}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                title="Move to Wishlist"
                              >
                                <FaHeart className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                title="Remove Item"
                              >
                                <FaTrash className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm text-gray-600">Quantity:</span>
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                                disabled={item.quantity <= 1}
                              >
                                <FaMinus className="w-3 h-3" />
                              </button>
                              <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                                disabled={item.quantity >= item.maxQuantity}
                              >
                                <FaPlus className="w-3 h-3" />
                              </button>
                            </div>
                            <span className="text-xs text-gray-500">
                              Max: {item.maxQuantity}
                            </span>
                          </div>

                          {/* Item Total */}
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-800">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            {item.originalPrice && (
                              <div className="text-sm text-gray-400 line-through">
                                ${(item.originalPrice * item.quantity).toFixed(2)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm sticky top-24">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>
              </div>

              <div className="p-6 space-y-4">
                {/* Pricing Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (8%)</span>
                    <span>${calculateTax().toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className={calculateShipping() === 0 ? 'text-green-600 font-medium' : ''}>
                      {calculateShipping() === 0 ? 'FREE' : `$${calculateShipping().toFixed(2)}`}
                    </span>
                  </div>

                  {calculateSavings() > 0 && (
                    <div className="flex justify-between text-green-600 font-medium">
                      <span>Total Savings</span>
                      <span>-${calculateSavings().toFixed(2)}</span>
                    </div>
                  )}

                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-bold text-gray-800">
                      <span>Total</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Shipping Info */}
                {calculateShipping() === 0 ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center text-green-700">
                      <FaTruck className="w-4 h-4 mr-2" />
                      <span className="font-medium">Free Shipping!</span>
                    </div>
                    <p className="text-sm text-green-600 mt-1">
                      Your order qualifies for free shipping
                    </p>
                  </div>
                ) : (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center text-blue-700">
                      <FaTruck className="w-4 h-4 mr-2" />
                      <span className="font-medium">Add ${(25 - calculateSubtotal()).toFixed(2)} more for free shipping</span>
                    </div>
                  </div>
                )}

                {/* Security Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center text-gray-700 mb-2">
                    <FaShieldAlt className="w-4 h-4 mr-2" />
                    <span className="font-medium">Secure Checkout</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Your payment information is encrypted and secure
                  </p>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={proceedToCheckout}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center"
                >
                  <FaCreditCard className="w-5 h-5 mr-2" />
                  Proceed to Checkout
                </button>

                {/* Continue Shopping */}
                <div className="text-center">
                  <a
                    href="/products"
                    className="text-orange-600 hover:text-orange-700 font-medium transition-colors"
                  >
                    Continue Shopping
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);

  // ...existing code...
}