/**
 * Created with JetBrains WebStorm.
 * User: TYG
 * Date: 13-8-14
 * Time: 下午2:46
 * requestNextAnimationFrame 动画方法，让浏览器来自行决定帧率
 */
window.requestNextAnimationFrame =
  (
    function () {
      var originalWebkitMethod
        , wrapper = undefined
        , callback = undefined
        , geckoVersion = 0
        , userAgent = navigator.userAgent
        , index = 0
        , self = this;
      // Workaround for Chrome 10 bug where Chrome
      // does not pass the time to the animation function
      if (window.webkitRequestAnimationFrame) {
        // Define the wrapper

        wrapper = function (time) {
          if (time === undefined) {
            time = +new Date();
          }
          self.callback(time);
        };
        // Make the switch

        originalWebkitMethod = window.webkitRequestAnimationFrame;

        window.webkitRequestAnimationFrame = function (callback, element) {
          self.callback = callback;
          // Browser calls wrapper; wrapper calls callback
          originalWebkitMethod(wrapper, element);
        }
      }
      // Workaround for Gecko 2.0, which has a bug in
      // mozRequestAnimationFrame() that restricts animations
      // to 30 - 40 fps.
      if (window.mozRequestAnimationFrame) {
        // Check the Gecko version. Gecko is used by browsers
        // other than Firefox. Gecko 2.0 corresponds to
        // Firefox 4.0
        index = userAgent.indexOf("rv:");

        if (userAgent.indexOf("Gecko") != -1) {
          geckoVersion = userAgent.substr(index + 3, 3);

          if (geckoVersion === "2.0") {
            // Forces the return statement to fall through
            // to the setTimeout() function.

            window.mozRequestAnimationFrame = undefined;
          }
        }
      }

      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback, element) {
          var self = this
            , start
            , finish;

          window.setTimeout(function() {
            start = +new Date();
            callback(start);
            finish = +new Date();

            self.timeout = 1000 / 60 - (finish - start);
          }, self.timeout);
        }
    }
  )();
