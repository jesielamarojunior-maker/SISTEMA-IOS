// Final Test Script for IOS Attendance System
// This script can be run in the browser console to test functionality

console.log("🧪 Starting Final Test of IOS Attendance System");

// Test 1: Check if system is loaded
function testSystemLoaded() {
    console.log("\n1️⃣ Testing System Load...");
    
    const checks = [
        { name: 'DataManager', exists: typeof window.dataManager !== 'undefined' },
        { name: 'Users Array', exists: Array.isArray(window.users) },
        { name: 'Units Array', exists: Array.isArray(window.units) },
        { name: 'Courses Array', exists: Array.isArray(window.courses) },
        { name: 'Classes Array', exists: Array.isArray(window.classes) },
        { name: 'Students Array', exists: Array.isArray(window.students) },
        { name: 'Attendance Object', exists: typeof window.attendance === 'object' }
    ];
    
    checks.forEach(check => {
        console.log(`${check.exists ? '✅' : '❌'} ${check.name}: ${check.exists ? 'OK' : 'MISSING'}`);
    });
    
    return checks.every(check => check.exists);
}

// Test 2: Check data initialization
function testDataInitialization() {
    console.log("\n2️⃣ Testing Data Initialization...");
    
    const dataCounts = {
        users: window.users?.length || 0,
        units: window.units?.length || 0,
        courses: window.courses?.length || 0,
        classes: window.classes?.length || 0,
        students: window.students?.length || 0
    };
    
    console.log("📊 Data Counts:");
    Object.entries(dataCounts).forEach(([key, count]) => {
        console.log(`   ${key}: ${count}`);
    });
    
    // Check if test users exist
    const testCredentials = [
        'admin@ios.org.br',
        'instrutor@ios.org.br', 
        'pedagogo@ios.org.br',
        'monitor@ios.org.br'
    ];
    
    console.log("\n👥 Test Users Check:");
    testCredentials.forEach(email => {
        const user = window.users?.find(u => u.email === email);
        console.log(`${user ? '✅' : '❌'} ${email}: ${user ? 'Found' : 'Missing'}`);
    });
    
    return dataCounts.users > 0 && dataCounts.units > 0;
}

// Test 3: Test login functionality
function testLoginFunctionality() {
    console.log("\n3️⃣ Testing Login Functionality...");
    
    // Test admin login
    const adminCredentials = {
        email: 'admin@ios.org.br',
        password: 'admin123',
        type: 'admin'
    };
    
    // Check if user exists in system
    const adminUser = window.users?.find(u => 
        u.email === adminCredentials.email && 
        u.password === adminCredentials.password &&
        u.type === adminCredentials.type
    );
    
    console.log(`${adminUser ? '✅' : '❌'} Admin user validation: ${adminUser ? 'PASS' : 'FAIL'}`);
    
    // Test other users
    const otherUsers = [
        { email: 'instrutor@ios.org.br', password: 'inst123', type: 'instructor' },
        { email: 'pedagogo@ios.org.br', password: 'ped123', type: 'pedagogue' },
        { email: 'monitor@ios.org.br', password: 'mon123', type: 'monitor' }
    ];
    
    otherUsers.forEach(cred => {
        const user = window.users?.find(u => 
            u.email === cred.email && 
            u.password === cred.password &&
            u.type === cred.type
        );
        console.log(`${user ? '✅' : '❌'} ${cred.type} login: ${user ? 'PASS' : 'FAIL'}`);
    });
    
    return adminUser !== undefined;
}

// Test 4: Test localStorage functionality
function testLocalStorage() {
    console.log("\n4️⃣ Testing LocalStorage...");
    
    const storageKey = 'ios_attendance_system';
    const storedData = localStorage.getItem(storageKey);
    
    if (storedData) {
        try {
            const parsed = JSON.parse(storedData);
            console.log("✅ LocalStorage data found and valid");
            console.log("📦 Stored data keys:", Object.keys(parsed));
            return true;
        } catch (e) {
            console.log("❌ LocalStorage data corrupted");
            return false;
        }
    } else {
        console.log("⚠️ No localStorage data found");
        return false;
    }
}

// Test 5: Test UI elements
function testUIElements() {
    console.log("\n5️⃣ Testing UI Elements...");
    
    const elements = [
        { id: 'loginScreen', name: 'Login Screen' },
        { id: 'mainSystem', name: 'Main System' },
        { id: 'usersTableBody', name: 'Users Table' },
        { id: 'unitsTableBody', name: 'Units Table' },
        { id: 'loginForm', name: 'Login Form' }
    ];
    
    elements.forEach(element => {
        const el = document.getElementById(element.id);
        console.log(`${el ? '✅' : '❌'} ${element.name}: ${el ? 'Found' : 'Missing'}`);
    });
    
    return elements.every(element => document.getElementById(element.id));
}

// Run all tests
function runAllTests() {
    console.log("🚀 Running Complete Test Suite...");
    
    const results = {
        systemLoaded: testSystemLoaded(),
        dataInitialized: testDataInitialization(),
        loginFunctional: testLoginFunctionality(),
        localStorageWorking: testLocalStorage(),
        uiElementsPresent: testUIElements()
    };
    
    console.log("\n📋 FINAL TEST RESULTS:");
    console.log("========================");
    Object.entries(results).forEach(([test, passed]) => {
        console.log(`${passed ? '✅' : '❌'} ${test}: ${passed ? 'PASS' : 'FAIL'}`);
    });
    
    const overallPass = Object.values(results).every(result => result);
    console.log(`\n🎯 OVERALL RESULT: ${overallPass ? '✅ PASS' : '❌ FAIL'}`);
    
    if (!overallPass) {
        console.log("\n🔧 Issues found that need attention:");
        Object.entries(results).forEach(([test, passed]) => {
            if (!passed) {
                console.log(`   - ${test}`);
            }
        });
    }
    
    return results;
}

// Auto-run tests if in browser
if (typeof window !== 'undefined') {
    // Wait for page to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(runAllTests, 1000);
        });
    } else {
        setTimeout(runAllTests, 1000);
    }
}

// Export for manual use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { runAllTests, testSystemLoaded, testDataInitialization, testLoginFunctionality };
}