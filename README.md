# 🚆 RailPNR - Realtime PNR Status Checker

A modern, fast, and responsive web application built with **Flask (Python)** and **HTML/CSS/JS** to check Indian Railways PNR status.

## 🚀 Features

- **Clean UI**: Simple, modern, and user-friendly interface.
- **Instant Validation**: Client-side and server-side 10-digit PNR input validation.
- **Detailed Information**: Displays train name, train number, route details, journey date, class, and chart status.
- **Passenger Wise Breakdown**: View booking status, current status (CNF, RAC, WL), and coach/berth details for every passenger.
- **RESTful API**: Flask API backend delivering quick JSON responses.

---

## 🛠️ Project Structure

```text
pnr-checker/
│── app.py                  # Python Flask Backend
│── templates/
│   └── index.html          # Frontend HTML Template
│── static/
│   ├── css/
│   │   └── style.css       # Custom Stylesheet
│   └── js/
│       └── script.js       # Client-side Logic & API Fetching
│── .gitignore              # Files ignored by Git
└── README.md               # Project documentation
