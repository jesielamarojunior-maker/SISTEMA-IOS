#!/usr/bin/env python3
"""
Backend Test for Sistema IOS
Testing the HTML/JavaScript application running on port 8000
"""

import requests
import sys
from datetime import datetime
import json

class SistemaIOSTest:
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

    def test_application_load(self):
        """Test if the application loads correctly"""
        try:
            response = requests.get(self.base_url, timeout=10)
            
            if response.status_code != 200:
                print(f"HTTP Status: {response.status_code}")
                return False
            
            content = response.text
            
            # Check for key elements in the HTML
            required_elements = [
                'Instituto da Oportunidade Social',
                'loginScreen',
                'email',
                'password',
                'userType',
                'btn-login'
            ]
            
            missing_elements = []
            for element in required_elements:
                if element not in content:
                    missing_elements.append(element)
            
            if missing_elements:
                print(f"Missing elements: {missing_elements}")
                return False
            
            print("All required HTML elements found")
            return True
            
        except Exception as e:
            print(f"Error loading application: {str(e)}")
            return False

    def test_static_resources(self):
        """Test if static resources load correctly"""
        try:
            # Test CSS file
            css_response = requests.get(f"{self.base_url}/style.css", timeout=5)
            if css_response.status_code != 200:
                print(f"CSS file not found: {css_response.status_code}")
                return False
            
            # Test JavaScript files
            js_files = ['main.js', 'enhanced-main.js', 'advanced-functions.js']
            for js_file in js_files:
                js_response = requests.get(f"{self.base_url}/{js_file}", timeout=5)
                if js_response.status_code != 200:
                    print(f"JS file {js_file} not found: {js_response.status_code}")
                    return False
            
            print("All static resources loaded successfully")
            return True
            
        except Exception as e:
            print(f"Error loading static resources: {str(e)}")
            return False

    def test_html_structure(self):
        """Test HTML structure and form elements"""
        try:
            response = requests.get(self.base_url, timeout=10)
            content = response.text
            
            # Check for login form structure
            login_elements = [
                'id="loginForm"',
                'id="email"',
                'id="password"',
                'id="userType"',
                'class="btn-login"'
            ]
            
            # Check for main system structure
            system_elements = [
                'id="mainSystem"',
                'id="dashboardPage"',
                'id="usersPage"',
                'id="classesPage"',
                'id="attendancePage"'
            ]
            
            # Check for enhanced form elements
            enhanced_elements = [
                'id="enhancedClassForm"',
                'id="className"',
                'id="classInstructorId"',
                'id="classMonitorId"',
                'id="classPedagogueId"'
            ]
            
            all_elements = login_elements + system_elements + enhanced_elements
            missing = []
            
            for element in all_elements:
                if element not in content:
                    missing.append(element)
            
            if missing:
                print(f"Missing HTML elements: {missing}")
                return False
            
            print("HTML structure validation passed")
            return True
            
        except Exception as e:
            print(f"Error validating HTML structure: {str(e)}")
            return False

    def test_javascript_integration(self):
        """Test if JavaScript files are properly integrated"""
        try:
            response = requests.get(self.base_url, timeout=10)
            content = response.text
            
            # Check for script tags
            required_scripts = [
                'src="main.js"',
                'src="enhanced-main.js"',
                'src="advanced-functions.js"'
            ]
            
            missing_scripts = []
            for script in required_scripts:
                if script not in content:
                    missing_scripts.append(script)
            
            if missing_scripts:
                print(f"Missing script tags: {missing_scripts}")
                return False
            
            # Check for enhanced functions in enhanced-main.js
            enhanced_js_response = requests.get(f"{self.base_url}/enhanced-main.js", timeout=5)
            enhanced_content = enhanced_js_response.text
            
            enhanced_functions = [
                'addEnhancedClass',
                'addEnhancedStudent',
                'loadEnhancedClasses',
                'createEnhancedClass',
                'createEnhancedStudent'
            ]
            
            missing_functions = []
            for func in enhanced_functions:
                if func not in enhanced_content:
                    missing_functions.append(func)
            
            if missing_functions:
                print(f"Missing enhanced functions: {missing_functions}")
                return False
            
            print("JavaScript integration validation passed")
            return True
            
        except Exception as e:
            print(f"Error validating JavaScript integration: {str(e)}")
            return False

    def test_css_styling(self):
        """Test if CSS styling is properly loaded"""
        try:
            css_response = requests.get(f"{self.base_url}/style.css", timeout=5)
            css_content = css_response.text
            
            # Check for key CSS classes
            required_classes = [
                '.login-container',
                '.login-card',
                '.btn-login',
                '.form-group',
                '.nav-tab',
                '.form-section',
                '.team-member-group'
            ]
            
            missing_classes = []
            for css_class in required_classes:
                if css_class not in css_content:
                    missing_classes.append(css_class)
            
            if missing_classes:
                print(f"Missing CSS classes: {missing_classes}")
                return False
            
            print("CSS styling validation passed")
            return True
            
        except Exception as e:
            print(f"Error validating CSS styling: {str(e)}")
            return False

def main():
    print("🚀 Starting Sistema IOS Backend Tests")
    print("=" * 50)
    
    # Setup
    tester = SistemaIOSTest("http://localhost:8000")
    
    # Run tests
    tests = [
        ("Application Load", tester.test_application_load),
        ("Static Resources", tester.test_static_resources),
        ("HTML Structure", tester.test_html_structure),
        ("JavaScript Integration", tester.test_javascript_integration),
        ("CSS Styling", tester.test_css_styling)
    ]
    
    for test_name, test_func in tests:
        tester.run_test(test_name, test_func)
    
    # Print results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed! Sistema IOS is working correctly.")
        return 0
    else:
        print("⚠️  Some tests failed. Check the issues above.")
        return 1

if __name__ == "__main__":
    sys.exit(main())