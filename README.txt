# Twubric Web Application

## Introduction

This web application allows a Twitter user to review their followers, view their Twubric scores, filter and sort them, and decide to optionally remove certain followers. The application is built using React.

## Features

1. **Display Followers**: Lists the user’s Twitter followers in a grid.
2. **Twubric Scores**: Displays Twubric scores based on Friends, Influence, and Chirpiness.
3. **Filtering**: Allows filtering of followers based on the dates they joined Twitter.
4. **Sorting**: Enables sorting of followers by Twubric Score, Friends, Influence, and Chirpiness.
5. **Remove Followers**: Provides functionality to remove followers from the list.
6. **Keyboard Shortcuts**: Implements keyboard shortcuts for sorting and selecting users.

## Project Structure

- **public/**: Contains the index.html file.
- **src/**: Contains the React components and application logic.
  - **App.jsx**: The main application component that sets up routes and renders the main layout.
  - **components/**
    - **FollowerList.jsx**: Component to display the list of followers.
    - **FollowerItem.jsx**: Component to display individual follower details.
    - **SortFilterBar.jsx**: Component for sorting and filtering controls.
    - **DatePicker.jsx**: Component for date range selection.
    - **Aside.jsx**: Sidebar component.
    - **Content.jsx**: Main content area component.
  - **assets/**: Contains static assets such as images.
  - **data/**: Contains the mock data (twubric.json).
  - **styles/**: Contains CSS files for styling the application.
  - **utils/**: Contains utility functions.

## Installation

1. Clone the repository:
2. Navigate to the project directory:
3. Install dependencies:
4. Start the development server:


## Usage

1. Open the web application in your browser:
2. Use the sorting buttons to sort followers by Twubric Score, Friends, Influence, or Chirpiness.
3. Use the date filter to select a date range for filtering followers.
4. Click on the "Remove" button to remove a follower from the list.
5. Use keyboard shortcuts to quickly sort or remove followers:
- `Shift+T/t`: Sort by Twubric Score
- `Shift+F/f`: Sort by Friends
- `Shift+I/i`: Sort by Influence
- `Shift+C/c`: Sort by Chirpiness

## Components

### App.jsx
- Entry point of the application.
- Renders the main layout with Aside and Content components.

### FollowerList.jsx
- Fetches and displays the list of followers.
- Handles sorting and filtering logic.

### FollowerItem.jsx
- Displays individual follower details including Twubric scores.
- Provides a button to remove the follower from the list.

### SortFilterBar.jsx
- Provides sorting and filtering controls.
- Includes buttons for sorting by different criteria and date pickers for filtering.

### DatePicker.jsx
- Custom date picker component for selecting a date range.
- Uses a third-party date picker library for convenience.

### Aside.jsx
- Sidebar component containing navigation links or additional options.

### Content.jsx
- Main content area where the list of followers is displayed.

## Data

The application uses a mock API response stored in `twubric.json` located in the `data` directory. The data is loaded using React and used to populate the list of followers.

## Styling

The application uses CSS for basic styling. You can customize the styles by modifying the CSS files in the `styles` directory.

## Conclusion

This web application meets the requirements by providing a user-friendly interface to review, sort, filter, and manage Twitter followers based on their Twubric scores. It utilizes React for efficient component-based development and ensures compatibility with ES6 standards.

## Repository

You can find the repository for this project at:
https://github.com/Edhot07/Twubric