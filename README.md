# Anonymous Reporting Portal

## Overview

The **Anonymous Reporting System** is designed to provide a secure and confidential platform for university students and staff to report sensitive issues such as harassment, bullying, and discrimination. By maintaining the anonymity of the reporters, the system aims to encourage transparency while protecting users from potential retaliation or exposure. This system is accessible via a public homepage, a private dashboard for administrators, and an anonymous report submission page.

## Features

### 1. Homepage (Public)

**Purpose:**  
The homepage serves as an informative landing page for both students and staff, explaining the system's function and ensuring that reports submitted through it are completely anonymous. It acts as a gateway to the report submission and login areas.

**Key Features:**
- **Introduction Section:**  
  Provides a clear explanation of the system's purpose, assuring users of the complete anonymity of their reports.
- **How It Works:**  
  A concise guide (with icons or bullet points) outlining how users can submit reports, who handles the reports, and the actions that will be taken based on the submissions.
- **Access Links:**  
  - A button for logged-in users to access the dashboard.
  - A button for submitting an anonymous report.
- **Admin/User Login:**  
  A login button allowing administrators and authorized staff to log in and manage reports.

**Tech Stack:**
- **Frontend:** Next.js
- **Database:** MongoDB
- **Styling:** Tailwind CSS
- **Form Validation:** Zod
- **Form Handling:** useForm
- **UI Components:** shadcn

---

### 2. Dashboard (Admin and Specific Users Only)

**Purpose:**  
The dashboard is a restricted area where authorized staff can securely view, manage, and respond to reports. It offers a suite of tools for filtering, categorizing, and responding to submitted reports while ensuring confidentiality.

**Key Features:**
- **View Anonymous Reports:**  
  A comprehensive list of all submitted reports, displaying details such as the report's submission date, type of issue (e.g., bullying, harassment), and content.
- **Filter Options:**  
  Admins can filter reports by:
  - Issue type.
  - Submission date.
  - Status (e.g., new, in-progress, resolved).
- **Report Actions:**
  - **Respond:** Admins can send anonymous messages to the report submitter if additional information is needed or if they want to offer assistance.
  - **Mark as Resolved:** After addressing the report, admins can mark it as resolved, moving it to a "Resolved" section for future reference.
  - **Escalate Issue:** For serious issues (e.g., harassment), admins can escalate the report to higher authorities or university management.
- **User Management:**  
  Only authorized users (admins, university staff) can access the dashboard, with role-based authentication managed by NextAuth.

**Tech Stack:**
- **Frontend:** Next.js
- **Database:** MongoDB
- **Styling:** Tailwind CSS
- **Form Validation:** Zod
- **Form Handling:** useForm
- **UI Components:** shadcn

---

### 3. Anonymous Report Submission Page

**Purpose:**  
This page allows students and staff to anonymously submit reports without needing to log in or reveal any personally identifiable information (PII).

**Key Features:**
- **Simple Form:**
  - Dropdown menu to select the type of issue (e.g., bullying, harassment, discrimination).
  - A text field for detailed descriptions of the issue.
  - Option to attach evidence (e.g., images, documents) if applicable.
- **Submit Button:**  
  Once submitted, the report is stored securely in the database.
- **Success Notification:**  
  Upon submission, the user receives a confirmation message indicating that the report has been successfully received and will be handled confidentially.
- **Anonymous Code Generation (Optional):**  
  After submission, the system generates a unique code for the reporter to track the status of their report without needing to log in.

**Tech Stack:**
- **Frontend:** Next.js
- **Database:** MongoDB
- **Styling:** Tailwind CSS
- **Form Validation:** Zod
- **Form Handling:** useForm
- **UI Components:** shadcn

---

## Additional Features

- **Security and Anonymity:**
  - The system ensures full anonymity by not storing identifiable information (e.g., IP addresses or browser details).
  - All sensitive data, such as evidence files, is encrypted during transmission and storage.
  
- **Notification System:**  
  Optionally, the reporter can provide a non-identifiable email address to receive notifications when the status of their report changes (e.g., when an admin responds or marks the issue as resolved).

## Workflow Summary

1. **Homepage:** Users visit the public homepage to learn about the platform and submit anonymous reports.
2. **Anonymous Report Submission:** Students and staff submit anonymous reports through the report submission page.
3. **Admin Dashboard:** Administrators log in to the dashboard, where they can review, respond to, or escalate reports based on their nature.
4. **Report Status:** Optionally, users who submitted reports can check their status using a unique code generated after submission.

## Tech Stack Overview

- **Frontend:** Next.js, Tailwind CSS
- **Backend:** MongoDB
- **Authentication:** NextAuth (with role-based access control)
- **Form Validation:** Zod
- **Security:** Encryption of data at rest and during transmission

---

This Anonymous Reporting System provides universities with a secure platform to handle sensitive issues in a manner that ensures confidentiality, trust, and swift action for all parties involved.
