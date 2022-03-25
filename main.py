# import "packages" from flask
from flask import Flask, render_template
from __init__ import app

from templates.travel import tennis_pg
app.register_blueprint(tennis_pg)




@app.route('/')
def index():
    return render_template("index.html")



# runs the application on the development server
if __name__ == "__main__":
    app.run(debug=True)
