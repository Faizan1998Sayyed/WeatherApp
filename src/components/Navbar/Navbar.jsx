import { NavbarIcon, RefreshIcon } from "../SvgIcons";
import classes from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={classes.navbar}>
      <div className={classes.logo}>
        <NavbarIcon />
        <h3>Weather 99</h3>
      </div>
      <div className={classes.refresh}>
        <RefreshIcon />
        <p>Refresh</p>
      </div>
    </nav>
  );
};

export default Navbar;
