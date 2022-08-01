import { DataGrid } from '@mui/x-data-grid';

function getIdade (dateString) {
  var hoje = new Date();
  var data_nasc = new Date(dateString);
  var idade = hoje.getFullYear() - data_nasc.getFullYear();
  var mes = hoje.getMonth() - data_nasc.getMonth();
  if (mes < 0 || (mes === 0 && hoje.getDate() < data_nasc.getDate())) {
    idade--;
  }
  return idade;
}

export function PatientList(props) {
  if(!props.patientIds) {
    return null;
  }

  const columns = [
    {field: 'id', headerName: 'ID', width: '600'},
    {field: 'data_nasc', headerName: 'Data de Nascimento', width: '350'},
    {field: 'idade', headerName: 'Idade', width: '350'},
    {field: 'cep', headerName: 'CEP', width: '300'},
    {field: 'uf', headerName: 'UF', width: '300'},
  ]

  const rows = [];
  Object.entries(props.patientIds).map(p => {
    let data_nasc = String(p[1].data_nasc).split('T')[0];
    let data = data_nasc.split('-');
    rows.push({
      id: p[1].paciente_id,
      data_nasc: `${data[2]}/${data[1]}/${data[0]}`,
      idade: getIdade(data_nasc),
      cep: p[1].endereco_cep,
      uf: p[1].endereco_uf
    });
  });
  
  return (
    <>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        ></DataGrid>
      </div>
    </>
  )
}