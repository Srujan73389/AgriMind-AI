import os
import subprocess

def download_dataset():
    # Placeholder for downloading PlantVillage dataset
    # E.g., using kaggle API
    print("Downloading PlantVillage dataset via Kaggle...")
    # subprocess.run(["kaggle", "datasets", "download", "-d", "emmarex/plantdisease"], check=True)
    # subprocess.run(["unzip", "plantdisease.zip", "-d", "../data/raw_plantvillage"], check=True)
    
    print("Dataset downloaded. Run a formatting script to convert to YOLO format.")
    # The conversion script would read the folders (each representing a class)
    # and generate bounding box annotations (for whole image if classification)
    # or use an object detection version of PlantVillage.

if __name__ == "__main__":
    download_dataset()
