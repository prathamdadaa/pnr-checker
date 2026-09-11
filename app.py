from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

# Sample Mock Database / Response Generator
def get_mock_pnr_status(pnr):
    stations = [
        {"code": "NDLS", "name": "New Delhi"},
        {"code": "CNB", "name": "Kanpur Central"},
        {"code": "PRYJ", "name": "Prayagraj Junction"},
        {"code": "DDU", "name": "Pt. Deen Dayal Upadhyaya"},
        {"code": "HWH", "name": "Howrah Junction"}
    ]
    
    statuses = [
        {"booking": "WL 12", "current": "CNF", "status_class": "confirmed"},
        {"booking": "WL 45", "current": "RAC 12", "status_class": "rac"},
        {"booking": "WL 88", "current": "WL 24", "status_class": "waiting"}
    ]

    selected_status = random.choice(statuses)

    return {
        "pnr": pnr,
        "train_number": "12302",
        "train_name": "Howrah Rajdhani Express",
        "doj": "2026-10-15",
        "class": "3A",
        "chart_status": "Chart Not Prepared",
        "from_station": stations[0],
        "to_station": stations[4],
        "boarding_station": stations[0],
        "passengers": [
            {
                "passenger_no": 1,
                "booking_status": selected_status["booking"],
                "current_status": selected_status["current"],
                "berth": "B3-42 (Side Upper)" if selected_status["current"] == "CNF" else "-"
            },
            {
                "passenger_no": 2,
                "booking_status": selected_status["booking"],
                "current_status": selected_status["current"],
                "berth": "B3-43 (Lower)" if selected_status["current"] == "CNF" else "-"
            }
        ]
    }

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/pnr-status", methods=["POST"])
def check_pnr():
    data = request.get_json()
    pnr = data.get("pnr", "").strip()

    # PNR Validation (Must be 10 digits)
    if not pnr or len(pnr) != 10 or not pnr.isdigit():
        return jsonify({
            "success": False,
            "message": "Invalid PNR number. Please enter a 10-digit numeric PNR."
        }), 400

    # Retrieve status details
    result = get_mock_pnr_status(pnr)
    
    return jsonify({
        "success": True,
        "data": result
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)
