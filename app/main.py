import sys
from PyQt5.QtWidgets import QApplication, QMainWindow
from PyQt5.QtWebEngineWidgets import QWebEngineView
from PyQt5.QtCore import QUrl  # Import QUrl
from threading import Thread
from appPortable import create_app  # Import the create_app function

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.browser = QWebEngineView()
        self.browser.setUrl(QUrl("http://127.0.0.1:5000"))  # Convert string to QUrl
        self.setCentralWidget(self.browser)
        self.showMaximized()

def run_flask():
    app = create_app()  # Create the Flask app instance
    app.run(debug=True, use_reloader=False)

if __name__ == "__main__":
    flask_thread = Thread(target=run_flask)
    flask_thread.start()

    qt_app = QApplication(sys.argv)
    window = MainWindow()
    sys.exit(qt_app.exec_())