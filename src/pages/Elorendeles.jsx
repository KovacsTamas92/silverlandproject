import NavBar from "../components/navbar";
import SideBar from "../components/sidebar";
import Logo from "../images/logo.gif";

function Elorendeles() {
  return (
    <div>
      <div className="ml-255px">
        <div className="flex justify-center ">
          <img src={Logo} alt="" />
        </div>
        <div className="ml-200">
          <NavBar />
        </div>
      </div>

      <div>
        <SideBar />
      </div>
    </div>
  );
}
export default Elorendeles;
