#!/usr/bin/env python3
"""
UI Test for Sistema IOS using requests to verify functionality
"""

import requests
import sys
from bs4 import BeautifulSoup

class SistemaIOSUITest:
    def __init__(self, base_url="http://localhost:8000"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, test_func):
        """Run a single test"""
        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            success = test_func()
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - {name}")
            else:
                print(f"❌ Failed - {name}")
            return success
        except Exception as e:
            print(f"❌ Failed - {name}: {str(e)}")
            return False

    def test_login_page_elements(self):
        """Test if login page has all required elements"""
        try:
            response = requests.get(self.base_url, timeout=10)
            
            if response.status_code != 200:
                print(f"HTTP Status: {response.status_code}")
                return False
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Check for login elements
            login_screen = soup.find(id="loginScreen")
            if not login_screen:
                print("Login screen not found")
                return False
            
            email_input = soup.find(id="email")
            password_input = soup.find(id="password")
            user_type_select = soup.find(id="userType")
            login_button = soup.find(class_="btn-login")
            
            if not all([email_input, password_input, user_type_select, login_button]):
                print("Missing login form elements")
                return False
            
            # Check for test credentials display
            test_users = soup.find(class_="test-users")
            if not test_users:
                print("Test users section not found")
                return False
            
            print("All login page elements found")
            return True
            
        except Exception as e:
            print(f"Error testing login page: {str(e)}")
            return False

    def test_main_system_structure(self):
        """Test if main system structure exists"""
        try:
            response = requests.get(self.base_url, timeout=10)
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Check for main system container
            main_system = soup.find(id="mainSystem")
            if not main_system:
                print("Main system container not found")
                return False
            
            # Check for navigation tabs
            nav_tabs = soup.find(class_="nav-tabs")
            if not nav_tabs:
                print("Navigation tabs not found")
                return False
            
            # Check for specific tabs
            required_tabs = ["dashboard", "users", "classes", "attendance", "diaryTab"]
            found_tabs = []
            
            for tab_id in required_tabs:
                tab = soup.find(id=tab_id)
                if tab:
                    found_tabs.append(tab_id)
            
            if "diaryTab" not in found_tabs:
                print("❌ CRITICAL: Diário Digital tab not found in HTML")
                return False
            
            print(f"Found tabs: {found_tabs}")
            print("✅ Diário Digital tab found in HTML structure")
            return True
            
        except Exception as e:
            print(f"Error testing main system: {str(e)}")
            return False

    def test_teacher_diary_scripts(self):
        """Test if teacher diary JavaScript files are included"""
        try:
            response = requests.get(self.base_url, timeout=10)
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Check for script tags
            scripts = soup.find_all('script', src=True)
            script_sources = [script.get('src') for script in scripts]
            
            required_scripts = ['teacher-dashboard.js', 'teacher-grades.js', 'teacher-analytics.js']
            found_scripts = []
            
            for script_src in script_sources:
                for required in required_scripts:
                    if required in script_src:
                        found_scripts.append(required)
            
            if len(found_scripts) != len(required_scripts):
                print(f"Missing teacher scripts. Found: {found_scripts}, Required: {required_scripts}")
                return False
            
            # Test if scripts are accessible
            for script in required_scripts:
                script_response = requests.get(f"{self.base_url}/{script}", timeout=5)
                if script_response.status_code != 200:
                    print(f"Script {script} not accessible: {script_response.status_code}")
                    return False
            
            print(f"All teacher diary scripts found and accessible: {found_scripts}")
            return True
            
        except Exception as e:
            print(f"Error testing teacher scripts: {str(e)}")
            return False

    def test_teacher_diary_functions(self):
        """Test if teacher diary functions exist in JavaScript files"""
        try:
            # Check teacher-dashboard.js
            dashboard_response = requests.get(f"{self.base_url}/teacher-dashboard.js", timeout=5)
            dashboard_content = dashboard_response.text
            
            dashboard_functions = [
                'showTeacherDiary',
                'loadDiaryForClass',
                'saveAttendance',
                'calculateStudentAverage',
                'calculateClassStats'
            ]
            
            missing_functions = []
            for func in dashboard_functions:
                if func not in dashboard_content:
                    missing_functions.append(func)
            
            if missing_functions:
                print(f"Missing dashboard functions: {missing_functions}")
                return False
            
            # Check teacher-grades.js
            grades_response = requests.get(f"{self.base_url}/teacher-grades.js", timeout=5)
            grades_content = grades_response.text
            
            grades_functions = [
                'loadGradesTab',
                'showAddActivityModal',
                'saveActivityGrades',
                'loadAnnotationsTab',
                'showAddAnnotationModal'
            ]
            
            missing_grades_functions = []
            for func in grades_functions:
                if func not in grades_content:
                    missing_grades_functions.append(func)
            
            if missing_grades_functions:
                print(f"Missing grades functions: {missing_grades_functions}")
                return False
            
            # Check teacher-analytics.js
            analytics_response = requests.get(f"{self.base_url}/teacher-analytics.js", timeout=5)
            analytics_content = analytics_response.text
            
            analytics_functions = [
                'loadTeacherDashboard',
                'refreshDashboard',
                'exportDashboardData'
            ]
            
            missing_analytics_functions = []
            for func in analytics_functions:
                if func not in analytics_content:
                    missing_analytics_functions.append(func)
            
            if missing_analytics_functions:
                print(f"Missing analytics functions: {missing_analytics_functions}")
                return False
            
            print("All teacher diary functions found in JavaScript files")
            return True
            
        except Exception as e:
            print(f"Error testing teacher functions: {str(e)}")
            return False

def main():
    print("🚀 Starting Sistema IOS UI Structure Tests")
    print("=" * 60)
    
    # Setup
    tester = SistemaIOSUITest("http://localhost:8000")
    
    # Run tests
    tests = [
        ("Login Page Elements", tester.test_login_page_elements),
        ("Main System Structure", tester.test_main_system_structure),
        ("Teacher Diary Scripts", tester.test_teacher_diary_scripts),
        ("Teacher Diary Functions", tester.test_teacher_diary_functions)
    ]
    
    for test_name, test_func in tests:
        tester.run_test(test_name, test_func)
    
    # Print results
    print("\n" + "=" * 60)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All UI structure tests passed! Teacher diary system is properly integrated.")
        return 0
    else:
        print("⚠️  Some tests failed. Check the issues above.")
        return 1

if __name__ == "__main__":
    sys.exit(main())