# FileStatusGrid

A frontend assignment solution built with **React**, **TypeScript**, **Vite**, and **CSS**.
The application presents file status data in a structured, interactive grid—engineered with a strong emphasis on accessibility, testability, and clean architectural principles.

---

## 🚀 Tech Stack

- **React** – Component-based UI
- **TypeScript** – Strongly typed code
- **Vite** – Fast build tool and dev server
- **CSS** – Styling

---

## 📋 Prerequisites

Before running the project, make sure you have the following installed:

- **Node.js** (version 18 or higher recommended)  
  👉 [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js)
- A modern web browser (Chrome, Firefox, Edge, Safari)
- **Git** to clone the repository  
  👉 [Download Git](https://git-scm.com/)

## 📦 Project Setup

### 1. Clone the repository

`git clone https://github.com/Siddhant-awati/FileStatusGrid.git`

### 2. Navigate to the project folder

`cd FileStatusGrid`

### 3. Install dependencies

`npm install`

### 4. Start the development server

`npm run dev`

### 5. Open the application

`Visit http://localhost:5173/ in your browser.`

### 6. Run unit tests

`npm run test`

### 7. Check for lint issues

`npm run lint`

## ✅ Requirements Implemented

- ✔ **Only files with a status of `"available"` can be downloaded.**

- ✔ **Select-all checkbox behavior:**

  - Unselected if no items are selected
  - Selected if all items are selected
  - Indeterminate if some but not all items are selected

- ✔ **"Selected X" text updates dynamically**, showing `"None Selected"` when nothing is selected.

- ✔ **Clicking the select-all checkbox:**

  - Selects all items if none or some are selected
  - De-selects all items if all are selected

- ✔ **Clicking "Download Selected" triggers an alert** listing the path and device of all selected files.

- ✔ **Rows change color on hover and when selected**
  - Only `available` rows show hover effect and rest rows are disabled

## 📌 Assumptions & Considerations

1. **API Data Simulation**

   - The table component is assumed to consume data from an API call.
   - Mocked data is used to simulate the API response:  
     `public/mock-data/files.json`

2. **Pagination Logic**
   - Pagination is implemented when the number of records exceeds 10.
   - To test pagination,
     Modify `Home.tsx` (`src/pages/Home.tsx`).  
     update the URL variable to:  
      `const URL = "/mock-data/files-pages.json";`

## Testing Summary

- ✅ **Manual Testing**

  - All functionalities were tested manually.
  - No errors or bugs were found during manual testing.

- ✅ **Accessibility Testing**

  - Keyboard navigation verified.
  - VoiceOver testing completed.
  - Google Chrome Lighthouse accessibility checks passed.

- ✅ **Unit Testing**
  - Unit tests written to cover implemented code and functionalities.

## Screenshots for reference
<img width="1437" height="729" alt="None selected" src="https://github.com/user-attachments/assets/f2a5b758-83b7-4cbc-b8d6-14d7d46101ce" />
<img width="1440" height="728" alt="Single selection" src="https://github.com/user-attachments/assets/af423cc6-47a8-4101-afab-268930f29a8e" />
<img width="1440" height="772" alt="Download selected " src="https://github.com/user-attachments/assets/5a4ffcef-5926-440a-a8ed-50ea46e0da9c" />

## Lighthouse report:
<img width="1434" height="776" alt="Lighthouse report" src="https://github.com/user-attachments/assets/9209a578-e928-4fc5-9b38-3fd19ed61c64" />


