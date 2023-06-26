import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Chains from "../constants/chains";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const menu = ["all", "avalanche", "aptos"];
  // eslint-disable-next-line no-unused-vars
  const [chains, setChains] = useState(menu);
  const handleOpen = () => {
    setOpen(!open);
  };

  const handleChainChange = (selectedChain) => {
    let index = chains.indexOf(selectedChain);
    const element = chains.splice(index, 1)[0];
    chains.splice(0, 0, element);
    localStorage.setItem("chain", selectedChain);
    window.dispatchEvent(new Event("chainChange"));
  };

  useEffect(() => {
    localStorage.setItem("chain", "all");
  }, []);

  return (
    <nav>
      <Link to="/">
        <img src="/logo.png" alt="Avalanche NFT Aggrigato" />
      </Link>
      <ul className="nav-list">
        <li className="dropdown">
          <ul>
            <li className="nav-link nav-platform" onClick={handleOpen}>
              {/* <img src={Chains.Avalanche.img} alt={Chains.Avalanche.alt} /> */}
              <span style={{ marginLeft: "5px" }}>
                {chains[0] !== "all" ? (
                  <>
                    <img
                      style={{ maxWidth: "20px" }}
                      src={Chains[chains[0]].img}
                      alt={Chains[chains[0]].alt}
                    />
                    <span style={{ marginLeft: "5px" }}>{chains[0]}</span>
                  </>
                ) : (
                  <>
                    <span style={{ marginLeft: "5px" }}>⛓️ all chains</span>
                  </>
                )}
              </span>
              {open ? (
                <ul className="menu">
                  {chains.slice(1).map((chain) => {
                    return (
                      <li
                        key={chain}
                        className="menu-item"
                        onClick={() => handleChainChange(chain)}
                      >
                        {chain !== "all" ? (
                          <>
                            <img
                              src={Chains[chain].img}
                              alt={Chains[chain].alt}
                            />
                            <span style={{ marginLeft: "5px" }}>{chain}</span>
                          </>
                        ) : (
                          <>
                            <span style={{ marginLeft: "5px" }}>
                              ⛓️ all chains
                            </span>
                          </>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
