import { TasksStateType } from "../App"
import { tasksReducer } from "./tasks-reducer"

test('correct task schould be deleted from correct array', ()=>{
    const startState: TasksStateType = {
        "todolistId1" : [
            {id:"1", title: "CSS", isDone: true},
            {id:"2", title: "JS", isDone: true},
            {id:"3", title: "React", isDone: false},
        ],
        "todolistId2" : [
            {id:"1", title: "Book", isDone: false},
            {id:"2", title: "Milk", isDone: true},
            {id:"2", title: "Tee", isDone: true},
        ],
    }

    const action = removeTaskAC("2", "todolistId2")

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"]).length.toBe(3)
    expect(endState["todolistId2"]).length.toBe(1)
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy()
})