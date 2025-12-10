import React from "react";

const InputField = ({label, type='text', value, onChange, placeholder}) =>{
    return(
        <div className="mb-4 w-full">
            <label className="block text-gray-700 font-medium mb-1">{label}</label>
            <input 
                type={type}
                value = {value}
                onChange ={onChange}
                placeholder={placeholder}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus: ring-2 focus: ring-blue-200 outline-none"
            />
        </div>
    )
}

export default InputField