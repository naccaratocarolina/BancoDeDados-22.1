import DataTable from 'react-data-table-component';

const columns = [
  {
    name: 'Nome',
    selector: row => row.nome,
  },
  {
    name: 'CNPJ',
    selector: row => row.CNPJ,
  },
	{
		name: 'Logo',
		grow: 0,
		cell: row => <img height="84px" width="56px" alt={row.nome} src={`data:image/png;base64, ${row.logo}`} />
  }
];

export function FabricatorsTableView(props) {
  const { fabricators } = props;
  if(!fabricators) {
    return null;
  }

  console.log(fabricators)

  return (
    <DataTable
      columns={columns}
      data={fabricators}
    />
  );
}