#!/usr/bin/env python3
"""
Functional Test for Sistema IOS
Testing actual functionality and user interactions
"""

import requests
import sys
import json
import time
from datetime import datetime

class FunctionalIOSTest:
    def __init__(self, base_url="http://localhost:8000"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.issues_found = []
        self.working_features = []

    def run_test(self, name, test_func):
        """Run a single functional test"""
        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            success, details = test_func()
            if success:
                self.tests_passed += 1
                self.working_features.append(f"{name}: {details}")
                print(f"✅ Passed - {name}")
                if details:
                    print(f"   ✓ {details}")
            else:
                self.issues_found.append(f"{name}: {details}")
                print(f"❌ Failed - {name}")
                if details:
                    print(f"   ✗ {details}")
            return success
        except Exception as e:
            self.issues_found.append(f"{name}: Exception - {str(e)}")
            print(f"❌ Failed - {name}: {str(e)}")
            return False

    def test_application_accessibility(self):
        """Test if application is accessible and loads properly"""
        try:
            response = requests.get(self.base_url, timeout=10)
            
            if response.status_code != 200:
                return False, f"HTTP {response.status_code} - Application not accessible"
            
            content = response.text
            
            # Check for critical elements
            if 'Instituto da Oportunidade Social' not in content:
                return False, "Main title not found"
            
            if 'loginScreen' not in content:
                return False, "Login screen not found"
            
            return True, "Application loads correctly with all main elements"
                
        except Exception as e:
            return False, f"Connection error: {str(e)}"

    def test_login_form_structure(self):
        """Test login form structure and credentials display"""
        try:
            response = requests.get(self.base_url, timeout=10)
            content = response.text
            
            # Check for login form elements
            required_elements = [
                'id="email"',
                'id="password"', 
                'id="userType"',
                'class="btn-login"'
            ]
            
            missing = []
            for element in required_elements:
                if element not in content:
                    missing.append(element)
            
            if missing:
                return False, f"Missing form elements: {missing}"
            
            # Check for test credentials
            credentials = [
                'admin@ios.org.br',
                'instrutor@ios.org.br',
                'pedagogo@ios.org.br',
                'monitor@ios.org.br'
            ]
            
            found_credentials = []
            for cred in credentials:
                if cred in content:
                    found_credentials.append(cred)
            
            if len(found_credentials) < 4:
                return False, f"Missing test credentials: {4 - len(found_credentials)} missing"
            
            return True, "Login form complete with all test credentials displayed"
                
        except Exception as e:
            return False, str(e)

    def test_enhanced_class_form_presence(self):
        """Test if enhanced class form is present with all sections"""
        try:
            response = requests.get(self.base_url, timeout=10)
            content = response.text
            
            # Check for enhanced form
            if 'id="enhancedClassForm"' not in content:
                return False, "Enhanced class form not found"
            
            # Check for form sections
            sections = {
                'basic_info': ['id="className"', 'id="classUnit"', 'id="classCourse"'],
                'team_info': ['id="classInstructorId"', 'id="classMonitorId"', 'id="classPedagogueId"'],
                'schedule_info': ['id="mainClassDay"', 'id="extensionClassDay"']
            }
            
            section_results = {}
            for section_name, elements in sections.items():
                found = sum(1 for element in elements if element in content)
                section_results[section_name] = f"{found}/{len(elements)}"
            
            # Check if most elements are present
            total_elements = sum(len(elements) for elements in sections.values())
            found_elements = sum(sum(1 for element in elements if element in content) for elements in sections.values())
            
            if found_elements < total_elements * 0.8:  # At least 80% should be present
                return False, f"Form incomplete - sections: {section_results}"
            
            return True, f"Enhanced form present with sections: {section_results}"
                
        except Exception as e:
            return False, str(e)

    def test_student_registration_with_cpf(self):
        """Test student registration form with CPF as RA"""
        try:
            response = requests.get(self.base_url, timeout=10)
            content = response.text
            
            # Check for student form elements
            student_elements = [
                'id="studentClass"',
                'id="studentName"',
                'id="studentCpf"',
                'CPF (RA)'
            ]
            
            missing = []
            for element in student_elements:
                if element not in content:
                    missing.append(element)
            
            if missing:
                return False, f"Missing student form elements: {missing}"
            
            # Check for CPF mask
            if 'maxlength="14"' not in content:
                return False, "CPF field not properly configured with maxlength"
            
            if '000.000.000-00' not in content:
                return False, "CPF placeholder not found"
            
            return True, "Student registration form with CPF as RA properly configured"
                
        except Exception as e:
            return False, str(e)

    def test_navigation_structure(self):
        """Test navigation tabs and main system structure"""
        try:
            response = requests.get(self.base_url, timeout=10)
            content = response.text
            
            # Check for main system container
            if 'id="mainSystem"' not in content:
                return False, "Main system container not found"
            
            # Check for navigation tabs
            expected_pages = [
                'id="dashboardPage"',
                'id="usersPage"',
                'id="unitsPage"',
                'id="coursesPage"',
                'id="classesPage"',
                'id="attendancePage"'
            ]
            
            found_pages = []
            for page in expected_pages:
                if page in content:
                    found_pages.append(page)
            
            if len(found_pages) < 5:  # At least 5 main pages should be present
                return False, f"Missing navigation pages: {len(expected_pages) - len(found_pages)} missing"
            
            return True, f"Navigation structure complete with {len(found_pages)}/{len(expected_pages)} pages"
                
        except Exception as e:
            return False, str(e)

    def test_javascript_functions_availability(self):
        """Test if enhanced JavaScript functions are properly loaded"""
        try:
            # Test enhanced-main.js
            js_response = requests.get(f"{self.base_url}/enhanced-main.js", timeout=5)
            if js_response.status_code != 200:
                return False, "enhanced-main.js not accessible"
            
            js_content = js_response.text
            
            # Check for key functions
            key_functions = [
                'addEnhancedClass',
                'addEnhancedStudent',
                'loadEnhancedClasses',
                'fillInstructorData',
                'fillMonitorData',
                'fillPedagogueData'
            ]
            
            found_functions = []
            for func in key_functions:
                if f'function {func}' in js_content or f'{func} = function' in js_content or f'window.{func}' in js_content:
                    found_functions.append(func)
            
            if len(found_functions) < len(key_functions) * 0.8:  # At least 80% should be present
                return False, f"Missing key functions: {len(key_functions) - len(found_functions)} missing"
            
            return True, f"JavaScript functions available: {len(found_functions)}/{len(key_functions)}"
                
        except Exception as e:
            return False, str(e)

    def test_css_styling_loaded(self):
        """Test if CSS styling is properly loaded"""
        try:
            css_response = requests.get(f"{self.base_url}/style.css", timeout=5)
            if css_response.status_code != 200:
                return False, "style.css not accessible"
            
            css_content = css_response.text
            
            # Check for key CSS classes
            key_classes = [
                '.login-container',
                '.login-card',
                '.btn-login',
                '.form-group',
                '.nav-tab',
                '.form-section'
            ]
            
            found_classes = []
            for css_class in key_classes:
                if css_class in css_content:
                    found_classes.append(css_class)
            
            if len(found_classes) < len(key_classes) * 0.8:  # At least 80% should be present
                return False, f"Missing CSS classes: {len(key_classes) - len(found_classes)} missing"
            
            # Check for modern CSS features
            modern_features = ['grid-template-columns', 'border-radius', 'box-shadow']
            found_modern = sum(1 for feature in modern_features if feature in css_content)
            
            return True, f"CSS styling loaded: {len(found_classes)}/{len(key_classes)} classes, {found_modern} modern features"
                
        except Exception as e:
            return False, str(e)

    def test_permissions_and_user_types(self):
        """Test if permissions system is properly configured"""
        try:
            # Check enhanced-main.js for permissions
            js_response = requests.get(f"{self.base_url}/enhanced-main.js", timeout=5)
            js_content = js_response.text
            
            # Check for permission structure
            permission_elements = [
                'checkEnhancedPermissions',
                'admin:',
                'instructor:',
                'pedagogue:',
                'monitor:'
            ]
            
            found_permissions = []
            for element in permission_elements:
                if element in js_content:
                    found_permissions.append(element)
            
            if len(found_permissions) < 4:  # Should have at least 4 user types
                return False, f"Incomplete permissions system: {len(found_permissions)}/5 elements found"
            
            # Check main HTML for user type options
            html_response = requests.get(self.base_url, timeout=5)
            html_content = html_response.text
            
            user_types = ['admin', 'instructor', 'pedagogue', 'monitor']
            found_types = sum(1 for user_type in user_types if f'value="{user_type}"' in html_content)
            
            if found_types < 4:
                return False, f"Missing user type options: {4 - found_types} missing"
            
            return True, f"Permissions system configured for {found_types} user types"
                
        except Exception as e:
            return False, str(e)

    def generate_functional_report(self):
        """Generate functional test report"""
        print("\n" + "=" * 70)
        print("🎯 FUNCTIONAL TEST REPORT - SISTEMA IOS")
        print("=" * 70)
        
        success_rate = (self.tests_passed / self.tests_run) * 100
        print(f"\n📊 Functional Tests: {self.tests_passed}/{self.tests_run} passed ({success_rate:.1f}%)")
        
        if self.working_features:
            print(f"\n✅ WORKING FEATURES ({len(self.working_features)}):")
            for feature in self.working_features:
                print(f"  ✓ {feature}")
        
        if self.issues_found:
            print(f"\n❌ ISSUES FOUND ({len(self.issues_found)}):")
            for issue in self.issues_found:
                print(f"  ✗ {issue}")
        
        print(f"\n🎯 FUNCTIONALITY ASSESSMENT:")
        if success_rate >= 90:
            print("🎉 EXCELLENT: All core functionality is working properly!")
        elif success_rate >= 75:
            print("👍 GOOD: Most functionality works, minor issues to address")
        elif success_rate >= 50:
            print("⚠️  MODERATE: Core functionality works but needs improvements")
        else:
            print("🚨 POOR: Major functionality issues need immediate attention")
        
        return success_rate

def main():
    print("🎯 Starting Functional Sistema IOS Tests")
    print("Testing actual functionality and user experience")
    print("=" * 70)
    
    # Setup
    tester = FunctionalIOSTest("http://localhost:8000")
    
    # Run functional tests
    tests = [
        ("Application Accessibility", tester.test_application_accessibility),
        ("Login Form Structure", tester.test_login_form_structure),
        ("Enhanced Class Form Presence", tester.test_enhanced_class_form_presence),
        ("Student Registration with CPF", tester.test_student_registration_with_cpf),
        ("Navigation Structure", tester.test_navigation_structure),
        ("JavaScript Functions Availability", tester.test_javascript_functions_availability),
        ("CSS Styling Loaded", tester.test_css_styling_loaded),
        ("Permissions and User Types", tester.test_permissions_and_user_types)
    ]
    
    for test_name, test_func in tests:
        tester.run_test(test_name, test_func)
    
    # Generate functional report
    success_rate = tester.generate_functional_report()
    
    return 0 if success_rate >= 75 else 1

if __name__ == "__main__":
    sys.exit(main())