
export default function EmployeeList({employees,loading}){
    console.log('EmployeeList:',employees);
    if(!employees||employees.length===0){
        return <p>No employees found</p>
    }
    if(loading){
        return <p>Loading...</p>
    }
    return(
        <>
        <div className="employee-table-section">
            <div className="table-responsive">
                <table className="table employee-table">
                    <thead>
                        <tr>
                            <th>S.NO:</th>
                            <th>Employee Name</th>
                            <th>Employee Email</th>
                            <th>Department</th>
                            <th>Role</th>
                            <th>Joining Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map((employee,idx) => (
                                <tr key={employee._id}>
                                    <td>{idx + 1}</td>
                                    <td>{employee.userId?.userFirstName}{" "}{employee.userId?.userLastName}</td>
                                    <td>{employee.userId?.userEmail}</td>
                                    <td>{employee.department}</td>
                                    <td>{employee.roleOfEmployee}</td>
                                    <td> {new Date(
                                        employee.joiningDate
                                    ).toLocaleDateString("en-GB")}</td>
                                    <td> 
                                    <span className="status-badge">
                                        Active
                                    </span> 
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="edit-btn">
                                              Edit
                                            </button>

                                            <button className="delete-btn">
                                              Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}