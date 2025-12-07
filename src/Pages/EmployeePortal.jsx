const EmployeePortal = () => {
  const buttons = [
    { label: "View Payslip", icon: "💰" },
    { label: "Check Leave Balance", icon: "📅" },
    { label: "View Attendance", icon: "🕒" },
    { label: "Update Profile", icon: "👤" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100">
      <Navbar />
      
      <div className="pt-16 px-8">
        <h1 className="text-5xl md:text-6xl font-bold text-pink-700 text-center mb-16 mt-12">
          Employee Self - Service portal
        </h1>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6">
          {buttons.map((btn, index) => (
            <button
              key={index}
              className="bg-white text-xl font-semibold text-gray-800 py-12 px-10 rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 border-pink-100 flex items-center justify-center gap-4"
            >
              <span className="text-4xl">{btn.icon}</span>
              <span>{btn.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeePortal;