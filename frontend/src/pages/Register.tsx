import React, { useEffect } from "react";
// import "./register.css";
export function loader({ request }: { request: Request }) {
  const pathname = new URL(request.url).searchParams.get("message") || null;
  if (pathname) {
    console.log("logged out");
  }
  return request;
}
const Register = () => {
  useEffect(() => {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");
    if (sign_up_btn && container) {
      sign_up_btn.addEventListener("click", () => {
        container.classList.add("sign-up-mode");
      });
    }
    if (sign_in_btn && container)
      sign_in_btn.addEventListener("click", () => {
        container.classList.remove("sign-up-mode");
      });
  }, []);
  return (
    <>
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            <form action="#" className="sign-in-form">
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Username" />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" />
              </div>
              <input type="submit" value="Login" className="btn solid" />
            </form>
            <form action="#" className="sign-up-form">
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Username" />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="email" placeholder="Email" />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" />
              </div>
              <input type="submit" className="btn" value="Sign up" />
            </form>
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Debitis, ex ratione. Aliquid!
              </p>
              <button className="btn transparent" id="sign-up-btn">
                Sign up
              </button>
            </div>
            <img src="log.svg" className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                laboriosam ad deleniti.
              </p>
              <button className="btn transparent" id="sign-in-btn">
                Sign in
              </button>
            </div>
            <img src="register.svg" className="image" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
