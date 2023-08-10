export class ListPerson {
    listPerson = [];

    add = (Person) => {
            this.listPerson = [...this.listPerson, Person];
    }

    delete = (id) => {
        const index = this.listPerson.findIndex((element) => {
            return element.id === id;
        });
        this.listPerson.splice(index, 1);
    }

    findById(id) {
        return this.listPerson.find((element) => {
            return element.id === id;
        });
    }
    
    update(person) {
        const index = this.listPerson.findIndex((element) => {
            return element.id === person.id;
        });
        
        // console.log(this.listPerson[0]);
        this.listPerson[index] = person;
    }

    filterByType(type) {
        const data = this.listPerson.filter((element) => {
            if (type === "all") {
                return true;
            }
    
            return element.type === type;
        });
    
        return data;
    }

    // sapXepAZ(listPerson){
    //     listPerson.sort((a, b) => a.name.localeCompare(b.name));
    // }

    // filterByName(name) {
    //     const data = this.listPerson.filter((element) => {
    //         if (type === "all") {
    //             return true;
    //         }
    
    //         return element.type === type;
    //     });
    
    //     return data;
    // }
}