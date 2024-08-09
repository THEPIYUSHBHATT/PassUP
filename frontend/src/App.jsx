import Navbar from './components/Navbar'
import MyUi from './components/MyUi'
import './App.css'
import Footer from './components/Footer'
function App() {
  return (
    <>
      <Navbar />
      <div className=" [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
        <MyUi />
      </div>
      <Footer />
    </>
  )
}

export default App
