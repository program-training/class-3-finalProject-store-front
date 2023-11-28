import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

// interface Product {
//   _id: string;
//   name: string;
//   salePrice: number;
//   description: string;
//   category: string;
//   discountPercentage: number;
//   image: {
//     url: string;
//     alt: string;
//     small: string;
//   };
// }

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
  interface CartQuantity {
    [key: string]: number;
  }
  const [quantity, setQuantity] = useState<CartQuantity>({});

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
      });
    products.map((product) => {
      setQuantity({ ...quantity, [product._id]: 1 });
    });
    // const initialQuantities: { [key: string]: number } = {};
    // products.forEach((product) => {
    //   initialQuantities[product._id] = 0;
    // });
    //   .catch((error) => {
    //     console.error("There was a problem fetching the data:", error);
    //   });
  }, []);
  const addQuantity = (productId: string) => {
    const add = (quantity[productId] += 1);
    setQuantity({ ...quantity, add });
  };
  const reduceQuantity = (productId: string) => {
    if (quantity[productId] > 0) {
      const reduce = (quantity[productId] -= 1);
      setQuantity({ ...quantity, reduce });
    }
  };

  const removeFromCart = (indexProduct: number) => {
    const updatedCart = products.filter(
      (product, index) => indexProduct !== index
    );
    setProducts(updatedCart);
  };
  //   const removeFromCart = (indexProduct: number) => {
  //     const index = products.findIndex(indexProduct)
  //   };

  return (
    <div className="product-cart">
      <h1>Shopping Cart</h1>
      <div className="products-list">
        {products.map((product, index) => (
          // setQuantity({...quantity ,product._id: 1})
          <Card key={product._id} sx={{ maxWidth: 232 }}>
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
                    <AddCircleOutlineIcon
                      onClick={() => addQuantity(product._id)}
                    />
                  </IconButton>
                  {quantity[product._id]}
                  <IconButton onClick={() => reduceQuantity(product._id)}>
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                  <IconButton>
                    <DeleteForeverIcon onClick={() => removeFromCart(index)} />
                  </IconButton>
                  {/* לבדוק בגפט איך אני מוחק דיב מסויים כשהכפתור נלחץ על האלמנט */}
                  {/* הזה במפ */}
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
