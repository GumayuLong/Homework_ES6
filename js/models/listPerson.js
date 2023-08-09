export class ListPerson {
    listPerson = [];

    addStudent = (Student) => {
        if (document.getElementById("type").value == "Học viên"){
            this.listPerson = [...this.listPerson, Student];
            // this.listPerson.push(Student);
        }
    }

    addEmployee = (Employee) => {
        if (document.getElementById("type").value == "Nhân viên"){
            this.listPerson = [...this.listPerson, Employee];
        }
    } 
    
    addCustomer = (Customer) => {
        if (document.getElementById("type").value == "Khách hàng"){
            this.listPerson = [...this.listPerson, Customer];
        }
    } 

    delete = (id) => {
        const index = this.listPerson.findIndex((element) => {
            return element.id === id;
        });
        this.listPerson.splice(index, 1);
    }
}