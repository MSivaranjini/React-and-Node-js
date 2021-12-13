import { useState, useEffect } from "react";
import Logout from '../../src/Logout';
import { Modal, Button } from 'react-bootstrap';
import { FaLock } from "react-icons/fa";
import '../Style/ManagerStyle.css'

type wfm = {
    wfmData: [];
    getWFM_manager: () => {};
    ApproveDetail: () => {};
}

const WFMHome = ({ wfmData, getWFM_manager, ApproveDetail }: any) => {
    const [enableViewDetail, setenableViewDetail] = useState(false);
    const [wfmList, setWfmList] = useState<any>({});
    const [show, setShow] = useState(true);
    const [statusvalue, setstatusvalue] = useState("Select status");

    const handleClose = () => setShow(false);
    const submit = () => {
        debugger;
        setShow(false);
        console.log('submit', wfmList, typeof (wfmList));
        console.log(wfmList);
        ApproveDetail({
            lockid: wfmList.x.lockid,
            managerstatus: statusvalue,
            employee_id: wfmList.x.EmployeeId
        });
    }

    useEffect(() => {
        console.log('getEmployee', wfmData.length)
        if (wfmData.length === 0)
            getWFM_manager()
        else
            console.log("Else Part");

    }, []
    )
    function ViewDetail(employee: any) {
        console.log('ViewDetails', employee);
        setWfmList(employee);
        setenableViewDetail(true);
        setShow(true);
    }

    const handleChange = (e: any) => {
        console.log("status", e.target.value);
        setstatusvalue(e.target.value);
    };

    return (
        <div>
            <div className='row'>
                <div className="col-10">
                <h4 className="text-center mt-5 Headings">WFM Manager Home Screen</h4>
                </div>
                <span className="col-2 pb-5" style={{ float: "right" }}><Logout></Logout></span>
            </div>

            {wfmData && wfmData.length > 0 ?
                <table className="table tablecss table-bordered">
                    <thead className="TableHeader table-striped">
                        <tr     >
                            <th className="text-center">Employee ID</th>
                            <th className="text-center">Requestee</th>
                            <th className="text-center">Request Date</th>
                            <th className="text-center">Manager</th>
                            <th className="text-center"> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            wfmData.map((x: any) => {
                                return (
                                    <tr key={x.EmployeeId}>
                                        <td className="text-center">{x.EmployeeId}</td>
                                        <td className="text-center">{x.Name}</td>
                                        <td className="text-center">{x.reqDate}</td>
                                        <td className="text-center">{x.Manager}</td>
                                        <td className="text-center"><button className="btn btn-primary" onClick={() => ViewDetail({ x })}>
                                            <FaLock></FaLock>&nbsp; View Details</button></td>
                                    </tr>
                                )
                            })

                        }
                    </tbody>
                </table>
                : null
            }
            {enableViewDetail ?
                <Modal show={show} onHide={handleClose}>

                    <Modal.Header className='TableHeader' style={{ padding: "10px" }} closeButton>
                        <Modal.Title>Soft lock Request Confirmation</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p className="StatusMsg">Status Update for Request Lock</p>
                        <div className="row">
                            <label className="col-5 mb-2" style={{color:"#084298"}}>Employee ID</label><span className="col-5">{wfmList.x.EmployeeId}</span>
                        </div>
                        <div className="row">
                            <label className="col-5 mb-2" style={{color:"#084298"}}>Requestee</label><span className="col-5">{wfmList.x.Manager}</span>
                        </div>
                        <div className="row">
                            <label className="col-5 mb-2" style={{color:"#084298"}}>Employee Manager</label><span className="col-5">{wfmList.x.wfm_manager}</span>
                        </div>
                        <div className="row">
                            <label className="col-5 mb-2" style={{color:"#084298"}}>Request Description</label><span className="col-5">{wfmList.x.requestmessage}</span>
                        </div>
                        <div className="row">
                            <label className="col-5 mb-2" style={{color:"#084298"}}>Status</label>
                            <select value={statusvalue} onChange={handleChange} className="col-5">
                                <option value="SelectStatus">Select Status</option>
                                <option value="approve">Approve</option>
                                <option value="reject">Reject</option>
                            </select>
                        </div>

                        {/* <div>Please confirm the lock request for {wfmList.x.EmployeeId}</div> */}
                        {/* <div>Request message:</div>
                            <div className="form-outline">
                                <textarea className="form-control" ></textarea>

                            </div> */}


                    </Modal.Body>

                    <Modal.Footer>

                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" onClick={submit}>Submit</Button>

                    </Modal.Footer>

                </Modal>


                : null
            }
        </div>
    )
}

export default WFMHome