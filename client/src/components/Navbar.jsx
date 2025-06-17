import { assets } from "../assets/assets"
import { useAppContext } from "../context/AppContext"


const Navbar = () => {

    // get navigate and token from AppContext
    const { navigate, token } = useAppContext()

  return (
    // make it flex to display items in a row
    <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx32'>

        {/* logo icon on left  
            on click navigate to home page*/}
        <img onClick={()=>navigate('/')} src={assets.logo} alt="logo" className="w-32 sm:w-44"/>
        
        {/* login button on right 
            on click navigate to /admin */} 
        <button onClick={()=>navigate('/admin')} className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5">
            { token ? "dashboard" : "Login" } {/* display button based on token */}
            <img src={assets.arrow} alt="arrow" className="w-3 bg"/>
        </button>
    </div>
  )
}

export default Navbar
