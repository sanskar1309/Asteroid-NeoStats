# Asteroid Neo Stats

## Overview

The **Asteroid Neo Stats** project provides an interface to view and analyze data on asteroids passing near Earth using NASA’s NeoWs API. The application allows users to select a date range and view detailed statistics and visualizations of near-Earth objects (NEOs).

## Features

- **Date Range Selection**: Users can select a start and end date to filter the data.
- **Statistics Display**: Shows key statistics such as the fastest asteroid, the closest asteroid, and average size.
- **Data Visualization**: Provides interactive charts to visualize the number of asteroids passing near Earth over the selected date range.

## Components

### 1. `DatePicker.vue`

A date picker component for selecting the date range.

**Key Methods:**
- `updateEndDateLimits()`: Ensures the end date does not exceed the maximum allowed (7 days from the start date).
- `submitDates()`: Validates the date inputs and emits the selected dates if valid.

**Props:**
- None

**Events:**
- `dates-selected`: Emits the selected start and end dates to the parent component.

### 2. `StatsDisplay.vue`

Displays statistical data about the asteroids based on the selected date range.

**Props:**
- `stats`: An object containing the calculated statistics such as the fastest asteroid, the closest asteroid, and average size.

### 3. `LineChart.vue`

Visualizes asteroid data using a line chart.

**Props:**
- `data`: An object containing labels and datasets for the chart.

**Setup:**
- Uses `vue-chartjs` for rendering the line chart.
- Configures chart options for responsiveness and legend placement.

### 4. `About.vue`

Provides information about the project and its objectives.

**Styling:**
- The component uses white text on a white background with rounded corners and a shadow.

## Utility Functions

### `dateUtils.js`

- **`formatDate(date)`**: Converts a `Date` object to a string in the format `YYYY-MM-DD`.
- **`parseDate(dateString)`**: Parses a date string in `YYYY-MM-DD` format into a `Date` object.
- **`getDaysBetween(startDate, endDate)`**: Computes the number of days between two `Date` objects.

### `neoService.js`

Handles API requests to NASA’s NeoWs API.

- **`getNeoData(startDate, endDate)`**: Fetches near-Earth object data for a given date range.

## Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/asteroid-neo-stats.git
    cd asteroid-neo-stats
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Create a `.env` file:**

    Create a `.env` file in the root directory and add your NASA API key:

    ```
    VITE_NASA_API_KEY=your_api_key
    ```

4. **Run the application:**

    ```bash
    npm run dev
    ```

5. **Open your browser and navigate to:**

    ```
    http://localhost:3000
    ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **NASA’s NeoWs API**: For providing the data on near-Earth objects.
- **Chart.js**: For charting functionality.
