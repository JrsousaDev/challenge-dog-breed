import { 
  CardActionArea, 
  CardContent, 
  Typography 
} from "@mui/material";

import { CardComponent, CardMediaComponent } from "./styles";

interface CardDogsProps {
  image: string;
  onHandleOpenModalPhoto: (image: string) => void;
}

export function CardDogs({ image, onHandleOpenModalPhoto }: CardDogsProps) {
  return (
    <CardComponent onClick={() => onHandleOpenModalPhoto(image)}>
      <CardActionArea>
        <CardMediaComponent img={image}/>
      </CardActionArea>
    </CardComponent>
  )
}