import React, { useEffect } from "react";
import "./Loader.css";
const Loader = () => {
  useEffect(() => {
    window.onload = function () {
      var loading = document.getElementById("loading");

      function addRedDot(i) {
        i.innerHTML = "<h1>LOADING<span class='dot-red'>.</span></h1>";
      }
      function addYellowDot(i) {
        i.innerHTML =
          "<h1>LOADING<span class='dot-red'>.</span><span class='dot-yellow'>.</span></h1>";
      }
      function addGreenDot(i) {
        i.innerHTML =
          "<h1>LOADING<span class='dot-red'>.</span><span class='dot-yellow'>.</span><span class='dot-green'>.</span></h1>";
      }
      function removeDots(i) {
        i.innerHTML = "<h1>LOADING</h1>";
      }

      function timedDots(i) {
        setTimeout(function () {
          addRedDot(i);
        }, 1000);
        setTimeout(function () {
          addYellowDot(i);
        }, 2000);
        setTimeout(function () {
          addGreenDot(i);
        }, 3000);
        setTimeout(function () {
          removeDots(i);
        }, 4000);
      }

      setInterval(function () {
        timedDots(loading);
      }, 4000);
    };
  }, []);
  return (
        <div className="body">
            <div class="canvas">
              <div class="scrolling-area">
                <div class="rabbit-main rabbit-floor rabbit-jump">
                  <div class="rabbit-body-part rabbit-body"></div>
                  <div class="rabbit-body-part rabbit-tail"></div>
                  <div class="rabbit-body-part rabbit-foot">
                    <div class="foot-cover"></div>
                  </div>
                  <div class="rabbit-body-part rabbit-head"></div>
                  <div class="rabbit-body-part rabbit-ear  rabbit-ear-1">
                    <div class="ear-cover"></div>
                  </div>
                  <div class="rabbit-body-part rabbit-ear  rabbit-ear-2">
                    <div class="ear-cover"></div>
                  </div>
                </div>
                <div class="egg-outer egg-1">
                  <div class="egg-line egg-line-1"></div>
                  <div class="egg-line egg-line-2"></div>
                  <div class="egg-line egg-line-3"></div>
                  <div class="egg-line egg-line-4"></div>
                  <div class="egg-line egg-line-5"></div>
                </div>
                <div class="egg-outer egg-2">
                  <div class="egg-line egg-line-1"></div>
                  <div class="egg-line egg-line-2"></div>
                  <div class="egg-line egg-line-3"></div>
                  <div class="egg-line egg-line-4"></div>
                  <div class="egg-line egg-line-5"></div>
                </div>
                <div class="egg-outer egg-3">
                  <div class="egg-line egg-line-1"></div>
                  <div class="egg-line egg-line-2"></div>
                  <div class="egg-line egg-line-3"></div>
                  <div class="egg-line egg-line-4"></div>
                  <div class="egg-line egg-line-5"></div>
                </div>
                <div class="egg-outer egg-4">
                  <div class="egg-line egg-line-1"></div>
                  <div class="egg-line egg-line-2"></div>
                  <div class="egg-line egg-line-3"></div>
                  <div class="egg-line egg-line-4"></div>
                  <div class="egg-line egg-line-5"></div>
                </div>
              </div>
              <div class="ground"></div>
            </div>
            <div class="loading" id="loading">
              <h1>LOADING...</h1>
            </div>
        </div>
  );
};

export default Loader;
