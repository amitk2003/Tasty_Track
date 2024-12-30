import React from 'react'
import { Link } from 'react-router-dom'
import instagram from './instagram.png'
import LinkedIn from './linkedin.png'
import email from './email.png'
import github from './github.png'

export default function Footer() {
return (
    <div>
<footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top " >
    <div className="col-md-4 d-flex align-items-center">
<Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
    </Link>
    <span className="text-muted " style={{"textAlign":"center", 'bottom':'0', 'position':'fixed', 'left':'0','width':'100%'}}>© 2024 Tasty Track, Inc</span>
    </div>

    <ul className="text-muted" style={{textAlign:"center", bottom:'0px', position:'fixed', right:'0',width:"40px", height:"40px"}}>
        <li className="list-inline-item"><Link to="https://www.instagram.com/amitkumar.6788/" className="text-muted"><img src={instagram} /></Link></li>
        <li className="list-inline-item"><Link to="https://www.linkedin.com/in/amit-kumar-6788/" className="text-muted"><img src={LinkedIn} /></Link></li>
        <li className="list-inline-item"><Link to="mailto:amitk200703@gmail.com" className="text-muted"><img src={email} /></Link></li>
        <li className="list-inline-item"><Link to="https://github.com/amitk2003" className="text-muted"><img src={github} /></Link></li>
    </ul>
</footer>
    </div>
)
}
