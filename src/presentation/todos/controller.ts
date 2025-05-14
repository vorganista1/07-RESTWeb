import {Request,  Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto } from '../../domain/dtos';

export class TodosController {

    //* DI
    constructor() { }

    public getTodos = async (req: Request, res: Response) => {
        
        const todo = await   prisma.todo.findMany({});
        
        res.json(todo);   
        return;        
    };

    public getTodoById = async(req: Request, res: Response) => {
         const  id  = +req.params.id;
         if(isNaN(id)){ 
             res.status(400).json({ message: 'Id must be a number' });
             return
        };
        const todo = await   prisma.todo.findFirst({
            where: {id}
        });

        if(todo){
              res.json(todo);
              return;
        }
        else{
              res.status(404).json({ message: `Todo with id ${id} not found` });
              return;
            }
            
    };

    public createTodo = async(req: Request, res: Response) => {

    const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) {
            res.status(400).json({ error });
            return;
        }
      

 const todo = await   prisma.todo.create({
            data: createTodoDto!
        });
            
        res.json( todo );
    };

    public updateTodo = async (req: Request, res: Response) => {
        
         const  id  = +req.params.id;
        if(isNaN(id)){ 
             res.status(400).json({ message: 'Id must be a number' });
             return
        };
                

        const todoAux = await   prisma.todo.findFirst({
            where: {id}
        });

         if(!todoAux){ 
             res.status(400).json({ error: `Todo with id ${id} not found` });
             return
        };
         const  {text,completedAt}  = req.body;
          
          
        const todo = await   prisma.todo.update({
            where: {id},
            data: {
                text,
                completedAt: (completedAt) ? new Date(completedAt) : null
            }
        });   

        res.json( todo );
        return
    };

     public deleteTodo = async (req: Request, res: Response) => {
        console.log('deleteTodo :P');
         const  id  = +req.params.id;
            if(isNaN(id)){ 
             res.status(400).json({ message: 'Id must be a number' });
             return
        };
                

   const todoAux = await   prisma.todo.findFirst({
            where: {id}
        });         
         if(!todoAux){ 
             res.status(400).json({ error: `Todo with id ${id} not found` });
             return
        };

const  deleted = await   prisma.todo.delete({where: {id}});
        
(deleted) 
? res.json(deleted)
: res.status(400).json({ error: `Todo with id ${id} not found` });

        res.json(deleted);
        
    };


    
}