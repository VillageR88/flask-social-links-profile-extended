from flask import Flask, render_template, send_from_directory, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
import os
import json
import requests
import logging

load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config['ENV'] = os.getenv('ENV')
    fetch_url = os.getenv('EXTERNAL_API_URL')


    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger(__name__)

    data_file_path = os.path.join(os.path.dirname(__file__), 'static/data', 'allUsernames.json')

    with open(data_file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)

    @app.route('/')
    def index():
        context = {
            'siteTitle': "Product list with cart extended",
            'mainTitle': "Desserts",
            'addToCartText': "Add to Cart",
            'data': data,
            'fetch_url': fetch_url
        }
        return render_template('index.html', **context)
    
    # only for server
    # @app.route('/api/', methods=['GET'])
    # def api_user():
    #     selected_user = request.args.get('id')
    #     if not selected_user:
    #         return jsonify({'error': 'User ID is required'}), 400

    #     external_api_url = os.getenv('EXTERNAL_API_URL')
    #     response = requests.get(f'{external_api_url}/?id={selected_user}', headers={"Content-Type": "application/json"})

    #     if response.status_code != 200:
    #         logger.error('Failed to fetch data from external API')
    #         return jsonify({'error': 'Failed to fetch data from external API'}), response.status_code

    #     return jsonify(response.json())    

    @app.route('/robots.txt')
    def robots_txt():
        return send_from_directory(app.static_folder, 'robots.txt')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)