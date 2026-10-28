"use client";

import React from "react";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  removeFromCart,
  updateQuantity,
  setCartOpen,
  clearCart,
} from "@/redux/slices/cartSlice";

export function CartDrawer() {
  const dispatch = useAppDispatch();
  const { items, isOpen } = useAppSelector((state) => state.cart);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + tax;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => dispatch(setCartOpen(false))}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-card border-l border-border shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-foreground">
                  Your Cart
                </h3>
                <p className="text-xs text-muted-foreground">
                  {items.length} unique item{items.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch(setCartOpen(false))}
              className="rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-border/60">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="p-4 rounded-full bg-muted text-muted-foreground mb-4">
                  <ShoppingBag className="h-8 w-8 text-[#0891b2]" />
                </div>
                <h4 className="font-bold text-foreground text-base">
                  আপনার শপিং ব্যাগ খালি
                </h4>
                <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                  পণ্য ব্রাউজ করুন এবং আপনার পছন্দের পণ্যটি কার্টে যুক্ত করুন।
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-5 rounded-full cursor-pointer hover:bg-gray-100"
                  onClick={() => dispatch(setCartOpen(false))}
                >
                  পণ্য ব্রাউজ করুন
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 items-center">
                  <div className="text-2xl p-2 rounded-xl bg-gray-50 border border-gray-100 shrink-0">
                    {item.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-sm text-foreground truncate">
                      {item.name}
                    </h5>
                    <p className="text-xs text-muted-foreground">
                      ৳{item.price} প্রতিটি
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-gray-200 rounded-lg bg-background">
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                quantity: item.quantity - 1,
                              })
                            )
                          }
                          className="px-2 py-1 text-gray-500 hover:text-black text-xs cursor-pointer"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2 text-xs font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                quantity: item.quantity + 1,
                              })
                            )
                          }
                          className="px-2 py-1 text-gray-500 hover:text-black text-xs cursor-pointer"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-xs font-black text-[#9f1239]">
                        ৳{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive h-8 w-8 cursor-pointer"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-border bg-card/80 space-y-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>সর্বমোট সাবটোটাল</span>
                  <span className="font-semibold text-gray-800">৳{subtotal}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>ডেলিভারি চার্জ</span>
                  <span className="text-emerald-600 font-medium">ক্যাশ অন ডেলিভারি</span>
                </div>
                <div className="flex justify-between font-bold text-base text-foreground pt-2 border-t border-border">
                  <span>মোট প্রদেয় মূল্য</span>
                  <span className="text-[#9f1239] font-black text-lg">৳{subtotal}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="w-1/3 text-xs rounded-xl cursor-pointer"
                  onClick={() => dispatch(clearCart())}
                >
                  খালি করুন
                </Button>
                <Button
                  className="w-2/3 bg-[#0891b2] hover:bg-[#0e7490] text-white gap-2 font-bold rounded-xl cursor-pointer"
                  onClick={() => {
                    alert(
                      `অর্ডার গ্রহণ করা হয়েছে! মোট বিল: ৳${subtotal}\nআমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন।`
                    );
                    dispatch(clearCart());
                    dispatch(setCartOpen(false));
                  }}
                >
                  অর্ডার সম্পন্ন করুন
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
