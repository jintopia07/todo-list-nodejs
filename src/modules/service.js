import { TodoModel } from "../models/todo.model";


export function createTodo(todoData){ 
    const newTodo = new TodoModel(todoData);
     return newTodo.save();
}

export function updateTodoById(id, todoData){
    return TodoModel.findByIdAndUpdate(id, todoData);
}

export function deleteTodoById(id){
    return TodoModel.findByIdAndDelete(id);
}

export function findManyTodoList(query){
    let baseQuery = {};
    if(query.search){
        baseQuery = {
            ...baseQuery, ...{
                title : {
                    $regex : new RegExp(query.search, 'i'),      
                },
            },
        };
    }

    if(query.status){
        baseQuery = {
            ...baseQuery, 
                status : query.status,      
        };
    }

    if(query.assignee){
        baseQuery = {
            ...baseQuery, 
            assignee : query.assignee,      
        };
    }

    if(query.subscriberCounter){
        baseQuery = {
            ...baseQuery, 
            subscriberCounter : query.subscriberCounter,      
        };
    }


    /* การใช้  or  เป็นเงื่อนไขที่ว่าค้นหาด้วยคำ "subscriberCounter" หรือ "condition" */ 

    // if( query?.condition === 'or'){
    //     baseQuery = {
    //        $or: Object.entries(baseQuery).map(([key, value]) => ({ 
    //         [key]: value,
    //      })),
    //     };
    // }
    
    // console.log({entries : Object.entries(baseQuery).map(([key, value]) => ({ 
    //     [key]: value,
    //  })),});

   


    return TodoModel.find(baseQuery);
}


export function findTodolistById(id){
    return TodoModel.findById(id);
}