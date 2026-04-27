import { useAuth } from "../store/useAuth";
import { useNavigate } from "react-router";

function UserProfile() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Profile Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>
        <div className="flex items-center gap-6">
          <img
            src={currentUser?.profileImageUrl || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
            alt="Profile"
            className="w-24 h-24 rounded-lg object-cover border border-gray-300"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{currentUser?.firstName} {currentUser?.lastName || ""}</h2>
            <p className="text-gray-600 mt-1">{currentUser?.email}</p>
            <div className="mt-2">
              <div className="bg-blue-100 px-3 py-1 rounded text-sm font-medium text-blue-700 w-fit">
                {currentUser?.role}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Information</h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-600">First Name</p>
            <p className="text-gray-800 font-medium">{currentUser?.firstName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Last Name</p>
            <p className="text-gray-800 font-medium">{currentUser?.lastName || "—"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="text-gray-800 font-medium">{currentUser?.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Role</p>
            <p className="text-gray-800 font-medium">{currentUser?.role}</p>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="flex gap-3">
        <button
          onClick={onLogout}
          className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserProfile;