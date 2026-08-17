import boto3
from .config import settings

s3_client = boto3.client(
    "s3",
    region_name=settings.AWS_REGION,
    aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
)

def upload_file_to_s3(file_bytes: bytes, file_name: str, content_type: str) -> str:
    s3_client.put_object(
        Bucket=settings.S3_BUCKET,
        Key=file_name,
        Body=file_bytes,
        ContentType=content_type,
    )
    return f"https://{settings.S3_BUCKET}.s3.{settings.AWS_REGION}.amazonaws.com/{file_name}"

def download_file_from_s3(file_name: str, download_path: str):
    s3_client.download_file(settings.S3_BUCKET, file_name, download_path)
