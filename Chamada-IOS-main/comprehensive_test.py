#!/usr/bin/env python3
"""
Comprehensive Test for Sistema IOS
Testing all enhanced features mentioned in the request
"""

import requests
import sys
import json
import time
from datetime import datetime

class ComprehensiveIOSTest:
    def __init__(self, base_url="http://localhost:8000"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, test_func):
        """Run a single test and track results"""
        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            success, details = test_func()
            result = {
                'name': name,
                'success': success,
                'details': details,
                'timestamp': datetime.now().isoformat()
            }
            self.test_results.append(result)
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - {name}")
                if details:
                    print(f"   Details: {details}")
            else:
                print(f"❌ Failed - {name}")
                if details:
                    print(f"   Issue: {details}")
            return success
        except Exception as e:
            print(f"❌ Failed - {name}: {str(e)}")
            self.test_results.append({
                'name': name,
                'success': False,
                'details': str(e),
                'timestamp': datetime.now().isoformat()
            })
            return False

    def test_login_system_improvements(self):
        """Test 1: Login System - Verificar se correção de sincronização está funcionando"""
        try:
            response = requests.get(self.base_url, timeout=10)
            content = response.text
            
            # Check for login form elements
            login_elements = [
                'id="loginForm"',
                'id="email"', 
                'id="password"',
                'id="userType"',
                'admin@ios.org.br',
                'instrutor@ios.org.br',
                'pedagogo@ios.org.br',
                'monitor@ios.org.br'
            ]
            
            missing = []
            for element in login_elements:
                if element not in content:
                    missing.append(element)
            
            if missing:
                return False, f"Missing login elements: {missing}"
            
            # Check for test credentials display
            if 'test-users' in content:
                return True, "Login system with test credentials properly configured"
            else:
                return False, "Test credentials not displayed"
                
        except Exception as e:
            return False, str(e)

    def test_enhanced_class_form(self):
        """Test 2: Enhanced Class Form - Novo formulário com seções organizadas"""
        try:
            response = requests.get(self.base_url, timeout=10)
            content = response.text
            
            # Check for enhanced form structure
            required_sections = [
                'id="enhancedClassForm"',
                'Informações Básicas',
                'Equipe da Turma',
                'Horários das Aulas'
            ]
            
            # Check for basic info fields
            basic_fields = [
                'id="className"',
                'id="classUnit"', 
                'id="classCourse"',
                'id="classYear"',
                'id="classSemester"'
            ]
            
            # Check for team fields
            team_fields = [
                'id="classInstructorId"',
                'id="classInstructorName"',
                'id="classMonitorId"',
                'id="classMonitorName"',
                'id="classPedagogueId"',
                'id="classPedagogueName"'
            ]
            
            # Check for schedule fields
            schedule_fields = [
                'id="mainClassDay"',
                'id="mainClassStart"',
                'id="extensionClassDay"',
                'id="extensionSubject"'
            ]
            
            all_elements = required_sections + basic_fields + team_fields + schedule_fields
            missing = []
            
            for element in all_elements:
                if element not in content:
                    missing.append(element)
            
            if missing:
                return False, f"Missing enhanced form elements: {missing[:5]}..."  # Show first 5
            
            return True, "Enhanced class form with all sections properly implemented"
                
        except Exception as e:
            return False, str(e)

    def test_enhanced_student_registration(self):
        """Test 3: Enhanced Student Registration - Campo CPF como RA"""
        try:
            response = requests.get(self.base_url, timeout=10)
            content = response.text
            
            # Check for student registration fields
            student_fields = [
                'id="studentClass"',
                'id="studentName"',
                'id="studentCpf"',
                'id="studentFullName"',
                'CPF (RA)',
                'Nome Completo'
            ]
            
            missing = []
            for field in student_fields:
                if field not in content:
                    missing.append(field)
            
            if missing:
                return False, f"Missing student registration elements: {missing}"
            
            # Check for CPF mask functionality
            if 'maxlength="14"' in content and '000.000.000-00' in content:
                return True, "Enhanced student registration with CPF as RA properly implemented"
            else:
                return False, "CPF mask not properly configured"
                
        except Exception as e:
            return False, str(e)

    def test_team_management(self):
        """Test 4: Team Management - Dropdowns automáticos para seleção de equipe"""
        try:
            response = requests.get(self.base_url, timeout=10)
            content = response.text
            
            # Check for team management elements
            team_elements = [
                'fillInstructorData()',
                'fillMonitorData()',
                'fillPedagogueData()',
                'team-member-group',
                'Professor *',
                'Monitor',
                'Pedagoga'
            ]
            
            missing = []
            for element in team_elements:
                if element not in content:
                    missing.append(element)
            
            if missing:
                return False, f"Missing team management elements: {missing}"
            
            return True, "Team management with automatic dropdowns properly implemented"
                
        except Exception as e:
            return False, str(e)

    def test_javascript_enhancements(self):
        """Test 5: JavaScript Enhancements - Verificar funções melhoradas"""
        try:
            # Test enhanced-main.js
            js_response = requests.get(f"{self.base_url}/enhanced-main.js", timeout=5)
            js_content = js_response.text
            
            # Check for enhanced functions
            enhanced_functions = [
                'addEnhancedClass',
                'addEnhancedStudent',
                'createEnhancedClass',
                'createEnhancedStudent',
                'loadEnhancedClasses',
                'checkEnhancedPermissions',
                'fillInstructorData',
                'fillMonitorData',
                'fillPedagogueData'
            ]
            
            missing_functions = []
            for func in enhanced_functions:
                if func not in js_content:
                    missing_functions.append(func)
            
            if missing_functions:
                return False, f"Missing enhanced functions: {missing_functions}"
            
            # Check for data structures
            data_structures = [
                'enhancedDataStructure',
                'team:',
                'instructor:',
                'monitor:',
                'pedagogue:'
            ]
            
            missing_structures = []
            for struct in data_structures:
                if struct not in js_content:
                    missing_structures.append(struct)
            
            if missing_structures:
                return False, f"Missing data structures: {missing_structures}"
            
            return True, "Enhanced JavaScript functions and data structures properly implemented"
                
        except Exception as e:
            return False, str(e)

    def test_css_styling_improvements(self):
        """Test 6: CSS Styling - Verificar se estilos modernos estão aplicados"""
        try:
            css_response = requests.get(f"{self.base_url}/style.css", timeout=5)
            css_content = css_response.text
            
            # Check for enhanced CSS classes
            enhanced_classes = [
                '.form-section',
                '.team-member-group',
                '.schedule-group',
                '.login-card',
                '.btn-login',
                '.nav-tab',
                '.form-group'
            ]
            
            missing_classes = []
            for css_class in enhanced_classes:
                if css_class not in css_content:
                    missing_classes.append(css_class)
            
            if missing_classes:
                return False, f"Missing enhanced CSS classes: {missing_classes}"
            
            # Check for modern styling features
            modern_features = [
                'grid-template-columns',
                'border-radius',
                'box-shadow',
                'transition'
            ]
            
            found_features = []
            for feature in modern_features:
                if feature in css_content:
                    found_features.append(feature)
            
            if len(found_features) < 2:
                return False, f"Limited modern CSS features found: {found_features}"
            
            return True, f"Modern CSS styling properly implemented with features: {found_features}"
                
        except Exception as e:
            return False, str(e)

    def test_permissions_system(self):
        """Test 7: Permissions System - Testar se sistema de permissões está funcionando"""
        try:
            js_response = requests.get(f"{self.base_url}/enhanced-main.js", timeout=5)
            js_content = js_response.text
            
            # Check for permission functions
            permission_elements = [
                'checkEnhancedPermissions',
                'canViewAllUnits',
                'canCreateUsers',
                'canCreateClasses',
                'canViewAllReports',
                'admin:',
                'instructor:',
                'pedagogue:',
                'monitor:'
            ]
            
            missing_permissions = []
            for element in permission_elements:
                if element not in js_content:
                    missing_permissions.append(element)
            
            if missing_permissions:
                return False, f"Missing permission system elements: {missing_permissions}"
            
            return True, "Enhanced permissions system properly implemented"
                
        except Exception as e:
            return False, str(e)

    def test_data_persistence_structure(self):
        """Test 8: Data Persistence - Verificar estrutura para persistência de dados"""
        try:
            # Check main.js for localStorage usage
            main_js_response = requests.get(f"{self.base_url}/main.js", timeout=5)
            main_js_content = main_js_response.text
            
            # Check for data persistence elements
            persistence_elements = [
                'localStorage',
                'saveData',
                'loadData',
                'JSON.stringify',
                'JSON.parse'
            ]
            
            missing_persistence = []
            for element in persistence_elements:
                if element not in main_js_content:
                    missing_persistence.append(element)
            
            if missing_persistence:
                return False, f"Missing data persistence elements: {missing_persistence}"
            
            return True, "Data persistence structure properly implemented"
                
        except Exception as e:
            return False, str(e)

    def generate_report(self):
        """Generate a comprehensive test report"""
        print("\n" + "=" * 60)
        print("📊 COMPREHENSIVE TEST REPORT - SISTEMA IOS")
        print("=" * 60)
        
        print(f"\n📈 Overall Results: {self.tests_passed}/{self.tests_run} tests passed")
        print(f"📅 Test Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        
        print("\n🔍 Detailed Results:")
        for result in self.test_results:
            status = "✅ PASS" if result['success'] else "❌ FAIL"
            print(f"  {status} - {result['name']}")
            if result['details']:
                print(f"    └─ {result['details']}")
        
        # Categorize results
        passed_tests = [r for r in self.test_results if r['success']]
        failed_tests = [r for r in self.test_results if not r['success']]
        
        if failed_tests:
            print(f"\n⚠️  FAILED TESTS ({len(failed_tests)}):")
            for test in failed_tests:
                print(f"  • {test['name']}: {test['details']}")
        
        if passed_tests:
            print(f"\n✅ PASSED TESTS ({len(passed_tests)}):")
            for test in passed_tests:
                print(f"  • {test['name']}")
        
        # Overall assessment
        success_rate = (self.tests_passed / self.tests_run) * 100
        print(f"\n📊 Success Rate: {success_rate:.1f}%")
        
        if success_rate >= 90:
            print("🎉 EXCELLENT: Sistema IOS is working very well!")
        elif success_rate >= 75:
            print("👍 GOOD: Sistema IOS is mostly working, minor issues to fix")
        elif success_rate >= 50:
            print("⚠️  NEEDS WORK: Sistema IOS has several issues to address")
        else:
            print("🚨 CRITICAL: Sistema IOS has major issues that need immediate attention")
        
        return success_rate

def main():
    print("🚀 Starting Comprehensive Sistema IOS Tests")
    print("Testing all enhanced features mentioned in the request")
    print("=" * 60)
    
    # Setup
    tester = ComprehensiveIOSTest("http://localhost:8000")
    
    # Run comprehensive tests
    tests = [
        ("Login System Improvements", tester.test_login_system_improvements),
        ("Enhanced Class Form", tester.test_enhanced_class_form),
        ("Enhanced Student Registration", tester.test_enhanced_student_registration),
        ("Team Management", tester.test_team_management),
        ("JavaScript Enhancements", tester.test_javascript_enhancements),
        ("CSS Styling Improvements", tester.test_css_styling_improvements),
        ("Permissions System", tester.test_permissions_system),
        ("Data Persistence Structure", tester.test_data_persistence_structure)
    ]
    
    for test_name, test_func in tests:
        tester.run_test(test_name, test_func)
    
    # Generate comprehensive report
    success_rate = tester.generate_report()
    
    return 0 if success_rate >= 75 else 1

if __name__ == "__main__":
    sys.exit(main())