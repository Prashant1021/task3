
const express = require('express');
const fs = require('fs');
const app = express();
const data=require("./user.json")
const product=require("./product.json")

app.use(express.json());


app.post('/creates', (req, res) => {
  try {
    const newData = req.body;
    data.push(newData);
    fs.writeFile('./user.json', JSON.stringify(data, null, 2), (err) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.json({ message: 'Data added successfully', newData });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});





app.get('/gets',(req,res)=>{
  try {
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ message: 'Data not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }


})

app.get('/gets-specific/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const item = data.find((entry) => entry.id === id);

    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Data with specified ID not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})


app.patch('/updates/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updateData = req.body;

    const index = data.findIndex((entry) => entry.id === id);

    if (index !== -1) {
      data[index] = { ...data[index], ...updateData };

      
      fs.writeFile('./user.json', JSON.stringify(data, null, 2), (err) => {
        if (err) {
          res.status(500).json({ message: err.message });
        } else {
          res.json({ message: 'Data updated successfully', updatedData: data[index] });
        }
      });
    } else {
      res.status(404).json({ message: 'Data with specified ID not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.delete('/deletes/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const index = data.findIndex((entry) => entry.id === id);

    if (index !== -1) {
      const deletedItem = data.splice(index, 1);

      
      fs.writeFile('./user.json', JSON.stringify(data, null, 2), (err) => {
        if (err) {
          res.status(500).json({ message: err.message });
        } else {
          res.json({ message: 'Data deleted successfully', deletedData: deletedItem[0] });
        }
      });
    } else {
      res.status(404).json({ message: 'Data with specified ID not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




//*for product api
app.post('/product-creates', (req, res) => {
  try {
    const newProduct = req.body;
    console.log(newProduct);
    product.push(newProduct);

    
    fs.writeFile('./product.json', JSON.stringify(product, null, 2), (err) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.json({ message: 'Data added successfully', newProduct });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});





app.get('/product-gets',(req,res)=>{
  try {
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Data not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }


})



app.get('/specific-product/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const _product = product.find((entry) => entry.id === id);

    if (_product) {
      res.json(_product);
    } else {
      res.status(404).json({ message: 'Data with specified ID not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})





app.patch('/product-updates/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updateProduct = req.body;

    const index = product.findIndex((entry) => entry.id === id);

    if (index !== -1) {
      product[index] = { ...product[index], ...updateProduct };

      
      fs.writeFile('./product.json', JSON.stringify(product, null, 2), (err) => {
        if (err) {
          res.status(500).json({ message: err.message });
        } else {
          res.json({ message: 'Data updated successfully', updateProduct: product[index] });
        }
      });
    } else {
      res.status(404).json({ message: 'Data with specified ID not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});





app.delete('/product-deletes/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const index = product.findIndex((entry) => entry.id === id);

    if (index !== -1) {
      const deletedItem = product.splice(index, 1);

      
      fs.writeFile('./product.json', JSON.stringify(product, null, 2), (err) => {
        if (err) {
          res.status(500).json({ message: err.message });
        } else {
          res.json({ message: 'Data deleted successfully', deletedProduct: deletedItem[0] });
        }
      });
    } else {
      res.status(404).json({ message: 'Data with specified ID not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});






//* sorting
//*search by product_type
app.get('/product-filter-product-type', (req, res) => {
  try {
    const { product_type:productType } = req.query;

    let filteredProducts = [...product];
    if (productType) {
      filteredProducts = filteredProducts.filter((entry) =>
        entry.product_type.toLowerCase() === productType.toLowerCase()
      );
    }

    res.json(filteredProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.get('/products-name-description',(req,res)=>{
  const { name:searchName, description:searchDescription} = req.query;
  try {
    let filteredProducts = [...product];
    if (searchName) {
      filteredProducts = filteredProducts.filter((entry) =>
        entry.name.toLowerCase().includes(searchName.toLowerCase())
      );
      res.json(filteredProducts)
    }
    if (searchDescription) {
      filteredProducts = filteredProducts.filter((entry) =>
        entry.description.toLowerCase().includes(searchDescription.toLowerCase())
      );
      res.json(filteredProducts)
    }
    
  } catch (error) {
    res.json({message: error.message})
    
  }

})



app.patch('/update-quantity/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { quantity } = req.body;

    const productIndex = product.findIndex((entry) => entry.id === id);

    if (productIndex !== -1) {
      product[productIndex].quantity = quantity;

     
      fs.writeFile('./product.json', JSON.stringify(product, null, 2), (err) => {
        if (err) {
          res.status(500).json({ message: err.message });
        } else {
          res.json({
            message: 'Product quantity updated successfully',
            updatedProduct: product[productIndex],
          });
        }
      });
    } else {
      res.status(404).json({ message: 'Product with specified ID not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});





app.get('/out-of-stock', (req, res) => {
  try {
    const outOfStockProducts = product.filter((entry) => entry.quantity < 5);

    if (outOfStockProducts.length > 0) {
      res.json(outOfStockProducts);
    } else {
      res.status(404).json({ message: 'No out-of-stock products found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});







  
app.listen(3000,()=>{
    console.log("app is listening on port 3000");
});
