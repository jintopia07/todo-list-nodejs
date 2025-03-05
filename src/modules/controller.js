import { query, request, response, Router } from "express";
import { createTodo, deleteTodoById, findTodolistById, findManyTodoList, updateTodoById } from "../modules/service";



export const router = Router();

router.post('/todos', async (request, response) => {
    try{
        const newTodo = await createTodo(request.body);
        response.send(newTodo);

    } catch (error) {
         response.status(500).send(error);
        console.log(error);
    }
});


router.patch('/todos/:id', async (request, response) => {
    try{
        const updated = await updateTodoById(
            request.params.id,
            request.body
        );

        response.send(updated);

    } catch(error) {
        response.status(500).send(error);
    
    }
});


router.delete('/todos/:id', async (request, response) => {
    try{
        const deleted = await deleteTodoById(
            request.params.id,
            request.body
        );

        response.send({
            id: request.params.id,
            isDelete: true,
        });

    } catch(error) {
        response.status(500).send(error);
    
    }
});


router.get('/todos', async (request, response) => {
    try{
        const list = await findManyTodoList(request.query);
        response.send(list);

    } catch(error) {
        response.status(500).send(error); 
    }
});


router.get('/todos/:id', async (request, response) => {
    try{
        const result = await findTodolistById(request.params.id);
       

        if(result === null){
            response.status(404).send({message: `Todo not found => ${request.params.id}}`});
            return
        }

        response.send(result);

    } catch(error) {
        response.status(500).send(error); 
    }
});