import {Request,  Response } from 'express';

const todos= [
            { id: 1, test: 'Buy milk', completedAt: new Date() },   
            { id: 2, test: 'Buy bread', completedAt: null },  
            { id: 3, test: 'Buy butter', completedAt: new Date() },  
        ];

export class TodosController {

    //* DI
    constructor() {}

    public getTodos = (_req: Request, res: Response) => {
        res.json(todos);   
        return;        
    };

    public getTodoById = (req: Request, res: Response) => {
         const  id  = +req.params.id;
         if(isNaN(id)){ 
             res.status(400).json({ message: 'Id must be a number' });
             return
        };
         const todo = todos.find(todo => todo.id === id);

        if(todo){
              res.json(todo);
              return;
        }
        else{
              res.status(404).json({ message: `Todo with id ${id} not found` });
              return;
            }
            
    };

    public createTodo = (req: Request, res: Response) => {
        const  {text}  = req.body;

        if(!text){ 
             res.status(400).json({ error: 'Text property is required' });
             return
        };
    
        const newTodo ={
            id: todos.length + 1,
            test :text,    
            completedAt: new Date() 
        };
        
        todos.push(newTodo);

        res.json( newTodo );
    };

    public updateTodo = (req: Request, res: Response) => {
        
         const  id  = +req.params.id;
        if(isNaN(id)){ 
             res.status(400).json({ message: 'Id must be a number' });
             return
        };
                

         const todo = todos.find(todo => todo.id === id);
         
         if(!todo){ 
             res.status(400).json({ error: `Todo with id ${id} not found` });
             return
        };

        const  {text,completedAt}  = req.body;
          
      
        
        todo.test = text || todo.test;

        (completedAt==='null')
        ? todo.completedAt = null
        : todo.completedAt = new Date (completedAt  || todo.completedAt);


        res.json( todo );
        return
    };

     public deleteTodo = (req: Request, res: Response) => {
        console.log('deleteTodo :P');
         const  id  = +req.params.id;
            if(isNaN(id)){ 
             res.status(400).json({ message: 'Id must be a number' });
             return
        };
                

         const todo = todos.find(todo => todo.id === id);
         
         if(!todo){ 
             res.status(400).json({ error: `Todo with id ${id} not found` });
             return
        };

       todos.splice(todos.indexOf(todo), 1);
        res.json(todo);
        
    };


    
}