import os
from PIL import Image, ImageDraw
import numpy as np

def create_synthetic_leaf_image(output_path, disease_spots=False):
    # Create a 300x300 green image (representing a leaf)
    width, height = 300, 300
    image = Image.new("RGB", (width, height), "green")
    draw = ImageDraw.Draw(image)
    
    if disease_spots:
        # Add brown/yellow spots to simulate disease
        for _ in range(15):
            x = np.random.randint(20, width - 20)
            y = np.random.randint(20, height - 20)
            r = np.random.randint(5, 15)
            color = (np.random.randint(100, 150), np.random.randint(100, 150), 0) # Brownish-yellow
            draw.ellipse((x - r, y - r, x + r, y + r), fill=color)
            
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    image.save(output_path)
    print(f"Created {'diseased' if disease_spots else 'healthy'} leaf image at {output_path}")

if __name__ == "__main__":
    base_dir = os.path.dirname(__file__)
    
    create_synthetic_leaf_image(os.path.join(base_dir, "test_leaf.jpg"), disease_spots=False)
    create_synthetic_leaf_image(os.path.join(base_dir, "test_leaf_diseased.jpg"), disease_spots=True)
