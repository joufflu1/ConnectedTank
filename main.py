
#!/usr/bin/env python
from flask import Flask, render_template

app = Flask(__name__)
#sensor = Adafruit_DHT.DHT22
#pin = 4
 
@app.route("/")
def main():
   #humidity, temperature = Adafruit_DHT.read_retry(sensor, pin)
   humidity = 95
   temperature = 45
   templateData = {
       'temperature' : temperature,
       'humidity': humidity
      }
   return render_template('main.html', **templateData)
 
if __name__ == "__main__":
   app.run(host='0.0.0.0', port=5000, debug=True)
