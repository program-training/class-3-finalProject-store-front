import { useState, useEffect} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const ProductCart = () => {
  const [products, setProducts] = useState([
    {
      category: "gadgets",
      description: "Description for Nintendo Switch",
      discountPercentage: 12,
      image: {
        alt: "Nintendo Switch Image",
        large:
          "https://raw.githubusercontent.com/akiva1132/filesServer/master/dist/products/gadgets/nintendoswitch_600.png?raw=true",
        medium:
          "https://raw.githubusercontent.com/akiva1132/filesServer/master/dist/products/gadgets/nintendoswitch_300.png?raw=true",
        small:
          "https://raw.githubusercontent.com/akiva1132/filesServer/master/dist/products/gadgets/nintendoswitch_150.png?raw=true",
      },
      name: "Nintendo Switch nwe",
      quantity: 60,
      salePrice: 91,
      _id: "655f1cbddab13343a8db795c",
    },
  ]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch("")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("There was a problem fetching the data:", error);
      });
  }, []);
  const addQuantity = () => {
    setQuantity((quantity) => (quantity += 1));
  };
  const reduceQuantity = () => {
    setQuantity((quantity) => (quantity -= 1));
    if (quantity < 1) {
      setQuantity(0);
    }
  };

  return (
    <div className="product-cart">
      <h1></h1>
      <div className="products-list">
        {products.map((product) => (
          <Card sx={{ maxWidth: 232 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={product.image.small}
                alt={product.image.alt}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.salePrice}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {/* להוסיף כפתורים ובתוכם אייקונים פלוס ומינוס 
                    שיפעילו את הפונקצויות פלוס ומינוס  בהתאמה */}
                  <IconButton>
                    <AddCircleOutlineIcon onClick={addQuantity} />
                  </IconButton>
                  {quantity}
                  <IconButton>
                    <RemoveCircleOutlineIcon onClick={reduceQuantity} />
                  </IconButton>
                  <IconButton>
                    <DeleteForeverIcon />
                  </IconButton>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductCart;
