/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
const j = {firstname: "Julius", familyName: "Caesar", title: "general", payPerHour: 3, timeInEvents: [], timeOutEvents: []}
const dateStamp = "YYYY-MM-DD 1700"


const createEmployeeRecord = ([firstName, familyName, title, payPerHour]) => {
    return Object.assign({}, {firstName, familyName, title, payPerHour, timeInEvents: [], timeOutEvents: []})
};

let bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3])

const createEmployeeRecords = arrayOfArrays => arrayOfArrays.map(el => createEmployeeRecord(el));


const createTimeInEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(" ")
    hour = parseInt(hour)
    this.timeInEvents.push({
        type: "TimeIn", 
        date, 
        hour
    })
    return this;
};

const createTimeOutEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(" ")
    hour = parseInt(hour)
    this.timeOutEvents.push({
        type: "TimeOut", 
        date, 
        hour
    })
    return this;
};

const hoursWorkedOnDate = function(givenDate){
    const startHour = this.timeInEvents.find(el => el.date === givenDate).hour
    const endHour = this.timeOutEvents.find(el => el.date === givenDate).hour
    return (endHour - startHour)/100
};

const wagesEarnedOnDate = function(givenDate){
    return (hoursWorkedOnDate.call(this, givenDate) * this.payPerHour)
};

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
};

const findEmployeeByFirstName = function(array, name){
    return array.find(el => el.firstName === name);
};

const calculatePayroll = function(arrayOfEmployees){
    const totalPayOut = arrayOfEmployees.reduce((total, employee) => total + allWagesFor.call(employee), 0)
    return totalPayOut
};