import DataTable from 'react-data-table-component';

const columns = [
  {
    name: 'Lote',
    selector: row => row.lote,
  },
  {
    name: 'Nome',
    selector: row => row.nome,
  },
	{
    name: 'CNPJ',
    selector: row => row.CNPJ,
  }
];

export function BatchesTableView(props) {
  const { batches } = props;
  if(!batches) {
    return null;
  }

  return (
    <DataTable
      columns={columns}
      data={batches}
    />
  );
}