import Logo from "../assets/logo.png"
import { Link } from "react-router-dom";


function Sidebar(){
    return(
        <aside className="sidebar">
            {/*header*/}
            <div className="sidebar_header">
                <Link to="/" className="logo_btn">
                    <img src={Logo} alt="Cerist Biblio Logo" className="logo-img"/>
                    <div className="header-text">
                        <h2>SciMetrics</h2>
                        <span>PFE Licence L3</span>
                    </div>  
                </Link>
            </div>
            <div className="sidebar_content">
                <div className="dashboard_sidebar">
                    <Link to="/"><h2>Home</h2></Link>
                </div>
                <p className="section-title">NIVEAUX D'ANALYSE</p>

            </div>

            
        </aside>
    )
}
export default Sidebar;