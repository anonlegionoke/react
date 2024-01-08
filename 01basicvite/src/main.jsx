import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'



const theReactElement = React.createElement(
    'a',
    { href: 'https://google.com', target: "_blank" },
    'Google It Now!'
)

ReactDOM.createRoot(document.getElementById('root')).render(

<App /> 

)
