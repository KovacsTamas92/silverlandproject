import NavBar from "../components/navbar";
import SideBar from "../components/sidebar";
import Logo from "../images/logo.gif";
import Header from "../components/header";

function Regandlogin() {
  return (
    <div>
      <Header />
      <div className="ml-[255px]">
        <div className="flex justify-center">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="ml-200">
          <NavBar />
        </div>
      </div>
      <div>
        <SideBar />
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col space-y-4 p-4 ml-[255px] ">
          <h1>Regisztráció</h1>
          <input
            type="text"
            className="border border-black p-2 w-[255px]"
            placeholder="Felhasználónév"
          />
          <input
            type="text"
            className="border border-black p-2 w-[255px]"
            placeholder="Név"
          />
          <input
            type="text"
            className="border border-black p-2 w-[255px]"
            placeholder="Email"
          />
          <input
            type="text"
            className="border border-black p-2 w-[255px]"
            placeholder="Telefon"
          />
          <h2>Szállítási adatok</h2>
          <input
            type="text"
            className="border border-black p-2 w-[255px]"
            placeholder="Név"
          />
          <input
            type="text"
            className="border border-black p-2 w-[255px]"
            placeholder="Ország"
          />
          <input
            type="text"
            className="border border-black p-2 w-[255px]"
            placeholder="Irányítószám"
          />
          <input
            type="text"
            className="border border-black p-2 w-[255px]"
            placeholder="Város"
          />
          <input
            type="text"
            className="border border-black p-2 w-[255px]"
            placeholder="Cím"
          />
          <div className="">
            <button className="bg-black text-white font-bold py-2 px-4 rounded mb-2 w-40	">
              Regisztráció
            </button>
          </div>
        </div>

        <div className="flex flex-col space-y-4 p-4 ml-[255px] ">
          <h1>Bejelentkezés</h1>
          <input
            type="text"
            className="border border-black p-2 w-[255px]"
            placeholder="Felhasználónév"
          />
          <input
            type="password"
            className="border border-black p-2 w-[255px]"
            placeholder="Jelszó"
          />{" "}
          <div className="">
            <button className="bg-black text-white font-bold py-2 px-4 rounded mb-2 w-40	">
              Bejelentkezés
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Regandlogin;
