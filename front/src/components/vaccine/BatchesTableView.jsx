import { DataGrid } from '@mui/x-data-grid';

export function BatchesTableView(props) {
  const { batches } = props;
  if(!batches) {
    return null;
  }

  const columns = [
    {field: 'lote', headerName: 'Lote', width: '600'},
    {field: 'nome', headerName: 'Nome', width: '600'},
    {field: 'cnpj', headerName: 'CNPJ', width: '600'},
  ];

  const rows = [];
  let i = 0;
  Object.entries(batches).map(p => {
    rows.push({
      id: i++,
      lote: p[1].lote,
      nome: p[1].nome,
      cnpj: p[1].CNPJ
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
  );
}