FROM osgeo/gdal:ubuntu-full-3.6.2

WORKDIR /app

RUN apt-get update && apt-get install -y python3-pip

COPY requirements.txt .
RUN echo "fastapi\nuvicorn\npydantic<2.0\nrasterio\nnumpy\nhttpx" > requirements.txt
RUN pip3 install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8002"]
