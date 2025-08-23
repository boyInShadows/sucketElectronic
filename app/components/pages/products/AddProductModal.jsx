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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 font-vazirmatn text-[#1E3A8A]">
          افزودن محصول جدید
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-vazirmatn mb-2">
              نام محصول
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1E3A8A] font-vazirmatn"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-vazirmatn mb-2">
              توضیحات
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1E3A8A] font-vazirmatn"
              rows="3"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-vazirmatn mb-2">
              قیمت (تومان)
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1E3A8A] font-vazirmatn"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-vazirmatn mb-2">
              تصویر محصول
            </label>
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  // Check file size (5MB = 5 * 1024 * 1024 bytes)
                  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
                  
                  if (file.size > maxSize) {
                    alert("سایز عکس نباید بیشتر از 5 مگابایت باشد");
                    e.target.value = ''; // Clear the input
                    return;
                  }
                }
                
                setFormData({ ...formData, image: file });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1E3A8A] font-vazirmatn"
              accept="image/*"
            />
            <p className="text-xs text-gray-500 mt-1 font-vazirmatn">
              حداکثر سایز: 5 مگابایت
            </p>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-vazirmatn"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#1E3A8A] text-white rounded-lg hover:bg-[#1E3A8A]/90 transition-colors font-vazirmatn"
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
