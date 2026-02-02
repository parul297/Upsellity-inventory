import AppRoutes from "./routes/AppRoutes"
import { BrowserRouter } from "react-router-dom"
import Navbar from "./component/layout/Navbar"

function App() {

  return (
    <>
      <BrowserRouter>
      <Navbar />
        <div>
          <AppRoutes />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
