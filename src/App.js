import React, { useState, useEffect, createContext, useContext, Fragment } from 'react';
import { marked } from 'marked'; // Assuming 'marked' library is installed for markdown parsing

// --- Context for managing application-wide state ---
const AppContext = createContext();

// --- App Provider Component ---
function AppProvider({ children }) {
  // --- STATE MANAGEMENT ---
  const [employees, setEmployees] = useState([
    {
      id: 1011, name: 'Muhammad Ali', email: 'muhammad.ali@example.com', phone: '0300-1234567',
      address: 'House 1, Street 5, Sector D, Islamabad', dob: '1985-05-20', gender: 'Male',
      nationalId: '42201-1234567-1', photoUrl: 'https://placehold.co/200x200/E2E8F0/4A5568?text=M.A',
      department: 'Operations', jobTitle: 'Supervisor', joiningDate: '2020-03-15', resignDate: null,
      qualification: 'MBA Operations',
      attendance: [
        { date: '2025-06-14', status: 'Present', checkInTime: '09:00', checkOutTime: '17:00' },
        { date: '2025-06-15', status: 'Present', checkInTime: '09:05', checkOutTime: '17:15' },
        { date: '2025-06-16', status: 'Present', checkInTime: '08:55', checkOutTime: '16:50' }
      ],
      payroll: { salary: 50000, perks: 5000, tax: 2500, net: 52500 },
      leaves: [{ type: 'Annual', days: 5, status: 'Approved' }],
      performance: [{ month: 'Mar', score: 85 }, { month: 'Apr', score: 88 }, { month: 'May', score: 92 }],
    },
    {
      id: 1012, name: 'Aisha Khan', email: 'aisha.khan@example.com', phone: '0333-9876543',
      address: 'Flat 20, Block A, Defence, Lahore', dob: '1990-11-01', gender: 'Female',
      nationalId: '35202-9876543-2', photoUrl: 'https://placehold.co/200x200/E2E8F0/4A5568?text=A.K',
      department: 'IT', jobTitle: 'IT Manager', joiningDate: '2021-07-01', resignDate: null,
      qualification: 'BS Computer Science',
      attendance: [
        { date: '2025-06-14', status: 'Present', checkInTime: '09:10', checkOutTime: '17:00' },
        { date: '2025-06-15', status: 'Present', checkInTime: '09:00', checkOutTime: '17:30' },
        { date: '2025-06-16', status: 'Leave' }
      ],
      payroll: { salary: 70000, perks: 10000, tax: 5000, net: 75000 },
      leaves: [{ type: 'Sick', days: 2, status: 'Approved' }],
      performance: [{ month: 'Mar', score: 78 }, { month: 'Apr', score: 80 }, { month: 'May', score: 85 }],
    },
    {
      id: 1013, name: 'Faisal Mehmood', email: 'faisal.m@example.com', phone: '0321-5551122',
      address: 'Plot 3, Phase 7, DHA, Karachi', dob: '1995-02-14', gender: 'Male',
      nationalId: '42101-5551122-3', photoUrl: 'https://placehold.co/200x200/E2E8F0/4A5568?text=F.M',
      department: 'Production', jobTitle: 'Machine In-charge', joiningDate: '2022-01-20', resignDate: null,
      qualification: 'DAE Mechanical',
      attendance: [
        { date: '2025-06-14', status: 'Present', checkInTime: '08:45', checkOutTime: '16:55' },
        { date: '2025-06-15', status: 'Present', checkInTime: '08:50', checkOutTime: '17:00' },
        { date: '2025-06-16', status: 'Present', checkInTime: '09:00', checkOutTime: '17:05' }
      ],
      payroll: { salary: 38000, perks: 2000, tax: 1000, net: 39000 },
      leaves: [],
      performance: [{ month: 'Mar', score: 90 }, { month: 'Apr', score: 91 }, { month: 'May', score: 89 }],
    },
     {
      id: 1014, name: 'Sara Ahmed', email: 'sara.a@example.com', phone: '0345-4443333',
      address: 'Street 10, Block C, Garden Town, Rawalpindi', dob: '1988-07-07', gender: 'Female',
      nationalId: '37405-4443333-4', photoUrl: 'https://placehold.co/200x200/E2E8F0/4A5568?text=S.A',
      department: 'HR', jobTitle: 'HR Executive', joiningDate: '2019-11-10', resignDate: null,
      qualification: 'MS Human Resources',
      attendance: [
        { date: '2025-06-14', status: 'Present', checkInTime: '09:00', checkOutTime: '17:00' },
        { date: '2025-06-15', status: 'Present', checkInTime: '09:00', checkOutTime: '17:00' },
        { date: '2025-06-16', status: 'Present', checkInTime: '09:00', checkOutTime: '17:00' }
      ],
      payroll: { salary: 60000, perks: 5000, tax: 4000, net: 61000 },
      leaves: [],
      performance: [{ month: 'Mar', score: 95 }, { month: 'Apr', score: 93 }, { month: 'May', score: 96 }],
    },
    {
      id: 1015, name: 'Usman Ghani', email: 'usman.g@example.com', phone: '0313-7778899',
      address: 'Sector F-8, Blue Area, Islamabad', dob: '1992-09-25', gender: 'Male',
      nationalId: '61101-7778899-5', photoUrl: 'https://placehold.co/200x200/E2E8F0/4A5568?text=U.G',
      department: 'Marketing', jobTitle: 'Marketing Coordinator', joiningDate: '2023-04-01', resignDate: '2024-02-28',
      qualification: 'BBA Marketing',
      attendance: [],
      payroll: { salary: 45000, perks: 4000, tax: 2000, net: 47000 },
      leaves: [],
      performance: [],
    },
  ]);

  const [tasks, setTasks] = useState([
    {
      id: 1, title: 'Complete Q2 Sales Report', description: 'Gather all sales data for Q2 and prepare a comprehensive report.',
      assignedTo: 1011, dueDate: '2025-06-30', status: 'In Progress',
    },
    {
      id: 2, title: 'Setup New IT Infrastructure', description: 'Install and configure new servers and networking equipment.',
      assignedTo: 1012, dueDate: '2025-07-15', status: 'Pending',
    },
    {
      id: 3, title: 'Oversee Machine Maintenance', description: 'Ensure routine maintenance is performed on all production machinery.',
      assignedTo: 1013, dueDate: '2025-06-25', status: 'Completed',
    },
    {
      id: 4, title: 'Draft Employee Handbook Update', description: 'Review and update company employee handbook with new policies.',
      assignedTo: 1014, dueDate: '2025-07-10', status: 'Overdue',
    },
  ]);

  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageModalContent, setMessageModalContent] = useState('');

  // --- State Management Functions ---
  const addEmployee = (newEmployee) => {
    setEmployees(prev => {
      const maxId = prev.length > 0 ? Math.max(...prev.map(e => e.id)) : 1010;
      return [...prev, { ...newEmployee, id: maxId + 1 }];
    });
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees(prev => prev.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp));
  };

  const deleteEmployee = (id) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  const addATask = (newTask) => {
    setTasks(prev => [...prev, { ...newTask, id: prev.length > 0 ? Math.max(...prev.map(t => t.id)) + 1 : 1 }]);
  };

  const updateATask = (updatedTask) => {
    setTasks(prev => prev.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const deleteATask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <AppContext.Provider value={{
      employees, setEmployees, addEmployee, updateEmployee, deleteEmployee,
      tasks, addATask, updateATask, deleteATask,
      showMessageModal, setShowMessageModal, messageModalContent, setMessageModalContent,
    }}>
      {children}
    </AppContext.Provider>
  );
}

