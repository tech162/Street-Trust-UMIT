import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { AppLayout } from "../layouts/AppLayout";
import { PublicLayout } from "../layouts/PublicLayout";

import { LoginPage } from "../pages/auth/LoginPage";
import { DashboardPage } from "../pages/dashboard/DashboardPage";
import { VendorsPage } from "../pages/vendors/VendorsPage";
import { VendorDetailPage } from "../pages/vendors/VendorDetailPage";
import { VendorDocumentsPage as InspectorVendorDocumentsPage } from "../pages/vendors/VendorDocumentsPage";

import { InspectionsPage } from "../pages/inspections/InspectionsPage";
import { InspectionDetailPage } from "../pages/inspections/InspectionDetailPage";
import { NewInspectionPage } from "../pages/inspections/NewInspectionPage";
import { ChecklistPage } from "../pages/inspections/ChecklistPage";
import { EvidencePage } from "../pages/inspections/EvidencePage";
import { AnalysisPage } from "../pages/inspections/AnalysisPage";
import { ReportPage } from "../pages/inspections/ReportPage";

import { ReportsPage } from "../pages/reports/ReportsPage";
import { ReportDetailPage } from "../pages/reports/ReportDetailPage";

import { MapPage } from "../pages/map/MapPage";
import { NotificationsPage } from "../pages/notifications/NotificationsPage";
import { ProfilePage } from "../pages/profile/ProfilePage";
import { SettingsPage } from "../pages/settings/SettingsPage";

import { VendorDashboardPage } from "../pages/vendor/VendorDashboardPage";
import { VendorProfilePage } from "../pages/vendor/VendorProfilePage";
import { VendorDocumentsPage } from "../pages/vendor/VendorDocumentsPage";
import { VendorInspectionsPage } from "../pages/vendor/VendorInspectionsPage";
import { VendorInspectionDetailPage } from "../pages/vendor/VendorInspectionDetailPage";
import { VendorCompliancePage } from "../pages/vendor/VendorCompliancePage";
import { VendorReportsPage } from "../pages/vendor/VendorReportsPage";
import { VendorQrPage } from "../pages/vendor/VendorQrPage";

import { PublicSearchPage } from "../pages/public/PublicSearchPage";
import { PublicVerifyPage } from "../pages/public/PublicVerifyPage";
import { NotFoundPage } from "../pages/NotFoundPage";

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Authentication */}
      <Route path="/login" element={<LoginPage />} />

      {/* Public Verification Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/public" element={<Navigate to="/public/verify" replace />} />
        <Route path="/public/verify" element={<PublicSearchPage />} />
        <Route path="/public/verify/:vendorId" element={<PublicVerifyPage />} />
      </Route>

      {/* Inspector Protected Routes */}
      <Route
        element={
          <ProtectedRoute allowedRole="inspector">
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/vendors" element={<VendorsPage />} />
        <Route path="/vendors/:vendorId" element={<VendorDetailPage />} />
        <Route path="/vendors/:vendorId/documents" element={<InspectorVendorDocumentsPage />} />
        <Route path="/vendors/:vendorId/inspections/new" element={<NewInspectionPage />} />

        <Route path="/inspections" element={<InspectionsPage />} />
        <Route path="/inspections/:inspectionId" element={<InspectionDetailPage />} />
        <Route path="/inspections/:inspectionId/checklist" element={<ChecklistPage />} />
        <Route path="/inspections/:inspectionId/evidence" element={<EvidencePage />} />
        <Route path="/inspections/:inspectionId/analysis" element={<AnalysisPage />} />
        <Route path="/inspections/:inspectionId/report" element={<ReportPage />} />

        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/reports/:reportId" element={<ReportDetailPage />} />

        <Route path="/map" element={<MapPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* Vendor Protected Routes */}
      <Route
        element={
          <ProtectedRoute allowedRole="vendor">
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/vendor/dashboard" element={<VendorDashboardPage />} />
        <Route path="/vendor/profile" element={<VendorProfilePage />} />
        <Route path="/vendor/documents" element={<VendorDocumentsPage />} />
        <Route path="/vendor/inspections" element={<VendorInspectionsPage />} />
        <Route path="/vendor/inspections/:inspectionId" element={<VendorInspectionDetailPage />} />
        <Route path="/vendor/compliance" element={<VendorCompliancePage />} />
        <Route path="/vendor/reports" element={<VendorReportsPage />} />
        <Route path="/vendor/qr" element={<VendorQrPage />} />
        <Route path="/vendor/notifications" element={<NotificationsPage />} />
        <Route path="/vendor/settings" element={<SettingsPage />} />
      </Route>

      {/* Default Root Redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* 404 Page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
