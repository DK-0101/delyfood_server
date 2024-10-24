import { Router } from 'express';
import { ProductController } from './addproducts.controller';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const productRoutes = Router();

const ensureDirectoryExists = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    const delyfoodDir = path.resolve(__dirname, '../../../../delyfood/public/uploads');
    const adminDir = path.resolve(__dirname, '../../../../admin/public/uploads');
    const localDir = path.resolve(__dirname, './public/uploads');

    ensureDirectoryExists(delyfoodDir);
    ensureDirectoryExists(adminDir);
    ensureDirectoryExists(localDir);

    cb(null, localDir);
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

const copyToAdditionalLocations = (filename: string) => {
  const localDir = path.resolve(__dirname, './public/uploads', filename);
  const delyfoodDir = path.resolve(__dirname, '../../../../delyfood/public/uploads', filename);
  const adminDir = path.resolve(__dirname, '../../../../admin/public/uploads', filename);

  fs.copyFileSync(localDir, delyfoodDir);
  fs.copyFileSync(localDir, adminDir);
};

productRoutes.post('/add', upload.single('image'), (req, res) => {
  if (req.file) {
    copyToAdditionalLocations(req.file.filename);
  }
  ProductController.addProduct(req, res);
});

productRoutes.get('/products', ProductController.getProducts);
productRoutes.get('/product/:id', ProductController.getProduct);
productRoutes.put('/product/:id', ProductController.updateProduct);
productRoutes.delete('/product/:id', ProductController.deleteProduct);

export { productRoutes };
