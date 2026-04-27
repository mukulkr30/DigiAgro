import React from "react";

export default function InputField({ label, name, register, errors, ...rest }) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>

      <input
        {...register(name, { required: true })}
        {...rest}
        className="w-full p-2 border rounded"
      />

      {errors[name] && (
        <p className="text-red-500 text-sm">This field is required</p>
      )}
    </div>
  );
}