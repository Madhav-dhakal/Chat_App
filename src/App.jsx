import { useContext } from "react";
import HomePage from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register"
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom"
import { AuthContext } from "./context/auth.context";


const App=()=>{
     const {currentUser} =useContext(AuthContext)

     const ProtectedRoute=({children})=>{
          if(!currentUser){
               setTimeout(() => {    
                    alert('Logout successfully !!');
                  }, 400);
               return <Navigate to= "/login"/>
          }
          return children;
     }
     return(
          <>
          
     <BrowserRouter>
     
     <Routes>
          <Route path="/">
          <Route index element={<ProtectedRoute>
               <HomePage/>
               </ProtectedRoute>
          }/>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
          </Route>
     </Routes>
     </BrowserRouter>
          
          </>
     )
}

export default App;