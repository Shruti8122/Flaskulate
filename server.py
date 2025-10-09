from flask import Flask ,render_template
app = Flask(__name__)

# Define a route for the home page ("/")
@app.route('/')
def render_index():
    return render_template("index.html")

# Run the application (optional for flask run, but useful for running as a python script)
if __name__ == '__main__':
    app.run(debug = True , port = 5000)