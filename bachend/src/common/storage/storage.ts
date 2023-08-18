export class Storage {
   private static arrayContext = new Map()
   static pullArray(user_id: string, array: object): boolean {
      this.arrayContext.set(user_id, array)
      return true
   }
   static setNewArray(user_id: string): boolean {
      this.arrayContext.set(user_id, [])
      return true
   }
   static getArrayContext(user_id: string) {
      return this.arrayContext.get(user_id)
   }
}