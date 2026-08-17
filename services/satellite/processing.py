import numpy as np

# In a real app we'd use rasterio and gdal here
# import rasterio
# from rasterio.mask import mask

def calculate_ndvi(nir: np.ndarray, red: np.ndarray) -> np.ndarray:
    return (nir - red) / (nir + red + 1e-8)

def calculate_evi(nir: np.ndarray, red: np.ndarray, blue: np.ndarray) -> np.ndarray:
    return 2.5 * ((nir - red) / (nir + 6 * red - 7.5 * blue + 1))

def calculate_ndwi(green: np.ndarray, nir: np.ndarray) -> np.ndarray:
    return (green - nir) / (green + nir + 1e-8)

def calculate_ndmi(nir: np.ndarray, swir: np.ndarray) -> np.ndarray:
    return (nir - swir) / (nir + swir + 1e-8)

def process_field_ndvi(raster_path: str, geojson_polygon: dict):
    # Mock clipping to polygon and calculating stats
    # with rasterio.open(raster_path) as src:
    #     out_image, out_transform = mask(src, [geojson_polygon], crop=True)
    mean_ndvi = 0.65
    return {
        "mean_ndvi": mean_ndvi,
        "min_ndvi": 0.4,
        "max_ndvi": 0.85,
        "std_dev": 0.1
    }
