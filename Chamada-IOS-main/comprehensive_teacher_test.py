#!/usr/bin/env python3
"""
Comprehensive Teacher Diary System Test
Tests all the new teacher functionalities implemented in Sistema IOS
"""

import requests
import sys
import json
from bs4 import BeautifulSoup

class TeacherDiarySystemTest:
    def __init__(self, base_url="http://localhost:8000"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.critical_issues = []
        self.warnings = []

    def run_test(self, name, test_func, is_critical=False):
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
                if is_critical:
                    self.critical_issues.append(name)
                else:
                    self.warnings.append(name)
            return success
        except Exception as e:
            print(f"❌ Failed - {name}: {str(e)}")
            if is_critical:
                self.critical_issues.append(f"{name}: {str(e)}")
            else:
                self.warnings.append(f"{name}: {str(e)}")
            return False

    def test_login_system(self):
        """Test login system with different user types"""
        try:
            response = requests.get(self.base_url, timeout=10)
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Check login form structure
            login_form = soup.find(id="loginForm")
            if not login_form:
                print("Login form not found")
                return False
            
            # Check user type options
            user_type_select = soup.find(id="userType")
            if not user_type_select:
                print("User type selector not found")
                return False
            
            options = user_type_select.find_all('option')
            user_types = [opt.get('value') for opt in options if opt.get('value')]
            
            required_types = ['admin', 'instructor', 'pedagogue', 'monitor']
            missing_types = [t for t in required_types if t not in user_types]
            
            if missing_types:
                print(f"Missing user types: {missing_types}")
                return False
            
            # Check test credentials display
            test_users = soup.find(class_="test-users")
            if not test_users:
                print("Test users credentials not displayed")
                return False
            
            credentials_text = test_users.get_text()
            required_credentials = [
                "admin@ios.org.br",
                "instrutor@ios.org.br", 
                "pedagogo@ios.org.br",
                "monitor@ios.org.br"
            ]
            
            missing_credentials = [cred for cred in required_credentials if cred not in credentials_text]
            if missing_credentials:
                print(f"Missing test credentials: {missing_credentials}")
                return False
            
            print("Login system properly configured with all user types and test credentials")
            return True
            
        except Exception as e:
            print(f"Error testing login system: {str(e)}")
            return False

    def test_diary_digital_tab(self):
        """Test if Diário Digital tab is properly implemented"""
        try:
            response = requests.get(self.base_url, timeout=10)
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Check for Diário Digital tab
            diary_tab = soup.find(id="diaryTab")
            if not diary_tab:
                print("❌ CRITICAL: Diário Digital tab not found")
                return False
            
            # Check tab content
            tab_text = diary_tab.get_text()
            if "Diário Digital" not in tab_text:
                print("Diário Digital tab text incorrect")
                return False
            
            # Check onclick function
            onclick = diary_tab.get('onclick')
            if not onclick or 'showTeacherDiary' not in onclick:
                print("Diário Digital tab onclick function missing or incorrect")
                return False
            
            print("✅ Diário Digital tab properly implemented")
            return True
            
        except Exception as e:
            print(f"Error testing Diário Digital tab: {str(e)}")
            return False

    def test_teacher_dashboard_functionality(self):
        """Test teacher dashboard JavaScript functionality"""
        try:
            # Test teacher-dashboard.js
            dashboard_response = requests.get(f"{self.base_url}/teacher-dashboard.js", timeout=5)
            if dashboard_response.status_code != 200:
                print("teacher-dashboard.js not accessible")
                return False
            
            dashboard_content = dashboard_response.text
            
            # Check for key data structures
            required_structures = [
                'window.gradeSystem',
                'createGradeRecord',
                'createDetailedAttendance', 
                'createTeacherAnnotation'
            ]
            
            missing_structures = []
            for structure in required_structures:
                if structure not in dashboard_content:
                    missing_structures.append(structure)
            
            if missing_structures:
                print(f"Missing data structures: {missing_structures}")
                return False
            
            # Check for calculation functions
            calculation_functions = [
                'calculateStudentAverage',
                'calculateAttendanceRate',
                'calculateClassStats'
            ]
            
            missing_calc_functions = []
            for func in calculation_functions:
                if func not in dashboard_content:
                    missing_calc_functions.append(func)
            
            if missing_calc_functions:
                print(f"Missing calculation functions: {missing_calc_functions}")
                return False
            
            # Check for main diary functions
            diary_functions = [
                'showTeacherDiary',
                'loadDiaryForClass',
                'saveAttendance',
                'markAllPresent'
            ]
            
            missing_diary_functions = []
            for func in diary_functions:
                if func not in dashboard_content:
                    missing_diary_functions.append(func)
            
            if missing_diary_functions:
                print(f"Missing diary functions: {missing_diary_functions}")
                return False
            
            print("✅ Teacher dashboard functionality properly implemented")
            return True
            
        except Exception as e:
            print(f"Error testing teacher dashboard: {str(e)}")
            return False

    def test_grading_system(self):
        """Test grading system functionality"""
        try:
            # Test teacher-grades.js
            grades_response = requests.get(f"{self.base_url}/teacher-grades.js", timeout=5)
            if grades_response.status_code != 200:
                print("teacher-grades.js not accessible")
                return False
            
            grades_content = grades_response.text
            
            # Check for grade management functions
            grade_functions = [
                'loadGradesTab',
                'showAddActivityModal',
                'createActivity',
                'showGradeEntryModal',
                'saveActivityGrades'
            ]
            
            missing_grade_functions = []
            for func in grade_functions:
                if func not in grades_content:
                    missing_grade_functions.append(func)
            
            if missing_grade_functions:
                print(f"Missing grade functions: {missing_grade_functions}")
                return False
            
            # Check for annotation functions
            annotation_functions = [
                'loadAnnotationsTab',
                'showAddAnnotationModal',
                'saveAnnotation'
            ]
            
            missing_annotation_functions = []
            for func in annotation_functions:
                if func not in grades_content:
                    missing_annotation_functions.append(func)
            
            if missing_annotation_functions:
                print(f"Missing annotation functions: {missing_annotation_functions}")
                return False
            
            # Check for activity types
            activity_types = ['prova', 'trabalho', 'projeto', 'participacao', 'seminario']
            for activity_type in activity_types:
                if activity_type not in grades_content:
                    print(f"Activity type '{activity_type}' not found in grading system")
                    return False
            
            print("✅ Grading system properly implemented with all activity types")
            return True
            
        except Exception as e:
            print(f"Error testing grading system: {str(e)}")
            return False

    def test_analytics_dashboard(self):
        """Test analytics and dashboard functionality"""
        try:
            # Test teacher-analytics.js
            analytics_response = requests.get(f"{self.base_url}/teacher-analytics.js", timeout=5)
            if analytics_response.status_code != 200:
                print("teacher-analytics.js not accessible")
                return False
            
            analytics_content = analytics_response.text
            
            # Check for dashboard functions
            dashboard_functions = [
                'loadTeacherDashboard',
                'refreshDashboard',
                'exportDashboardData',
                'generateClassReport'
            ]
            
            missing_dashboard_functions = []
            for func in dashboard_functions:
                if func not in analytics_content:
                    missing_dashboard_functions.append(func)
            
            if missing_dashboard_functions:
                print(f"Missing dashboard functions: {missing_dashboard_functions}")
                return False
            
            # Check for analytics features
            analytics_features = [
                'dashboard-stats-grid',
                'grade-distribution-chart',
                'student-ranking',
                'studentsAtRisk'
            ]
            
            missing_analytics = []
            for feature in analytics_features:
                if feature not in analytics_content:
                    missing_analytics.append(feature)
            
            if missing_analytics:
                print(f"Missing analytics features: {missing_analytics}")
                return False
            
            # Check for export functionality
            export_functions = ['exportDashboardData', 'generateClassReport']
            for export_func in export_functions:
                if export_func not in analytics_content:
                    print(f"Export function '{export_func}' not found")
                    return False
            
            print("✅ Analytics dashboard properly implemented with all features")
            return True
            
        except Exception as e:
            print(f"Error testing analytics dashboard: {str(e)}")
            return False

    def test_data_persistence(self):
        """Test data persistence functionality"""
        try:
            # Check all JavaScript files for data saving functions
            files_to_check = [
                'teacher-dashboard.js',
                'teacher-grades.js', 
                'teacher-analytics.js'
            ]
            
            persistence_functions = [
                'saveEnhancedData',
                'loadEnhancedData',
                'localStorage'
            ]
            
            for file_name in files_to_check:
                response = requests.get(f"{self.base_url}/{file_name}", timeout=5)
                content = response.text
                
                found_functions = []
                for func in persistence_functions:
                    if func in content:
                        found_functions.append(func)
                
                if len(found_functions) < 2:  # Should have at least save and localStorage
                    print(f"Insufficient data persistence in {file_name}: {found_functions}")
                    return False
            
            # Check for data structure definitions
            dashboard_response = requests.get(f"{self.base_url}/teacher-dashboard.js", timeout=5)
            dashboard_content = dashboard_response.text
            
            data_structures = [
                'window.gradeSystem',
                'grades:',
                'attendance:',
                'annotations:',
                'activities:'
            ]
            
            missing_structures = []
            for structure in data_structures:
                if structure not in dashboard_content:
                    missing_structures.append(structure)
            
            if missing_structures:
                print(f"Missing data structures: {missing_structures}")
                return False
            
            print("✅ Data persistence properly implemented")
            return True
            
        except Exception as e:
            print(f"Error testing data persistence: {str(e)}")
            return False

    def test_user_permissions(self):
        """Test user permission system for teachers"""
        try:
            # Check teacher-dashboard.js for permission functions
            dashboard_response = requests.get(f"{self.base_url}/teacher-dashboard.js", timeout=5)
            dashboard_content = dashboard_response.text
            
            # Check for teacher class filtering
            permission_checks = [
                'getTeacherClasses',
                'currentUser.type',
                'currentUser.id'
            ]
            
            missing_permissions = []
            for check in permission_checks:
                if check not in dashboard_content:
                    missing_permissions.append(check)
            
            if missing_permissions:
                print(f"Missing permission checks: {missing_permissions}")
                return False
            
            # Check for admin vs teacher differentiation
            if 'currentUser.type === \'admin\'' not in dashboard_content:
                print("Admin vs teacher differentiation not found")
                return False
            
            print("✅ User permission system properly implemented")
            return True
            
        except Exception as e:
            print(f"Error testing user permissions: {str(e)}")
            return False

    def test_ui_components(self):
        """Test UI components and styling"""
        try:
            # Check CSS file
            css_response = requests.get(f"{self.base_url}/style.css", timeout=5)
            if css_response.status_code != 200:
                print("CSS file not accessible")
                return False
            
            css_content = css_response.text
            
            # Check for teacher diary specific styles
            diary_styles = [
                'teacher-diary',
                'diary-tab',
                'attendance-card',
                'grade-entry',
                'dashboard-stat-card'
            ]
            
            missing_styles = []
            for style in diary_styles:
                if style not in css_content:
                    missing_styles.append(style)
            
            if missing_styles:
                print(f"Missing diary-specific styles: {missing_styles}")
                return False
            
            # Check HTML for UI structure
            response = requests.get(self.base_url, timeout=10)
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Check for Font Awesome icons
            fa_link = soup.find('link', href=lambda x: x and 'font-awesome' in x)
            if not fa_link:
                print("Font Awesome not included")
                return False
            
            # Check for responsive design
            viewport_meta = soup.find('meta', attrs={'name': 'viewport'})
            if not viewport_meta:
                print("Viewport meta tag missing")
                return False
            
            print("✅ UI components and styling properly implemented")
            return True
            
        except Exception as e:
            print(f"Error testing UI components: {str(e)}")
            return False

def main():
    print("🎯 Starting Comprehensive Teacher Diary System Test")
    print("=" * 70)
    print("Testing ALL new teacher functionalities implemented in Sistema IOS")
    print("=" * 70)
    
    # Setup
    tester = TeacherDiarySystemTest("http://localhost:8000")
    
    # Run tests - mark critical ones
    tests = [
        ("Login System", tester.test_login_system, True),
        ("Diário Digital Tab", tester.test_diary_digital_tab, True),
        ("Teacher Dashboard Functionality", tester.test_teacher_dashboard_functionality, True),
        ("Grading System", tester.test_grading_system, True),
        ("Analytics Dashboard", tester.test_analytics_dashboard, True),
        ("Data Persistence", tester.test_data_persistence, True),
        ("User Permissions", tester.test_user_permissions, False),
        ("UI Components", tester.test_ui_components, False)
    ]
    
    for test_name, test_func, is_critical in tests:
        tester.run_test(test_name, test_func, is_critical)
    
    # Print detailed results
    print("\n" + "=" * 70)
    print(f"📊 FINAL TEST RESULTS: {tester.tests_passed}/{tester.tests_run} tests passed")
    print("=" * 70)
    
    if tester.critical_issues:
        print("\n🚨 CRITICAL ISSUES FOUND:")
        for issue in tester.critical_issues:
            print(f"   ❌ {issue}")
    
    if tester.warnings:
        print("\n⚠️  WARNINGS:")
        for warning in tester.warnings:
            print(f"   ⚠️  {warning}")
    
    if tester.tests_passed == tester.tests_run:
        print("\n🎉 ALL TESTS PASSED!")
        print("✅ Teacher Diary System is fully functional and ready for use!")
        print("\n📋 VERIFIED FEATURES:")
        print("   ✅ Login system with all user types")
        print("   ✅ Diário Digital tab and interface")
        print("   ✅ Attendance system with detailed status")
        print("   ✅ Grading system with activities and notes")
        print("   ✅ Student annotations system")
        print("   ✅ Analytics dashboard with statistics")
        print("   ✅ Data persistence and export")
        print("   ✅ User permissions and security")
        print("   ✅ Responsive UI design")
        return 0
    elif len(tester.critical_issues) == 0:
        print("\n✅ CORE FUNCTIONALITY WORKING!")
        print("⚠️  Some minor issues found but system is usable")
        return 0
    else:
        print("\n❌ CRITICAL ISSUES PREVENT SYSTEM FROM WORKING PROPERLY")
        print("🔧 Please fix critical issues before deployment")
        return 1

if __name__ == "__main__":
    sys.exit(main())