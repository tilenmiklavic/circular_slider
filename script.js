let canvas = null;
let ctx = null;
let initialRadius = null;
let sliders = null;

document.addEventListener("DOMContentLoaded", function () {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  initialRadius = 50;

  sliders = [];

  let sliderA = new CircularSlider({
    container: canvas,
    ctx: ctx,
    radius: initialRadius,
    min: 0,
    max: 1,
    step: 0.01,
    onChange: onSliderChange,
  });

  sliders.push(sliderA);

  drawSliders();
  changeSliderCountValue(sliders.length);

  document.getElementById("add_slider").addEventListener("click", function () {
    addSlider();
    drawSliders();
  });

  document
    .getElementById("remove_slider")
    .addEventListener("click", function () {
      sliders.pop();
      drawSliders();
    });
});

function changeSliderCountValue(value) {
  let sliderCountValue = document.getElementById("slider_number");
  sliderCountValue.innerHTML = value;
}

function drawSliders() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  sliders.forEach((slider) => {
    slider.drawSlider();
  });
}

function addSlider() {
  let newSlider = new CircularSlider({
    container: canvas,
    ctx: ctx,
    radius: initialRadius + sliders.length * 30,
    min: 0,
    max: 1,
    step: 0.01,
    onChange: onSliderChange,
  });

  sliders.push(newSlider);
}

function onSliderChange(slider) {
  drawSliders(sliders, ctx, canvas);
}
