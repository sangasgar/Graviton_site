export class Storage {
     private static arrayContext = []
     static pullArray (array: object): boolean {
        this.arrayContext.push(array)
        return true
     }
     static setNewArray(): object[]{
        return this.arrayContext = []
     }
     static getArrayContext(){
        return this.arrayContext
     }
}