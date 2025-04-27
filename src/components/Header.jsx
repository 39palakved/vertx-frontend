import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')); 
 const role = localStorage.getItem('role'); 
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-6">
      {
        role=='user'?(
       <Link to="/user-dashboard" className="hover:text-gray-300 font-semibold">Dashboard</Link>
        ):(
        <Link to="/admin-dashboard" className="hover:text-gray-300 font-semibold">Dashboard</Link>
        )
      }
        <Link to="/feed" className="hover:text-gray-300 font-semibold">Feed</Link>
        <Link to="/saved" className="hover:text-gray-300 font-semibold">Saved Posts</Link>
      </div>

      <div className="flex items-center space-x-4">
        {user && <span className="font-semibold">{user.name}</span>}
        <button 
          onClick={handleLogout} 
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
