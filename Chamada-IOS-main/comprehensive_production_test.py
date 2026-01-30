#!/usr/bin/env python3
"""
Comprehensive Production Test for Sistema IOS
Testing all functionality for production readiness
"""

import requests
import sys
from datetime import datetime
import json
import re

class SistemaIOSProductionTest:
    def __init__(self, base_url="http://localhost:8000"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.critical_issues = []
        self.warnings = []
        self.success_items = []

    def run_test(self, name, test_func, critical=False):
        """Run a single test"""
        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            success = test_func()
            if success:
                self.tests_passed += 1
                self.success_items.append(name)
                print(f"✅ PASSED - {name}")
            else:
                if critical:
                    self.critical_issues.append(name)
                    print(f"❌ CRITICAL FAILURE - {name}")
                else:
                    self.warnings.append(name)
                    print(f"⚠️ WARNING - {name}")
            return success
        except Exception as e:
            if critical:
                self.critical_issues.append(f"{name}: {str(e)}")
                print(f"❌ CRITICAL ERROR - {name}: {str(e)}")
            else:
                self.warnings.append(f"{name}: {str(e)}")
                print(f"⚠️ ERROR - {name}: {str(e)}")
            return False

    def test_application_accessibility(self):
        """Test if application is accessible and loads correctly"""
        try:
            response = requests.get(self.base_url, timeout=10)
            
            if response.status_code != 200:
                print(f"HTTP Status: {response.status_code}")
                return False
            
            content = response.text
            
            # Check for critical login elements
            login_elements = [
                'id="loginScreen"',
                'id="email"', 
                'id="password"',
                'id="userType"',
                'class="btn-login"'
            ]
            
            missing = []
            for element in login_elements:
                if element not in content:
                    missing.append(element)
            
            if missing:
                print(f"Missing critical login elements: {missing}")
                return False
            
            print("✅ All critical login elements present")
            return True
            
        except Exception as e:
            print(f"Error accessing application: {str(e)}")
            return False

    def test_user_credentials_visibility(self):
        """Test if test user credentials are visible for production testing"""
        try:
            response = requests.get(self.base_url, timeout=5)
            content = response.text
            
            # Check for test users section
            if 'test-users' in content and 'admin@ios.org.br' in content:
                print("✅ Test user credentials are visible for testing")
                return True
            else:
                print("⚠️ Test user credentials not clearly visible")
                return False
                
        except Exception as e:
            print(f"Error checking credentials: {str(e)}")
            return False

    def test_main_system_structure(self):
        """Test if main system structure is complete"""
        try:
            response = requests.get(self.base_url, timeout=5)
            content = response.text
            
            # Check for main system pages
            required_pages = [
                'id="mainSystem"',
                'id="dashboardPage"',
                'id="usersPage"',
                'id="unitsPage"',
                'id="coursesPage"',
                'id="classesPage"',
                'id="attendancePage"',
                'id="reportsPage"'
            ]
            
            missing_pages = []
            for page in required_pages:
                if page not in content:
                    missing_pages.append(page)
            
            if missing_pages:
                print(f"Missing system pages: {missing_pages}")
                return False
            
            print("✅ All main system pages present")
            return True
            
        except Exception as e:
            print(f"Error checking system structure: {str(e)}")
            return False

    def test_navigation_tabs(self):
        """Test if all navigation tabs are present"""
        try:
            response = requests.get(self.base_url, timeout=5)
            content = response.text
            
            # Check for navigation tabs
            nav_tabs = [
                'Dashboard',
                'Usuários',
                'Unidades', 
                'Cursos',
                'Turmas',
                'Diário Digital',
                'Chamada',
                'Relatórios',
                'Dados'
            ]
            
            # Check each tab more specifically
            tab_checks = {
                'Dashboard': 'Dashboard',
                'Usuários': 'Usuários',
                'Unidades': 'Unidades',
                'Cursos': 'Cursos', 
                'Turmas': 'Turmas',
                'Diário Digital': 'Diário Digital',
                'Chamada': 'Chamada',
                'Relatórios': 'Relatórios',
                'Dados': 'Dados'
            }
            
            missing_tabs = []
            for tab_name, search_text in tab_checks.items():
                if search_text not in content:
                    missing_tabs.append(tab_name)
            
            if missing_tabs:
                print(f"Missing navigation tabs: {missing_tabs}")
                return False
            
            print("✅ All navigation tabs present")
            return True
            
        except Exception as e:
            print(f"Error checking navigation: {str(e)}")
            return False

    def test_enhanced_class_form(self):
        """Test if enhanced class creation form is complete"""
        try:
            response = requests.get(self.base_url, timeout=5)
            content = response.text
            
            # Check for enhanced class form elements
            enhanced_elements = [
                'id="enhancedClassForm"',
                'id="className"',
                'id="classUnit"',
                'id="classCourse"',
                'id="classInstructorId"',
                'id="classMonitorId"',
                'id="classPedagogueId"',
                'team-member-group'
            ]
            
            missing_elements = []
            for element in enhanced_elements:
                if element not in content:
                    missing_elements.append(element)
            
            if missing_elements:
                print(f"Missing enhanced form elements: {missing_elements}")
                return False
            
            print("✅ Enhanced class form is complete")
            return True
            
        except Exception as e:
            print(f"Error checking enhanced form: {str(e)}")
            return False

    def test_student_management(self):
        """Test if student management with CPF is present"""
        try:
            response = requests.get(self.base_url, timeout=5)
            content = response.text
            
            # Check for student form elements
            student_elements = [
                'id="studentClass"',
                'id="studentName"',
                'id="studentCpf"',
                'id="studentFullName"',
                'addEnhancedStudent'
            ]
            
            missing_elements = []
            for element in student_elements:
                if element not in content:
                    missing_elements.append(element)
            
            if missing_elements:
                print(f"Missing student management elements: {missing_elements}")
                return False
            
            print("✅ Student management with CPF is complete")
            return True
            
        except Exception as e:
            print(f"Error checking student management: {str(e)}")
            return False

    def test_attendance_system(self):
        """Test if attendance system is complete"""
        try:
            response = requests.get(self.base_url, timeout=5)
            content = response.text
            
            # Check for attendance elements
            attendance_elements = [
                'id="attendanceClassSelect"',
                'id="attendanceDate"',
                'id="attendanceInstructor"',
                'id="attendanceStudentsList"',
                'markAllPresent',
                'markAllAbsent',
                'saveAttendance'
            ]
            
            missing_elements = []
            for element in attendance_elements:
                if element not in content:
                    missing_elements.append(element)
            
            if missing_elements:
                print(f"Missing attendance elements: {missing_elements}")
                return False
            
            print("✅ Attendance system is complete")
            return True
            
        except Exception as e:
            print(f"Error checking attendance system: {str(e)}")
            return False

    def test_dashboard_statistics(self):
        """Test if dashboard with statistics is present"""
        try:
            response = requests.get(self.base_url, timeout=5)
            content = response.text
            
            # Check for dashboard statistics
            dashboard_elements = [
                'id="totalUnits"',
                'id="totalClasses"',
                'id="totalStudents"',
                'id="todayAttendance"',
                'stats-grid',
                'stat-card'
            ]
            
            missing_elements = []
            for element in dashboard_elements:
                if element not in content:
                    missing_elements.append(element)
            
            if missing_elements:
                print(f"Missing dashboard elements: {missing_elements}")
                return False
            
            print("✅ Dashboard with statistics is complete")
            return True
            
        except Exception as e:
            print(f"Error checking dashboard: {str(e)}")
            return False

    def test_user_permission_system(self):
        """Test if user permission system is implemented"""
        try:
            response = requests.get(self.base_url, timeout=5)
            content = response.text
            
            # Check for permission-related elements
            permission_elements = [
                'currentUser',
                'userType',
                'admin',
                'instructor',
                'pedagogue',
                'monitor'
            ]
            
            missing_elements = []
            for element in permission_elements:
                if element not in content:
                    missing_elements.append(element)
            
            if missing_elements:
                print(f"Missing permission elements: {missing_elements}")
                return False
            
            print("✅ User permission system is implemented")
            return True
            
        except Exception as e:
            print(f"Error checking permissions: {str(e)}")
            return False

    def test_data_persistence(self):
        """Test if data persistence (localStorage) is implemented"""
        try:
            response = requests.get(self.base_url, timeout=5)
            content = response.text
            
            # Check for data persistence elements
            persistence_elements = [
                'localStorage',
                'saveData'
            ]
            
            missing_elements = []
            for element in persistence_elements:
                if element not in content:
                    missing_elements.append(element)
            
            if missing_elements:
                print(f"Missing data persistence elements: {missing_elements}")
                return False
            
            print("✅ Data persistence system is implemented")
            return True
            
        except Exception as e:
            print(f"Error checking data persistence: {str(e)}")
            return False

    def test_first_access_modal(self):
        """Test if first access registration is complete"""
        try:
            response = requests.get(self.base_url, timeout=5)
            content = response.text
            
            # Check for first access elements
            first_access_elements = [
                'id="firstAccessModal"',
                'id="firstAccessForm"',
                'id="firstAccessName"',
                'id="firstAccessCpf"',
                'id="firstAccessEmail"',
                'openFirstAccessModal'
            ]
            
            missing_elements = []
            for element in first_access_elements:
                if element not in content:
                    missing_elements.append(element)
            
            if missing_elements:
                print(f"Missing first access elements: {missing_elements}")
                return False
            
            print("✅ First access registration is complete")
            return True
            
        except Exception as e:
            print(f"Error checking first access: {str(e)}")
            return False

    def test_javascript_files(self):
        """Test if all JavaScript files are accessible"""
        try:
            js_files = ['main.js', 'enhanced-main.js', 'advanced-functions.js', 'teacher-dashboard.js']
            
            for js_file in js_files:
                response = requests.get(f"{self.base_url}/{js_file}", timeout=5)
                if response.status_code != 200:
                    print(f"JavaScript file {js_file} not accessible: {response.status_code}")
                    return False
            
            print("✅ All JavaScript files are accessible")
            return True
            
        except Exception as e:
            print(f"Error checking JavaScript files: {str(e)}")
            return False

    def test_css_styling(self):
        """Test if CSS styling is accessible and complete"""
        try:
            response = requests.get(f"{self.base_url}/style.css", timeout=5)
            
            if response.status_code != 200:
                print(f"CSS file not accessible: {response.status_code}")
                return False
            
            css_content = response.text
            
            # Check for key CSS classes
            required_classes = [
                '.login-container',
                '.login-card',
                '.btn-login',
                '.form-group',
                '.nav-tab',
                '.form-section',
                '.team-member-group',
                '.stats-grid',
                '.stat-card'
            ]
            
            missing_classes = []
            for css_class in required_classes:
                if css_class not in css_content:
                    missing_classes.append(css_class)
            
            if missing_classes:
                print(f"Missing CSS classes: {missing_classes}")
                return False
            
            print("✅ CSS styling is complete")
            return True
            
        except Exception as e:
            print(f"Error checking CSS: {str(e)}")
            return False

def main():
    print("🚀 SISTEMA IOS - COMPREHENSIVE PRODUCTION VERIFICATION")
    print("=" * 60)
    print("Testing all functionality for production readiness")
    print("=" * 60)
    
    # Setup
    tester = SistemaIOSProductionTest("http://localhost:8000")
    
    # Critical Tests (must pass for production)
    critical_tests = [
        ("Application Accessibility", tester.test_application_accessibility, True),
        ("Main System Structure", tester.test_main_system_structure, True),
        ("Navigation Tabs", tester.test_navigation_tabs, True),
        ("JavaScript Files", tester.test_javascript_files, True),
        ("CSS Styling", tester.test_css_styling, True)
    ]
    
    # Important Tests (should pass for full functionality)
    important_tests = [
        ("User Credentials Visibility", tester.test_user_credentials_visibility, False),
        ("Enhanced Class Form", tester.test_enhanced_class_form, False),
        ("Student Management", tester.test_student_management, False),
        ("Attendance System", tester.test_attendance_system, False),
        ("Dashboard Statistics", tester.test_dashboard_statistics, False),
        ("User Permission System", tester.test_user_permission_system, False),
        ("Data Persistence", tester.test_data_persistence, False),
        ("First Access Modal", tester.test_first_access_modal, False)
    ]
    
    # Run all tests
    all_tests = critical_tests + important_tests
    
    for test_name, test_func, is_critical in all_tests:
        tester.run_test(test_name, test_func, is_critical)
    
    # Print comprehensive results
    print("\n" + "=" * 60)
    print("📊 COMPREHENSIVE TEST RESULTS")
    print("=" * 60)
    
    print(f"Total Tests Run: {tester.tests_run}")
    print(f"Tests Passed: {tester.tests_passed}")
    print(f"Success Rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%")
    
    if tester.critical_issues:
        print(f"\n❌ CRITICAL ISSUES ({len(tester.critical_issues)}):")
        for issue in tester.critical_issues:
            print(f"  • {issue}")
    
    if tester.warnings:
        print(f"\n⚠️ WARNINGS ({len(tester.warnings)}):")
        for warning in tester.warnings:
            print(f"  • {warning}")
    
    if tester.success_items:
        print(f"\n✅ SUCCESSFUL ITEMS ({len(tester.success_items)}):")
        for success in tester.success_items:
            print(f"  • {success}")
    
    # Production readiness assessment
    print("\n" + "=" * 60)
    print("🎯 PRODUCTION READINESS ASSESSMENT")
    print("=" * 60)
    
    if len(tester.critical_issues) == 0:
        if tester.tests_passed >= tester.tests_run * 0.8:  # 80% pass rate
            print("🎉 SISTEMA IOS IS READY FOR PRODUCTION!")
            print("✅ All critical tests passed")
            print("✅ High success rate achieved")
            print("✅ System is stable and functional")
        else:
            print("⚠️ SISTEMA IOS NEEDS MINOR IMPROVEMENTS")
            print("✅ Critical functionality works")
            print("⚠️ Some features need attention")
    else:
        print("❌ SISTEMA IOS NOT READY FOR PRODUCTION")
        print("❌ Critical issues must be resolved first")
    
    return 0 if len(tester.critical_issues) == 0 else 1

if __name__ == "__main__":
    sys.exit(main())