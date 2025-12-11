import { useEffect, useState } from "react";
import { getUsers, updateUserRole, deleteUser } from "../../services/userService";
import RoleModal from "../../components/admin/RoleModal";

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const token = localStorage.getItem("token");

    const loadUsers = async () => {
        try {
            const res = await getUsers(token);
            setUsers(res.data.results);
        } catch (err) {
            console.error("Failed to fetch users:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleRoleSave = async (role_id) => {
        try {
            await updateUserRole(token, selectedUser.id, role_id);
            setSelectedUser(null);
            loadUsers();
        } catch (err) {
            console.error("Role update failed:", err);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this user?")) return;

        try {
            await deleteUser(token, id);
            loadUsers();
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    if (loading) return <p className="text-center mt-10">Loading users...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Users</h1>

            <div className="bg-white shadow rounded-lg p-4">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 text-left">Name</th>
                            <th className="p-2 text-left">Email</th>
                            <th className="p-2 text-left">Role</th>
                            <th className="p-2 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id} className="border-t">
                                <td className="p-2">{u.name}</td>
                                <td className="p-2">{u.email}</td>

                                <td className="p-2">
                                    <span className="px-2 py-1 rounded bg-blue-100 text-blue-700">
                                        {u.role_id === 1
                                            ? "Admin"
                                            : u.role_id === 2
                                            ? "Finance Manager"
                                            : "User"}
                                    </span>
                                </td>

                                <td className="p-2 space-x-2">
                                    <button
                                        onClick={() => setSelectedUser(u)}
                                        className="px-3 py-1 bg-yellow-500 text-white rounded"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(u.id)}
                                        className="px-3 py-1 bg-red-600 text-white rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedUser && (
                <RoleModal
                    user={selectedUser}
                    onClose={() => setSelectedUser(null)}
                    onSave={handleRoleSave}
                />
            )}
        </div>
    );
};

export default UsersPage;
