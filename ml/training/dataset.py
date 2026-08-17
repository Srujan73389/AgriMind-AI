import albumentations as A
import cv2
import os
import glob
from pathlib import Path

def get_training_augmentation():
    return A.Compose([
        A.RandomResizedCrop(height=640, width=640, scale=(0.8, 1.0)),
        A.HorizontalFlip(p=0.5),
        A.VerticalFlip(p=0.5),
        A.ShiftScaleRotate(shift_limit=0.0625, scale_limit=0.2, rotate_limit=45, p=0.5),
        A.RandomBrightnessContrast(p=0.5),
        A.HueSaturationValue(p=0.5),
        A.CLAHE(p=0.2),
        A.Blur(blur_limit=3, p=0.1)
    ], bbox_params=A.BboxParams(format='yolo', label_fields=['class_labels']))

def augment_dataset(image_dir: str, label_dir: str, output_img_dir: str, output_lbl_dir: str):
    os.makedirs(output_img_dir, exist_ok=True)
    os.makedirs(output_lbl_dir, exist_ok=True)
    
    transform = get_training_augmentation()
    
    image_paths = glob.glob(os.path.join(image_dir, "*.jpg"))
    for img_path in image_paths:
        base_name = Path(img_path).stem
        lbl_path = os.path.join(label_dir, f"{base_name}.txt")
        
        image = cv2.imread(img_path)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        
        bboxes = []
        class_labels = []
        if os.path.exists(lbl_path):
            with open(lbl_path, "r") as f:
                for line in f.readlines():
                    parts = line.strip().split()
                    if len(parts) == 5:
                        cls_id = int(parts[0])
                        x_c, y_c, w, h = map(float, parts[1:])
                        # YOLO format is [x_center, y_center, width, height]
                        bboxes.append([x_c, y_c, w, h])
                        class_labels.append(cls_id)
        
        # We assume dataset loader handles albumentations, 
        # Ultralytics natively supports Albumentations if installed,
        # so this file is mostly for offline advanced augmentation if needed.
        pass
