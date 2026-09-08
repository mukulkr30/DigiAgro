import React from 'react'
import {crops, stateDistricts} from '../../utils/commodities'
import { useForm } from "react-hook-form";
import axios from "axios";
import CommodityPriceList from './CommodityPriceList';
import { useState } from 'react';
function Commodities() {
    const {register, handleSubmit, watch, setValuee} = useForm()
    const selectedstate = watch("cstate");
    const [pricesData, setPricesData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [searchedState, setSearchedState] = useState("");
    const [searchedDistrict, setSearchedDistrict] = useState("");
    const districts = selectedstate?stateDistricts[selectedstate]:[];
    const selectedDist = watch("district")
    const selectedCrop = watch("commodity")

        const COMMODITIES_URL = `${import.meta.env.VITE_BACKEND_URL}/commodities`
        const token = localStorage.getItem("token");
        const submitRes =async (data)=>{
            try{
                if (!data.cstate || !data.district || !data.commodity) {
                    console.warn("Please select State, District, and Commodity.");
                    return;
                }

                const response = await axios.get(COMMODITIES_URL,{
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    params:{
                    state:selectedstate,
                    district:selectedDist,
                    commodity:selectedCrop
                    }
                }
                )
                setPricesData(response?.data || []);
                setSearchedState(stateVal);
                setSearchedDistrict(districtVal);
                }
             catch (error) {
                setErrorMsg("Failed to fetch mandi prices. Please try again. Or no price Available");
            } finally {
                setLoading(false);
            }
        }
    return (
        <div className="min-h-screen bg-white p-6">
            <div className="max-w-5xl mx-auto bg-green-200 p-6 rounded-2xl shadow-lg">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-800 rounded-full mb-3 shadow-inner text-2xl">
                        🌾
                    </div>
                    <h1 className="text-3xl font-extrabold text-green-950 tracking-tight">
                        Live Commodities & Mandi Prices
                    </h1>
                    <p className="text-sm text-green-800 mt-1">
                        Check real-time APMC market arrival prices across India
                    </p>
                </div>

            {/* Form Container Card */}
            <div className="bg-white/95 backdrop-blur rounded-2xl p-6 sm:p-8 shadow-md border border-green-100">
                <form onSubmit={handleSubmit(submitRes)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {/* State Field */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                                Select State
                            </label>
                            <div className="relative">
                                <select
                                    {...register("cstate")}
                                    className="w-full appearance-none bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-xl focus:ring-2 focus:ring-green-600 focus:border-green-600 focus:bg-white p-3 pr-8 transition shadow-xs cursor-pointer"
                                >
                                    <option value="">Select State</option>
                                    {Object.keys(stateDistricts).map((state) => (
                                        <option key={state} value={state}>{state}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 text-xs">
                                    ▼
                                </div>
                            </div>
                        </div>

                        {/* District Field */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                                Select District
                            </label>
                            <div className="relative">
                                <select
                                    {...register("district")}
                                    disabled={!selectedstate}
                                    className="w-full appearance-none bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-xl focus:ring-2 focus:ring-green-600 focus:border-green-600 focus:bg-white p-3 pr-8 transition shadow-xs cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400"
                                >
                                    <option value="">Select District</option>
                                    {districts.map((dis) => (
                                        <option key={dis} value={dis}>{dis}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 text-xs">
                                    ▼
                                </div>
                            </div>
                        </div>

                        {/* Crop Field */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                                Select Crop / Commodity
                            </label>
                            <div className="relative">
                                <select
                                    {...register("commodity")}
                                    className="w-full appearance-none bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-xl focus:ring-2 focus:ring-green-600 focus:border-green-600 focus:bg-white p-3 pr-8 transition shadow-xs cursor-pointer"
                                >
                                    <option value="">Select Crop</option>
                                    {crops.map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 text-xs">
                                    ▼
                                </div>
                            </div>
                        </div>
                    </div>



                    {/* Submit Button */}
                    <div className="flex justify-center pt-2">
                        <button
                            type="submit"
                            className="w-full sm:w-auto min-w-[240px] bg-green-800 hover:bg-green-700 active:scale-[0.98] text-white font-semibold py-3 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 1114 0z" />
                            </svg>
                            Find Commodity Prices
                        </button>
                    </div>
                </form>
            </div>
                    {/* Error message */}
                {pricesData.length==0 && errorMsg && (
                    <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-center text-sm font-medium">
                        {errorMsg}
                    </div>
                )}

                {/* Loading spinner */}
                {loading && (
                    <div className="mt-8 text-center py-6">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-green-700 border-t-transparent"></div>
                        <p className="mt-2 text-green-900 font-semibold">Fetching latest mandi prices...</p>
                    </div>
                )}

                {/* Display List when not loading and data is fetched */}
                {!loading && pricesData.length > 0 && (
                    <CommodityPriceList
                        prices={pricesData}
                        searchedState={searchedState}
                        searchedDistrict={searchedDistrict}
                    />
                )}
            </div>
        </div>
    )
}

export default Commodities
