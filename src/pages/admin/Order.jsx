import { useState, useEffect } from 'react';
import auth from '../../helpers/auth';
import { numberFormat } from "../../helpers/helpers";
import CustomTableView from "../../components/CustomTableView";
import FlightServices from '../../services/FlightServices';

const Order = () => {
  const token = auth.isAuthenticated().token
  const [order, setOrder] = useState(Array)
  const [change, setChange] = useState(false)

  useEffect(() => {
    FlightServices.listOrder(token).then((data) => {
      if(data.result){
        setOrder(data.result)
        setChange(false)
      }
    })
  }, [change, token])

  const columns = [
    { field: 'id', headerName: 'ID', width: 175},
    { field: 'fullName', headerName: 'Nama Kontak', flex: 1, valueGetter: (values, row) => `${row.contact_details.first_name} ${row.contact_details.last_name}`},
    { field: 'mobile_number', headerName: 'Nomor Telepon', flex: 1, valueGetter: (values, row) => row.contact_details.mobile_number},
    { field: 'created_at', headerName: 'Tanggal', flex: 1, valueFormatter: params => params.replace('T', ' ').replace('Z', '').split('.')[0]},
    { field: 'price', headerName: 'Jumlah Bayar', flex: 1, valueFormatter: params => `Rp. ${numberFormat(params.$numberDecimal)}`},
    { field: 'status', headerName: 'Status Pembayaran', flex: 1, valueFormatter: params => params == 'pending' ? 'Belum bayar' : 'Lunas'},
    { field: 'user', headerName: 'Pembeli', flex: 1, valueGetter: params => params.name},
  ];

  return(
    <div>
      <CustomTableView data={order} columns={columns} menu='Flight Order' />
    </div>
  )
}

export default Order;