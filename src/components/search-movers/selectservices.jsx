"use client";

import { useState } from "react";
import Image from "next/image";
import plusimg from "../../assets/images/Plus.png";

const categories = {
  Furniture: [
    "Sofas & Couches",
    "Beds & Mattresses",
    "Tables & Chairs",
    "Cabinets & Dressers",
    "Desks & Office Furniture",
  ],
  Appliances: [
    "Refrigerators",
    "Washing Machines",
    "Dishwashers",
    "Ovens & Microwaves",
    "Air Conditioners",
  ],
  Electronics: [
    "Televisions",
    "Computers & Monitors",
    "Gaming Consoles",
    "Audio Equipment",
    "Printers & Scanners",
  ],
  Boxes: ["Labeled Boxes", "Books", "Clothes", "Kitchenware", "Toys"],
  Fragile: ["Glassware", "Mirrors", "Paintings", "Musical Instruments"],
  Outdoor: ["Garden Tools", "Bicycles", "Lawn Mowers", "Patio Furniture"],
  Specialty: ["Safes", "Pianos", "Aquariums", "Antiques", "Pool Tables"],
  Others: ["Others"],
};

export default function SelectServices({ items, onItemsChange }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [instruction, setInstruction] = useState("");

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubcategory("");
    setInstruction("");
  };

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
  };

  const handleInstructionChange = (e) => {
    setInstruction(e.target.value);
  };




  const handleAddItem = (e) => {
    e.preventDefault();

    if (!selectedCategory || !selectedSubcategory) return;

    const trimmedInstruction = instruction.trim();

    const existingIndex = items.findIndex(
      (item) =>
        item.category === selectedCategory &&
        item.subcategory === selectedSubcategory &&
        item.instruction === trimmedInstruction
    );

    let updatedItems = null;

    if (existingIndex !== -1) {
      updatedItems = [...items];
      updatedItems[existingIndex].count += 1;
    } else {
      updatedItems = [
        ...items,
        {
          category: selectedCategory,
          subcategory: selectedSubcategory,
          instruction: trimmedInstruction,
          count: 1,
        },
      ];
    }

    // if onItemsChange is undefined/null, the onItemsChange function
    // will not be called
    onItemsChange && onItemsChange(updatedItems);

    setSelectedSubcategory("");
    setInstruction("");
  };

  const handleDeleteItem = (category, subcategory, instruction) => {
    const updatedItems = items.filter(
      (item) =>
        !(
          item.category === category &&
          item.subcategory === subcategory &&
          item.instruction === instruction
        )
    );
    onItemsChange && onItemsChange(updatedItems);
  };

  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="grid">
      <div className="w-full flex flex-col md:flex-row gap-6 mx-auto mt-4">
        {/* Left column */}
        <div className="w-full md:w-1/2 flex flex-col justify-start space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Category Dropdown */}
            <div className="flex-1">
              <label className="block text-sm mb-2 font-medium">
                Select category:
              </label>
              <select
                className="w-full border p-3 rounded"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">Select category</option>
                {Object.keys(categories).map((key) => (
                  <option key={key} value={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory Dropdown */}
            {selectedCategory && (
              <div className="flex-1">
                <label className="block text-xs md:text-sm mb-2 font-medium">
                  Select item:
                </label>
                <select
                  className="w-full border p-3 rounded"
                  value={selectedSubcategory}
                  onChange={handleSubcategoryChange}
                >
                  <option value="">Select item</option>
                  {categories[selectedCategory].map((sub, index) => (
                    <option key={index} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {selectedSubcategory && (
            <p className="text-xs md:text-sm text-gray-600">
              Item selected:{" "}
              <strong>
                {selectedCategory} → {selectedSubcategory}
              </strong>
            </p>
          )}

          <div className=" md:hidden w-full md:w-1/2 mb-2 flex flex-col justify-start">
            <label
              htmlFor="instruction"
              className="text-xs md:text-sm mb-2 font-medium"
            >
              Special handling instructions/Description
            </label>
            <textarea
              id="instruction"
              name="instruction"
              rows="1"
              className="w-full border rounded p-2 resize-none h-24 sm:h-28 md:h-12"
              placeholder=" If Others List items here."
              value={instruction}
              onChange={handleInstructionChange}
            />
          </div>

          <button
            type="button"
            onClick={handleAddItem}
            className="text-xs md:text-sm relative mt-2 px-4 py-2 bg-[#00000005] border-[0000001A] border-1 shadow-lg hover:border-teal-500 text-black h-12 rounded w-32 md:w-36 flex items-center justify-center gap-2"
          >
            <Image src={plusimg} alt="Add item" className="inline-block" />
            Add Item
          </button>
        </div>

        {/* Right column */}
        <div className="hidden md:flex w-full md:w-1/2 mb-2 flex-col justify-start">
          <label
            htmlFor="instruction"
            className="text-xs md:text-sm mb-2 font-medium"
          >
            Special handling instructions/Description
          </label>
          <textarea
            id="instruction"
            name="instruction"
            rows="1"
            className="w-full border rounded p-2 resize-none h-24 sm:h-28 md:h-12"
            placeholder=" If Others List items here."
            value={instruction}
            onChange={handleInstructionChange}
          />
        </div>
      </div>

      {/* Grouped Result Display */}
      <div className="w-full md:w-3/4 mt-6 space-y-6">
        {Object.entries(groupedItems).map(([category, categoryItems]) => (
          <div key={category} className="border rounded p-4">
            <h3 className="text-md md:text-lg font-semibold mb-2">
              {category}
            </h3>
            <ul className="space-y-2">
              {categoryItems.map((item, index) => (
                <li
                  key={`${item.subcategory}-${index}`}
                  className="text-sm border p-2 rounded flex justify-between items-start gap-4"
                >
                  <div>
                    <strong className="flex justify-start items-center gap-8 md:gap-12">
                      {item.subcategory}
                      <span className="text-xs text-teal-600">
                        Qty: {item.count}
                      </span>
                    </strong>
                    <span className="text-gray-600 block">
                      {item.instruction || "No instructions"}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      window.confirm(
                        "Are you sure you want to delete this item?"
                      ) &&
                      handleDeleteItem(
                        item.category,
                        item.subcategory,
                        item.instruction
                      )
                    }
                    className="text-red-500 text-xs hover:underline"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
