const { Jimp } = require('jimp');

async function processLogo() {
  try {
    const image = await Jimp.read("C:\\Users\\zubai\\Downloads\\logo.png");
    
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      
      // If the color is very dark gray/black (the background)
      if (r < 40 && g < 40 && b < 40) {
        this.bitmap.data[idx + 3] = 0; // Set alpha to 0 (transparent)
      }
    });
    
    await image.write("public/c-logo.png");
    console.log("Successfully created public/c-logo.png");
  } catch (err) {
    console.error("Error processing logo:", err);
  }
}

processLogo();
