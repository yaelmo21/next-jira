import { GetServerSideProps, NextPage } from 'next';
import { ChangeEvent, useMemo, useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  capitalize,
} from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { Layout } from '../../components/layouts';
import { EntryStatus } from '../../interfaces';
import { isValidObjectId } from 'mongoose';

interface Props {
  id: string;
}

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

const EntryPage: NextPage<Props> = (props) => {
  console.log(props);
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState<EntryStatus>('pending');
  const [touched, setTouched] = useState(false);
  const isNotValid = useMemo(
    () => inputValue.length <= 0 && touched,
    [inputValue, touched],
  );

  const onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };

  const onSave = () => {
    console.log({
      inputValue,
      status,
    });
  };

  return (
    <Layout title='.......'>
      <Grid
        container
        justifyContent='center'
        sx={{
          marginTop: 2,
        }}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada: ${inputValue}`}
              subheader={`Creada hace: ... minutos`}
            />
            <CardContent>
              <TextField
                sx={{
                  marginTop: 2,
                  marginBottom: 1,
                }}
                fullWidth
                placeholder='Nueva entrada'
                autoFocus
                multiline
                label='Título'
                value={inputValue}
                onBlur={() => setTouched(true)}
                onChange={onInputValueChange}
                error={isNotValid}
                helperText={isNotValid && 'Ingrese un valor'}
              />
              <FormControl>
                <FormLabel>Estado</FormLabel>
                <RadioGroup row value={status} onChange={onStatusChanged}>
                  {validStatus.map((opt) => (
                    <FormControlLabel
                      key={opt}
                      value={opt}
                      control={<Radio />}
                      label={capitalize(opt)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveOutlinedIcon />}
                variant='contained'
                fullWidth
                onClick={onSave}
                disabled={inputValue.length <= 0}
              >
                Guardar
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          bgcolor: 'error.main',
        }}
      >
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  if (!isValidObjectId(id)) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      id,
    },
  };
};

export default EntryPage;
