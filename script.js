document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  let sliders = [];

  let sliderA = new CircularSlider({
    container: canvas,
    ctx: ctx,
    x: 100,
    y: 100,
    color: "red",
    radius: 50,
    min: 0,
    max: 1,
    step: 0.01,
    value: 0.5,
  });

  sliders.push(sliderA);

  // Add a click event listener to the button
  document.getElementById("drawBtn").addEventListener("click", () => {
    sliders.forEach((slider) => {
      slider.drawSlider();
    });
  });
});
