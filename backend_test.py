#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime

class PortfolioAPITester:
    def __init__(self, base_url="http://localhost:8001"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        self.test_results.append({
            "test": name,
            "success": success,
            "details": details
        })

    def test_health_endpoint(self):
        """Test /api/health endpoint"""
        try:
            response = requests.get(f"{self.base_url}/api/health", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("status") == "healthy":
                    self.log_test("Health Check", True, f"Status: {data}")
                    return True
                else:
                    self.log_test("Health Check", False, f"Unexpected response: {data}")
                    return False
            else:
                self.log_test("Health Check", False, f"Status code: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Health Check", False, f"Exception: {str(e)}")
            return False

    def test_contact_endpoint(self):
        """Test /api/contact POST endpoint"""
        test_data = {
            "name": "Test User",
            "email": "test@example.com",
            "subject": "Test Subject",
            "message": "This is a test message from automated testing."
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/contact",
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["id", "name", "email", "subject", "message", "created_at", "status"]
                
                if all(field in data for field in required_fields):
                    if (data["name"] == test_data["name"] and 
                        data["email"] == test_data["email"] and
                        data["subject"] == test_data["subject"] and
                        data["message"] == test_data["message"]):
                        self.log_test("Contact Form Submission", True, f"Contact created with ID: {data['id']}")
                        return True
                    else:
                        self.log_test("Contact Form Submission", False, "Response data doesn't match input")
                        return False
                else:
                    missing = [f for f in required_fields if f not in data]
                    self.log_test("Contact Form Submission", False, f"Missing fields: {missing}")
                    return False
            else:
                self.log_test("Contact Form Submission", False, f"Status code: {response.status_code}, Response: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Contact Form Submission", False, f"Exception: {str(e)}")
            return False

    def test_contact_validation(self):
        """Test contact endpoint with invalid data"""
        invalid_data = {
            "name": "",  # Empty name
            "email": "invalid-email",  # Invalid email
            "subject": "",  # Empty subject
            "message": ""  # Empty message
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/contact",
                json=invalid_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            # Should return 422 for validation error
            if response.status_code == 422:
                self.log_test("Contact Validation", True, "Properly rejected invalid data")
                return True
            else:
                self.log_test("Contact Validation", False, f"Expected 422, got {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Contact Validation", False, f"Exception: {str(e)}")
            return False

    def test_cors_headers(self):
        """Test CORS headers are present"""
        try:
            response = requests.options(
                f"{self.base_url}/api/contact",
                headers={
                    'Origin': 'http://localhost:3000',
                    'Access-Control-Request-Method': 'POST',
                    'Access-Control-Request-Headers': 'Content-Type'
                },
                timeout=10
            )
            
            cors_headers = [
                'access-control-allow-origin',
                'access-control-allow-methods',
                'access-control-allow-headers'
            ]
            
            headers_present = []
            for header in cors_headers:
                if header in [h.lower() for h in response.headers.keys()]:
                    headers_present.append(header)
            
            if len(headers_present) >= 2:  # At least some CORS headers
                self.log_test("CORS Headers", True, f"Found headers: {headers_present}")
                return True
            else:
                self.log_test("CORS Headers", False, f"Missing CORS headers. Found: {headers_present}")
                return False
                
        except Exception as e:
            self.log_test("CORS Headers", False, f"Exception: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all backend tests"""
        print(f"\n🚀 Starting Portfolio Backend API Tests")
        print(f"📍 Testing URL: {self.base_url}")
        print("=" * 50)
        
        # Test health endpoint first
        if not self.test_health_endpoint():
            print("\n❌ Health check failed - stopping tests")
            return False
        
        # Test contact endpoint
        self.test_contact_endpoint()
        
        # Test validation
        self.test_contact_validation()
        
        # Test CORS
        self.test_cors_headers()
        
        # Print summary
        print("\n" + "=" * 50)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return True
        else:
            print("⚠️  Some tests failed")
            return False

def main():
    tester = PortfolioAPITester()
    success = tester.run_all_tests()
    
    # Save detailed results
    results = {
        "timestamp": datetime.now().isoformat(),
        "total_tests": tester.tests_run,
        "passed_tests": tester.tests_passed,
        "success_rate": f"{(tester.tests_passed/tester.tests_run)*100:.1f}%" if tester.tests_run > 0 else "0%",
        "test_details": tester.test_results
    }
    
    with open("/app/backend_test_results.json", "w") as f:
        json.dump(results, f, indent=2)
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())