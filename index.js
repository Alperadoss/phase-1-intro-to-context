// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName: firstName,
    familyName: familyName,
    title: title,
    payPerHour: payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(inputArray) {
  return inputArray.map(function ([firstName, familyName, title, payPerHour]) {
    return createEmployeeRecord([firstName, familyName, title, payPerHour]);
  });
}

function createTimeInEvent(employee, dateStamp) {
  let [date, hour] = dateStamp.split(" ");
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date,
  });
  return employee;
}

function createTimeOutEvent(employee, dateStamp) {
  let [date, hour] = dateStamp.split(" ");
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date,
  });
  return employee;
}

function hoursWorkedOnDate(employee, currentDate) {
  let inEvent = employee.timeInEvents.find(function (e) {
    return e.date === currentDate;
  });

  let outEvent = employee.timeOutEvents.find(function (e) {
    return e.date === currentDate;
  });

  return (outEvent.hour - inEvent.hour) / 100;
}

function wagesEarnedOnDate(employee, currentDate) {
  let rawWage = hoursWorkedOnDate(employee, currentDate) * employee.payPerHour;
  return parseFloat(rawWage.toString());
}

function allWagesFor(employee) {
  let eligibleDates = employee.timeInEvents.map(function (e) {
    return e.date;
  });

  let payable = eligibleDates.reduce(function (memo, d) {
    return memo + wagesEarnedOnDate(employee, d);
  }, 0);

  return payable;
}

function calculatePayroll(arrayOfEmployeeRecords) {
  return arrayOfEmployeeRecords.reduce(function (memo, rec) {
    return memo + allWagesFor(rec);
  }, 0);
}
