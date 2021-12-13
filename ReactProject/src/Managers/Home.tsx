import Logout from '../../src/Logout';
import { useEffect, useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import { FaLock } from "react-icons/fa";
import  '../Style/ManagerStyle.css'


// import

type Employee = {
    EmployeeId: number;
    Name: string;
    Skills: string;
    Experience: number;
    Manager: string
}
type emp = {
    employeeData: [];
    getEmployee: () => {};
    RequestSoftLock: () => {};
}

  
const ManagerHome = ({ employeeData, getEmployee, RequestSoftLock }: any) => {
    const [enableRequest, setenableRequest] = useState(false);
    const [employeeList, setemployeeList] = useState<any>({});
    const [show, setShow] = useState(true);
    const [RequestMessage,setRequestMessage]=useState("");
    const handleClose = () => setShow(false);
    const submit = () => {
        debugger;
        setShow(false);
        console.log('submit', employeeList, typeof (employeeList));
        RequestSoftLock({
            employee_id: employeeList.x.EmployeeId,
            manager: employeeList.x.Manager,
            requestMessage: RequestMessage
        });
        setTimeout(() => {
            getEmployee() 
        }, 200);
    }
    useEffect(() => {
        console.log('getEmployee')
        getEmployee()
    }, []
    )
    
    function enableSoftLock(employee: any) {
        setRequestMessage("");
        setemployeeList(employee);
        setenableRequest(true);
        setShow(true);
    }
    console.log('enableRequest:', enableRequest);
    console.log('employeeList', employeeList);

    console.log(employeeData)
    return (
        <div>
            <div className='row'>
            <h4 className="text-center mt-5 Headings col-10">Manager Home Screen</h4>
            <span className="col-2 pb-5" style={{float:"right"}}><Logout></Logout></span>
            </div>
            
            <table className="table tablecss table-bordered">
                <thead className="TableHeader table-striped">
                    <tr >
                        <th className="text-center">Employee id</th>
                        <th className="text-center">Name</th>
                        <th className="text-center">Skills</th>
                        <th className="text-center">Experience</th>
                        <th className="text-center">Manager</th>
                        <th className="text-center"> </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employeeData.map((x: Employee) => {
                            return (
                                <tr key={x.EmployeeId}>
                                    <td className="text-center">{x.EmployeeId}</td>
                                    <td className="text-center">{x.Name}</td>
                                    <td className="text-center">{x.Skills}</td>
                                    <td className="text-center">{x.Experience}</td>
                                    <td className="text-center">{x.Manager}</td>
                                    <td className="text-center"><button className="btn btn-primary ButtonColor" onClick={() => enableSoftLock({ x })}>
                                        <FaLock></FaLock>&nbsp; Request Lock</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div>
                {enableRequest ?
                    <Modal show={show} onHide={handleClose}>

                        <Modal.Header className='TableHeader' style={{padding:"10px"}} closeButton>
                            <Modal.Title>Soft lock Request Confirmation</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                        <label className="mb-2">Please confirm the lock request for <span>{employeeList.x.EmployeeId}</span></label>
                        <div>
                        <label className="fw-bold">Request Message(message must be atleast 10 char long)</label>
                        </div>
                            <div className="form-outline">
                                <textarea className="form-control" minLength={10}onChange={(e)=>{setRequestMessage(e.target.value)}} value={RequestMessage}></textarea>
                            </div>
                        </Modal.Body>

                        <Modal.Footer>

                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                            <Button variant="primary" onClick={submit}>Submit</Button>

                        </Modal.Footer>

                    </Modal>


                    : null
                }
            </div>
        </div>
    )
}

export default ManagerHome