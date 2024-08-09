function Navbar() {
  return (
    <nav className="bg-slate-800 text-white">

      <div className=" mycontainer flex justify-between items-center px-4 py-5 h-14">
        <div className="logo font-bold text-white text-2xl font-mono">
          <span className="text-white">&lt;</span>
          Pass
          <span className="text-green-700">Up/&gt;</span>
        </div>
{/* 
        <ul>
          <li className="flex gap-4 ">
            <a className="hover:text-green-100 hover:font-bold" href="/">
              Home
            </a>
            <a className="hover:text-green-100 hover:font-bold" href="/">
              About
            </a>
            <a className="hover:text-green-100 hover:font-bold" href="/">
              Contact
            </a>
          </li>
        </ul> */}
        <button className="text-white bg-green-700 my-5 rounded-full flex py-1  justify-center items-center ring-white ring-1">
          <img
            className="invert p-1 px-2  w-10"
            src="/icons/github.png"
            alt="github logo"
          />
          <span className="font-bold px-2">Github</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