// --- Main App Component ---
function MainApp() {
  const { showMessageModal, setShowMessageModal, messageModalContent, setMessageModalContent } = useContext(AppContext);

  const [activeView, setActiveView] = useState('roleSelect');
  const [isSubscriptionActive, setIsSubscriptionActive] = useState(false);
  const [monthlyAccessCode, setMonthlyAccessCode] = useState('');
  const [expectedMonthlyCode, setExpectedMonthlyCode] = useState('');
  const [adminViewActiveSubTab, setAdminViewActiveSubTab] = useState('dashboard');

  useEffect(() => {
    const checkSubscriptionAndGenerateCode = () => {
      const now = new Date();
      const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      const currentMonthAbbr = monthNames[now.getMonth()];
      const currentYear = now.getFullYear();
      const generatedCode = `${currentMonthAbbr}-${currentYear}-PROAPP`;
      setExpectedMonthlyCode(generatedCode);
    };
    checkSubscriptionAndGenerateCode();
  }, []);

  const validateAccessCode = () => {
    if (monthlyAccessCode === expectedMonthlyCode) {
      setIsSubscriptionActive(true);
      setShowMessageModal(true);
      setMessageModalContent('Access code accepted! You now have full administrative access.');
      setActiveView('adminApp');
      setAdminViewActiveSubTab('dashboard');
    } else {
      setShowMessageModal(true);
      setMessageModalContent('Invalid access code. Please check and try again, or contact support.');
      setIsSubscriptionActive(false);
    }
  };

  // --- HEADER RENDERING (Client Orders Removed) ---
  const renderHeader = () => {
    if (activeView === 'roleSelect' || activeView === 'adminAccessCheck') {
      return (
        <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 shadow-lg">
          <div className="container mx-auto flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Company Management System</h1>
            {activeView === 'adminAccessCheck' && (
              <button
                onClick={() => {
                  setActiveView('roleSelect');
                  setMonthlyAccessCode('');
                }}
                className="py-2 px-4 rounded-md transition-all duration-300 bg-red-600 hover:bg-red-700"
              >
                Back to Role Selection
              </button>
            )}
          </div>
        </header>
      );
    } else if (activeView === 'adminApp') {
      return (
        <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 shadow-lg">
          <div className="container mx-auto flex items-center justify-start">
            <h1 className="text-3xl font-bold tracking-tight mr-8">Admin Dashboard</h1>
            
            <nav className="flex items-center space-x-4">
              {['dashboard', 'employees', 'tasks', 'ai-reports'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setAdminViewActiveSubTab(tab)}
                  className={`py-2 px-4 rounded-md transition-all duration-300 text-sm font-medium ${adminViewActiveSubTab === tab ? 'bg-blue-800 shadow-inner' : 'hover:bg-blue-700'}`}
                >
                  {tab.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </button>
              ))}
            </nav>

            <div className="ml-auto flex items-center space-x-4">
              <SubscriptionStatus
                isSubscriptionActive={isSubscriptionActive}
                onRenewClick={() => {
                   setShowMessageModal(true);
                   setMessageModalContent('Please contact support for a new access code after renewing your subscription.');
                }}
              />
              <button
                onClick={() => {
                  setActiveView('roleSelect');
                  setAdminViewActiveSubTab('dashboard');
                }}
                className="py-2 px-4 rounded-md transition-all duration-300 bg-red-600 hover:bg-red-700 text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </header>
      );
    } else if (activeView === 'employeeKiosk') {
      return (
        <header className="bg-gradient-to-r from-green-600 to-teal-700 text-white p-4 shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight">Employee Attendance Kiosk</h1>
            <button
              onClick={() => setActiveView('roleSelect')}
              className="py-2 px-4 rounded-md transition-all duration-300 bg-gray-500 hover:bg-gray-600"
            >
              Back to Role Selection
            </button>
          </div>
        </header>
      );
    }
    return null;
  };
  
  const renderMainContent = () => {
    if (activeView === 'roleSelect') {
      return (
        <div className="flex flex-col items-center justify-center min-h-[500px]">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-8">Welcome to Company Management System</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <button onClick={() => setActiveView('adminAccessCheck')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 shadow-md text-xl"
            > Access as Admin </button>
            <button onClick={() => setActiveView('employeeKiosk')}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 shadow-md text-xl"
            > Access as Employee </button>
          </div>
        </div>
      );
    }

    if (activeView === 'adminAccessCheck' && !isSubscriptionActive) {
      return (
        <div className="text-center p-8 min-h-[500px] flex flex-col justify-center items-center">
          <h2 className="text-4xl font-extrabold text-red-700 mb-6">Admin Access Restricted</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"> Your monthly subscription is currently inactive. Please enter a valid monthly access code to proceed. </p>
          <div className="flex flex-col items-center gap-4">
            <input type="text" placeholder="Enter Monthly Access Code"
              className="p-3 border border-gray-300 rounded-md shadow-sm w-full max-w-sm text-center text-lg"
              value={monthlyAccessCode}
              onChange={(e) => setMonthlyAccessCode(e.target.value.toUpperCase())}
              onKeyPress={(e) => { if (e.key === 'Enter') validateAccessCode(); }}
            />
            <button onClick={validateAccessCode}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-md text-lg"
            > Submit Code </button>
            <p className="text-sm text-gray-500 mt-2"> (For demo: The code for this month is "<span className="font-bold text-gray-700">{expectedMonthlyCode}</span>") </p>
          </div>
        </div>
      );
    }

    if (activeView === 'adminApp' || (activeView === 'adminAccessCheck' && isSubscriptionActive)) {
      if (activeView === 'adminAccessCheck' && isSubscriptionActive) {
        setActiveView('adminApp');
        setAdminViewActiveSubTab('dashboard');
      }

      switch (adminViewActiveSubTab) {
        case 'employees': return <Employees isSubscriptionActive={isSubscriptionActive} />;
        case 'tasks': return <TaskManagement isSubscriptionActive={isSubscriptionActive} />;
        case 'ai-reports': return <AIReportGenerator isSubscriptionActive={isSubscriptionActive} />;
        case 'dashboard': default: return <Dashboard setActiveView={setAdminViewActiveSubTab} />;
      }
    }

    if (activeView === 'employeeKiosk') {
      return <EmployeeAttendanceKiosk isSubscriptionActive={isSubscriptionActive} />;
    }
    return null;
  };
  
  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased flex flex-col">
      {renderHeader()}
      <main className="container mx-auto p-6 flex-grow">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {renderMainContent()}
        </div>
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center text-sm">
        <div className="container mx-auto"> &copy; {new Date().getFullYear()} Company App. All rights reserved. </div>
      </footer>
      {showMessageModal && (
        <MessageModal content={messageModalContent} onClose={() => setShowMessageModal(false)} />
      )}
    </div>
  );
}

