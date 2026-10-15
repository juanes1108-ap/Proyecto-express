comandos para instalar orm 

npm install prisma@7 --save-dev

instalar cliente de prisma 
npm install @prisma/client@7 --save-dev

instalar el adaptador para postgres
npm install -D @prisma/adapter-pg@7 

librerioa para tsx yb poder seguir escribiendo archivos js con
la forma de importacion commonjs(ES Module)
npm install -d prisma@7 tsx


npx prisma init --datasource-provider postgresql


crear las tablas y generar cliente
npx prisma migrate dev --name inicio