from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        print("Formulario enviado")
        return render_template('iniciar_sesion.html')
    else:
       
        return render_template('iniciar_sesion.html')

if __name__ == '__main__':
    app.run(debug=True)
