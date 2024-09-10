class Contact{
    userId:String
    contactIds:String[]

    constructor(userId:String, contactIds:String[]){
        this.userId = userId
        this.contactIds = contactIds
    }

    addContact(contactId:String):void{
        this.contactIds.push(contactId)
    }

    removeContact(contactId:String):void{
        const index = this.contactIds.indexOf(contactId)
        if(index > -1){
            this.contactIds.splice(index, 1)
        }
    }

    hasContact(contactId:String):boolean{
        return this.contactIds.includes(contactId)
    }    

    clearContacts():void{
        this.contactIds.length = 0
    }
}


export { Contact }