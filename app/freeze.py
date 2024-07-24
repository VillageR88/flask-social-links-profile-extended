from flask_frozen import Freezer
from app import create_app
import os

app = create_app()

project_dir = os.path.dirname(os.path.abspath(__file__))

app.config['FREEZER_BASE_URL'] = './'  # Base URL for the project

app.config['FREEZER_DESTINATION'] = os.path.join(project_dir, 'build')

app.config['FREEZER_REMOVE_EXTRA_FILES'] = False

freezer = Freezer(app)

if __name__ == '__main__':
    print(f"FREEZER_BASE_URL: {app.config['FREEZER_BASE_URL']}")
    print(f"FREEZER_DESTINATION: {app.config['FREEZER_DESTINATION']}")
    
    freezer.freeze()