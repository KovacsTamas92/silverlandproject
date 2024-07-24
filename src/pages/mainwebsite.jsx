import NavBar from "../components/navbar";
import SideBar from "../components/sidebar";
import Logo from "../images/logo.gif";
import ProductCard from "../components/productcard";
import ProductDescription from "../components/productdescription";

function MainWebsite() {
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
      <div className="ml-255px flex justify-left m-5px flex-wrap justify-around">
        <ProductCard /> <ProductCard /> <ProductCard /> <ProductCard />{" "}
        <ProductCard /> <ProductCard /> <ProductCard /> <ProductCard />{" "}
        <ProductCard /> <ProductCard /> <ProductCard /> <ProductCard />{" "}
        <ProductCard /> <ProductCard /> <ProductCard /> <ProductCard />{" "}
        <ProductCard /> <ProductCard /> <ProductCard /> <ProductCard />{" "}
        <ProductCard /> <ProductCard /> <ProductCard /> <ProductCard />{" "}
        <ProductCard /> <ProductCard /> <ProductCard /> <ProductCard />{" "}
        <ProductCard /> <ProductCard /> <ProductCard /> <ProductCard />{" "}
        <ProductCard />
      </div>
    </div>
  );
}
export default MainWebsite;
