//  base URL
// const baseURL = "http://192.168.1.182:8082/";
const baseURL = "http://localhost:8080/api/v1/";
// const baseURL = "http://ec2-54-80-9-177.compute-1.amazonaws.com:8082/"

export const endpoints = {
  //Configuration Endpoint
  //Country
  getAllCountry: `${baseURL}products`,
  addCountry: `${baseURL}products`,
  updateCountry: `${baseURL}products`,
  deleteCountry: `${baseURL}products`,

  //State
  getAllState: `${baseURL}state`,
  addState: `${baseURL}state/createState`,
  updateState: `${baseURL}state`,
  deleteState: `${baseURL}state`,
  getAllStateByCountryID: `${baseURL}state/country`,

  //Office
  getAllOffice: `${baseURL}office`,
  addOffice: `${baseURL}office/createOffice`,
  updateOffice: `${baseURL}office`,
  deleteOffice: `${baseURL}office`,
  getAllOfficeByStateID: `${baseURL}office/state`,

  //Department
  getAllDepartment: `${baseURL}department`,
  addDepartment: `${baseURL}department/createDept`,
  updateDepartment: `${baseURL}department`,
  deleteDepartment: `${baseURL}department`,
  getAllDepartmentByOfficeId: `${baseURL}department/office`,

  //Project
  getAllProject: `${baseURL}project`,
  addProject: `${baseURL}project/createProject`,
  updateProject: `${baseURL}project`,
  deleteProject: `${baseURL}project`,
  getAllProjectByDepartmentId: `${baseURL}project/department`,

  //Technology
  getAllTechnology: `${baseURL}technology`,
  addTechnology: `${baseURL}technology/createTechnology`,
  updateTechnology: `${baseURL}technology`,
  deleteTechnology: `${baseURL}technology`,

  //Reimbursement
  getAllReimbursement: `${baseURL}reimbursement`,
  addReimbursement: `${baseURL}reimbursement/createReimburesement`,
  updateReimbursement: `${baseURL}reimbursement`,
  deleteReimbursement: `${baseURL}reimbursement`,

  //Role
  getAllRoles: `${baseURL}role`,
  addRoles: `${baseURL}role/createrole`,
  updateRoles: `${baseURL}role`,
  deleteRoles: `${baseURL}role`,

  //Assets
  getAllAssets: `${baseURL}asset`,
  addAssets: `${baseURL}asset/createAsset`,
  updateAssets: `${baseURL}asset`,
  deleteAssets: `${baseURL}asset`,

  //Clients
  getAllClients: `${baseURL}client/getAllClient`,
  addClients: `${baseURL}client/createclient`,
  updateClients: `${baseURL}client`,
  deleteClients: `${baseURL}client`,

  /////////////////////////////////////////////////////////////////////////////////////////
  // Auth Endpoint
  loginAuth: `${baseURL}auth/login`,
  signupAuth: `${baseURL}auth/signup`,
  logoutAuth: `${baseURL}logoutAPI`,

  ////////////////////////////////////////////////////////////////////////////////////////
  // Employees Endpoint
  getAllEmployee: `${baseURL}user/getAllUser`,
  addEmployee: `${baseURL}user/createuser`,
  updateEmployee: `${baseURL}user`,
  deleteEmployee: `${baseURL}user`,
  getAllEmployeeActive: `${baseURL}user/active`,
  updateEmployeeOffboard: `${baseURL}user/offboardEmployee`,
  getProfile: `${baseURL}profile/userProfile`,
  updateProfile: `${baseURL}profile/update`,
  updatePassword: `${baseURL}profile/change-password`,
  getAllUsers: `${baseURL}profile/getAllUser`,
  deleteUser: `${baseURL}profile/user`,
  updateUserRole: `${baseURL}profile/user`,

  /////////////////////////////////////////////////////////////////////////////////////////
  // Dynamic User Module Endpoint
  getPageStructure: `${baseURL}api/json-data`,
  addPageStructure: `${baseURL}api/json-data`,

  getPermissionByRole: `${baseURL}rolePermission`,
  addPermissionByRole: `${baseURL}rolePermission/assignPermissions`,
  updatePermissionByRole: `${baseURL}rolePermission/updatePermissions`,
  deletePermissionByRole: `${baseURL}rolePermission`,
  getAllPermissionAndRoles: `${baseURL}rolePermission/all`,

  /////////////////////////////////////////////////////////////////////////////////////////////
  // Travel Endpoint

  getAllTravels: `${baseURL}travelRequest`,
  getSingleTravels: `${baseURL}employee/getsingleemployee`,
  addTravels: `${baseURL}travelRequest`,
  updateTravels: `${baseURL}travelRequest`,
  deleteTravels: `${baseURL}travelRequest`,
  getAllTravelsEmployee: `${baseURL}travelRequest/employee`,
  getAllTravelsListApprover: `${baseURL}travelRequest/approvalManager`,
  getAllTravelsListToApproverWithPendingStatus: `${baseURL}travelRequest/approvalManager`,
  getTravellerEmployeesByStatus: `${baseURL}travelRequest/approvalStatus`,
  getAllTravelMode: `${baseURL}travelModes`,
  UpdateTravelByGenId: `${baseURL}travelRequest/gen`,
  DeleteTravelByGenId: `${baseURL}travelRequest/gen`,
  getAllAccomdationType: `${baseURL}accommodationTypes`,
  bookHotelBetweenCheckinCheckout: `${baseURL}hotelDetails`,
  hotelDetailsBytravelGenId: `${baseURL}hotelDetails/details`,
  getAllGuestHouse: `${baseURL}guestHouseDetails`,
  checkGuestHouseAvailable: `${baseURL}guestHouseBookings/guestHouseBook`,
  getGuestHouseDetail: `${baseURL}guestHouseBookings/details`,
  getAllAvailableDates: `${baseURL}guestHouseBookings/bookedDates/`,

  /////////////////////////////////////////////////////////////////////////////////////////////
  // Claim Type Endpoint

  getAllClaimType: `${baseURL}claimType`,
  addClaim: `${baseURL}expenseClaims`,
  getAllClaim: `${baseURL}travelRequest`,
  getClaimByStatus: `${baseURL}travelRequest`,
  getClaimByEmployeeEmail: `${baseURL}expenseClaims/employeeEmail`,
  getPendingClaimByApproverEmail: `${baseURL}expenseClaims/approver`,
  updateClaim: `${baseURL}expenseClaims`,
  getClaimByApproverEmailAndStatus: `${baseURL}expenseClaims/approver`,
  getApprovedClaimByStatus: `${baseURL}expenseClaims/expenseClaimStatus/APPROVED`,


  /////////////////////////////////////////////////////////////////////////////////////////////
  //Attendance Endpoint
  markAttendance: `${baseURL}attendance/mark`,
  getAttendance: `${baseURL}attendance/getByEmail`,

  /////////////////////////////////////////////////////////////////////////////////////////////
  //holiday
  getAllHoliday: `${baseURL}holidays/all`,
  addHoliday: `${baseURL}holidays/add`,
  updateHoliday: `${baseURL}holidays/update`,
  deleteHoliday: `${baseURL}holidays/delete`,

  /////////////////////////////////////////////////////////////////////////////////////////////
  //Leave
  applyLeave: `${baseURL}leave/apply`,
  getAllLeavesForHistory: `${baseURL}leave/allLeaveApp`,
  getAllLeavesForApprover: `${baseURL}leave/approverStatus`,
  getAllRemainingLeavesByYear: `${baseURL}leave/balance`,
  postStatusDescription: `${baseURL}leave/update`,
  getAllApprovedLeavesForHistory: `${baseURL}leave/status`,


  /////////////////////////////////////////////////////////////////////////////////////////////
  //Ticket
  getAllTicket: `${baseURL}travelBooking`,
  postTicket: `${baseURL}travelBooking`,
  putTicket: `${baseURL}travelBooking/genId`,
  deleteTicket: `${baseURL}travelBooking/genId`,


  /////////////////////////////////////////////////////////////////////////////////////////////
  // Download file
  downloadfile:`${baseURL}expenseClaims/downloadFile`,
  

  /////////////////////////////////////////////////////////////////////////////////////////////
  // Reports
  getTravelReportData: `${baseURL}travelRequest/travelReport`,
  getExpenceReportData: `${baseURL}expenseClaims/expenseReport`,
  getTicketReportData: `${baseURL}travelBooking/travelBookingReport`,
  getUserReportData: `${baseURL}user/userReport`,
  getLeaveReportData: `${baseURL}leave/leaveReport`,
  getAttendanceReportData: `${baseURL}attendance/attendanceReport
`,

};

// Export the endpoints object
export default endpoints;
