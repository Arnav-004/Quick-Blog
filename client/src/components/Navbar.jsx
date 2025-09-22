import { assets } from "../assets/assets"
import { useAppContext } from "../context/AppContext"


const Navbar = () => {

    // get navigate and token from AppContext
    const { navigate, token, setType } = useAppContext()

  return (
    <div className='w-full flex justify-between items-center py-5 px-4 sm:px-8 xl:px-32 backdrop-blur-3xl'>
      {/* logo icon on left */}
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="logo"
        className="w-24 sm:w-32 xl:w-44 cursor-pointer"
      />

      {/* Buttons on right */}
      <div className="flex gap-2 sm:gap-4">
        <button
          onClick={() => { setType("Login"); navigate('/admin') }}
          className="flex items-center gap-1 sm:gap-2 rounded-full text-xs sm:text-sm cursor-pointer bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 sm:px-8 py-2 shadow-lg hover:scale-105 transition-transform duration-200"
        >
          {token ? (
            <span className="font-semibold">Dashboard</span>
          ) : (
            <span className="font-semibold">Login</span>
          )}
          <img src={assets.arrow} alt="arrow" className="w-2 sm:w-3 ml-1 sm:ml-2" />
        </button>

        {/* Sign Up button */}
        {!token && (
          <button
            onClick={() => { setType("SignUp"); navigate('/admin') }}
            className="flex items-center gap-1 sm:gap-2 rounded-full text-xs sm:text-sm cursor-pointer bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 sm:px-8 py-2 shadow-lg hover:scale-105 transition-transform duration-200"
          >
            <span className="font-semibold">Sign Up</span>
            <img src={assets.arrow} alt="arrow" className="w-2 sm:w-3 ml-1 sm:ml-2" />
          </button>
        )}
      </div>
    </div>
  )
}

export default Navbar
