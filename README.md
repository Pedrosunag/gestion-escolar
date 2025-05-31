# Actividad Final – Proyecto Gestión Escolar

Este proyecto corresponde a la **actividad final** de la materia **Desarrollo Web del Lado del Cliente**. Consiste en una API REST desarrollada con **Node.js**, **Express** y una base de datos **PostgreSQL**, diseñada para gestionar datos escolares: estudiantes, materias, maestros, cursos, clases e inscripciones.

---

## 👥 Integrantes del equipo

- Osuna Gutiérrez Pedro  
- Juan Solis Vasquez  
- Oliver Garzón García  

---

## 🛠️ Tecnologías utilizadas

- Node.js  
- Express  
- PostgreSQL  
- Git + GitHub  
- Postman (para pruebas)

---

## 📦 Entidades implementadas

- 👨‍🎓 Estudiantes
- 👩‍🏫 Maestros
- 📚 Materias
- 🏫 Cursos
- 🕒 Clases (⚠️ con fallas)
- 📝 Inscripciones

Cada entidad incluye su propio conjunto de rutas REST (GET, POST, PUT, DELETE) para realizar operaciones CRUD.

---

## ⚠️ Notas adicionales

- ❌ La entidad **Clases** presenta errores al intentar agregar registros.
- ⚠️ Algunos atributos regresan valores `null`, como por ejemplo `año: null`, debido a entradas incompletas o problemas de validación.
- 🗄️ Asegúrate de tener correctamente configurada tu base de datos PostgreSQL y que las tablas estén bien estructuradas.
- 🧩 Si descargas este proyecto en otra computadora, **ejecuta** `npm install` para instalar todas las dependencias necesarias.

## 🚀 Cómo ejecutar el proyecto

1. Clona el repositorio:
   ```bash
   git clone [text](https://github.com/Pedrosunag/gestion-escolar.git)