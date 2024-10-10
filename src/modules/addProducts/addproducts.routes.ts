import { Router } from 'express';
import { ProductController } from './addproducts.controller';
import multer from 'multer';
import path from 'path';

const productRoutes = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../delyfood/public/uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
  });
  
  const fileFilter = (req: any, file: any, cb: any) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter
  });
  
  productRoutes.post('/add', upload.single('image'), ProductController.addProduct);
  productRoutes.get('/products', ProductController.getProducts);
  productRoutes.get('/product/:id', ProductController.getProduct);
  productRoutes.put('/product/:id', ProductController.updateProduct);
  productRoutes.delete('/product/:id', ProductController.deleteProduct);
  
  export { productRoutes };