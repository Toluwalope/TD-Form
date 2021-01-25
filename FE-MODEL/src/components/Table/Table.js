import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [ { id: 'name', label: 'Name' }, { id: 'value', label: '\u00a0Value' } ];
const useStyles = makeStyles({
	root: {
		width: '100%'
	},
	container: {
		maxHeight: 440
	}
});
export default function StickyHeadTable({ data }) {
	const classes = useStyles();
	const [ page, setPage ] = React.useState(0);
	const [ rowsPerPage, setRowsPerPage ] = React.useState(10);
	// const createData = (name, value, i) => {
	//   return { id: i, name, value: JSON.stringify(value) };
	// };

	const createData = (name, value, i) => {
		switch (name) {
			case 'industry':
				name = 'Industry';
				break;
			case 'industryState':
				name = 'Industry State';
				break;
			case 'otherIndustry':
				name = 'Other Industry';
				break;
			case 'otherIndustryState':
				name = 'Other Industry State';
				break;
			case 'projectName':
				name = 'Project Name';
				break;
			case 'projectNameState':
				name = 'Project Name State';
				break;
			case 'contractType':
				name = 'Contract Type';
				break;
			case 'contractTypeState':
				name = 'Contract Type State';
				break;

			case 'otherContractType':
				name = 'Other Contract Type';
				break;
			case 'otherContractTypeState':
				name = 'other ContractType State';
				break;
			case 'Contract Type State':
				name = 'Contract Type';
				break;
			case 'Contract Type State':
				name = 'Contract Type';
				break;
			case 'Contract Type State':
				name = 'Contract Type';
				break;
			case 'Contract Type State':
				name = 'Contract Type';
				break;

			case 'hoursSupport':
				name = 'Hours Support';
				break;
			case 'hoursSupportState':
				name = 'Hours Support State';
				break;
			case 'degreeSupport':
				name = 'Degree Support';
				break;
			case 'degreeSupportState ':
				name = 'Degree Support State';
				break;
			case 'disableOtherIndustry':
				name = 'Disable Other Industry';
				break;
			case 'disableOtherContractType':
				name = 'Disable Other Contract Type';
				break;
			case 'val':
				name = 'value';
				break;

			/** here you need to make as many cases as there are attribute,
          each case will change the value to each attribute*/
		}
		return { id: i, name, value: JSON.stringify(value) };
	};
	//
	const rows = [ ...data.map(({ name, value }, i) => createData(name, value, i)) ];
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper className={classes.root}>
			<TableContainer className={classes.container}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
							return (
								<TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
									{columns.map((column) => {
										const value = row[column.id];
										return (
											<TableCell key={column.id} align={column.align}>
												{
													column.format && typeof value === 'number' ? column.format(value) :
													value}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[ 10, 25, 100 ]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}