// --- Dashboard Component (Client Orders Removed) ---
function Dashboard({ setActiveView }) {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-6">Welcome to Your Company Management System</h2>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"> Effortlessly manage your employees, tasks, and client orders with our intuitive and powerful application. </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard title="Employee Management" description="View and manage employee profiles, attendance, and performance." icon="👥" onClick={() => setActiveView('employees')} />
        <DashboardCard title="Task Management" description="Assign and track tasks, monitor completion status, and manage deadlines." icon="✅" onClick={() => setActiveView('tasks')} />
        <DashboardCard title="AI Performance Reports" description="Generate AI-powered insights and reports on employee performance." icon="🤖" onClick={() => setActiveView('ai-reports')} />
      </div>
    </div>
  );
}

// --- Reusable Dashboard Card Component ---
function DashboardCard({ title, description, icon, onClick }) {
  return (
    <div
      className="bg-white rounded-xl shadow-md p-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer flex flex-col items-center text-center border border-gray-200"
      onClick={onClick}
    >
      <div className="text-5xl mb-4" role="img" aria-label={title}>{icon}</div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}


// --- Employees Component (Admin View) ---
function Employees({ isSubscriptionActive }) {
  const { employees, addEmployee, updateEmployee, deleteEmployee, setMessageModalContent, setShowMessageModal } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('All');
  const [filterJobTitle, setFilterJobTitle] = useState('All');
  const [showActiveEmployees, setShowActiveEmployees] = useState(true);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [viewingEmployee, setViewingEmployee] = useState(null);

  const departments = [...new Set(employees.map(emp => emp.department))];
  const jobTitles = [...new Set(employees.map(emp => emp.jobTitle))];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'All' || employee.department === filterDepartment;
    const matchesJobTitle = filterJobTitle === 'All' || employee.jobTitle === filterJobTitle;
    const matchesActiveStatus = showActiveEmployees ? employee.resignDate === null : employee.resignDate !== null;
    return matchesSearch && matchesDepartment && matchesJobTitle && matchesActiveStatus;
  });

  const handleSaveEmployee = (employeeData) => {
    if (editingEmployee) {
      updateEmployee(employeeData);
      setMessageModalContent('Employee updated successfully!');
    } else {
      addEmployee(employeeData);
      setMessageModalContent('Employee added successfully!');
    }
    setShowAddEditModal(false);
    setShowMessageModal(true);
  };

  const handleDeleteEmployee = (id) => {
    setMessageModalContent(
      <div>
        <p>Are you sure you want to delete this employee?</p>
        <div className="flex justify-end gap-2 mt-4">
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md" onClick={() => setShowMessageModal(false)}> Cancel </button>
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md"
            onClick={() => {
              deleteEmployee(id);
              setShowMessageModal(false);
              setMessageModalContent('Employee deleted successfully!');
              setShowMessageModal(true);
            }}
          > Delete </button>
        </div>
      </div>
    );
    setShowMessageModal(true);
  };

  const handleOpenModal = (employee = null) => {
    if (!isSubscriptionActive) {
      setMessageModalContent('Subscription Expired! Please renew to manage employees.');
      setShowMessageModal(true);
      return;
    }
    setEditingEmployee(employee);
    setShowAddEditModal(true);
  };
  
  const handleViewDetails = (employee) => {
    setViewingEmployee(employee);
    setShowDetailModal(true);
  };

  return (
    <div className="relative">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Employee Database</h2>
      {!isSubscriptionActive && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Subscription Expired!</strong>
          <span className="block sm:inline ml-2"> Some actions may be disabled.</span>
        </div>
      )}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <button className={`bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 shadow-md ${!isSubscriptionActive ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => handleOpenModal()} disabled={!isSubscriptionActive}> Add New Employee </button>
        <input type="text" placeholder="Search..." className="p-2 border border-gray-300 rounded-md shadow-sm flex-grow min-w-[200px]"
          value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <select className="p-2 border border-gray-300 rounded-md shadow-sm" value={filterDepartment} onChange={(e) => setFilterDepartment(e.target.value)}>
          <option value="All">All Departments</option>
          {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
        </select>
        <select className="p-2 border border-gray-300 rounded-md shadow-sm" value={filterJobTitle} onChange={(e) => setFilterJobTitle(e.target.value)}>
          <option value="All">All Job Titles</option>
          {jobTitles.map(title => <option key={title} value={title}>{title}</option>)}
        </select>
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded" checked={showActiveEmployees} onChange={(e) => setShowActiveEmployees(e.target.checked)} />
          <span className="text-gray-700">Show Active</span>
        </label>
      </div>
      <div className="overflow-x-auto">
        {filteredEmployees.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No employees found.</p>
        ) : (
          <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 uppercase">ID</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 uppercase">Name</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 uppercase">Department</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 uppercase">Job Title</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 uppercase">Status</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map(employee => (
                <tr key={employee.id} className="border-b border-gray-200 last:border-0 hover:bg-gray-50">
                  <td className="py-4 px-6 text-sm text-gray-800">{employee.id}</td>
                  <td className="py-4 px-6 text-sm text-gray-800">{employee.name}</td>
                  <td className="py-4 px-6 text-sm text-gray-800">{employee.department}</td>
                  <td className="py-4 px-6 text-sm text-gray-800">{employee.jobTitle}</td>
                  <td className="py-4 px-6 text-sm">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${employee.resignDate === null ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {employee.resignDate === null ? 'Active' : 'Resigned'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm space-x-2">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md" onClick={() => handleViewDetails(employee)}>View</button>
                    <button className={`bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md ${!isSubscriptionActive ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => handleOpenModal(employee)} disabled={!isSubscriptionActive}>Edit</button>
                    <button className={`bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md ${!isSubscriptionActive ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => handleDeleteEmployee(employee.id)} disabled={!isSubscriptionActive}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {showAddEditModal && <EmployeeFormModal employee={editingEmployee} onSave={handleSaveEmployee} onClose={() => setShowAddEditModal(false)} />}
      {showDetailModal && viewingEmployee && <EmployeeDetailModal employee={viewingEmployee} onClose={() => setShowDetailModal(false)} isSubscriptionActive={isSubscriptionActive} />}
    </div>
  );
}

// --- EmployeeFormModal Component (Updated) ---
function EmployeeFormModal({ employee, onSave, onClose }) {
  const [formData, setFormData] = useState(
    employee || {
      name: '', email: '', phone: '', address: '', dob: '', gender: '',
      nationalId: '', photoUrl: '', department: '',
      jobTitle: '', joiningDate: '', resignDate: '', qualification: '',
      attendance: [], payroll: { salary: '', perks: '', tax: '' },
      leaves: [], performance: [],
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('payroll.')) {
      const payrollField = name.split('.')[1];
      setFormData(prev => ({ ...prev, payroll: { ...prev.payroll, [payrollField]: value === '' ? '' : Number(value) } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const netPayroll = (Number(formData.payroll.salary) || 0) + (Number(formData.payroll.perks) || 0) - (Number(formData.payroll.tax) || 0);
    onSave({ ...formData, payroll: { ...formData.payroll, net: netPayroll } });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">{employee ? 'Edit Employee' : 'Add New Employee'}</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Personal Information Section */}
          <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-md">
            <legend className="text-lg font-semibold px-2">Personal Information</legend>
            <FormInput label="Name" name="name" value={formData.name} onChange={handleChange} required />
            <FormInput label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            <FormInput label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
            <FormInput label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} />
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3">
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <FormInput label="National ID Number" name="nationalId" value={formData.nationalId} onChange={handleChange} />
            <FormInput label="Photo URL" name="photoUrl" value={formData.photoUrl} onChange={handleChange} />
            <div className="md:col-span-2">
                <FormInput label="Address" name="address" value={formData.address} onChange={handleChange} />
            </div>
          </fieldset>

          {/* Job Information Section */}
          <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-md">
            <legend className="text-lg font-semibold px-2">Job Information</legend>
            <FormInput label="Department" name="department" value={formData.department} onChange={handleChange} required />
            <FormInput label="Job Title" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />
            <FormInput label="Qualification" name="qualification" value={formData.qualification} onChange={handleChange} />
            <FormInput label="Joining Date" name="joiningDate" type="date" value={formData.joiningDate} onChange={handleChange} required />
            <FormInput label="Resign Date (Optional)" name="resignDate" type="date" value={formData.resignDate || ''} onChange={handleChange} />
          </fieldset>

           {/* Payroll Information Section */}
          <fieldset className="border p-4 rounded-md">
            <legend className="text-lg font-semibold px-2">Payroll Details</legend>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormInput label="Salary" name="payroll.salary" type="number" value={formData.payroll.salary} onChange={handleChange} />
              <FormInput label="Perks" name="payroll.perks" type="number" value={formData.payroll.perks} onChange={handleChange} />
              <FormInput label="Tax" name="payroll.tax" type="number" value={formData.payroll.tax} onChange={handleChange} />
            </div>
          </fieldset>
          
          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md">Cancel</button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">{employee ? 'Save Changes' : 'Add Employee'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const FormInput = ({ label, ...props }) => (
  <div>
    <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
    <input {...props} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
  </div>
);


// --- Employee Detail Modal (Updated with Error Handling) ---
function EmployeeDetailModal({ employee, onClose, isSubscriptionActive }) {
  const { tasks, setMessageModalContent, setShowMessageModal } = useContext(AppContext);
  const [aiInsight, setAiInsight] = useState('');
  const [isLoadingAiInsight, setIsLoadingAiInsight] = useState(false);
  
  const generateAIInsight = async () => {
    if (!isSubscriptionActive) {
      setMessageModalContent('Subscription is expired. Renew to use AI features.');
      setShowMessageModal(true);
      return;
    }
    setIsLoadingAiInsight(true);
    setAiInsight('');
    const employeeTasks = tasks.filter(task => task.assignedTo === employee.id);
    const prompt = `Provide concise, actionable performance insights for ${employee.name} (${employee.jobTitle}). Based on performance: ${JSON.stringify(employee.performance)}, attendance: ${JSON.stringify(employee.attendance)}, and tasks: ${JSON.stringify(employeeTasks)}.`; 

    try {
      let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
      const payload = { contents: chatHistory };
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY; 
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      if (!response.ok) {
          console.error("API Error Response:", result);
          const errorMessage = result?.error?.message || 'The API returned an error.';
          setAiInsight(`Error from AI service: ${errorMessage}`);
          return;
      }

      if (result.candidates && result.candidates[0]?.content?.parts?.[0]?.text) {
        setAiInsight(result.candidates[0].content.parts[0].text);
      } else {
        console.error("Unexpected API Response:", result);
        const blockReason = result.promptFeedback?.blockReason;
        if (blockReason) {
            setAiInsight(`Content blocked by AI service. Reason: ${blockReason}`);
        } else {
            setAiInsight('Failed to generate AI insight. The AI returned an empty or unexpected response.');
        }
      }
    } catch (error) {
      console.error('Fetch Error generating AI insight:', error);
      setAiInsight('A network or other error occurred while contacting the AI service. Please check the browser console for details.');
    } finally {
      setIsLoadingAiInsight(false);
    }
  };

  return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                  <h3 className="text-3xl font-bold text-gray-800">{employee.name}'s Profile</h3>
                  <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
              </div>

              {/* Main Profile Area */}
              <div className="flex flex-col md:flex-row gap-8">
                  {/* Left Column: Photo and Identity */}
                  <div className="flex-shrink-0 md:w-1/3 text-center">
                      <img 
                          src={employee.photoUrl} 
                          alt={`${employee.name}'s profile`} 
                          className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-gray-300 shadow-md"
                          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/200x200/E2E8F0/4A5568?text=Photo'; }}
                      />
                       <div className="mt-4 text-left bg-blue-50 p-4 rounded-lg">
                            <h4 className="text-xl font-semibold text-blue-800 mb-3">Identity</h4>
                            <p><strong>ID:</strong> {employee.id}</p>
                            <p><strong>Email:</strong> {employee.email}</p>
                            <p><strong>Phone:</strong> {employee.phone}</p>
                            <p><strong>Address:</strong> {employee.address}</p>
                            <p><strong>National ID:</strong> {employee.nationalId}</p>
                       </div>
                  </div>

                  {/* Right Column: Job, Payroll, and other details */}
                  <div className="flex-grow space-y-6">
                       <DetailCard title="Job & Department" color="yellow">
                            <p><strong>Department:</strong> {employee.department}</p>
                            <p><strong>Job Title:</strong> {employee.jobTitle}</p>
                            <p><strong>Joining Date:</strong> {employee.joiningDate}</p>
                             <p><strong>Qualification:</strong> {employee.qualification || 'N/A'}</p>
                       </DetailCard>

                       <DetailCard title="Payroll Breakdown" color="purple">
                           <p><strong>Salary:</strong> Rs. {employee.payroll?.salary?.toLocaleString() || '0'}</p>
                           <p><strong>Perks:</strong> Rs. {employee.payroll?.perks?.toLocaleString() || '0'}</p>
                           <p><strong>Tax:</strong> Rs. {employee.payroll?.tax?.toLocaleString() || '0'}</p>
                           <hr className="my-2 border-gray-300"/>
                           <p className="font-bold"><strong>Net Salary:</strong> Rs. {employee.payroll?.net?.toLocaleString() || '0'}</p>
                       </DetailCard>
                       
                        <DetailSection title="Assigned Tasks">
                             <p className="text-gray-500">No tasks assigned.</p>
                        </DetailSection>

                       <DetailSection title="AI Performance Insights">
                          <button onClick={generateAIInsight} disabled={isLoadingAiInsight || !isSubscriptionActive}
                              className={`bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ${!isSubscriptionActive || isLoadingAiInsight ? 'opacity-50 cursor-not-allowed' : ''}`}>
                              {isLoadingAiInsight ? 'Generating...' : 'Generate AI Insight'}
                          </button>
                          {aiInsight && <div className="mt-4 p-3 bg-white border rounded-md prose max-w-none" dangerouslySetInnerHTML={{ __html: marked.parse(aiInsight) }}></div>}
                      </DetailSection>
                  </div>
              </div>
          </div>
      </div>
  );
}

