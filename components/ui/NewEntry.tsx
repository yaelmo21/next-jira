import { ChangeEvent, useState, useContext } from 'react';
import { Button, Box, TextField } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {
  const { addNewEntry } = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);
  const [inputValue, setInputValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const onTextfieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleReset = () => {
    setInputValue('');
    setIsAddingEntry(false);
    setIsTouched(false);
  };

  const onSave = () => {
    if (inputValue.length <= 0) return;
    addNewEntry(inputValue);
    handleReset();
  };
  return (
    <Box
      sx={{
        marginBottom: 2,
        paddingX: 1,
        paddingY: 1,
      }}
    >
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder='Nueva entrada'
            autoFocus
            multiline
            value={inputValue}
            onChange={onTextfieldChange}
            label='Nueva entrada'
            error={inputValue.length <= 0 && isTouched}
            onBlur={() => setIsTouched(true)}
            helperText={
              inputValue.length <= 0 && isTouched && 'Ingrese un valor'
            }
          />
          <Box display='flex' justifyContent='space-between'>
            <Button variant='outlined' color='error' onClick={handleReset}>
              cancelar
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              onClick={onSave}
              endIcon={<SaveOutlinedIcon />}
            >
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddCircleOutlineOutlinedIcon />}
          fullWidth
          variant='outlined'
          onClick={() => setIsAddingEntry(true)}
        >
          Agregar tarea
        </Button>
      )}
    </Box>
  );
};
