from flask import Flask, render_template, send_from_directory, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
import os
import json
import requests
import logging
import sys

load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config["ENV"] = os.getenv("ENV")
    fetch_url = os.getenv("EXTERNAL_API_URL")

    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger(__name__)

    # Determine the base directory
    if getattr(sys, "frozen", False):
        # If the application is run as a bundle, the PyInstaller bootloader
        # extends the sys module by a flag frozen=True and sets the app
        # path into variable _MEIPASS'.
        base_dir = sys._MEIPASS
    else:
        base_dir = os.path.dirname(os.path.abspath(__file__))

    data_file_path = os.path.join(
        base_dir, "_internal", "static", "data", "allUsernames.json"
    )

    if os.path.exists(data_file_path):
        with open(data_file_path, "r", encoding="utf-8") as file:
            data = json.load(file)
    else:
        logger.warning(f"File not found: {data_file_path}")
        # Handle the missing file scenario, e.g., create an empty file or use default data
        os.makedirs(os.path.dirname(data_file_path), exist_ok=True)
        with open(data_file_path, "w", encoding="utf-8") as file:
            file.write("[]")  # Write an empty JSON array or default content
        data = []

    @app.route("/")
    def index():
        context = {
            "siteTitle": "Social links profile extended",
            "data": data,
            "fetch_url": fetch_url,
        }
        return render_template("index.html", **context)

    @app.route("/robots.txt")
    def robots_txt():
        return send_from_directory(app.static_folder, "robots.txt")

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)