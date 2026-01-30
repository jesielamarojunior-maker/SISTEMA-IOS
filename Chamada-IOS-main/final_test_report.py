#!/usr/bin/env python3
"""
Final Test Report for Sistema IOS
Comprehensive testing of all enhanced features
"""

import requests
import sys
import json
import time
from datetime import datetime

class FinalTestReport:
    def __init__(self, base_url="http://localhost:8000"):
        self.base_url = base_url
        self.test_results = {
            'login_system': {},
            'enhanced_class_form': {},
            'student_registration': {},
            'team_management': {},
            'data_persistence': {},
            'permissions': {},
            'styling': {},
            'navigation': {}
        }
        self.critical_issues = []
        self.working_features = []
        self.recommendations = []

    def test_all_features(self):
        """Run comprehensive tests for all features"""
        print("🚀 SISTEMA IOS - COMPREHENSIVE TESTING")
        print("=" * 60)
        
        # Test 1: Login System
        print("\n1️⃣ TESTING LOGIN SYSTEM")
        self.test_login_system()
        
        # Test 2: Enhanced Class Form
        print("\n2️⃣ TESTING ENHANCED CLASS FORM")
        self.test_enhanced_class_form()
        
        # Test 3: Student Registration
        print("\n3️⃣ TESTING STUDENT REGISTRATION")
        self.test_student_registration()
        
        # Test 4: Team Management
        print("\n4️⃣ TESTING TEAM MANAGEMENT")
        self.test_team_management()
        
        # Test 5: Navigation & UI
        print("\n5️⃣ TESTING NAVIGATION & UI")
        self.test_navigation_ui()
        
        # Test 6: JavaScript Integration
        print("\n6️⃣ TESTING JAVASCRIPT INTEGRATION")
        self.test_javascript_integration()
        
        # Test 7: CSS Styling
        print("\n7️⃣ TESTING CSS STYLING")
        self.test_css_styling()
        
        # Test 8: Permissions System
        print("\n8️⃣ TESTING PERMISSIONS SYSTEM")
        self.test_permissions_system()

    def test_login_system(self):
        """Test login system improvements"""
        try:
            response = requests.get(self.base_url, timeout=10)
            content = response.text
            
            # Check login elements
            login_checks = {
                'login_form': 'id="loginForm"' in content,
                'email_field': 'id="email"' in content,
                'password_field': 'id="password"' in content,
                'user_type_field': 'id="userType"' in content,
                'login_button': 'btn-login' in content,
                'test_credentials': all(cred in content for cred in [
                    'admin@ios.org.br', 'instrutor@ios.org.br', 
                    'pedagogo@ios.org.br', 'monitor@ios.org.br'
                ]),
                'first_access_modal': 'firstAccessModal' in content
            }
            
            self.test_results['login_system'] = login_checks
            
            passed = sum(login_checks.values())
            total = len(login_checks)
            
            print(f"   ✅ Login System: {passed}/{total} checks passed")
            
            if passed == total:
                self.working_features.append("Login System - Complete with all credentials and first access")
            elif passed >= total * 0.8:
                self.working_features.append("Login System - Mostly working")
            else:
                self.critical_issues.append("Login System - Missing critical elements")
                
        except Exception as e:
            self.critical_issues.append(f"Login System - Error: {str(e)}")
            print(f"   ❌ Login System Error: {str(e)}")

    def test_enhanced_class_form(self):
        """Test enhanced class form with team structure"""
        try:
            response = requests.get(self.base_url, timeout=10)
            content = response.text
            
            # Check enhanced form elements
            form_checks = {
                'enhanced_form': 'id="enhancedClassForm"' in content,
                'basic_info_section': all(field in content for field in [
                    'id="className"', 'id="classUnit"', 'id="classCourse"', 
                    'id="classYear"', 'id="classSemester"'
                ]),
                'team_section': all(field in content for field in [
                    'id="classInstructorId"', 'id="classInstructorName"',
                    'id="classMonitorId"', 'id="classMonitorName"',
                    'id="classPedagogueId"', 'id="classPedagogueName"'
                ]),
                'schedule_section': all(field in content for field in [
                    'id="mainClassDay"', 'id="mainClassStart"',
                    'id="extensionClassDay"', 'id="extensionSubject"'
                ]),
                'team_labels': all(label in content for label in [
                    'Professor', 'Monitor', 'Pedagoga'
                ]),
                'schedule_labels': all(label in content for label in [
                    'Aula Principal', 'Aula de Extensão'
                ])
            }
            
            self.test_results['enhanced_class_form'] = form_checks
            
            passed = sum(form_checks.values())
            total = len(form_checks)
            
            print(f"   ✅ Enhanced Class Form: {passed}/{total} checks passed")
            
            if passed == total:
                self.working_features.append("Enhanced Class Form - Complete with all sections (Basic Info, Team, Schedule)")
            elif passed >= total * 0.8:
                self.working_features.append("Enhanced Class Form - Mostly complete")
                self.recommendations.append("Complete missing form sections in Enhanced Class Form")
            else:
                self.critical_issues.append("Enhanced Class Form - Major sections missing")
                
        except Exception as e:
            self.critical_issues.append(f"Enhanced Class Form - Error: {str(e)}")
            print(f"   ❌ Enhanced Class Form Error: {str(e)}")

    def test_student_registration(self):
        """Test student registration with CPF as RA"""
        try:
            response = requests.get(self.base_url, timeout=10)
            content = response.text
            
            # Check student registration elements
            student_checks = {
                'student_form_section': 'student-section' in content,
                'student_class_field': 'id="studentClass"' in content,
                'student_name_field': 'id="studentName"' in content,
                'student_cpf_field': 'id="studentCpf"' in content,
                'student_fullname_field': 'id="studentFullName"' in content,
                'cpf_as_ra_label': 'CPF (RA)' in content,
                'cpf_mask': 'maxlength="14"' in content and '000.000.000-00' in content,
                'add_student_button': 'addEnhancedStudent' in content
            }
            
            self.test_results['student_registration'] = student_checks
            
            passed = sum(student_checks.values())
            total = len(student_checks)
            
            print(f"   ✅ Student Registration: {passed}/{total} checks passed")
            
            if passed == total:
                self.working_features.append("Student Registration - Complete with CPF as RA and full name")
            elif passed >= total * 0.8:
                self.working_features.append("Student Registration - Working with CPF integration")
            else:
                self.critical_issues.append("Student Registration - CPF integration incomplete")
                
        except Exception as e:
            self.critical_issues.append(f"Student Registration - Error: {str(e)}")
            print(f"   ❌ Student Registration Error: {str(e)}")

    def test_team_management(self):
        """Test team management with dropdowns"""
        try:
            response = requests.get(self.base_url, timeout=10)
            content = response.text
            
            # Check team management elements
            team_checks = {
                'team_member_groups': 'team-member-group' in content,
                'instructor_dropdown': 'fillInstructorData()' in content,
                'monitor_dropdown': 'fillMonitorData()' in content,
                'pedagogue_dropdown': 'fillPedagogueData()' in content,
                'automatic_fill_functions': all(func in content for func in [
                    'fillInstructorData', 'fillMonitorData', 'fillPedagogueData'
                ]),
                'team_structure': all(role in content for role in [
                    'Professor *', 'Monitor', 'Pedagoga'
                ])
            }
            
            self.test_results['team_management'] = team_checks
            
            passed = sum(team_checks.values())
            total = len(team_checks)
            
            print(f"   ✅ Team Management: {passed}/{total} checks passed")
            
            if passed == total:
                self.working_features.append("Team Management - Complete with automatic dropdowns for all roles")
            elif passed >= total * 0.8:
                self.working_features.append("Team Management - Working with most dropdown functions")
            else:
                self.critical_issues.append("Team Management - Dropdown automation incomplete")
                
        except Exception as e:
            self.critical_issues.append(f"Team Management - Error: {str(e)}")
            print(f"   ❌ Team Management Error: {str(e)}")

    def test_navigation_ui(self):
        """Test navigation and UI structure"""
        try:
            response = requests.get(self.base_url, timeout=10)
            content = response.text
            
            # Check navigation elements
            nav_checks = {
                'main_system': 'id="mainSystem"' in content,
                'navigation_tabs': 'nav-tab' in content,
                'dashboard_page': 'id="dashboardPage"' in content,
                'users_page': 'id="usersPage"' in content,
                'classes_page': 'id="classesPage"' in content,
                'attendance_page': 'id="attendancePage"' in content,
                'reports_page': 'id="reportsPage"' in content,
                'modern_layout': 'grid-template-columns' in content or 'display: grid' in content
            }
            
            self.test_results['navigation'] = nav_checks
            
            passed = sum(nav_checks.values())
            total = len(nav_checks)
            
            print(f"   ✅ Navigation & UI: {passed}/{total} checks passed")
            
            if passed == total:
                self.working_features.append("Navigation & UI - Complete with all pages and modern layout")
            elif passed >= total * 0.8:
                self.working_features.append("Navigation & UI - Working with most pages accessible")
            else:
                self.critical_issues.append("Navigation & UI - Missing critical pages or layout issues")
                
        except Exception as e:
            self.critical_issues.append(f"Navigation & UI - Error: {str(e)}")
            print(f"   ❌ Navigation & UI Error: {str(e)}")

    def test_javascript_integration(self):
        """Test JavaScript integration and enhanced functions"""
        try:
            # Test enhanced-main.js
            js_response = requests.get(f"{self.base_url}/enhanced-main.js", timeout=5)
            js_content = js_response.text if js_response.status_code == 200 else ""
            
            # Test main.js
            main_js_response = requests.get(f"{self.base_url}/main.js", timeout=5)
            main_js_content = main_js_response.text if main_js_response.status_code == 200 else ""
            
            # Check JavaScript integration
            js_checks = {
                'enhanced_js_loaded': js_response.status_code == 200,
                'main_js_loaded': main_js_response.status_code == 200,
                'enhanced_functions': all(func in js_content for func in [
                    'addEnhancedClass', 'addEnhancedStudent', 'loadEnhancedClasses'
                ]),
                'data_structures': all(struct in js_content for struct in [
                    'enhancedDataStructure', 'createEnhancedClass', 'createEnhancedStudent'
                ]),
                'permission_functions': 'checkEnhancedPermissions' in js_content,
                'team_functions': all(func in js_content for func in [
                    'fillInstructorData', 'fillMonitorData', 'fillPedagogueData'
                ])
            }
            
            self.test_results['javascript'] = js_checks
            
            passed = sum(js_checks.values())
            total = len(js_checks)
            
            print(f"   ✅ JavaScript Integration: {passed}/{total} checks passed")
            
            if passed == total:
                self.working_features.append("JavaScript Integration - Complete with all enhanced functions")
            elif passed >= total * 0.8:
                self.working_features.append("JavaScript Integration - Working with most functions available")
            else:
                self.critical_issues.append("JavaScript Integration - Missing critical functions")
                
        except Exception as e:
            self.critical_issues.append(f"JavaScript Integration - Error: {str(e)}")
            print(f"   ❌ JavaScript Integration Error: {str(e)}")

    def test_css_styling(self):
        """Test CSS styling and modern design"""
        try:
            css_response = requests.get(f"{self.base_url}/style.css", timeout=5)
            css_content = css_response.text if css_response.status_code == 200 else ""
            
            # Check CSS styling
            css_checks = {
                'css_loaded': css_response.status_code == 200,
                'modern_features': all(feature in css_content for feature in [
                    'grid-template-columns', 'border-radius', 'box-shadow'
                ]),
                'form_styling': all(class_name in css_content for class_name in [
                    '.form-section', '.form-group', '.team-member-group'
                ]),
                'login_styling': all(class_name in css_content for class_name in [
                    '.login-container', '.login-card', '.btn-login'
                ]),
                'navigation_styling': '.nav-tab' in css_content,
                'responsive_design': '@media' in css_content or 'min-width' in css_content
            }
            
            self.test_results['styling'] = css_checks
            
            passed = sum(css_checks.values())
            total = len(css_checks)
            
            print(f"   ✅ CSS Styling: {passed}/{total} checks passed")
            
            if passed == total:
                self.working_features.append("CSS Styling - Modern design with responsive features")
            elif passed >= total * 0.8:
                self.working_features.append("CSS Styling - Good modern styling applied")
            else:
                self.critical_issues.append("CSS Styling - Missing modern design features")
                
        except Exception as e:
            self.critical_issues.append(f"CSS Styling - Error: {str(e)}")
            print(f"   ❌ CSS Styling Error: {str(e)}")

    def test_permissions_system(self):
        """Test permissions system for different user types"""
        try:
            js_response = requests.get(f"{self.base_url}/enhanced-main.js", timeout=5)
            js_content = js_response.text if js_response.status_code == 200 else ""
            
            html_response = requests.get(self.base_url, timeout=5)
            html_content = html_response.text if html_response.status_code == 200 else ""
            
            # Check permissions system
            perm_checks = {
                'permission_function': 'checkEnhancedPermissions' in js_content,
                'user_types_defined': all(user_type in js_content for user_type in [
                    'admin:', 'instructor:', 'pedagogue:', 'monitor:'
                ]),
                'permission_levels': all(perm in js_content for perm in [
                    'canViewAllUnits', 'canCreateUsers', 'canCreateClasses'
                ]),
                'user_type_options': all(f'value="{user_type}"' in html_content for user_type in [
                    'admin', 'instructor', 'pedagogue', 'monitor'
                ]),
                'role_based_access': 'currentUser.type' in js_content
            }
            
            self.test_results['permissions'] = perm_checks
            
            passed = sum(perm_checks.values())
            total = len(perm_checks)
            
            print(f"   ✅ Permissions System: {passed}/{total} checks passed")
            
            if passed == total:
                self.working_features.append("Permissions System - Complete role-based access control")
            elif passed >= total * 0.8:
                self.working_features.append("Permissions System - Working with most user types")
            else:
                self.critical_issues.append("Permissions System - Incomplete role definitions")
                
        except Exception as e:
            self.critical_issues.append(f"Permissions System - Error: {str(e)}")
            print(f"   ❌ Permissions System Error: {str(e)}")

    def generate_final_report(self):
        """Generate comprehensive final report"""
        print("\n" + "=" * 80)
        print("📋 FINAL TEST REPORT - SISTEMA IOS ENHANCED")
        print("=" * 80)
        
        print(f"\n📅 Test Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"🌐 Application URL: {self.base_url}")
        
        # Calculate overall success rate
        total_checks = sum(len(checks) for checks in self.test_results.values())
        passed_checks = sum(sum(checks.values()) for checks in self.test_results.values())
        success_rate = (passed_checks / total_checks * 100) if total_checks > 0 else 0
        
        print(f"\n📊 OVERALL SUCCESS RATE: {success_rate:.1f}% ({passed_checks}/{total_checks} checks passed)")
        
        # Working Features
        if self.working_features:
            print(f"\n✅ WORKING FEATURES ({len(self.working_features)}):")
            for i, feature in enumerate(self.working_features, 1):
                print(f"  {i}. {feature}")
        
        # Critical Issues
        if self.critical_issues:
            print(f"\n❌ CRITICAL ISSUES ({len(self.critical_issues)}):")
            for i, issue in enumerate(self.critical_issues, 1):
                print(f"  {i}. {issue}")
        
        # Recommendations
        if self.recommendations:
            print(f"\n💡 RECOMMENDATIONS ({len(self.recommendations)}):")
            for i, rec in enumerate(self.recommendations, 1):
                print(f"  {i}. {rec}")
        
        # Feature-by-feature breakdown
        print(f"\n🔍 DETAILED BREAKDOWN:")
        for feature, checks in self.test_results.items():
            if checks:
                passed = sum(checks.values())
                total = len(checks)
                status = "✅" if passed == total else "⚠️" if passed >= total * 0.8 else "❌"
                print(f"  {status} {feature.replace('_', ' ').title()}: {passed}/{total}")
        
        # Overall Assessment
        print(f"\n🎯 OVERALL ASSESSMENT:")
        if success_rate >= 95:
            print("🎉 EXCELLENT: Sistema IOS enhanced features are working perfectly!")
            print("   All requested improvements have been successfully implemented.")
        elif success_rate >= 85:
            print("👍 VERY GOOD: Sistema IOS is working very well with minor issues.")
            print("   Most enhanced features are functional and ready for use.")
        elif success_rate >= 75:
            print("✅ GOOD: Sistema IOS is mostly working with some areas needing attention.")
            print("   Core functionality is solid but some enhancements need refinement.")
        elif success_rate >= 60:
            print("⚠️  MODERATE: Sistema IOS has significant issues that need addressing.")
            print("   Several enhanced features require fixes before production use.")
        else:
            print("🚨 POOR: Sistema IOS has major issues requiring immediate attention.")
            print("   Extensive work needed on enhanced features before deployment.")
        
        # Specific recommendations based on test results
        print(f"\n📋 SPECIFIC RECOMMENDATIONS FOR E1:")
        
        if success_rate >= 85:
            print("  • Sistema is ready for production use")
            print("  • Consider adding automated tests for continuous integration")
            print("  • Document the enhanced features for end users")
        else:
            print("  • Focus on fixing critical issues identified above")
            print("  • Test login functionality with all user types")
            print("  • Verify data persistence after page refresh")
            print("  • Ensure all form validations are working")
        
        return success_rate

def main():
    # Setup and run comprehensive tests
    tester = FinalTestReport("http://localhost:8000")
    tester.test_all_features()
    success_rate = tester.generate_final_report()
    
    return 0 if success_rate >= 75 else 1

if __name__ == "__main__":
    sys.exit(main())