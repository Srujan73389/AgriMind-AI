from ..celery_app import celery_app

@celery_app.task
def generate_monthly_reports():
    print("Generating monthly reports...")

@celery_app.task
def send_report_notification(user_id: str, report_id: str):
    print(f"Sending notification to {user_id} for report {report_id}")
