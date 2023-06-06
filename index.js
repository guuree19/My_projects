// Create a canvas element to draw the images
const canvas = document.createElement('canvas');
canvas.width = 800; // Adjust the dimensions as needed
canvas.height = 600;

// Get the 2D drawing context
const ctx = canvas.getContext('2d');

// Define the images' sources
const imageSources = [
  { src: 'Images/img.png', x: 50, y: 50 },
  { src: 'Images/img1.png', x: 200, y: 50 },
  { src: 'Images/img2.png', x: 50, y: 200 },
  { src: 'Images/img3.png', x: 200, y: 200 },
  { src: 'Images/img4.png', x: 50, y: 200 },
  { src: 'Images/img5.png', x: 200, y: 50 },
  { src: 'Images/img6.png', x: 50, y: 200 }
];


// Load the images
const images = [];
let loadedImages = 0;

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

    images.push(img);
  }
}

// Draw the images on the canvas
function drawImages() {
  for (let i = 0; i < images.length; i++) {
    ctx.drawImage(images[i], 0, 0); // Adjust the coordinates as needed
  }
}

// Add event listeners for interactions
canvas.addEventListener('click', handleCanvasClick);
canvas.addEventListener('mousemove', handleCanvasMouseMove);

function handleCanvasClick(event) {
  // Handle click event
  const x = event.offsetX;
  const y = event.offsetY;
  // Perform actions based on the clicked position within the canvas
  if (x < 100 && y < 100) {
    // Perform action 1 for the top-left region of the canvas
    console.log("Action 1");
  } else if (x >= 100 && y < 100) {
    // Perform action 2 for the top-right region of the canvas
    console.log("Action 2");
  } else if (x < 100 && y >= 100) {
    // Perform action 3 for the bottom-left region of the canvas
    console.log("Action 3");
  } else {
    // Perform action 4 for the remaining region of the canvas
    console.log("Action 4");
  }
}

function handleCanvasMouseMove(event) {
  // Handle mouse move event
  const x = event.offsetX;
  const y = event.offsetY;
  // Perform actions based on the mouse position within the canvas

  if (isWithinRegion(x, y, 0, 0, 100, 100)) {
    // Perform action when the mouse is within a specific region (e.g., top-left)
    console.log("Mouse is in the top-left region");
  } else if (isWithinRegion(x, y, 100, 0, 200, 100)) {
    // Perform action when the mouse is within another specific region (e.g., top-right)
    console.log("Mouse is in the top-right region");
  } else if (isWithinRegion(x, y, 0, 100, 100, 200)) {
    // Perform action when the mouse is within yet another specific region (e.g., bottom-left)
    console.log("Mouse is in the bottom-left region");
  } else {
    // Perform a default action when the mouse is in other regions
    console.log("Mouse is in a different region");
  }
}

// Helper function to check if the given coordinates are within a specified region
function isWithinRegion(x, y, regionX, regionY, regionWidth, regionHeight) {
  return x >= regionX && x < regionX + regionWidth && y >= regionY && y < regionY + regionHeight;
}


// Add the canvas to the document body
document.body.appendChild(canvas);

// Call the necessary functions to load and draw the images
loadImages(() => {
  console.log("All images loaded successfully");

  drawImages();
});
