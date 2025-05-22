from flask import Flask, request, jsonify
import requests
from flask_cors import CORS  # Corrected import

app = Flask(__name__)
CORS(app)  # Enable CORS globally

SLACK_TOKEN = "xoxb-8922845013651-8929130147797-0F5ftzQSm3OrAoiJibEzLpvi"
CHANNEL = "#team-proactive"

@app.route('/send-slack-message', methods=['POST'])
def send_message():
    data = request.get_json()
    text = data.get('text')

    headers = {
        "Authorization": f"Bearer {SLACK_TOKEN}",
        "Content-type": "application/json; charset=utf-8"
    }

    slack_data = {
        "channel": CHANNEL,
        "text": text
    }

    slack_response = requests.post("https://slack.com/api/chat.postMessage",
                                   headers=headers, json=slack_data)

    return jsonify(slack_response.json()), slack_response.status_code

if __name__ == '__main__':
    app.run(debug=True)
