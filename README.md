## 🚀 Live Demo
[Calculator Builder](https://calcbuilder.vercel.app)

## 📖 Introduction
The **Calculator Builder** is a dynamic and customizable calculator built with React, Zustand (for state management), and Tailwind CSS. Users can drag and drop predefined calculator components to create their own layout, rearrange components, and perform calculations seamlessly.

## 📜 Table of Contents
- [Features](#features)
- [Bonus Features](#bonus-features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Dependencies](#dependencies)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [License](#license)

## ✨ Features
✅ **Drag & Drop Components** – Users can dynamically add and remove buttons.  
✅ **Predefined Components** – Includes number buttons (0-9), operations (+, -, *, /), and a result display.  
✅ **Custom Layout** – Users can arrange calculator buttons freely.  
✅ **Calculation Logic** – Fully functional calculator with correct operations.  
✅ **Right-Click Functionality** – Users can **move** or **delete** any component that has already been added to the calculator.  
✅ **State Management with Zustand** – Components are managed dynamically.  
✅ **Tailwind CSS Styling** – Clean, modern, and responsive UI.  

## 🎁 Bonus Features
✨ **Dark Mode Toggle** – Users can switch between light and dark themes.  
✨ **Persistence with Local Storage** – Saves the calculator layout for future use.  
✨ **Undo/Redo Functionality** – Users can undo or redo their drag-and-drop actions.  
✨ **Clear All Settings** – Resets the calculator layout to default.  

## 🛠️ Installation
To set up the project locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/yourusername/calculator-builder.git

# Navigate to the project directory
cd calculator-builder

# Install dependencies
npm install

# Start the development server
npm run dev


## 📌 Usage
1. Open the application in the browser.
2. Drag and drop calculator components from the toolbox to the main area.
3. **Right-click on added components** to:
   - **Move** the component to a different location.
   - **Delete** the component from the calculator.
4. Perform calculations with the customized layout.
5. Use **Undo/Redo** for layout modifications.
6. Toggle between **Light Mode** and **Dark Mode**.
7. Clear all settings to reset the layout.

## 🛠️ Technologies Used
- **React** – Frontend framework
- **Zustand** – State management
- **Tailwind CSS** – Styling
- **React DnD** – Drag-and-drop functionality
- **LocalStorage** – Persist user preferences

## 📦 Dependencies
The project uses the following dependencies:

```json
"dependencies": {
    "@types/react-beautiful-dnd": "^13.1.8",
    "framer-motion": "^12.4.2",
    "lucide-react": "^0.475.0",
    "react": "^18.3.1",
    "react-beautiful-dnd": "^13.1.1",
    "react-dom": "^18.3.1",
    "react-router": "^7.1.5",
    "zustand": "^5.0.3"
}
```


## ⚙️ Configuration
- Modify **Zustand store (`useCalculatorStore.js`)** for state management tweaks.
- Customize **Tailwind CSS (`tailwind.config.js`)** for styling preferences.

## 📜 License
This project is licensed under the MIT License.

---

👨‍💻 **Developed by [Mahadi Hasan]**  
🚀 Feel free to contribute or suggest improvements!
```

Let me know if you need any changes! 🚀