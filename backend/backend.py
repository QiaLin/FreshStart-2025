from flask import Flask, request, jsonify
import json
from datetime import datetime, timedelta

from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# File to store user data
DATA_FILE = "data.json"

# Load or initialize user data
def load_data():
    try:
        with open(DATA_FILE, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return {"daily_goals": [], "habits": {}, "reflections": {}}
    except json.JSONDecodeError:
        return {"daily_goals": [], "habits": {}, "reflections": {}}

def save_data(data):
    try:
        with open(DATA_FILE, "w") as f:
            json.dump(data, f, indent=4)
    except Exception as e:
        raise IOError(f"Error saving data: {e}")

# Flask route: Daily Goal
@app.route("/goal", methods=["GET", "POST"])
def daily_goal():
    data = load_data()
    if request.method == "POST":
        try:
            goal = request.json.get("goal")
            if not goal:
                return jsonify({"error": "Goal is required"}), 400

            # Avoid duplicate goals for the same date
            today = str(datetime.now().date())
            if any(g["date"] == today and g["goal"] == goal for g in data["daily_goals"]):
                return jsonify({"error": "Goal already exists for today"}), 400

            data["daily_goals"].append({"date": today, "goal": goal})
            save_data(data)
            return jsonify({"message": "Goal set successfully!"}), 200
        except Exception as e:
            return jsonify({"error": f"Unexpected error: {e}"}), 500
    return jsonify(data.get("daily_goals", []))

# Flask route: Habits
@app.route("/habits", methods=["GET", "POST"])
def habits():
    data = load_data()
    if request.method == "POST":
        try:
            habit = request.json.get("habit")
            if not habit:
                return jsonify({"error": "Habit is required"}), 400

            if habit not in data["habits"]:
                data["habits"][habit] = {"streak": 0, "last_completed": None}
                save_data(data)
                return jsonify({"message": "Habit added successfully!"}), 200
            return jsonify({"error": "Habit already exists"}), 400
        except Exception as e:
            return jsonify({"error": f"Unexpected error: {e}"}), 500
    return jsonify(data.get("habits", {}))



# Flask route: Complete a Habit
@app.route("/habits/complete", methods=["POST"])
def complete_habit():
    data = load_data()

    try:
        habit = request.json.get("habit")
        if not habit:
            return jsonify({"error": "Habit is required"}), 400

        if habit not in data["habits"]:
            return jsonify({"error": f"Habit '{habit}' does not exist"}), 400

        today = str(datetime.now().date())
        habit_data = data["habits"][habit]
        last_completed = habit_data["last_completed"]
        
        print(type(habit_data))
        # Check if the habit was completed today
        if last_completed == today:
            return jsonify({
                "streak"  : habit_data["streak"],
                "last_completed"  : habit_data["last_completed"],
                "message": f"You already completed '{habit}' today."}), 200

        # Check if the habit was completed yesterday
        if last_completed is None or last_completed == str(datetime.now().date() - timedelta(days=1)):
            habit_data["streak"] += 1
        else:
            habit_data["streak"] = 1  # Reset streak if it wasn't completed yesterday

        habit_data["last_completed"] = today
      
        save_data(data)

        # Return the message along with the updated streak
        return jsonify({                
            "streak"  : habit_data["streak"],
            "last_completed"  : habit_data["last_completed"],
            "message": f"'{habit}' completed! Current streak: {habit_data['streak']} days.",
            }), 200

    except Exception as e:
        return jsonify({"error": f"Unexpected error: {e}"}), 500

@app.route("/habits/delete", methods=["DELETE"])
def delete_habit():
    data = load_data()
    try:
        habit_name = request.json.get("habit")
        if not habit_name:
            return jsonify({"error": "Habit name is required"}), 400

        if habit_name not in data["habits"]:
            return jsonify({"error": "Habit does not exist"}), 400

        # Delete the habit
        del data["habits"][habit_name]
        save_data(data)

        return jsonify({"message": f"Habit '{habit_name}' has been deleted successfully."}), 200
    except Exception as e:
        return jsonify({"error": f"Unexpected error: {e}"}), 500


# Flask route: Reflections
@app.route("/reflect", methods=["GET", "POST"])
def reflect():
    data = load_data()
    if request.method == "POST":
        try:
            reflection = request.json.get("reflection")
            if not reflection:
                return jsonify({"error": "Reflection is required"}), 400

            date = str(datetime.now().date())
            if date in data["reflections"]:
                return jsonify({"error": "Reflection already exists for today"}), 400

            data["reflections"][date] = reflection
            save_data(data)
            return jsonify({"message": "Reflection added successfully!"}), 200
        except Exception as e:
            return jsonify({"error": f"Unexpected error: {e}"}), 500
    return jsonify(data.get("reflections", {}))

# Global error handler
@app.errorhandler(404)
def handle_404(e):
    return jsonify({"error": "Endpoint not found"}), 404

@app.errorhandler(500)
def handle_500(e):
    return jsonify({"error": "Internal server error"}), 500

if __name__ == "__main__":
    app.run(debug=True)
