# -------------------------
# CONSTANTS TO BE USED BY ANALYZER
# -------------------------

SEVERITY_MAP = {
    "NAME": "high",
    "EMAIL_ADDRESS": "high",
    "PHONE_NUMBER": "high",
    "CREDIT_CARD": "high",
    "SW_SECURITY_NUMBER": "high",
    "GPS_COORDINATES": "medium",
    "IP_ADDRESS": "low",
    "MAC_ADDRESS": "low",
    "DEVICE_ID": "low",
    "VIN": "low",
    "UUID": "low",
    
    "ALCOHOL": "high",
    "BIOMETRIC": "high",
    "DMS_OMS": "high",
    "CAMERA": "high",
    "SPEED": "high",
    "SAFETY_EVENTS": "high",
    "VIOLATIONS": "high",
    "BEHAVIORAL_STATE": "high",
}

BIOMETRIC_WORDS = [
    "alcohol", "breath","blood", "weight","breathalyzer", "ethanol",
    "heartbeat", "heart_rate", "hrv", "pulse_rate", "cardio", "blood_pressure",
    "fatigue", "drowsy", "drowsiness", "microsleep", "sleepiness", "alertness",
    "attention", "gaze", "gaze_angle", "eye_tracking", "eye_state", "pupil_diameter", 
    "blink_rate", "eye_opening", "head_orientation", "head_pose",
    "reaction_time", "tiredness", "stress"
]

IN_CABIN_CAMERA = [
    "dms", "oms", "monitoring", "camera", "occupant", "occupant_position", "seat_occupancy", "seatbelt_status", 
    "face_track", "face_tracking", "face_detection", "face_recognition", "head_pose",
    "eye_tracking_camera", "gaze_tracking", "head_tracking", 
    "dms_alert", "attention_monitor", "driver_monitor", "driver_monitoring", "infrared_camera", 
    "depth_camera", "in_cabin_sensor", "infrared_sensor", "lidar_interior", "driver_face"
]

CRIMINAL_INDICATORS = [
    "speeding", "overspeed", "over_speed", "speed_violation", "over_speeding", "speed_limit_exceed",
    "crash_recorder", "collision_detected", "impact_force", "impact_event", "accident_recorded",
    "crash_event", "vehicle_crash", "harsh_brake", "hard_brake", "sudden_brake", "harsh_acceleration",
    "lane_departure", "dangerous_maneuver", "fail_to_stop", "red_light_violation", "illegal",
    "fail_to_yield", "unsafe_driving", "rollover", "emergency_stop", "airbag", "offence", "aggressive", "harsh"
]

HTML_TEMPLATE = """
<html>
<head>
<link rel="stylesheet" href="styles.css">
</head>
<body>

<h1 style="text-align: center; margin-top: 0;">GDPR Scan Report</h1>

<div class="container">
    <div class="summary-container">
        <div class="summary {summary_class}">
            <h2 style="margin-top: 0;">GDPR Compliance: {gdpr_message}</h2>
            <p>Total flagged entries: {count}</p>

            <table>
                <thead>
                    <tr>
                        <th>Entity Type</th>
                        <th>Severity</th>
                        <th>Matches</th>
                    </tr>
                </thead>
                <tbody>
                    {summary_rows}
                </tbody>
            </table>
        </div>
    </div>
    <div class="entries-container">
        <div class="entries-filters">
            <select id="entityDropdown">
                <option value="">-- Filter Entity --</option>
            </select>
        </div>
        <div class="entries-list">
            {entries}
        </div>
    </div>
</div>

<script src="main.js"></script>
</body>
</html>
"""