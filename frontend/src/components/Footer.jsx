function Footer() {
  return (
    <div className="bg-slate-800 text-white flex flex-col justify-center items-center w-full bottom-0 ">
      <div className="logo font-bold text-white text-2xl font-mono">
        <span className="text-white ">&lt;</span>
        Pass
        <span className="text-green-700">Up/&gt;</span>
      </div>
      <div className="flex justify-center items-center text-xs font-semibold">
        Created with <img className="w-7 mx-2 h-7" src="/icons/heart.png" alt="" /> by
        <a target="_blank" href="">
          @PIYUSH_BHATT
        </a>
      </div>
    </div>
  )
}
export default Footer