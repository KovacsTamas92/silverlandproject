import NavBar from "../components/navbar";
import SideBar from "../components/sidebar";
import Logo from "../images/logo.gif";
import ProductCard from "../components/productcard";
import ProductDescription from "../components/productdescription";
import Header from "../components/header";

function MainWebsite() {
  return (
    <div>
      <Header />
      <div className="ml-[255px]">
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
      <div className="ml-[255px] flex flex-wrap gap-4 justify-start">
        <ProductCard />
      </div>
    </div>
  );
}
export default MainWebsite;
