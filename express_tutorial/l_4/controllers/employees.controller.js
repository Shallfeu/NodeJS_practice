const data = {
  employees: require('../models/emloyees.json'),
  setEmployees: function (data) {
    this.employees = data;
  },
};
const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const createNewEmloyee = (req, res) => {
  const newEmployee = {
    id: data.employees[data.employees.length - 1].id + 1 || 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res.status(400), json({ message: 'First and last names are required.' });
  }

  data.setEmployees([...data.employees, newEmployee]);
  res.status(201).json(data.employees);
};

const updateEmployee = (req, res) => {
  const employee = data.employees.find((emp) => emp.id === parseInt(req.body.id));

  if (!employee) {
    return res.status(400).json({ message: `Employee ID ${req.body.id} not found` });
  }
  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;

  const filteredArr = data.employees.filter((emp) => emp.id !== parseInt(req.body.id));
  const usortedArr = [...filteredArr, employee];
  data.setEmployees(usortedArr.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0)));
  res.json(data.employees);
};

const deleteEmployee = (req, res) => {
  const employee = data.employees.find((emp) => emp.id === parseInt(req.body.id));
  if (!employee) {
    return res.status(400).json({ message: `Employee ID ${req.body.id} not found` });
  }
  const filteredArr = data.employees.filter((emp) => emp.id !== parseInt(req.body.id));
  data.setEmployees([...filteredArr]);
  res.json(data.employees);
};

const getEmployee = (req, res) => {
  const employee = data.employees.find((emp) => emp.id === parseInt(req.params.id));
  if (!employee) return res.status(400).json({ message: `Employee ID ${req.params.id} not found` });
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  getEmployee,
  updateEmployee,
  createNewEmloyee,
  deleteEmployee,
};
