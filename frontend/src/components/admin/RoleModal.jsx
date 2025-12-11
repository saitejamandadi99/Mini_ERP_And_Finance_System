import { useState } from "react";

const RoleModal = ({ user, onClose, onSave }) => {
    const [role, setRole] = useState(user.role_id);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white p-6 shadow-lg rounded-lg w-96">
                <h2 className="text-lg font-semibold mb-4">
                    Update Role for {user.name}
                </h2>

                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full border px-3 py-2 rounded-lg"
                >
                    <option value="1">Admin</option>
                    <option value="2">Finance Manager</option>
                    <option value="3">User</option>
                </select>

                <div className="flex justify-end mt-4 space-x-3">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded-lg"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                        onClick={() => onSave(role)}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoleModal;
