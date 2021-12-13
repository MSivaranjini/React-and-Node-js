var express = require("express")
var route = express.Router();
var model = require('../orm/model')
const jwt = require("jsonwebtoken");
const sequelize = require("../orm/connection");

route.post("/signin", async function (request, response) {
   console.log(request);
   const { username, password } = request.body
   try {
      const user = await model.user.findOne({ where: { username: username } })
      let result = user.dataValues
console.log(result);
      if (result.password === password) {
         response.json(
            {
               username: username,
               usertype: result.role,
               token: jwt.sign({ username: username, password: password }, "node-app-22")
            }
         )
      }
      else
         response.status(401).send("Username or Password incorrect")
   }
   catch (e) {
      console.log(e)
      response.status(500)
   }

})

route.post("/manager", async function (request, response) {
   
   const manager=request.body.manager 
   console.log(manager);
   try {
      const employeeDetails = await model.skillmap.findAll({
         group: ['employee_id'],
         attributes: ['employee_id'],
         include: [{
            model: model.employee,
            attributes: ['employee_id','name', 'experience', 'manager'],
            required: true,
            where: { manager: manager, lockstatus: 'not_requested' }
         },
         {
            model: model.skill,
            attributes: [[sequelize.fn('GROUP_CONCAT', sequelize.col('skill.name')), 'skills']],
            require: true
         }]
      })
      var EmployeeList = [];
      employeeDetails.map(employee => {
         let employ = {
            EmployeeId: employee.dataValues.employee_id,
            Name: employee.dataValues.employee.name,
            Skills: employee.dataValues.skill.dataValues.skills,
            Experience: employee.dataValues.employee.experience,
            Manager: employee.dataValues.employee.manager
         }
         EmployeeList.push(employ)
      });
      if (EmployeeList.length > 0) {
         response.json(EmployeeList)
      }
      else
         response.status(401).send("Failed")
   }
   catch (e) {
      console.log(e)
      response.status(500)
   }
})

route.post("/updateEmployeeLockRequest", async function (request, response) {
   debugger;
   let employee_id = request.body.employee_id
   let manager = request.body.manager
   let requestmessage = 'Most Wanted!';
   try {
      let employee = await model.employee.findOne({ where: { employee_id: employee_id } })
      
      employee.lockstatus = 'request_waiting';
      await employee.save();
      await model.softlock.create({ employee_id: employee_id, manager: manager, requestmessage: requestmessage })
      await employee.reload();
      response.status(200)
      response.send("Employee request has sent successfully!")
   } catch (e) {
      console.log(e)
      response.status(500)
   }
 })

 route.post("/WfmmanagerList", async function (request, response) {
    
   try {
      let wfm_manager = request.body.manager;
      
      console.log('wfm:', wfm_manager);

      const manager_requests = await model.softlock.findAll({
        group: ['employee_id'],
         attributes: ['employee_id','reqdate','requestmessage','lockid'],
         required: true,
        
         include: [{
           model: model.employee,
           attributes: [ 'manager', 'wfm_manager','name'],
           required: true,
           where: { wfm_manager: wfm_manager, lockstatus: 'request_waiting' }
        }]
  
      })
      
     
      let wfm_managerList = [];
      manager_requests.map(employee => {
         let wfm_manager = {
            EmployeeId: employee.dataValues.employee_id,
            Manager: employee.dataValues.employee.manager,
            Name:employee.dataValues.employee.name,
            reqDate: employee.dataValues.reqdate,
            wfm_manager: employee.dataValues.employee.wfm_manager,
            requestmessage:employee.dataValues.requestmessage,
            lockid:employee.dataValues.lockid
         }
         wfm_managerList.push(wfm_manager)
      });
      // console.log('wfm-managers:', wfm_managerList);

      if (wfm_managerList.length > 0) {
         response.json(wfm_managerList)
      }
      else
         response.status(401).send("Failed")
   }

   catch (e) {
      console.log(e,"Wfm Manager");
      response.status(500)
   }

})
route.post("/softlockstatus",async function(request,response){
   try{  
      
      console.log('----insideeee');
      console.log(response.body);
      let softlock = await model.softlock.findOne({ where: { employee_id: request.body.employee_id,lockid: request.body.lockid} }) 
      softlock.managerstatus = request.body.status;      
      await softlock.save();    
      let employee = await model.employee.findOne({ where: { employee_id: request.body.employee_id } })   
      employee.lockstatus =  request.body.status==='approve'? 'locked':'not_requested';     
      await employee.save();    
      response.send("Requested status updated successfully!")    
   }
   catch (e) {  
      console.log(e)  
      response.status(500)  
   }      
});




route.get("/temp", async function (request, response) {
   try{
      response.send('success');

   }
   catch(e){
      console.log(e,'error');
   }
});
module.exports = route