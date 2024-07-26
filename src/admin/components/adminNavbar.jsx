import {Link} from 'react-router-dom'

function AdminNavbar () {
    return(
        <nav className="adminNavbar">
            <div>
                <Link to='/adminmain'>Főoldal</Link>
            </div>
        </nav>
    )
}

export default AdminNavbar