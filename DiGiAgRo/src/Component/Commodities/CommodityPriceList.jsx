import React from 'react';

function CommodityPriceList({ prices, searchedState, searchedDistrict }) {

    
  if (!prices || prices.length === 0) {
    return (
      <div className="mt-8 bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl text-center">
        <p className="font-semibold">No price records found for this selection.</p>
        <p className="text-sm mt-1">Please try a different state, district, or commodity.</p>
      </div>
    );
  }

  // Use State & District from the first record or fall back to searched inputs
  const stateName = prices[0]?.State || searchedState;
  const districtName = prices[0]?.District || searchedDistrict;

  return (
    <div className="mt-8">
      {/* Top Header: State and District */}
      <div className="bg-green-800 text-white p-4 rounded-xl shadow mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-xs uppercase tracking-wider text-green-200">Location</span>
          <h2 className="text-2xl font-bold">
            {districtName}, {stateName}
          </h2>
        </div>
        <div className="mt-2 sm:mt-0 text-sm bg-green-900/60 px-3 py-1 rounded-full w-fit">
          Found <span className="font-bold">{prices.length}</span> mandi record(s)
        </div>
      </div>

      {/* List of Mandi Prices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {prices.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-green-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Commodity Name and Grade */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{item.Commodity}</h3>
                <p className="text-xs text-gray-500">Mandi: {item.Market || 'N/A'}</p>
              </div>
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                Grade: {item.Grade || 'FAQ'}
              </span>
            </div>

            {/* Min Price and Max Price */}
            <div className="grid grid-cols-2 gap-3 mt-4 text-center">
              <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                <span className="text-xs text-gray-500 uppercase font-semibold block">Min Price</span>
                <span className="text-lg font-bold text-emerald-700">
                  ₹{item.Min_Price}
                </span>
                <span className="text-[10px] text-gray-400 block">/ Quintal</span>
              </div>

              <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                <span className="text-xs text-gray-500 uppercase font-semibold block">Max Price</span>
                <span className="text-lg font-bold text-red-700">
                  ₹{item.Max_Price}
                </span>
                <span className="text-[10px] text-gray-400 block">/ Quintal</span>
              </div>
            </div>

            {/* Additional info: Modal price, variety, arrival date */}
            <div className="mt-3 pt-2 text-xs text-gray-500 flex justify-between">
              <span>Modal: <strong className="text-gray-700">₹{item.Modal_Price}</strong></span>
              <span>Variety: <strong className="text-gray-700">{item.Variety || 'N/A'}</strong></span>
              <span>Date: <strong className="text-gray-700">{item.Arrival_Date || 'N/A'}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommodityPriceList;