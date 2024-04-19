from .callmodule import *

def quantity_imported():
     return To_Frame_Mysql('inventory', 'soluongnhaphang').get_data()

def total_quantily_imported():
     dt = quantity_imported()['Số_lượng_nhập']
     return f"{int(dt.sum()):,}"
def expense_db():
     return To_Frame_Mysql('web', 'expense').get_data()

def total_revenue():
     dt = To_Frame_Mysql('listoder', 'danhsachdathang').get_data()["Giá_sau_giảm"]
     return f"{int(dt.sum()):,}"

def pushMysql(data):
     df = pd.DataFrame([data])
     To_Frame_Mysql('web', 'danhsachdathang').add_data(df)
     return df

def address():
     _address = {}
     df = To_Frame_Mysql('customer', 'diachi').get_data()

     for index, row in df.iterrows():
          khu_vuc = row['Khu vực']
          phuong_xa = row['Phường xã']

          if khu_vuc not in _address:
               _address[khu_vuc] = []

          if phuong_xa not in _address[khu_vuc]:
               _address[khu_vuc].append(phuong_xa)
     return _address

def products():
     _product = {}
     df = To_Frame_Mysql('inventory', 'tonkho').get_data()[['Mã_hàng', 'Tên_hàng', 'Giá_bán']]
     df.columns = [column.replace('_', ' ') for column in df.columns]
     
     for index, row in df.iterrows():
          ma_hang = row['Mã hàng']
          ten_hang = row['Tên hàng']
          gia_ban = row['Giá bán']

          if ten_hang not in _product:
               _product[ten_hang] = []

          if ma_hang not in _product[ten_hang]:
               _product[ten_hang].append(ma_hang)

          if gia_ban not in _product[ten_hang]:
               _product[ten_hang].append(gia_ban)
     return _product
