// Create a canvas element to draw the images
const canvas = document.createElement('canvas');
canvas.width = 800; // Adjust the dimensions as needed
canvas.height = 600;

// Get the 2D drawing context
const ctx = canvas.getContext('2d');

// Define the images' sources and initial positions
const imageSources = [
  { src: 'Images/img.png', x: 50, y: 50 },
  { src: 'Images/img1.png', x: 200, y: 50 },
  { src: 'Images/img2.png', x: 50, y: 200 },
  { src: 'Images/img3.png', x: 200, y: 200 },
  { src: 'Images/img4.png', x: 50, y: 200 },
  { src: 'Images/img5.png', x: 200, y: 50 },
  { src: 'Images/img6.png', x: 50, y: 200 }
];

// Store the image objects and their positions
const images = [];

// Flag to track if all images are loaded
let loadedImages = 0;

// Load the images
function loadImages(callback) {
  for (let i = 0; i < imageSources.length; i++) {
    const img = new Image();
    img.src = imageSources[i].src;
    img.onload = () => {
      loadedImages++;
      if (loadedImages === imageSources.length) {
        callback();
      }
    };
    img.onerror = () => {
      console.log(`Error loading image: ${imageSources[i].src}`);
    };

    // Store the image object along with its position
    images.push({ img, x: imageSources[i].x, y: imageSources[i].y });
  }
}

// Draw the images on the canvas
function drawImages() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  for (let i = 0; i < images.length; i++) {
    const { img, x, y } = images[i];
    ctx.drawImage(img, x, y); // Draw the image at its position
  }
}

// Track the currently selected image for dragging
let selectedImage = null;
let offsetX = 0;
let offsetY = 0;

// Add event listeners for interactions
canvas.addEventListener('mousedown', handleCanvasMouseDown);
canvas.addEventListener('mouseup', handleCanvasMouseUp);
canvas.addEventListener('mousemove', handleCanvasMouseMove);

function handleCanvasMouseDown(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  // Check if any image is clicked
  for (let i = images.length - 1; i >= 0; i--) {
    const { x: imgX, y: imgY } = images[i];

    // Check if the mouse click is within the image bounds
    if (x >= imgX && x < imgX + images[i].img.width && y >= imgY && y < imgY + images[i].img.height) {
      selectedImage = images[i];
      offsetX = x - selectedImage.x;
      offsetY = y - selectedImage.y;
      break;
    }
  }
}

function handleCanvasMouseUp(event) {
  selectedImage = null;
}

function handleCanvasMouseMove(event) {
  if (selectedImage) {
    const x = event.offsetX;
    const y = event.offsetY;

    // Update the position of the selected image based on mouse movement
    selectedImage.x = x - offsetX;
   
    selectedImage.y = y - offsetY;

    // Redraw the images on the canvas
    drawImages();
  }
}

// Add the canvas to the document body
document.body.appendChild(canvas);

// Call the necessary functions to load and draw the images
loadImages(() => {
  console.log("All images loaded successfully");

  drawImages();
});
