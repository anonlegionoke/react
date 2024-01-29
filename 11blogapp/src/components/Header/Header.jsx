import React from 'react'
// container required because from here we need to navigate to places
import Container from "../container/Container"
import Logo from "../Logo"
// Link required because we are redirecting lot of stuff
import {Link} from "react-router-dom"
import LogoutBtn from './LogoutBtn'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function Header() {

    /* Setup navigate hooks which selectior and navigate */
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    /* Design some items to navigate to */


    /* Notice that navItems are objects, but since we have more
    than one type of objects they are defined inside an array */

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus /* we dont want login page to display if user is already
            authenticated. So we use !authStatus which is a 'false' statement
            in this case. so the active status logically becomes 'false' too 
            Basically means Login page is active if the user is not authenticated.
            */ 
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus
        }
    ]

  return (
    <header className='py-3 shadow bg-white'>
        <Container>
            <nav className='flex'>
                <div className='mr-4'>
                    <Link to="/"> {/* what it does is that if we click on the logo, 
                                    it redirects to the home location (/) */}
                        <Logo />
                    </Link>
                </div>
                  <ul className='flex ml-auto'>
                      
                      {/* loop through the navItems values.
                      we use 'map' to loop through the values here */}
                    {
                        navItems.map((item /* the reference object for 
                        a single item to loop in navItems */) => item.active ? /* what it does is that
                        it will loop through the only items which have a property called 'active' */ (
                            <li key={item.name}>
                                <button
                                onClick={() => navigate(item.slug)}
                                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                                >
                                    {item.name}
                                </button>
                            </li>
                        ) : null)
                    }
                    {authStatus && ( /* What it does is that only show logout button 
                    to the users who are authenticated, which means logged in. */
                        <li>
                            <LogoutBtn />
                        </li>
                    )}
                </ul>
            </nav>
        </Container>
    </header>
  )
}

export default Header