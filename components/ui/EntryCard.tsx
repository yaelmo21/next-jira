import { DragEvent, FC, useContext } from 'react';
import { Entry } from '../../interfaces/entry';
import { UIContext } from '../../context/ui/UIContext';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { startDraggind, endDraggind } = useContext(UIContext);
  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData('text', entry._id);
    startDraggind();
  };

  const onDragEnd = () => {
    endDraggind();
  };
  return (
    <Card
      sx={{
        marginBottom: 1,
      }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>
            {entry.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'end',
            paddingRight: 2,
          }}
        >
          <Typography variant='body2'>Hace 30 minutos</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
