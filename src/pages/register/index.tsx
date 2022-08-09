import * as yup from "yup";

import { Container, FormWrapper } from './styles';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { registerUser } from '../../api/user/registerUser';
import { yupResolver } from '@hookform/resolvers/yup';

type RegisterData = {
  email: string;
};

const registerSchema = yup.object({
  email: yup.string().email('E-mail inválido').required('Campo obrigatório'),
}).required();

export default function Register() {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = 
  useForm<RegisterData>({
    resolver: yupResolver(registerSchema)
  });

  async function handleRegister(data: RegisterData) {
    setLoading(true);

    try {
      await registerUser(data);
    } catch (error) {
      console.log('error trycatch')
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Container>
        <FormWrapper as="form" onSubmit={handleSubmit(handleRegister)}>

          <Typography variant='h3'>
            Challenge Dog Breed
          </Typography>

          <Typography
            variant='subtitle1'
            style={{ marginTop: '1rem' }}
          >
            Por favor, crie sua conta para continuar.
          </Typography>

          <Box className='input-wrapper'>

            <TextField
              label="E-mail"
              variant="outlined"
              error={!!errors?.email}
              {...register('email')}
              helperText={errors?.email?.message}
            />

          </Box>

          <Box className="button-wrapper">
            <Button
              type='submit'
              variant="contained"
              fullWidth
            >
              {loading ? (
                <CircularProgress color="inherit" size={25}/>
              ) : (
                'Registrar'
              )}
            </Button>
          </Box>

        </FormWrapper>
      </Container>
    </>
  )
}