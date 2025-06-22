import { MulterModuleOptions } from '@nestjs/platform-express';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig: MulterModuleOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const category = req.body.categoria || 'hombres';
      const basePath = 'E:\\10mo Semestre\\Sistemas de Información Empresarial\\Proyecto\\mi-proyecto-main\\public\\images';
      const uploadPath = `${basePath}\\${category}`;
      if (!existsSync(uploadPath)) mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const category = req.body.categoria || 'hombres';
      const basePath = 'E:\\10mo Semestre\\Sistemas de Información Empresarial\\Proyecto\\mi-proyecto-main\\public\\images';
      const files = existsSync(`${basePath}\\${category}`) 
        ? require('fs').readdirSync(`${basePath}\\${category}`).filter(f => f.startsWith(getPrefix(category))) 
        : [];
      const nextNumber = files.length > 0 ? Math.max(...files.map(f => parseInt(f.split('_')[1]))) + 1 : 1;
      const prefix = getPrefix(category);
      cb(null, `${prefix}${nextNumber}${extname(file.originalname)}`);
    },
  }),
};

function getPrefix(category: string): string {
  const prefixes = { hombres: 'H_', mujeres: 'M_', ninas: 'Na_', ninos: 'No_' };
  return prefixes[category.toLowerCase()] || 'U_';
}