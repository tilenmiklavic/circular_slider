class CircularSlider {
  constructor(options) {
    this.container = options.container;
    this.ctx = options.ctx;
    this.x = options.x || this.container.width / 2;
    this.y = options.y || this.container.height / 2;
    this.color = options.color || "#000";
    this.maxValue = options.max;
    this.minValue = options.min;
    this.step = options.step;
    this.radius = options.radius;
    this.sliderWidth = options.sliderWidth || 10;
    this.value = options.value || 0; // Initialize with minValue
    this.onCanvasClick = this.onCanvasClick.bind(this);
    this.attachEventListeners();
  }

  drawSlider() {
    const startAngle = 1.5 * Math.PI;
    const endAngle = 1.5 * Math.PI + 2 * Math.PI * this.value;
    const fullCircle = 1.5 * Math.PI + 2 * Math.PI;

    // Clear the canvas
    this.ctx.clearRect(0, 0, this.container.width, this.container.height);

    // ***********************
    // Draw the outline
    // ***********************
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#ddd";
    this.ctx.arc(this.x, this.y, this.radius, startAngle, fullCircle);

    this.ctx.arc(
      this.x,
      this.y,
      this.radius + this.sliderWidth,
      startAngle,
      fullCircle
    );
    this.ctx.stroke();

    // ***********************
    // Draw the slider
    // ***********************
    // inner path
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.color;
    this.ctx.arc(this.x, this.y, this.radius, endAngle, startAngle, true);
    this.ctx.stroke();

    // slider tip
    const endX =
      this.x + (this.radius + this.sliderWidth / 2) * Math.cos(endAngle);
    const endY =
      this.y + (this.radius + this.sliderWidth / 2) * Math.sin(endAngle);

    this.ctx.beginPath();
    this.ctx.arc(endX, endY, 10, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();

    // outer path
    this.ctx.beginPath();
    this.ctx.arc(
      this.x,
      this.y,
      this.radius + this.sliderWidth,
      startAngle,
      endAngle,
      false
    );
    this.ctx.stroke();
  }

  updateValueFromPosition(x, y) {
    // Implementation to update value based on position
    console.log(x, y);

    // Calculate angle from center to click point
    const dx = x - this.x;
    const dy = y - this.y;
    const angle = Math.atan2(dy, dx);

    // Convert angle to value
    this.value = (angle + Math.PI / 2) / (2 * Math.PI);
  }

  isClickOnSlider(x, y) {
    // Calculate distance from center to click point
    const dx = x - this.x;
    const dy = y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Check if the click is within the slider's path
    return (
      distance >= this.radius && distance <= this.radius + this.sliderWidth
    );
  }

  onCanvasClick(event) {
    // Convert click position to canvas coordinates
    const rect = this.container.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    // Check if the click was on the slider
    if (this.isClickOnSlider(clickX, clickY)) {
      this.updateValueFromPosition(clickX, clickY);
      // Optionally, redraw the slider with the new value
      this.drawSlider();
    }
  }

  attachEventListeners() {
    this.container.addEventListener("mouseup", this.onCanvasClick);
  }
}
