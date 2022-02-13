import classes from "./Nav.module.css";

function Nav() {
  return (
    <nav className={classes.nav}>
      <img className={classes.navLogo} src={"/static/images/logo.svg"} alt="" />

      <div className={classes.imgDiv}>
        <img src={"/static/images/icon-sun.svg"} alt="" />
        <div className={classes.avatar}>
          <img src={"/static/images/image-avatar.jpg"} alt="" />
        </div>
      </div>
    </nav>
  );
}

export default Nav;
