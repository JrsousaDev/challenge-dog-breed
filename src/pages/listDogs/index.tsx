import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import { getListDogs } from "../../api/dogs/getListDogs";
import { getListDogsByBreed } from "../../api/dogs/getListDogsByBreed";
import { CardDogs } from "../../components/Card";
import { Header } from "../../components/Header";
import { ModalPhoto } from "../../components/ModalPhoto";
import { Container, ContainerCards, ContainerSelectBreed, Content } from "./styles";

import useDisclosure from "../../hooks/useDiscloure";

export default function ListDogs() {
  const [loading, setLoading] = useState(false);
  const [listDogs, setListDogs] = useState([]);
  const [breedTitle, setBreedTitle] = useState<string>('');
  const [breed, setBreed] = useState<string>('');
  const [imageSelected, setImageSelected] = useState<string>('');

  const { handleClose, handleOpen, isOpen } = useDisclosure();

  const handleOpenModalAndSelectImage = (image: string) => {
    setImageSelected(image);
    handleOpen();
  }

  const handleChangeBreed = (event: SelectChangeEvent) => {
    setBreed(event.target.value as string);
  };

  useEffect(() => {
    (async () => {
      const response = await getListDogs();
      setBreedTitle(response.breed)
      setListDogs(response.list);
    })()
  }, []);

  const handleSearchDogsByBreed = async () => {
    setLoading(true)

    try {
      const response = await getListDogsByBreed({ breed });
      setBreedTitle(response.breed);
      setListDogs(response.list);
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const optionSelectedBreed = breed !== '' ? false : true;

  return (
    <>
      <ModalPhoto
        closeModal={handleClose}
        modalIsOpen={isOpen}
        img={imageSelected}
      />

      <Container>
        <Header />

        <Content>
          <ContainerSelectBreed>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Raça</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={breed}
                label="breed"
                onChange={handleChangeBreed}
              >
                <MenuItem value={'chihuahua'}>Chihuahua</MenuItem>
                <MenuItem value={'husky'}>Husky</MenuItem>
                <MenuItem value={'pug'}>Pug</MenuItem>
                <MenuItem value={'labrador'}>Labrador</MenuItem>
              </Select>
            </FormControl>

            <Button 
              variant="contained" 
              onClick={handleSearchDogsByBreed}
              disabled={optionSelectedBreed}
            >
              {loading ? (
                <CircularProgress color="inherit" size={25} />
              ) : (
                'Pesquisar'
              )}
            </Button>
          </ContainerSelectBreed>

          <Typography gutterBottom variant="h4">
            Raça selecionada: <strong>{breedTitle}</strong>
          </Typography>

          <ContainerCards>
            {listDogs.map(image => (
              <CardDogs
                image={image}
                onHandleOpenModalPhoto={handleOpenModalAndSelectImage}
              />
            ))}
          </ContainerCards>

        </Content>

      </Container>
    </>
  )
}