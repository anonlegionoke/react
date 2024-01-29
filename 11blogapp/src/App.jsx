import { useState, useEffect } from 'react'
import './App.css'

import { Outlet } from 'react-router-dom'

/* WHAT IS OUTLET?

a placeholder where child route elements are rendered.
it helps in a nested UI

 This is particularly useful for creating layouts where 
 certain parts of the UI remain consistent across different views, and 
 only specific sections change based on the matched route.

*/

/* Here, the header and footer remains same across all views of pages. The part where the
Outlet is only changes according the matched route which the user navigates to. Therefore it
is a placeholder for the other views/routes to display */

import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import Header from "./components/Header/Header"
import Footer from "./components/footer/Footer"
import authService from './appwrite/auth'
import Logo from "./components/Logo"

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

    useEffect(() => { /* display stuff only after the user is logged in */
        authService.getCurrentUser().then((userData) => {
                if (userData) dispatch(login({ userData }));
                else dispatch(logout());
            })
            .finally(() => setLoading(false));
    }, [dispatch]);

    return !loading ? /* when to display stuff */(
      <div className="min-h-screen flex flex-wrap content-between bg-yellow-400">
          <div className="w-full block">
              <Header />
              <main>
                  <Outlet />
              </main>
          </div>
          <div className="w-full block">
              <Footer />
          </div>
      </div>
  ) : null;
}

export default App