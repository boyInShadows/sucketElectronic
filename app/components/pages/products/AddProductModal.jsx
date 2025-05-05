"use client";

import React from "react";
import { X } from "lucide-react";

/**
 * AddProductModal Component
 * Modal for adding new products to a category with Persian UI/UX
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {Function} props.onClose - Callback to close the modal
 * @param {Function} props.onSubmit - Callback to handle form submission
 * @param {Object} props.formData - Current form data
 * @param {Function} props.setFormData - Function to update form data
 */
const AddProductModal = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 relative">
        {/* Header with close button */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            افزودن محصول جدید
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="بستن"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="p-4">
          {/* Product Name Input */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 text-right">
              نام محصول
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
              required
              placeholder="نام محصول را وارد کنید"
            />
          </div>

          {/* Product Description Input */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 text-right">
              توضیحات
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right resize-none"
              required
              placeholder="توضیحات محصول را وارد کنید"
              rows={3}
            />
          </div>

          {/* Product Price Input */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 text-right">
              قیمت (تومان)
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-left"
              required
              placeholder="قیمت را وارد کنید"
            />
          </div>

          {/* Product Image Input */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 text-right">
              تصویر محصول
            </label>
            <input
              type="file"
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              accept="image/*"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              افزودن محصول
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
