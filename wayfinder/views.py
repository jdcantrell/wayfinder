from wayfinder import app

@app.route('/')
def index():
  return 'hello friend'
