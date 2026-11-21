import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const boothsData = [
  { id: 'A1', zone: 'Tech Zone', size: '20x20 ft', price: '$1,200', status: 'Booked', company: 'TechNova Solutions' },
  { id: 'A2', zone: 'Tech Zone', size: '15x15 ft', price: '$850', status: 'Available', company: null },
  { id: 'A4', zone: 'Tech Zone', size: '20x20 ft', price: '$1,200', status: 'Booked', company: 'FinEdge Systems' },
  { id: 'B1', zone: 'Retail Zone', size: '15x15 ft', price: '$850', status: 'Available', company: null },
  { id: 'B2', zone: 'Retail Zone', size: '20x20 ft', price: '$1,200', status: 'Booked', company: 'Gourmet Bites' },
  { id: 'B5', zone: 'Retail Zone', size: '20x20 ft', price: '$1,200', status: 'Booked', company: 'EcoWear Apparel' },
  { id: 'C1', zone: 'Startup Hub', size: '10x10 ft', price: '$500', status: 'Available', company: null },
  { id: 'C6', zone: 'Startup Hub', size: '10x10 ft', price: '$500', status: 'Reserved', company: 'PixelCraft Studio' },
];

const BoothFloorPlan = () => {
  const [selectedBooth, setSelectedBooth] = useState(boothsData[1]); // Default A2 selected
  const location = useLocation();

  useEffect(() => {
    const boothId = new URLSearchParams(location.search).get('booth');
    const matchingBooth = boothsData.find((booth) => booth.id === boothId);

    if (!matchingBooth) return;

    setSelectedBooth(matchingBooth);
    document.getElementById('floor-plan')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [location.search]);

  return (
    <section id="floor-plan" className="scroll-mt-24 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-[#171B36] mb-3">
          Interactive <span className="text-[#5145CD]">Floor Plan</span>
        </h2>
        <p className="text-[#475569] text-lg max-w-2xl mx-auto">
          Click on any booth to check real-time availability, dimensions, and exhibitor details.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left: Interactive Booth Grid */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="mb-6 flex flex-col gap-3 border-b border-[#E2E8F0] pb-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-bold text-[#171B36]">Grand Exhibition Hall — Level 1</span>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#5145CD]"></span> Available</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#F5A623]"></span> Reserved</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#94A3B8]"></span> Booked</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {boothsData.map((booth) => {
              const isSelected = selectedBooth.id === booth.id;
              const statusStyle =
                booth.status === 'Available'
                  ? 'border-[#5145CD] bg-[#5145CD]/5 text-[#5145CD] hover:bg-[#5145CD] hover:text-white'
                  : booth.status === 'Reserved'
                  ? 'border-[#F5A623] bg-[#F5A623]/10 text-[#B45309]'
                  : 'border-[#E2E8F0] bg-[#F1F5F9] text-[#64748B]';

              return (
                <button
                  key={booth.id}
                  onClick={() => setSelectedBooth(booth)}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center cursor-pointer ${statusStyle} ${
                    isSelected ? 'ring-4 ring-[#7C3AED]/30 scale-105 shadow-md' : ''
                  }`}
                >
                  <span className="text-2xl font-extrabold">{booth.id}</span>
                  <span className="text-xs mt-1 font-medium opacity-80">{booth.zone}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Booth Details Card */}
        <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-[#171B36]">Booth {selectedBooth.id}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              selectedBooth.status === 'Available' ? 'bg-[#15803D]/15 text-[#15803D]' :
              selectedBooth.status === 'Reserved' ? 'bg-[#F5A623]/20 text-[#B45309]' :
              'bg-[#E2E8F0] text-[#475569]'
            }`}>
              {selectedBooth.status}
            </span>
          </div>

          <div className="space-y-4 text-sm text-[#475569] mb-8">
            <div className="flex justify-between border-b border-[#E2E8F0] pb-2">
              <span>Zone</span>
              <span className="font-semibold text-[#171B36]">{selectedBooth.zone}</span>
            </div>
            <div className="flex justify-between border-b border-[#E2E8F0] pb-2">
              <span>Dimensions</span>
              <span className="font-semibold text-[#171B36]">{selectedBooth.size}</span>
            </div>
            <div className="flex justify-between border-b border-[#E2E8F0] pb-2">
              <span>Pricing</span>
              <span className="font-semibold text-[#5145CD]">{selectedBooth.price}</span>
            </div>
            {selectedBooth.company && (
              <div className="flex justify-between border-b border-[#E2E8F0] pb-2">
                <span>Exhibitor</span>
                <span className="font-semibold text-[#171B36]">{selectedBooth.company}</span>
              </div>
            )}
          </div>

          {selectedBooth.status === 'Available' ? (
            <Link
              to="/register"
              className="block w-full text-center bg-[#5145CD] hover:bg-[#7C3AED] text-white font-semibold py-3 rounded-lg transition-all shadow-md"
            >
              Book Booth {selectedBooth.id}
            </Link>
          ) : (
            <button
              disabled
              className="w-full bg-[#E2E8F0] text-[#94A3B8] font-semibold py-3 rounded-lg cursor-not-allowed"
            >
              Not Available
            </button>
          )}
        </div>

      </div>
    </section>
  );
};

export default BoothFloorPlan;