const DetailCard = ({ title, color, children }) => (
    <div className={`bg-${color}-50 p-4 rounded-lg shadow-sm border-l-4 border-${color}-500`}>
        <h4 className={`text-xl font-semibold text-${color}-800 mb-3`}>{title}</h4>
        <div className="space-y-1 text-sm text-gray-700">{children}</div>
    </div>
);

const DetailSection = ({ title, children }) => (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <h4 className="text-xl font-semibold text-gray-800 mb-3">{title}</h4>
        {children}
    </div>
);

// --- SubscriptionStatus Component ---
function SubscriptionStatus({ isSubscriptionActive, onRenewClick }) {
  return (
    <div className={`py-2 px-4 rounded-full text-xs font-semibold flex items-center shadow-inner ${isSubscriptionActive ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
      <span className="mr-2">{isSubscriptionActive ? '✅' : '❌'}</span>
      {isSubscriptionActive ? 'Active' : 'Expired'}
      {!isSubscriptionActive && (
        <button onClick={onRenewClick} className="ml-3 px-2 py-1 bg-white text-red-600 rounded-full hover:bg-gray-200 text-xs">Renew</button>
      )}
    </div>
  );
}

// --- Employee Attendance Kiosk Component (Restored) ---
function EmployeeAttendanceKiosk({ isSubscriptionActive }) {
    const { employees, setEmployees, setMessageModalContent, setShowMessageModal } = useContext(AppContext);
    const [employeeIdInput, setEmployeeIdInput] = useState('');
    const [currentEmployee, setCurrentEmployee] = useState(null);

    const getTodayDate = () => new Date().toISOString().slice(0, 10);
    const getCurrentTime = () => new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    const handleEmployeeIdSubmit = () => {
        if (!isSubscriptionActive) {
            setMessageModalContent('App subscription is expired. Please ask your administrator to renew.');
            setShowMessageModal(true);
            return;
        }

        const id = parseInt(employeeIdInput);
        const foundEmployee = employees.find(emp => emp.id === id && emp.resignDate === null);
        if (foundEmployee) {
            setCurrentEmployee(foundEmployee);
            setMessageModalContent(`Welcome, ${foundEmployee.name}!`);
            setShowMessageModal(true);
        } else {
            setMessageModalContent('Invalid Employee ID or employee is not active.');
            setShowMessageModal(true);
            setCurrentEmployee(null);
        }
    };

    const handleAttendanceAction = (action) => {
        if (!currentEmployee) return;

        const today = getTodayDate();
        const currentTime = getCurrentTime();
        
        const updatedEmployees = employees.map(emp => {
            if (emp.id === currentEmployee.id) {
                const newAttendance = [...emp.attendance];
                let todayRecord = newAttendance.find(att => att.date === today);

                if (action === 'checkIn') {
                    if (todayRecord && todayRecord.checkInTime) {
                         setMessageModalContent('You have already checked in today.');
                         setShowMessageModal(true);
                         return emp;
                    }
                    if (todayRecord) {
                        todayRecord.status = 'Present';
                        todayRecord.checkInTime = currentTime;
                    } else {
                        newAttendance.push({ date: today, status: 'Present', checkInTime: currentTime, checkOutTime: null });
                    }
                     setMessageModalContent(`Checked IN at ${currentTime}.`);
                     setShowMessageModal(true);
                } else if (action === 'checkOut') {
                    if (!todayRecord || !todayRecord.checkInTime) {
                        setMessageModalContent('You must check in before checking out.');
                        setShowMessageModal(true);
                        return emp;
                    }
                    if (todayRecord.checkOutTime) {
                         setMessageModalContent('You have already checked out today.');
                         setShowMessageModal(true);
                         return emp;
                    }
                    todayRecord.checkOutTime = currentTime;
                    setMessageModalContent(`Checked OUT at ${currentTime}.`);
                    setShowMessageModal(true);
                }
                return { ...emp, attendance: newAttendance };
            }
            return emp;
        });

        setEmployees(updatedEmployees);
        setCurrentEmployee(updatedEmployees.find(emp => emp.id === currentEmployee.id));
    };

    const todayAttendance = currentEmployee?.attendance.find(att => att.date === getTodayDate());

    return (
        <div className="text-center">
            <h2 className="text-4xl font-extrabold text-blue-800 mb-6">Employee Attendance Kiosk</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Please enter your Employee ID to check-in or check-out.</p>

            <div className="flex flex-col items-center gap-4 mb-8">
                <input
                    type="number"
                    placeholder="Enter Employee ID"
                    className="p-3 border border-gray-300 rounded-md shadow-sm w-full max-w-sm text-center text-lg"
                    value={employeeIdInput}
                    onChange={(e) => setEmployeeIdInput(e.target.value)}
                    onKeyPress={(e) => { if (e.key === 'Enter') handleEmployeeIdSubmit(); }}
                    disabled={!isSubscriptionActive}
                />
                <button
                    onClick={handleEmployeeIdSubmit}
                    className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-md ${!isSubscriptionActive ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!isSubscriptionActive}
                >
                    Verify ID
                </button>
            </div>

            {currentEmployee && (
                <div className="mt-8 p-6 bg-green-50 rounded-lg shadow-inner border border-green-200 w-full max-w-md mx-auto">
                    <h3 className="text-2xl font-semibold text-green-800 mb-4">Welcome, {currentEmployee.name}!</h3>
                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={() => handleAttendanceAction('checkIn')}
                            disabled={!currentEmployee || (todayAttendance && todayAttendance.checkInTime)}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-xl disabled:opacity-50"
                        >
                            Check In
                        </button>
                        <button
                             onClick={() => handleAttendanceAction('checkOut')}
                             disabled={!currentEmployee || !todayAttendance || !todayAttendance.checkInTime || todayAttendance.checkOutTime}
                             className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-lg text-xl disabled:opacity-50"
                        >
                            Check Out
                        </button>
                    </div>
                     {todayAttendance && (
                         <div className="mt-4 text-gray-700">
                             <p><strong>Status Today:</strong> {todayAttendance.status}</p>
                             <p><strong>Check In:</strong> {todayAttendance.checkInTime || 'N/A'}</p>
                             <p><strong>Check Out:</strong> {todayAttendance.checkOutTime || 'N/A'}</p>
                         </div>
                     )}
                </div>
            )}
        </div>
    );
}

// --- Task Management Component & TaskFormModal ---
function TaskManagement({ isSubscriptionActive }) {
    const { employees, tasks, addATask, updateATask, deleteATask, setMessageModalContent, setShowMessageModal } = useContext(AppContext);
    const [showAddEditTaskModal, setShowAddEditTaskModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const handleSaveTask = (taskData) => {
        if(editingTask) {
            updateATask(taskData);
            setMessageModalContent('Task updated successfully!');
        } else {
            addATask(taskData);
            setMessageModalContent('Task added successfully!');
        }
        setShowAddEditTaskModal(false);
        setShowMessageModal(true);
    };
    
    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Task Management</h2>
            <button 
                className={`bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md ${!isSubscriptionActive ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => {
                    if (!isSubscriptionActive) {
                        setMessageModalContent('Subscription Expired!');
                        setShowMessageModal(true);
                        return;
                    }
                    setEditingTask(null);
                    setShowAddEditTaskModal(true);
                }}
            >
                Add New Task
            </button>
            {showAddEditTaskModal && (
                <TaskFormModal 
                    task={editingTask}
                    onSave={handleSaveTask}
                    onClose={() => setShowAddEditTaskModal(false)}
                    employees={employees}
                />
            )}
        </div>
    );
}

function TaskFormModal({ task, onSave, onClose, employees }) {
    const [formData, setFormData] = useState(
        task || { title: '', description: '', assignedTo: '', dueDate: '', status: 'Pending' }
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">{task ? 'Edit Task' : 'Add New Task'}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormInput label="Title" name="title" value={formData.title} onChange={handleChange} required />
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="shadow appearance-none border rounded w-full py-2 px-3"></textarea>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Assigned To</label>
                        <select name="assignedTo" value={formData.assignedTo} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3" required>
                            <option value="">Select Employee</option>
                            {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
                        </select>
                    </div>
                    <FormInput label="Due Date" name="dueDate" type="date" value={formData.dueDate} onChange={handleChange} required />
                     <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
                        <select name="status" value={formData.status} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3">
                            <option>Pending</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                            <option>Overdue</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md">Cancel</button>
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">Save Task</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// --- AIReportGenerator Component (Updated with Error Handling) ---
function AIReportGenerator({ isSubscriptionActive }) {
    const { employees, tasks, setMessageModalContent, setShowMessageModal } = useContext(AppContext);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
    const [aiInsight, setAiInsight] = useState('');
    const [isLoadingAiInsight, setIsLoadingAiInsight] = useState(false);

    const handleGenerateReport = async () => {
        if (!isSubscriptionActive) {
            setMessageModalContent('App subscription is expired. Please renew to use AI features.');
            setShowMessageModal(true);
            return;
        }

        if (!selectedEmployeeId) {
            setMessageModalContent('Please select an employee to generate a report.');
            setShowMessageModal(true);
            return;
        }

        setIsLoadingAiInsight(true);
        setAiInsight('');

        const employee = employees.find(emp => emp.id === parseInt(selectedEmployeeId));
        if (!employee) {
            setAiInsight('Employee not found.');
            setIsLoadingAiInsight(false);
            return;
        }
        
        const employeeTasks = tasks.filter(task => task.assignedTo === employee.id);
        const prompt = `Generate a concise performance report for ${employee.name}. Based on performance: ${JSON.stringify(employee.performance)}, attendance: ${JSON.stringify(employee.attendance)}, and tasks: ${JSON.stringify(employeeTasks)}.`;

        try {
            let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
            const payload = { contents: chatHistory };
            const apiKey = "AIzaSyCQw_W7s0PJPiutb_LS606AHoUeca3Nyig";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            
            if (!response.ok) {
                console.error("API Error Response:", result);
                const errorMessage = result?.error?.message || 'The API returned an error.';
                setAiInsight(`Error from AI service: ${errorMessage}`);
                return;
            }

            if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
                setAiInsight(result.candidates[0].content.parts[0].text);
            } else {
                 console.error("Unexpected API Response:", result);
                const blockReason = result.promptFeedback?.blockReason;
                if (blockReason) {
                    setAiInsight(`Content blocked by AI service. Reason: ${blockReason}`);
                } else {
                    setAiInsight('Failed to generate AI insight. The AI returned an empty or unexpected response.');
                }
            }
        } catch (error) {
            console.error('Fetch Error generating AI insight:', error);
            setAiInsight('A network or other error occurred while contacting the AI service. Please check the browser console for details.');
        } finally {
            setIsLoadingAiInsight(false);
        }
    };

    return (
        <div className="relative p-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">AI Performance Report Generator</h2>
            {!isSubscriptionActive && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Subscription Expired!</strong>
                    <span className="block sm:inline ml-2"> Please renew to use AI features.</span>
                </div>
            )}
            <div className="mb-6 flex flex-wrap items-center gap-4 w-full">
                <select
                    className="p-2 border border-gray-300 rounded-md shadow-sm flex-grow min-w-[200px] text-base"
                    value={selectedEmployeeId}
                    onChange={(e) => setSelectedEmployeeId(e.target.value)}
                    disabled={!isSubscriptionActive}
                >
                    <option value="">Select Employee</option>
                    {employees.map(emp => (
                        <option key={emp.id} value={emp.id}>{emp.name} (ID: {emp.id})</option>
                    ))}
                </select>

                <button
                    onClick={handleGenerateReport}
                    disabled={isLoadingAiInsight || !isSubscriptionActive || !selectedEmployeeId}
                    className={`bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-md transition duration-300 shadow-md text-base ${!isSubscriptionActive || isLoadingAiInsight || !selectedEmployeeId ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isLoadingAiInsight ? 'Generating...' : 'Generate AI Insight Report'}
                </button>
            </div>
            {aiInsight && (
                <div className="mt-4 p-5 bg-white border border-purple-200 rounded-md shadow-md">
                    <h3 className="text-xl font-semibold text-purple-800 mb-3">Generated AI Insight:</h3>
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: marked.parse(aiInsight) }}></div>
                </div>
            )}
        </div>
    );
}

// --- Reusable Message Modal ---
function MessageModal({ content, onClose }) {
  const isConfirmation = typeof content !== 'string';
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm text-center">
        <div className="text-lg text-gray-800 mb-5">
          {isConfirmation ? content : <p>{content}</p>}
        </div>
        {!isConfirmation && (
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md" onClick={onClose}> Close </button>
        )}
      </div>
    </div>
  );
}


// Final wrapper to provide context to the main app
export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}