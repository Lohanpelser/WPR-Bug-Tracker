# <ins>BugTrack: Issue Tracking System</ins>

**BugTrack** is a lightweight, responsive web application designed for software teams to report, manage, and resolve bugs efficiently. It provides a centralized dashboard to visualize project progress and manage team collaboration.

---

## System Features

Our system implements the following core functionalities based on the project requirements:

* **Interactive Kanban Board**: Visualizes issues across four status columns: <ins>Backlog</ins>, <ins>Open</ins>, <ins>Overdue</ins>, and <ins>Resolved</ins>.
* **Centralized Issue List**: A comprehensive table view for searching and filtering through all reported tickets.
* **Full CRUD Logic**: Users can **Create**, **View**, and **Edit** issue tickets with detailed information including summaries, priority, and resolution details.
* **People Management**: A dedicated module to manage team members, including their contact details, usernames, and profile pictures.
* **Project Categorization**: Organizes issues by specific projects with custom color-coding for better visual tracking.
* **Persistence**: Utilizes the **Web Storage API** <sub>(localStorage)</sub> to ensure all issues, people, and projects remain saved after browser refreshes.

---

## Technical Specifications

### 1. Data Persistence
The system uses custom helper functions (`ls` for loading and `ss` for saving) to manage data in `localStorage`. On first load, the system populates the environment with **Seed Data** <sup>(11 issues, 5 people, and 4 projects)</sup> to demonstrate immediate capability.

### 2. Ticket Lifecycle
* **Priority Levels**: Tickets are tagged as *low*, *medium*, or *high*.
* **Status Tracking**: Tickets follow a workflow of *open*, *resolved*, and *overdue*.
* **Resolution Capture**: When an issue is resolved, users can record the **Actual Resolution Date** and a **Resolution Summary**.

### 3. Dynamic UI
The interface is built with a custom-styled CSS framework using the **Nunito** and **JetBrains Mono** fonts to provide a modern, *admin-dashboard* feel. It includes smooth animations and a responsive grid layout.

---

## Setup and Usage

* **Launch**: Open `index.html` in any modern web browser.
* **Navigate**: Use the top navigation bar to switch between the **Board**, **Issues**, **People**, and **Projects** views.
* **New Ticket**: Click the **＋ New Issue** button in the header to open the creation modal.
* **Edit**: Click any ticket on the board or the **Edit** button in the table to update ticket details.
* **Search**: Use the search bar in the **Issues** view to filter tickets by their summary or ID.

---
*Version 1.0.0<sub>(Stable)</sub>*
---

## Group Members and Role Distribution

[cite_start]The project was executed with a clear distribution of roles to ensure all functional and aesthetic requirements were met[cite: 218, 221]:

| Member | Project Role | Primary Responsibility |
| :--- | :--- | :--- |
| **Ayanda** | **UI Designer** | Development of the interface layout and CSS styling. |
| **Gosiame** | **JavaScript** | Implementation of functional ticket logic and workflow. |
| **Louwrens** | **Data and Storage** | Entity management and localStorage implementation. |
| **Lohan** | **Testing and Deliverables** | Technical documentation, test data preparation |
