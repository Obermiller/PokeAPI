import { capitalize, Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Typography } from '@mui/material';
import { PokemonMove } from 'pokenode-ts';
import React, { ChangeEvent, useState } from 'react';
import { levelSort, stringSort } from '../../Common/Methods/UtilityMethods';
import MoveInformation from './MoveInformation';

type MovesTableProps = {
	isNatural: boolean,
	moves: PokemonMove[];
}

export function MovesTable({ isNatural, moves } : MovesTableProps): JSX.Element {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (event: unknown, newPage: number): void => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>): void => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const rows = isNatural
		? moves.sort((x, y) => levelSort(x, y))
		: moves.sort((x, y) => stringSort(x.move.name, y.move.name))

	return (
		<div>
			<Typography variant='h5'>{isNatural ? 'Natural' : 'Learnable'} Moves</Typography>

			<Paper className='move-table-wrapper'>
				<TableContainer className='move-table-container'>
					<Table stickyHeader aria-label='moves table'>
						<TableBody>
							{rows
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row) => {
									const moveName = row.move.name;
									return (
										<TableRow hover key={moveName}>
											<TableCell key={moveName} align='left'>
												<MoveInformation name={moveName} level={row.version_group_details.map(x => x.level_learned_at)[0]} learnMethod={capitalize(row.version_group_details.map(x => x.move_learn_method)[0].name)} />
											</TableCell>
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 25, 50, 100]}
					component='div'
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</div>
	);
}