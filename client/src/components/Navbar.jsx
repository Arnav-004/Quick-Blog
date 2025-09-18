import { assets } from "../assets/assets"
import { useAppContext } from "../context/AppContext"


const Navbar = () => {

    // get navigate and token from AppContext
    const { navigate, token } = useAppContext()

  return (
    // make it flex to display items in a row
    <div className=' w-full flex justify-between items-center py-5 px-8 sm:px-20 xl:px32 backdrop-blur-3xl'>

        {/* logo icon on left  
            on click navigate to home page*/}
        <img onClick={()=>navigate('/')} src={assets.logo} alt="logo" className="w-32 sm:w-44"/>
        
        {/* login/dashboard button on right 
            on click navigate to /admin */}
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-gradient-to-r from-amber-400 to-orange-500 text-white px-8 py-2 shadow-lg hover:scale-105 transition-transform duration-200"
        >
          {token ? (
            <>
              <span className="font-semibold">Dashboard</span>
            </>
          ) : (
            <>
              <span className="font-semibold">Login</span>
            </>
          )}
          <img src={assets.arrow} alt="arrow" className="w-3 ml-2" />
        </button>
    </div>
  )
}

export default Navbar
