from application import app
from .crawler import *
from flask import render_template, request, redirect, url_for, flash

@app.route('/')
def home():
    return render_template(
        'home.html', 
        data=quantity_imported().to_dict(orient='records')
    )

@app.route('/dashboard')
def dashboard():
    return render_template(
        'dashboard.html', 
        total_quantily_imported=total_quantily_imported(), 
        total_revenue=total_revenue()
    )

@app.route('/expense')
def statistics():
    date_now = datetime.now().strftime("%Y-%m-%d")
    return render_template(
        'expense.html', 
        statistics=expense_db().to_dict(orient='records'), 
        now=date_now
    )
                        
@app.route('/tool')
def tool():
    return render_template(
        'tool.html'
    )

@app.route('/form', methods=['POST', 'GET'])
def form():
    nameInput = [
        "Tên_khách","Điện_thoại",
        "Địa_chỉ", "Khu_vực", "Phường_xã",
        "Tên_hàng"
    ]
    valuesInput = {}
    if request.method == 'POST':
        for name in nameInput:
            value = request.form[name]
            valuesInput['Ngày'] = datetime.now()
            valuesInput[name] = value
        pushMysql(valuesInput)
        return redirect(
            url_for(
                'table'
            )
        )
    else:
        return render_template(
            'form.html',
        )

@app.route("/table")
def table():
    return render_template(
        'table.html', 
        data=To_Frame_Mysql('web', 'danhsachdathang').get_data_new().to_dict(orient='records')
    )

@app.route("/test")
def test():
    return render_template(
        'test.html'
    )

@app.route('/add_expense', methods=['POST', 'GET'])
def add_expense():
    if request.method == "POST":
        return redirect(url_for('expense'))

