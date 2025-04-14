import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import CustomerLayout from './components/CustomerSidebar'
import Dashboard from './components/Dashboard'
import ApplyForLoan from './components/ApplyForLoan'
import LoanDetails from './components/LoanDetailsPage'
import EMIPaymentPage from './components/EMIPaymentPage'
import TransactionHistory from './components/TransactionHistory'
import OfficerLayout from './components/OfficerLayout'
import LoanOfficerDashBoard from './components/LoanOfficerDashBoard'
import LoanReview from './components/LoanReview'
import Reports from './components/Reports'
import AdminDashboard from './components/AdminDashboard'
import LoanPolicyManagement from './components/LoanPolicyManagement'
import UserManagement from './components/UserManagement'
import Signup from './components/Signup'
import AdminLayout from './components/AdminLayout'
import LoanofficerAssignment from './components/LoanOfficerAssignment'

const App = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path='/signup' element={<Signup/>}/>

      <Route element={<CustomerLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/apply" element={<ApplyForLoan />} />
        <Route path="/loan-details" element={<LoanDetails />} />
        <Route path="/emi-payment" element={<EMIPaymentPage />} />
        <Route path="/transactions" element={<TransactionHistory />} />
      </Route>

      {/* Loan Officer Pages */}
      <Route element={<OfficerLayout />}>
      <Route path="/officer-dashboard" element={<LoanOfficerDashBoard />} />
      <Route path="/review" element={<LoanReview />} />
      <Route path="/reports" element={<Reports />} />
      </Route>

      {/* Admin Pages */}
      <Route element={<AdminLayout />}>
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/loan-policy" element={<LoanPolicyManagement />} />
        <Route path="/officer-assignment" element={<LoanofficerAssignment />} />
      </Route>
    </Routes>
  )
}

export default App
