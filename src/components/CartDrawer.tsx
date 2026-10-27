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
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <h4 className="font-semibold text-foreground text-base">
                  Your cart is empty
                </h4>
                <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                  Browse through our enterprise solutions catalog and add items to your cart.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-5"
                  onClick={() => dispatch(setCartOpen(false))}
                >
                  Start Browsing
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 items-center">
                  <div className="text-2xl p-2 rounded-lg bg-secondary/80 border border-border">
                    {item.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-sm text-foreground truncate">
                      {item.name}
                    </h5>
                    <p className="text-xs text-muted-foreground">
                      ${item.price} each
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-border rounded-md bg-background">
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                quantity: item.quantity - 1,
                              })
                            )
                          }
                          className="px-2 py-1 text-muted-foreground hover:text-foreground text-xs"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold">
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
                          className="px-2 py-1 text-muted-foreground hover:text-foreground text-xs"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-xs font-bold text-foreground">
                        ${item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive h-8 w-8"
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
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Estimated Tax (8%)</span>
                  <span>${tax}</span>
                </div>
                <div className="flex justify-between font-bold text-base text-foreground pt-2 border-t border-border">
                  <span>Total Due</span>
                  <span className="text-primary">${total}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="w-1/3 text-xs"
                  onClick={() => dispatch(clearCart())}
                >
                  Clear All
                </Button>
                <Button
                  className="w-2/3 bg-primary text-primary-foreground gap-2 font-semibold"
                  onClick={() => {
                    alert(
                      `Order placed successfully! Total: $${total}\nState managed with Redux Toolkit.`
                    );
                    dispatch(clearCart());
                    dispatch(setCartOpen(false));
                  }}
                >
                  Checkout
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
