"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Dialog = ({ isOpen, onClose, children }: DialogProps) => {
  if (!isOpen) return null;

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      )}
    >
      <div
        className="relative w-[90%] max-w-md bg-white rounded-lg shadow-lg p-6"
        role="dialog"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          aria-label="Close"
        >
          ✕
        </button>
        <div className="overflow-y-auto max-h-[80vh]">{children}</div>
      </div>
    </div>
  );
};
