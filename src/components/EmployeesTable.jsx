import { useState } from "react";

// PARAMETERS : 
// employees => employees data will be inserted in the main file 
// 
export default function EmployeesTable({ employees , deleteEmployee , isvalid }){

  // GET TABLE HEADER DATA FROM THE OBJECT & MAKE IT AN ARRAY
  const tableHeaderRowData = Object.keys(employees[0]);
  // FOR EDIT & SAVE BUTTON 
  const [editMode , setEditMode] = useState(false)

  return(<>

  {/* MAIN TABLE CONTAINER */} 
    <div className="main-table-container overflow-x-auto shadow-md border border-slate-200 rounded-xl w-[90%] mx-auto bg-[var(--bg)] w-full">

  {/* BUTTON CONTAINER */} 
        <div className="buttonContainer flex justify-between items-center p-4 bg-[var(--primary)] text-[var(--bg)] rounded-t-lg">
          <h2 className="text-lg font-semibold tracking-wide">Employee Records</h2>

          <button onClick={ ()=> setEditMode((prev) => !prev)}
                  className="bg-[var(--bg)] text-[var(--textC)] px-4 py-1.5 
                  rounded-md hover:bg-[var(--primary)] transition cursor-pointer"
                  disabled={!isvalid}>
            {editMode ? "Save" : "Edit"}
          </button>
        </div>

        <table className="w-full border-collapse text-sm text-[var(--textC)]">
  {/* TABLE HEADER */} 
          <thead className="bg-[var(--bg)] border-b border-slate-200">
            <tr>
              <th className="px-4 py-2  font-semibold">Del</th>
            {/* GETTING KEYS OF THE FIRST ROW FROM THE ARRAY THAT WE MADE */} 
            {tableHeaderRowData.map((key) => (
              <th key={key}  className="text-left px-4 py-2 capitalize">
                {/* REPLACING THE WORDS WITH SEPARATED CAPITALIZED WORDS */} 
                {key.replace(/([A-Z])/g, " $1")}
              </th>
            ))}

            </tr>
            
          </thead>

  {/* TABLE DATA */} 
          <tbody>

            {/* GETTING EMPLOYEES INFO FROM THE JSON DB AS AN ARRAY*/} 
            {/* WE NEED 2 THINGS FROM THAT ARRAY  */} 
            {/* FIRST : EMPLOYEE DATA => EMP */} 
            {/* SECOND : COUNTER FOR STYLING */} 
            {employees.map((emp , i) => (
              <tr key={emp.id}
                  className={`transition-colors ${
                i % 2 === 0 ? "bg-[var(--bg)]" : "bg-[var(--secondary)]"
              } hover:bg-[var(--primary)]`}>
              <td className="px-4 py-2 text-center">

                {/* DELETE EMPLOYEE BUTTON */} 
                <button className="text-red-500 hover:text-red-700 font-semibold"
                        onClick={() => {deleteEmployee(emp.id)}}>X</button>
              </td>

              {/* ORGANIZING EMP DATA UNDER THE tHead, HOW ? */} 
              {/* BY MAPPING THE tableHeaderRowData AGAIN TO TAKE KEY NAMES */} 
              {/* EMP [FULL NAME] */} 
                {tableHeaderRowData.map((key) => (
                  <td key={key} className="px-4 py-2 ">
                    {editMode && key !== "id" ? 
                      <input
                        value={emp[key]}
                        onChange={(e) => {emp[key] = e.target.value}}
                        className="border border-slate-300 px-2 py-1 rounded-md w-full  focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"></input> 

                      : 
                      emp[key]}
                  </td>
                ))}

              </tr>
            ))}
          </tbody>
        </table>
    </div>

  </>)
}
