import classes from "./Nav.module.css";
import { useNavigate } from "react-router";

function Nav() {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate("/auth", { push: true });
  };

  return (
    <nav className={classes.nav}>
      <img className={classes.navLogo} src={"/static/images/logo.svg"} alt="" />

      <div className={classes.imgDiv}>
        <img src={"/static/images/icon-sun.svg"} alt="" />
        <div className={classes.avatar}>
          <img
            onClick={onClickHandler}
            src={"/static/images/image-avatar.jpg"}
            alt=""
          />
        </div>
      </div>
    </nav>
  );
}

export default Nav;
