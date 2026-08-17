from locust import HttpUser, task, between

class FarmerUser(HttpUser):
    wait_time = between(1, 5)
    
    def on_start(self):
        # Register and Login
        import time
        email = f"load_{int(time.time())}@example.com"
        self.client.post("/auth/register", json={"email": email, "password": "Password123!"})
        response = self.client.post("/auth/login", data={"username": email, "password": "Password123!"})
        if response.status_code == 200:
            self.token = response.json().get("access_token")
        else:
            self.token = ""
            
    def get_headers(self):
        return {"Authorization": f"Bearer {self.token}"}

    @task(3)
    def view_dashboard(self):
        self.client.get("/farms/1/dashboard", headers=self.get_headers(), name="/farms/[id]/dashboard")

    @task(2)
    def ai_chat(self):
        self.client.post("/ai/chat", json={
            "message": "When should I irrigate my wheat crop?"
        }, headers=self.get_headers())

    @task(1)
    def disease_detection(self):
        # Uploading a dummy file payload
        files = {'file': ('dummy.jpg', b'dummy_content', 'image/jpeg')}
        self.client.post("/vision/detect", data={"crop_type": "wheat"}, files=files, headers=self.get_headers())

    @task(4)
    def fetch_sensor_data(self):
        self.client.get("/iot/devices/sensor-001/data", headers=self.get_headers(), name="/iot/devices/[id]/data")
