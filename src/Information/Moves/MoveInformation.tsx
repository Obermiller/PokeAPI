import { Accordion, AccordionDetails, AccordionSummary, capitalize, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Move, MoveClient } from 'pokenode-ts';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AjaxResult } from '../../Common/Types/AjaxResult';
import { Store } from '../../Store/Store';
import { appendMove } from '../../Store/Types';
import { formatMoveDisplay } from '../../Common/Methods/UtilityMethods';
import PokemonType from '../Types/PokemonType';

type MoveInformationProps = {
	name: string,
	level: number,
	learnMethod: string
}

export default function MoveInformation({ name, level, learnMethod }: MoveInformationProps): JSX.Element {
	//Redux
	const storedMoves = useSelector((state: Store) => state.moves);
	const dispatch = useDispatch();

	const [move, setMove] = useState<Move | undefined>();
	//Ajax hooks
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<AjaxResult>();

	const getData = useCallback(async (): Promise<void> => {
		if (move || isLoading) {
			return
		}

		if (storedMoves.map(x => capitalize(x.name)).includes(name)) {
			setMove(storedMoves.filter(x => x.name === name.toLowerCase())[0]);
		}
		else {
			setIsLoading(true);

			await new MoveClient()
				.getMoveByName(name)
				.then((result: Move) => {
					setMove(result);
					dispatch(appendMove(result));
					if (error) {
						setError(undefined);
					}
				})
				.catch((err) => setError(err))
				.finally(() => setIsLoading(false));
		}
	}, [dispatch, error, isLoading, move, name, storedMoves]);

	return (
		<Accordion>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls='move-content'
				id='panel-header'
				onClick={getData}
			>
				<Typography className='move-name'>
					{formatMoveDisplay(name)}
				</Typography>
				<Typography sx={{ color: 'text.secondary' }}>
					{level > 0 ? `Level: ${level}` : `Learned from ${learnMethod}`}
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
				{isLoading &&
					<div>
						Loading...
					</div>
				}
				{!isLoading && !error && move &&
					<>
                        <Typography>
                            Type: <PokemonType name={capitalize(move.type.name)} />
                        </Typography>
	                    <Typography>
	                        Power: {move.power ?? 0}
	                    </Typography>
						<Typography>
							Damage Type: {capitalize(move.damage_class?.name ?? '')}
						</Typography>
                        <Typography>
                            Effect: {move?.effect_entries?.filter(x => x.language.name === 'en')[0]?.effect?.replace('$effect_chance%', `${move.effect_chance?.toString()}%` ?? '') ?? ''}
                        </Typography>
	                    <Typography>
	                        Accuracy: {move.accuracy ?? 100}
	                    </Typography>
                        <Typography>
                            Usages: {move.pp}
                        </Typography>
					</>
				}
				{!isLoading && error &&
					<div>
						Error accessing the API. {error.message}
					</div>
				}
				{!move &&
					<div>
						Issue with the application.
					</div>
				}
			</AccordionDetails>
		</Accordion>
	)
}