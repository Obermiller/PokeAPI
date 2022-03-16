import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow
} from '@mui/material';
import React, { ChangeEvent, useContext, useState } from 'react';
import { capitalizeFirstLetter, formatMoveDisplay, levelSort, stringSort } from '../UtilityMethods';
import { MoveContext } from './MoveContext';

type MovesTableProps = {
	isNatural: boolean
}

type Column = {
	id: string;
	label: string;
	minWidth: number;
}

export function MovesTable({isNatural} : MovesTableProps): JSX.Element {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const moves = useContext(MoveContext);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const columns: Column[] = [
		...[{ id: 'name', label: 'Name', minWidth: 100 }],
		...(isNatural
			? [{ id: 'level', label: 'Level', minWidth: 100 }]
			: [{ id: 'method', label: 'Learning Method', minWidth: 100 }])
	];

	const rows = isNatural
		? moves.filter(x => x.version_group_details.map(y => y.level_learned_at)[0] > 0).sort((x, y) => levelSort(x, y))
		: moves.filter(x => x.version_group_details.map(y => y.level_learned_at)[0] === 0).sort((x, y) => stringSort(x.move.name, y.move.name))

	return (
		<div>
			<h3>{isNatural ? 'Natural' : 'Learnable'} Moves</h3>

			<Paper sx={{ width: '100%', overflow: 'hidden' }}>
				<TableContainer sx={{ maxHeight: 1000 }}>
					<Table stickyHeader aria-label='moves table'>
						<TableHead>
							<TableRow>
								{columns.map((column) => (
									<TableCell key={column.id} align='left' style={{ minWidth: column.minWidth }}>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{rows
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row) => {
									return (
										<TableRow hover key={row.move.name}>
											{columns.map((column) => {
												const columnId = column.id;
												return (
													<TableCell key={columnId} align='left'>
														{
															columnId === 'name'
																? formatMoveDisplay(row.move.name)
																: isNatural
																	? row.version_group_details.map(x => x.level_learned_at)[0]
																	: capitalizeFirstLetter(row.version_group_details.map(x => x.move_learn_method)[0].name)
														}
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